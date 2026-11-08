// Generates the question/option/impact facts of knowledge_base.pl from the TypeScript source,
// so the Prolog KB is guaranteed to match the web app data.
import { EXPERT_QUESTIONS } from '../../src/utils/expertSystemEngine';
const q = (s: string) => '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
const out: string[] = [
  '/*  facts.pl  -  GENERATED from src/utils/expertSystemEngine.ts',
  '    (run: npx tsx prolog/tests/gen_facts.ts > prolog/facts.pl)  -  portable: SWI-Prolog + Tau Prolog (browser)',
  '',
  '    question(QId, Category, TextEn, TextAr).',
  '    option(QId, OptionId, TextEn, TextAr, Explanation).',
  '    impact(OptionId, AI, CS, IS).          % points an option adds to each program',
  '*/',
  ':- set_prolog_flag(double_quotes, atom).',
  '',
];
for (const question of EXPERT_QUESTIONS) {
  out.push(`question(${question.id}, ${question.category}, ${q(question.questionText)}, ${q(question.questionTextAr)}).`);
}
out.push('');
for (const question of EXPERT_QUESTIONS) {
  for (const o of question.options) {
    out.push(`option(${question.id}, '${o.id}', ${q(o.text)}, ${q(o.textAr)}, ${q(o.explanation)}).`);
  }
}
out.push('');
for (const question of EXPERT_QUESTIONS) {
  for (const o of question.options) {
    out.push(`impact('${o.id}', ${o.impact.ai}, ${o.impact.cs}, ${o.impact.is}).`);
  }
}
console.log(out.join('\n'));
