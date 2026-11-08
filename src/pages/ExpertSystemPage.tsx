import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  RotateCcw,
  Bot,
  User,
  CheckCircle2,
  HelpCircle,
  Award,
  Layers,
  ArrowRight,
  TrendingUp,
  Sliders,
  FileDown,
  BookOpen,
  Cpu,
  Binary,
  Database,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  EXPERT_QUESTIONS,
  runExpertSystemInference,
} from '../utils/expertSystemEngine';
import { ExpertSystemRecommendation } from '../types/academic';
import { runPrologInference } from '../utils/prologEngine';
import { PROGRAMS } from '../data/academicData';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  textAr?: string;
  options?: Array<{
    id: string;
    text: string;
    textAr: string;
  }>;
  questionId?: string;
}

interface ExpertSystemPageProps {
  onNavigateToProgram: (programId: 'ai' | 'cs' | 'is') => void;
  onOpenPdf: () => void;
}

export const ExpertSystemPage: React.FC<ExpertSystemPageProps> = ({
  onNavigateToProgram,
  onOpenPdf,
}) => {
  const [viewMode, setViewMode] = useState<'chat' | 'structured'>('chat');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [recommendation, setRecommendation] = useState<ExpertSystemRecommendation | null>(null);
  // Inference engine in use: the Prolog knowledge base (Tau Prolog) with a TypeScript fallback.
  const [engine, setEngine] = useState<'prolog' | 'typescript'>('prolog');
  const [livePercentages, setLivePercentages] = useState({ ai: 33, cs: 33, is: 34 });

  const infer = async (a: Record<string, string>): Promise<ExpertSystemRecommendation> => {
    try {
      const rec = await runPrologInference(a);
      setEngine('prolog');
      return rec;
    } catch (err) {
      console.warn('Prolog engine unavailable, falling back to TypeScript engine:', err);
      setEngine('typescript');
      return runExpertSystemInference(a);
    }
  };

  // What-if simulator state
  const [whatIfScores, setWhatIfScores] = useState<{ ai: number; cs: number; is: number }>({
    ai: 50,
    cs: 50,
    is: 50,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const resetSession = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setRecommendation(null);

    const firstQ = EXPERT_QUESTIONS[0];
    const initialMessages: ChatMessage[] = [
      {
        id: 'msg-welcome',
        sender: 'bot',
        text: 'Welcome to the MUST Academic Advising Expert System! I am your intelligent academic mentor for the Faculty of Information Technology. I will guide you through a short diagnostic evaluation to help you identify whether Artificial Intelligence (AI), Computer Science (CS), or Information Systems (IS) is the optimal major for your aptitudes and career ambitions.',
        textAr:
          'أهلاً بك في النظام الخبير للإرشاد الأكاديمي بكلية تكنولوجيا المعلومات! سأطرح عليك مجموعة من الأسئلة التخصصية لتحليل اهتماماتك وتحديد البرنامج الأكاديمي الأنسب لك (ذكاء اصطناعي، علوم حاسب، أو نظم معلومات).',
      },
      {
        id: `msg-q-${firstQ.id}`,
        sender: 'bot',
        text: firstQ.questionText,
        textAr: firstQ.questionTextAr,
        options: firstQ.options,
        questionId: firstQ.id,
      },
    ];

    setMessages(initialMessages);
  };

  useEffect(() => {
    resetSession();
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Live inference scores are computed by the Prolog engine whenever the answers change
  useEffect(() => {
    let cancelled = false;
    infer(answers).then((rec) => {
      if (!cancelled) setLivePercentages(rec.percentages);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers]);

  // Handle option selection
  const handleSelectOption = (questionId: string, optionId: string) => {
    const question = EXPERT_QUESTIONS.find((q) => q.id === questionId);
    if (!question) return;

    const selectedOption = question.options.find((opt) => opt.id === optionId);
    if (!selectedOption) return;

    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    // Append User Message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: selectedOption.text,
      textAr: selectedOption.textAr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Next question or Recommendation
    const nextIdx = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIdx);

    setTimeout(async () => {
      setIsTyping(false);

      if (nextIdx < EXPERT_QUESTIONS.length) {
        const nextQ = EXPERT_QUESTIONS[nextIdx];
        const nextBotMsg: ChatMessage = {
          id: `msg-q-${nextQ.id}`,
          sender: 'bot',
          text: nextQ.questionText,
          textAr: nextQ.questionTextAr,
          options: nextQ.options,
          questionId: nextQ.id,
        };
        setMessages((prev) => [...prev, nextBotMsg]);
      } else {
        // Complete! Run Inference Engine
        const rec = await infer(newAnswers);
        setRecommendation(rec);
        setWhatIfScores({
          ai: rec.scores.ai,
          cs: rec.scores.cs,
          is: rec.scores.is,
        });

        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });

        const finishMsg: ChatMessage = {
          id: `msg-finish-${Date.now()}`,
          sender: 'bot',
          text: `Analysis complete! Based on ${Object.keys(newAnswers).length} inference rules evaluated by our Knowledge Base, your primary recommended degree is ${
            rec.primaryProgram === 'AI'
              ? 'Artificial Intelligence'
              : rec.primaryProgram === 'CS'
              ? 'Computer Science'
              : 'Information Systems'
          } with a confidence rating of ${rec.confidenceScore}%. Explore your comprehensive advising report below!`,
        };
        setMessages((prev) => [...prev, finishMsg]);
      }
    }, 650);
  };

  // Structured mode answer handler
  const handleStructuredAnswer = async (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    if (Object.keys(newAnswers).length === EXPERT_QUESTIONS.length) {
      const rec = await infer(newAnswers);
      setRecommendation(rec);
      setWhatIfScores({
        ai: rec.scores.ai,
        cs: rec.scores.cs,
        is: rec.scores.is,
      });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Live score progress for active session
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / EXPERT_QUESTIONS.length) * 100);

  // Primary Program details
  const recProgramKey = recommendation ? (recommendation.primaryProgram.toLowerCase() as 'ai' | 'cs' | 'is') : 'ai';
  const recProgramData = PROGRAMS[recProgramKey];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rule-Based Inference Engine · Version 2026.1</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Advising Expert System
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Intelligent diagnostic consultation assessing computational inclinations, mathematical depth, and industry horizons to match you with AI, CS, or IS.
          </p>
        </div>

        {/* View Mode Toggle & Reset */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setViewMode('chat')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === 'chat'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Interactive Chatbot
            </button>
            <button
              onClick={() => setViewMode('structured')}
              className={`px-3 py-1 rounded-md transition-colors ${
                viewMode === 'structured'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Diagnostic Questionnaire
            </button>
          </div>

          <button
            onClick={resetSession}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-800"
            title="Reset Advising Session"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Advising Session Progress: {answeredCount} of {EXPERT_QUESTIONS.length} Questions Answered</span>
          <span className="font-mono font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Interactive Stage */}
      {viewMode === 'chat' ? (
        /* Chatbot Interface */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Chat Window (8 cols) */}
          <div className="lg:col-span-8 flex flex-col h-[560px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
            
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    MUST AI Academic Advisor
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Faculty Knowledge Base Active
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold">
                Forward-Chaining Engine
              </span>
            </div>

            {/* Chat Messages Log */}
            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-slate-700 dark:bg-slate-600'
                        : 'bg-indigo-600'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 dark:bg-slate-800 text-white rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700/60'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.textAr && (
                      <p className="font-arabic text-xs mt-1 text-slate-500 dark:text-slate-400">
                        {msg.textAr}
                      </p>
                    )}

                    {/* Interactive Options inside bot question */}
                    {msg.options && !answers[msg.questionId || ''] && (
                      <div className="mt-4 space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        {msg.options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(msg.questionId || '', opt.id)}
                            className="w-full text-left p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-slate-800 dark:text-slate-200 text-xs transition-all flex items-start gap-2.5 group"
                          >
                            <span className="w-4 h-4 rounded-full border border-indigo-400 dark:border-indigo-600 group-hover:bg-indigo-600 group-hover:border-indigo-600 shrink-0 mt-0.5 transition-colors" />
                            <div>
                              <div className="font-medium">{opt.text}</div>
                              {opt.textAr && (
                                <div className="text-[11px] font-arabic text-slate-500 mt-0.5">
                                  {opt.textAr}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs italic pl-11">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px]">Evaluating knowledge rules...</span>
                </div>
              )}
            </div>

            {/* Chat Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs text-slate-500">
              <span>Select an answer above to advance the inference pipeline.</span>
              <button
                onClick={resetSession}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restart Session</span>
              </button>
            </div>
          </div>

          {/* Real-Time Telemetry & Rule Monitor (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Distribution Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Live Inference Scores
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  {engine === 'prolog' ? 'Prolog · Real-time' : 'Real-time'}
                </span>
              </div>

              {/* Programs score meters */}
              {(() => {
                const recPreview = { percentages: livePercentages };
                return (
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>Artificial Intelligence (AI)</span>
                        </span>
                        <span className="font-mono tabular-nums">{recPreview.percentages.ai}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                          style={{ width: `${recPreview.percentages.ai}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                          <Binary className="w-3.5 h-3.5" />
                          <span>Computer Science (CS)</span>
                        </span>
                        <span className="font-mono tabular-nums">{recPreview.percentages.cs}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-300"
                          style={{ width: `${recPreview.percentages.cs}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                          <Database className="w-3.5 h-3.5" />
                          <span>Information Systems (IS)</span>
                        </span>
                        <span className="font-mono tabular-nums">{recPreview.percentages.is}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                          style={{ width: `${recPreview.percentages.is}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}

              <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                Weights are dynamically recalculated using knowledge heuristics as each answer is entered.
              </p>
            </div>

            {/* Quick Helper Info */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-500" />
                <span>How Does the Engine Decide?</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The engine evaluates multi-attribute utility theory (MAUT) cross-referenced with faculty curriculum weights: theoretical math rigor, low-level architecture, perception networks, and enterprise databases.
              </p>
            </div>

          </div>

        </div>
      ) : (
        /* Structured Mode (Questionnaire Grid) */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPERT_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                  <span>Question {idx + 1} of {EXPERT_QUESTIONS.length}</span>
                  <span className="uppercase text-[10px] tracking-wider font-mono">
                    {q.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {q.questionText}
                </h3>
                <p className="text-xs font-arabic text-slate-500">
                  {q.questionTextAr}
                </p>

                <div className="space-y-2 pt-2">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleStructuredAnswer(q.id, opt.id)}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-semibold shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 flex items-center justify-center ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-600 text-white'
                              : 'border-slate-400'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <div>
                          <div>{opt.text}</div>
                          {opt.textAr && (
                            <div className="text-[11px] font-arabic opacity-75 mt-0.5">
                              {opt.textAr}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          RECOMMENDATION RESULT SCREEN & EXPLANATION SUBSYSTEM
         ======================================================== */}
      {recommendation && (
        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Advising Recommendation Confirmed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Primary Recommended Program: {recProgramData.name}
              </h2>
              <p className="text-sm font-arabic text-slate-600 dark:text-slate-400 mt-0.5">
                {recProgramData.nameAr}
              </p>
            </div>

            {/* Confidence Score Pill */}
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center gap-4 shadow-md shrink-0">
              <div>
                <div className="text-3xl font-black tabular-nums tracking-tight">
                  {recommendation.confidenceScore}%
                </div>
                <div className="text-[11px] font-medium text-indigo-100 uppercase tracking-wider">
                  Recommendation Confidence
                </div>
              </div>
              <Award className="w-8 h-8 text-indigo-200" />
            </div>
          </div>

          {/* Three-Program Distribution Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-5 rounded-2xl border transition-all ${
                recommendation.primaryProgram === 'AI'
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/50 border-indigo-400 dark:border-indigo-700 ring-2 ring-indigo-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Artificial Intelligence (AI)
                </span>
                {recommendation.primaryProgram === 'AI' && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-600 text-white">
                    PRIMARY MATCH
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2 tabular-nums">
                {recommendation.percentages.ai}% Match
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Machine learning, robotics, NLP, and vision.
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border transition-all ${
                recommendation.primaryProgram === 'CS'
                  ? 'bg-blue-50/70 dark:bg-blue-950/50 border-blue-400 dark:border-blue-700 ring-2 ring-blue-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Computer Science (CS)
                </span>
                {recommendation.primaryProgram === 'CS' && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-600 text-white">
                    PRIMARY MATCH
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2 tabular-nums">
                {recommendation.percentages.cs}% Match
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Systems, compilers, operating systems, algorithms.
              </p>
            </div>

            <div
              className={`p-5 rounded-2xl border transition-all ${
                recommendation.primaryProgram === 'IS'
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700 ring-2 ring-emerald-500/20'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Information Systems (IS)
                </span>
                {recommendation.primaryProgram === 'IS' && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-600 text-white">
                    PRIMARY MATCH
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2 tabular-nums">
                {recommendation.percentages.is}% Match
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Enterprise architecture, big data, BI & DSS.
              </p>
            </div>
          </div>

          {/* Explanation Subsystem: Why Was This Recommended? */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Why Panel & Strengths */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Explanation Subsystem: Why This Program?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                The inference engine concluded that your responses reflect the core competencies required for <strong>{recProgramData.name}</strong>. Here is your profile synthesis:
              </p>

              <ul className="space-y-2 text-xs">
                {recommendation.strengthsSummary.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{str}</span>
                  </li>
                ))}
              </ul>

              {/* Recommended Elective Courses */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
                  Tailored Elective Courses Recommended for You:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {recommendation.recommendedElectives.map((elec, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-medium text-slate-800 dark:text-slate-200">
                      {elec}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fired Production Rules Trace */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Knowledge Base Rule Firing Trace</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Rules triggered during forward-chaining evaluation:
              </p>

              <div className="space-y-2.5">
                {recommendation.firedRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white mb-1">
                      <span>{rule.title}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        Target: {rule.contributionTo}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      {rule.rationale}
                    </p>
                  </div>
                ))}
              </div>

              {/* 4-Year Academic Preparation Roadmap */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-xs space-y-2">
                <span className="font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider block">
                  Recommended 4-Year Action Plan
                </span>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                  {recommendation.careerRoadmap.map((road, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{road}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateToProgram(recProgramKey)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-xs"
              >
                <span>View Full {recommendation.primaryProgram} Curriculum & Flowchart</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors"
              >
                <FileDown className="w-4 h-4" />
                <span>Print / Export Advising Report</span>
              </button>
            </div>

            <button
              onClick={resetSession}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white underline"
            >
              Start New Advising Session
            </button>
          </div>

        </section>
      )}

    </div>
  );
};
