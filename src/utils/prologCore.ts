/**
 * Tau Prolog runner (core). Takes the Prolog sources as text so it can be used both in the
 * browser (see prologEngine.ts) and in Node tests (prolog/tests/compare_tau.ts).
 */
import type { ExpertSystemRecommendation } from '../types/academic';

type Program = 'AI' | 'CS' | 'IS';

/** Loads Tau Prolog + its lists library and consults the given Prolog source once. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function createSession(source: string): Promise<any> {
  // tau-prolog's core assigns these implicit globals without declaring them, which throws a
  // ReferenceError once the library is bundled as a strict-mode ES module. Declare them first.
  for (const name of [
    'tau_file_system', 'tau_user_input', 'tau_user_output', 'tau_user_error',
    'nodejs_file_system', 'nodejs_user_input', 'nodejs_user_output', 'nodejs_user_error',
  ]) {
    if (!(name in globalThis)) (globalThis as any)[name] = undefined;
  }
  const mod: any = await import('tau-prolog');
  const pl = mod.default ?? mod;
  const listsMod: any = await import('tau-prolog/modules/lists.js');
  (listsMod.default ?? listsMod)(pl);
  const session = pl.create(1000000);
  await new Promise<void>((resolve, reject) => {
    session.consult(source, {
      success: () => resolve(),
      error: (err: unknown) => reject(new Error('Prolog consult failed: ' + String(err))),
    });
  });
  return session;
}

/** Runs a goal and returns the first solution as { Var: term }, or null if it fails. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function solveOnce(session: any, goal: string): Promise<Record<string, any> | null> {
  return new Promise((resolve, reject) => {
    session.query(goal, {
      success: () =>
        session.answer({
          success: (answer: any) => resolve(answer),
          fail: () => resolve(null),
          error: (err: unknown) => reject(new Error(String(err))),
          limit: () => resolve(null),
        }),
      error: (err: unknown) => reject(new Error(String(err))),
    });
  });
}

// ---- Prolog term -> JS helpers -------------------------------------------------------------
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const num = (t: any): number => Number(t.value);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const atom = (t: any): string => String(t.id);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function listToArray(t: any): any[] {
  const out: any[] = [];
  let cur = t;
  while (cur && cur.indicator === './2') {
    out.push(cur.args[0]);
    cur = cur.args[1];
  }
  return out;
}

const quoteAtom = (s: string) => "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";

/**
 * Creates a Prolog-backed inference function. The knowledge base is consulted lazily, once.
 * The returned function is equivalent to runExpertSystemInference() but executed by Prolog.
 */
export function createPrologInference(source: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sessionPromise: Promise<any> | null = null;
  return async function runPrologInference(
    answers: Record<string, string>
  ): Promise<ExpertSystemRecommendation> {
    if (!sessionPromise) {
      sessionPromise = createSession(source);
      sessionPromise.catch(() => {
        sessionPromise = null; // allow retry after a failure
      });
    }
    const session = await sessionPromise;
    return infer(session, answers);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function infer(session: any, answers: Record<string, string>): Promise<ExpertSystemRecommendation> {
  const pairs = Object.entries(answers)
    .map(([q, o]) => `${quoteAtom(q)}-${quoteAtom(o)}`)
    .join(', ');

  const res = await solveOnce(
    session,
    `diagnose([${pairs}], result(P, s(AI,CS,IS), pct(PA,PC,PI), Conf, Fired)).`
  );
  if (!res) throw new Error('Prolog diagnose/2 failed');
  const program = atom(res.lookup('P')).toUpperCase() as Program;

  const firedRules = listToArray(res.lookup('Fired')).map((f) => ({
    id: atom(f.args[0]).toUpperCase(),
    contributionTo: atom(f.args[1]).toUpperCase() as Program,
    title: atom(f.args[2]),
    rationale: atom(f.args[3]),
  }));

  const key = program.toLowerCase();
  const guide = await solveOnce(
    session,
    `strengths(${key}, S), roadmap(${key}, R), electives(${key}, E).`
  );
  if (!guide) throw new Error('Prolog guidance lookup failed');

  return {
    primaryProgram: program,
    scores: { ai: num(res.lookup('AI')), cs: num(res.lookup('CS')), is: num(res.lookup('IS')) },
    percentages: { ai: num(res.lookup('PA')), cs: num(res.lookup('PC')), is: num(res.lookup('PI')) },
    confidenceScore: num(res.lookup('Conf')),
    firedRules,
    strengthsSummary: listToArray(guide.lookup('S')).map(atom),
    careerRoadmap: listToArray(guide.lookup('R')).map(atom),
    recommendedElectives: listToArray(guide.lookup('E')).map(atom),
  };
}
