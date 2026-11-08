/*  rules.pl  -  Rules + inference engine + program guidance
    Portable: runs in SWI-Prolog (terminal) and Tau Prolog (inside the website).
*/
:- use_module(library(lists)).
:- set_prolog_flag(double_quotes, atom).

question_ids(Ids) :- findall(Q, question(Q, _, _, _), Ids).

program_name(ai, 'Artificial Intelligence').
program_name(cs, 'Computer Science').
program_name(is, 'Information Systems').

/* --------------------------------------------------------------------------
   2. RULES
   fires(RuleId, s(AI,CS,IS), Contribution)  succeeds when the rule's
   condition holds for the score profile. Contribution = program it supports.
   rule_info(RuleId, Name, Title, Rationale)  is the rule's documentation.
   -------------------------------------------------------------------------- */

rule_order([ rule_ai_01, rule_cs_01, rule_is_01,
             rule_ai_cs_complexity, rule_is_data_mining ]).

rule_info(rule_ai_01, "Cognitive & Perceptual Affinity",
    "Rule R-101: High Affinity for Perception & Machine Learning",
    "The student strongly prioritized probabilistic learning, computer vision, and neural network modeling over procedural systems.").
rule_info(rule_cs_01, "Core Systems & Algorithmic Rigor",
    "Rule R-201: Strong Alignment with Systems Engineering & Compilers",
    "The student demonstrated a decisive preference for low-level system mechanics, memory efficiency, and computational theory.").
rule_info(rule_is_01, "Enterprise Architecture & Business Tech",
    "Rule R-301: Distinct Orientation Towards Enterprise Information Systems",
    "The student indicated strong passion for data-driven strategic planning, business intelligence, decision support, and corporate IT governance.").
rule_info(rule_ai_cs_complexity, "High Math & Algorithmic Synergy",
    "Rule R-405: Advanced Computational & Mathematical Synergy",
    "Both AI and CS scoring thresholds are elevated. The student is capable of rigorous algorithmic and deep mathematical reasoning.").
rule_info(rule_is_data_mining, "Data Science & Business Analytics Cross-Path",
    "Rule R-508: Applied Data Analytics & Business Intelligence Bridge",
    "The answers reveal a high interest in extracting actionable intelligence from massive enterprise databases.").

fires(rule_ai_01, s(AI,CS,IS), ai) :- AI > CS, AI > IS.
fires(rule_cs_01, s(AI,CS,IS), cs) :- CS > AI, CS > IS.
fires(rule_is_01, s(AI,CS,IS), is) :- IS > AI, IS > CS.
fires(rule_ai_cs_complexity, s(AI,CS,_), Contribution) :-
    AI >= 40, CS >= 40,
    ( AI >= CS -> Contribution = ai ; Contribution = cs ).
fires(rule_is_data_mining, s(AI,_,IS), is) :- IS >= 40, AI >= 35.

/* --------------------------------------------------------------------------
   3. INFERENCE ENGINE
   Answers is a list of QuestionId-OptionId pairs, e.g. [q1-'q1-a', q2-'q2-b'].
   diagnose(+Answers, -Result) with
     Result = result(Program, s(AI,CS,IS), pct(PA,PC,PI), Confidence, Fired)
     Fired  = list of fired(RuleId, Contribution, Title, Rationale)
   -------------------------------------------------------------------------- */

% Step 1: accumulate scores from the chosen options (unknown answers are ignored)
scores(Answers, s(AI,CS,IS)) :-
    findall(A-C-I,
            ( member(Q-O, Answers), option(Q, O, _, _, _), impact(O, A, C, I) ),
            Impacts),
    sum_impacts(Impacts, 0, 0, 0, AI, CS, IS).

sum_impacts([], AI, CS, IS, AI, CS, IS).
sum_impacts([A-C-I|T], AI0, CS0, IS0, AI, CS, IS) :-
    AI1 is AI0 + A, CS1 is CS0 + C, IS1 is IS0 + I,
    sum_impacts(T, AI1, CS1, IS1, AI, CS, IS).

% Step 2: choose the primary program (ties resolve exactly like the web app)
primary(s(0,0,0), ai) :- !.
primary(s(AI,CS,IS), cs) :- CS > AI, CS >= IS, !.
primary(s(AI,CS,IS), is) :- IS > AI, IS > CS, !.
primary(_, ai).

% Step 3: percentages (IS gets the remainder so the total is always 100)
percentages(s(0,0,0), pct(33,33,34)) :- !.
percentages(s(AI,CS,IS), pct(PA,PC,PI)) :-
    Total is AI + CS + IS,
    PA is round(AI / Total * 100),
    PC is round(CS / Total * 100),
    PI is 100 - PA - PC.

% Step 4: confidence from the margin between the two best scores
confidence(s(AI,CS,IS), Conf) :-
    Top is max(AI, max(CS, IS)),
    Low is min(AI, min(CS, IS)),
    Second is AI + CS + IS - Top - Low,
    Delta is Top - Second,
    Raw is round(75 + (Delta / 40) * 23),
    Conf is min(99, max(72, Raw)).

% Step 5: forward chaining - fire every rule whose condition holds
fired_rules(S, Fired) :-
    rule_order(Order),
    findall(fired(R, Contribution, Title, Rationale),
            ( member(R, Order), fires(R, S, Contribution),
              rule_info(R, _, Title, Rationale) ),
            Fired).

diagnose(Answers, result(Program, S, Pct, Conf, Fired)) :-
    scores(Answers, S),
    primary(S, Program),
    percentages(S, Pct),
    confidence(S, Conf),
    fired_rules(S, Fired).

/* --------------------------------------------------------------------------
   Program guidance (strengths, roadmap, electives) per recommended program
   -------------------------------------------------------------------------- */

strengths(ai, [
    "High affinity for probabilistic mathematics, linear algebra, and data patterns.",
    "Enthusiasm for autonomous perception, neural network engineering, and robotics.",
    "Strong fit for research-oriented algorithm development and high-impact AI modeling."]).
strengths(cs, [
    "Superior aptitude for core computational logic, memory architecture, and performance.",
    "Strong drive to understand low-level runtime systems, operating systems, and compilers.",
    "High adaptability across distributed infrastructure, cybersecurity, and game engines."]).
strengths(is, [
    "Strategic vision bridging technical systems with organizational value and decision-making.",
    "Strong skills in relational/NoSQL database management, business intelligence, and workflows.",
    "High market demand across multinational enterprise transformations and data consulting."]).

roadmap(ai, [
    "Year 1-2: Master Python, Object-Oriented Programming, Calculus, and Linear Algebra.",
    "Year 3: Deep dive into Neural Networks (AI 343), Robotics (AI 331), and Data Science (AI 342).",
    "Year 4: Build advanced Capstone in Machine Learning (AI 414), Computer Vision (AI 483), or NLP (AI 462)."]).
roadmap(cs, [
    "Year 1-2: Excel in Data Structures (CS 212), Logic Design (ECE 202), and Discrete Math (MATH 251).",
    "Year 3: Master Operating Systems (CS 351), Computer Graphics (CS 302), and Networks (CS 381).",
    "Year 4: Specialize in Compiler Design (CS 411), Parallel Computing (CS 484), and Cyber Security (CS 452)."]).
roadmap(is, [
    "Year 1-2: Build strong foundations in Databases (IS 220), Programming, and Statistics.",
    "Year 3: Specialize in Electronic Commerce (IS 301), Operations Research (IS 321), and Data Mining (IS 322).",
    "Year 4: Lead enterprise projects in Big Data Analytics (IS 421) and Business Intelligence & DSS (IS 432)."]).

electives(ai, [
    "AI 412: Expert Systems (3 CH)",
    "AI 464: Deep Learning (3 CH)",
    "AI 352: Internet of Things (IoT) (3 CH)",
    "AI 483: Computer Vision (3 CH)"]).
electives(cs, [
    "CS 311: Systems Programming & Assembly (3 CH)",
    "CS 451: Advanced Operating Systems (3 CH)",
    "CS 484: Parallel & Distributed Computing (3 CH)",
    "CS 441: Advanced Software Engineering (3 CH)"]).
electives(is, [
    "IS 432: Business Intelligence and Decision Support Systems (3 CH)",
    "IS 421: Big Data Analytics (3 CH)",
    "IS 471: Blockchain & Digital Currency (3 CH)",
    "IS 413: Advanced Database Management Systems (3 CH)"]).

