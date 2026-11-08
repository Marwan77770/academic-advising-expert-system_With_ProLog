import { EXPERT_QUESTIONS, runExpertSystemInference } from '../../src/utils/expertSystemEngine';
const qs = EXPERT_QUESTIONS;
const rows: string[] = [];
function rec(i: number, ans: Record<string, string>) {
  if (i === qs.length) {
    const r = runExpertSystemInference(ans);
    const key = qs.map((q) => ans[q.id] ?? '-').join(',');
    rows.push([key, r.primaryProgram.toLowerCase(), r.scores.ai, r.scores.cs, r.scores.is,
      r.percentages.ai, r.percentages.cs, r.percentages.is, r.confidenceScore,
      r.firedRules.map((f) => f.id + ':' + f.contributionTo.toLowerCase()).join('|')].join(';'));
    return;
  }
  rec(i + 1, ans);                       // question skipped
  for (const o of qs[i].options) rec(i + 1, { ...ans, [qs[i].id]: o.id });
}
rec(0, {});
console.log(rows.join('\n'));
