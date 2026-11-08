/*  ==========================================================================
    knowledge_base.pl  -  Academic Advising Expert System (MUST - Faculty of IT)

    Recommends one of three programs:  ai | cs | is
    Same knowledge and same inference logic as src/utils/expertSystemEngine.ts

    Layers (classic expert-system architecture):
      1. Facts             facts.pl   question/4, option/5, impact/4   (generated)
      2. Rules + engine    rules.pl   fires/3, diagnose/2 (forward chaining)
      3. Explanation       explain/1  (HOW the conclusion was reached)   <- this file

    facts.pl and rules.pl are ALSO loaded by the website through Tau Prolog.
    ========================================================================== */

:- encoding(utf8).
:- module(knowledge_base,
          [ question/4, option/5, impact/4,
            diagnose/2, explain/1, program_name/2,
            question_ids/1, strengths/2, roadmap/2, electives/2, rule_info/4
          ]).

:- include('facts.pl').
:- include('rules.pl').

/* --------------------------------------------------------------------------
   4. EXPLANATION FACILITY  -  answers "HOW did you reach this conclusion?"
   -------------------------------------------------------------------------- */

explain(Answers) :-
    diagnose(Answers, result(Program, s(AI,CS,IS), pct(PA,PC,PI), Conf, Fired)),
    program_name(Program, Name),
    upcase_atom(Program, Code),
    nl, format("=== RECOMMENDATION: ~w (~w) ===~n", [Name, Code]),
    format("Confidence: ~w%~n", [Conf]),
    format("Scores    : AI=~w  CS=~w  IS=~w~n", [AI, CS, IS]),
    format("Match     : AI ~w%  |  CS ~w%  |  IS ~w%~n", [PA, PC, PI]),
    nl, writeln("--- How your answers were scored ---"),
    forall(member(Q-O, Answers),
           ( option(Q, O, _, _, Why), impact(O, A, C, I),
             format("  ~w: +~w AI, +~w CS, +~w IS   (~w)~n", [Q, A, C, I, Why]) )),
    nl, writeln("--- Rules that fired ---"),
    ( Fired == []
    -> writeln("  (none)")
    ;  forall(member(fired(R, Contribution, _, _), Fired),
              ( rule_info(R, _, Title, Rationale),
                upcase_atom(Contribution, CC),
                format("  * ~w [supports ~w]~n      ~w~n", [Title, CC, Rationale]) )) ),
    nl, writeln("--- Your strengths ---"),
    strengths(Program, St), forall(member(L, St), format("  - ~w~n", [L])),
    nl, writeln("--- Suggested roadmap ---"),
    roadmap(Program, Rm), forall(member(L, Rm), format("  - ~w~n", [L])),
    nl, writeln("--- Recommended electives ---"),
    electives(Program, El), forall(member(L, El), format("  - ~w~n", [L])),
    nl.
