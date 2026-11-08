// Verifies the Prolog engine as executed by Tau Prolog (what the website runs) returns exactly the
// same recommendation object as the TypeScript engine, for EVERY answer combination (16,384).
// Run from the project root:  npx tsx prolog/tests/compare_tau.ts
import { readFileSync } from 'fs';
import { isDeepStrictEqual } from 'util';
import { EXPERT_QUESTIONS, runExpertSystemInference } from '../../src/utils/expertSystemEngine';
import { createPrologInference } from '../../src/utils/prologCore';

const source = readFileSync('prolog/facts.pl', 'utf8') + '\n' + readFileSync('prolog/rules.pl', 'utf8');
const runProlog = createPrologInference(source);

const combos: Record<string, string>[] = [];
(function rec(i: number, ans: Record<string, string>) {
  if (i === EXPERT_QUESTIONS.length) return void combos.push(ans);
  rec(i + 1, ans);
  for (const o of EXPERT_QUESTIONS[i].options) rec(i + 1, { ...ans, [EXPERT_QUESTIONS[i].id]: o.id });
})(0, {});

(async () => {
  let bad = 0;
  const t0 = Date.now();
  for (const ans of combos) {
    const expected = runExpertSystemInference(ans);
    const actual = await runProlog(ans);
    if (!isDeepStrictEqual(expected, actual)) {
      if (bad++ < 3) console.log('MISMATCH', JSON.stringify(ans), '\nTS:', JSON.stringify(expected), '\nPL:', JSON.stringify(actual));
    }
  }
  console.log(`${combos.length} combinations checked in ${((Date.now() - t0) / 1000).toFixed(1)}s, mismatches: ${bad}`);
  console.log(bad === 0 ? 'PASS: Tau Prolog (browser engine) == TypeScript engine' : 'FAIL');
  process.exit(bad === 0 ? 0 : 1);
})();
