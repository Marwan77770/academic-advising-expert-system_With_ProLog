#!/usr/bin/env bash
# Verifies the Prolog engine gives identical results to the TypeScript engine
# for EVERY possible set of answers (each question: option a / b / c / skipped).
# Requirements: swipl, node (npx tsx).   Run from the project root:  bash prolog/tests/compare.sh
set -e
cd "$(dirname "$0")"
npx tsx dump_ts.ts | sort > /tmp/ts_results.txt
swipl -q dump_pl.pl | sort > /tmp/pl_results.txt
echo "TypeScript rows: $(wc -l < /tmp/ts_results.txt)   Prolog rows: $(wc -l < /tmp/pl_results.txt)"
if diff -q /tmp/ts_results.txt /tmp/pl_results.txt >/dev/null; then
  echo "PASS: Prolog and TypeScript engines are identical on all answer combinations."
else
  echo "FAIL: differences found:"; diff /tmp/ts_results.txt /tmp/pl_results.txt | head -20; exit 1
fi
