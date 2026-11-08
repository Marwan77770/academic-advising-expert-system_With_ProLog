/**
 * Prolog inference engine for the web app.
 *
 * The expert system's knowledge base (prolog/facts.pl) and its rules + forward-chaining
 * inference engine (prolog/rules.pl) are real Prolog source files. They are the SAME files
 * used by the SWI-Prolog terminal version, and they are executed here in the browser with
 * Tau Prolog (a Prolog interpreter written in JavaScript).
 */
import factsSource from '../../prolog/facts.pl?raw';
import rulesSource from '../../prolog/rules.pl?raw';
import { createPrologInference } from './prologCore';

export const runPrologInference = createPrologInference(factsSource + '\n' + rulesSource);
