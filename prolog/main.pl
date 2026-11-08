/*  main.pl - interactive console for the Academic Advising Expert System

    Run:   swipl main.pl          (English)
           swipl main.pl -- ar    (Arabic question text)
*/
:- encoding(utf8).
:- use_module(knowledge_base).

:- initialization(main, main).

main :-
    set_stream(user_output, encoding(utf8)),
    set_stream(user_input, encoding(utf8)),
    current_prolog_flag(argv, Argv),
    ( memberchk(ar, Argv) -> Lang = ar ; Lang = en ),
    banner,
    question_ids(Ids),
    ask_all(Ids, Lang, Answers),
    explain(Answers).

banner :-
    nl,
    writeln("=========================================================="),
    writeln("  MUST - Faculty of IT : Academic Advising Expert System"),
    writeln("  Answer each question by typing a, b or c."),
    writeln("=========================================================="), nl.

ask_all([], _, []).
ask_all([Q|Qs], Lang, [Q-Opt|Rest]) :-
    question(Q, _, TextEn, TextAr),
    ( Lang == ar -> Text = TextAr ; Text = TextEn ),
    format("~w) ~s~n", [Q, Text]),
    findall(O, option(Q, O, _, _, _), Opts),
    show_options(Opts, Q, Lang, 0),
    read_choice(Opts, Opt),
    nl,
    ask_all(Qs, Lang, Rest).

show_options([], _, _, _).
show_options([O|Os], Q, Lang, N) :-
    option(Q, O, En, Ar, _),
    ( Lang == ar -> T = Ar ; T = En ),
    Letter is 0'a + N,
    format("   ~c) ~s~n", [Letter, T]),
    N1 is N + 1,
    show_options(Os, Q, Lang, N1).

read_choice(Opts, Opt) :-
    write("> "), flush_output,
    read_line_to_string(user_input, Line),
    (   Line == end_of_file -> halt
    ;   string_lower(Line, L), string_chars(L, [Ch|_]),
        char_code(Ch, Code), Idx is Code - 0'a,
        nth0(Idx, Opts, Opt)
    ->  true
    ;   writeln("Please type a, b or c."), read_choice(Opts, Opt)
    ).
