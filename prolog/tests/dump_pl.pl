:- encoding(utf8).
:- use_module('../knowledge_base').
:- initialization(main, main).
main :-
    question_ids(Qs),
    forall(combo(Qs, Pairs),
           ( diagnose(Pairs, result(P, s(A,C,I), pct(PA,PC,PI), Conf, Fired)),
             findall(S, ( Q0 = _, member(Q, Qs), ( memberchk(Q-O, Pairs) -> S = O ; S = '-' ), Q0 = Q ), Key),
             atomic_list_concat(Key, ',', KeyA),
             findall(T, ( member(fired(R,Cn,_,_), Fired), rule_short(R, Id), format(atom(T), '~w:~w', [Id, Cn]) ), Ts),
             atomic_list_concat(Ts, '|', FiredA),
             format("~w;~w;~w;~w;~w;~w;~w;~w;~w;~w~n", [KeyA,P,A,C,I,PA,PC,PI,Conf,FiredA]) )).

combo([], []).
combo([Q|Qs], Pairs) :-
    ( combo(Qs, Pairs)                                  % skipped
    ; findall(O, option(Q,O,_,_,_), Os), member(O, Os),
      combo(Qs, Rest), Pairs = [Q-O|Rest] ).

rule_short(rule_ai_01, 'RULE_AI_01').
rule_short(rule_cs_01, 'RULE_CS_01').
rule_short(rule_is_01, 'RULE_IS_01').
rule_short(rule_ai_cs_complexity, 'RULE_AI_CS_COMPLEXITY').
rule_short(rule_is_data_mining, 'RULE_IS_DATA_MINING').
