import test from 'node:test';
import assert from 'node:assert/strict';
import { runExpertSystemInference, EXPERT_QUESTIONS } from './expertSystemEngine';

test('AI path yields primary recommendation of AI with high confidence', () => {
  const answers: Record<string, string> = {
    q1: 'q1-a', // AI
    q2: 'q2-a', // AI
    q3: 'q3-a', // AI
    q4: 'q4-a', // AI
    q5: 'q5-a', // AI
    q6: 'q6-a', // AI
    q7: 'q7-a', // AI
  };

  const rec = runExpertSystemInference(answers);
  assert.equal(rec.primaryProgram, 'AI');
  assert.ok(rec.confidenceScore >= 85);
  assert.ok(rec.percentages.ai > rec.percentages.cs);
  assert.ok(rec.percentages.ai > rec.percentages.is);
  assert.ok(rec.firedRules.some((r) => r.id === 'RULE_AI_01'));
});

test('CS path yields primary recommendation of CS with systems rules fired', () => {
  const answers: Record<string, string> = {
    q1: 'q1-b', // CS
    q2: 'q2-b', // CS
    q3: 'q3-b', // CS
    q4: 'q4-b', // CS
    q5: 'q5-b', // CS
    q6: 'q6-b', // CS
    q7: 'q7-b', // CS
  };

  const rec = runExpertSystemInference(answers);
  assert.equal(rec.primaryProgram, 'CS');
  assert.ok(rec.confidenceScore >= 85);
  assert.ok(rec.percentages.cs > rec.percentages.ai);
  assert.ok(rec.percentages.cs > rec.percentages.is);
  assert.ok(rec.firedRules.some((r) => r.id === 'RULE_CS_01'));
});

test('IS path yields primary recommendation of IS with enterprise rules fired', () => {
  const answers: Record<string, string> = {
    q1: 'q1-c', // IS
    q2: 'q2-c', // IS
    q3: 'q3-c', // IS
    q4: 'q4-c', // IS
    q5: 'q5-c', // IS
    q6: 'q6-c', // IS
    q7: 'q7-c', // IS
  };

  const rec = runExpertSystemInference(answers);
  assert.equal(rec.primaryProgram, 'IS');
  assert.ok(rec.confidenceScore >= 85);
  assert.ok(rec.percentages.is > rec.percentages.ai);
  assert.ok(rec.percentages.is > rec.percentages.cs);
  assert.ok(rec.firedRules.some((r) => r.id === 'RULE_IS_01'));
});
