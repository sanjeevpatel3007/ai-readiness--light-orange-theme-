
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from './constants';
import { UserAnswers, GeminiRoadmap, AiLevel } from './types';
import { 
  RoleCards, Timeline, FrequencyPills, MoodBadges, GoalGrid, 
  ChallengeCards, ChatFillInput, ScoreBarSlider, LearningTabs, TimeSlider 
} from './components/QuizComponents';
import { LeadCaptureDialog } from './components/LeadCaptureDialog';
import { ResultDashboard } from './components/ResultDashboard';
import { LevelUpParticles, EncouragementToast } from './components/Gamification';
import { computeAiScore, getAiLevel } from './services/scoreService';
import { generateRoadmap } from './services/geminiService';
import { ChevronRight, Brain, ArrowRight, Sparkles, Layers, Clock, Activity, Smile, Target, AlertTriangle, MessageSquare, BarChart2, BookOpen, ArrowLeft, CheckCircle2, Zap, Trophy, ShieldCheck, Cpu, Layout } from 'lucide-react';

type Screen = 'intro' | 'quiz' | 'calculating' | 'result';

// --- Helpers ---

const QUESTION_META: Record<string, { label: string, icon: any }> = {
  role: { label: "Identity", icon: Layers },
  experience: { label: "Experience", icon: Clock },
  'ai-usage': { label: "Habits", icon: Activity },
  'ai-perspective': { label: "Mindset", icon: Smile },
  'main-goal': { label: "Aspirations", icon: Target },
  challenges: { label: "Obstacles", icon: AlertTriangle },
  'ai-solution': { label: "Vision", icon: MessageSquare },
  'ai-skills': { label: "Proficiency", icon: BarChart2 },
  'learning-style': { label: "Learning", icon: BookOpen },
  'time-commitment': { label: "Commitment", icon: Clock }
};

// --- Background Components ---

const GradientMesh = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
       {/* Base warm gradient */}
       <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50 opacity-80" />
       
       {/* Moving Orbs - Slowed down for subtlety */}
       <motion.div 
         animate={{ 
           x: [-50, 50, -50],
           y: [-30, 30, -30],
           rotate: [0, 180, 360],
           scale: [1, 1.1, 1]
         }}
         transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
         className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[120px] mix-blend-multiply"
       />
       <motion.div 
         animate={{ 
           x: [50, -50, 50],
           y: [30, -30, 30],
           rotate: [360, 180, 0],
           scale: [1.1, 1, 1.1]
         }}
         transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
         className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-red-200/20 rounded-full blur-[120px] mix-blend-multiply"
       />
       <motion.div 
         animate={{ 
           x: [-30, 30, -30],
           y: [60, -60, 60],
         }}
         transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
         className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-yellow-100/30 rounded-full blur-[100px] mix-blend-multiply"
       />
    </div>
  );
};

function App() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState<AiLevel>('AI Beginner');
  const [roadmap, setRoadmap] = useState<GeminiRoadmap | null>(null);
  const [isLocked, setIsLocked] = useState(true);
  
  // Gamification States
  const [showCelebration, setShowCelebration] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'error' | 'info' } | null>(null);
  const [shakeKey, setShakeKey] = useState(0); 
  
  const currentQuestion = QUESTIONS[currentQIndex];

  // --- Sound Effects (Tuned for subtlety) ---
  const playSuccessSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.value = 0.15; // Lower volume

      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.connect(masterGain);
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.start(now + (i * 0.06));
        osc.stop(now + (i * 0.06) + 0.3);
        
        // Envelope
        const oscGain = ctx.createGain();
        osc.disconnect();
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        oscGain.gain.setValueAtTime(0, now + (i * 0.06));
        oscGain.gain.linearRampToValueAtTime(1, now + (i * 0.06) + 0.05);
        oscGain.gain.exponentialRampToValueAtTime(0.01, now + (i * 0.06) + 0.25);
      });
    } catch (e) {}
  };

  const playErrorSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle'; // Softer than sawtooth
      osc.frequency.value = 140; 
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  };

  const playSelectSound = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime); // Slightly lower pitch
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.03, ctx.currentTime); // Very subtle
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  };

  const handleAnswer = (val: any) => {
    const quietTypes = ['text', 'scale'];
    if (!quietTypes.includes(currentQuestion.type)) {
        playSelectSound();
    }
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: val }));
  };

  const triggerFeedback = (msg: string, type: 'error' | 'info') => {
    setFeedbackMessage({ text: msg, type });
    if (type === 'error') {
        setShakeKey(prev => prev + 1);
        playErrorSound();
    }
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleNext = () => {
    const ans = answers[currentQuestion.id];
    if (!ans || (Array.isArray(ans) && ans.length === 0)) {
      triggerFeedback("Please select an option to continue.", 'error');
      return;
    }
    if (currentQuestion.type === 'text') {
      const text = (ans as string).trim();
      if (text.length < 5) {
        triggerFeedback("Could you add a few more details?", 'info');
        return;
      }
      if (!text.includes(' ') && text.length < 10) {
         triggerFeedback("Try describing your idea in a full sentence.", 'info');
         return;
      }
    }
    setShowCelebration(true);
    playSuccessSound();
    setTimeout(() => {
      setShowCelebration(false);
      if (currentQIndex < QUESTIONS.length - 1) {
        setCurrentQIndex(prev => prev + 1);
      } else {
        finishQuiz();
      }
    }, 800);
  };

  const finishQuiz = async () => {
    setScreen('calculating');
    const computedScore = computeAiScore(answers);
    const computedLevel = getAiLevel(computedScore);
    setScore(computedScore);
    setLevel(computedLevel);
    const result = await generateRoadmap(answers, computedScore, computedLevel);
    setRoadmap(result);
    setScreen('result');
  };

  const handleUnlock = (user: { name: string; email: string; phone: string }) => {
    setIsLocked(false);
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQIndex(0);
    setScore(0);
    setRoadmap(null);
    setIsLocked(true);
    setScreen('intro');
  };

  const renderQuestion = () => {
    const props = {
      question: currentQuestion,
      value: answers[currentQuestion.id],
      onChange: handleAnswer
    };

    switch (currentQuestion.uiVariant) {
      case 'role-cards': return <RoleCards {...props} />;
      case 'timeline': return <Timeline {...props} />;
      case 'frequency-pill-toggle': return <FrequencyPills {...props} />;
      case 'mood-badges': return <MoodBadges {...props} />;
      case 'goal-grid': return <GoalGrid {...props} />;
      case 'challenge-cards': return <ChallengeCards {...props} />;
      case 'chat-bubble-fill': return <ChatFillInput {...props} />;
      case 'score-bar': return <ScoreBarSlider {...props} />;
      case 'learning-tabs': return <LearningTabs {...props} />;
      case 'time-slider': return <TimeSlider {...props} />;
      default: return <div>Unknown Variant</div>;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#FDF8F3] text-gray-900 font-sans overflow-hidden relative flex items-center justify-center md:p-4 selection:bg-orange-200">
      
      <GradientMesh />

      {/* --- Gamification Overlays --- */}
      <AnimatePresence>
        {showCelebration && <LevelUpParticles key="particles" />}
        {feedbackMessage && (
            <EncouragementToast key="toast" message={feedbackMessage.text} type={feedbackMessage.type} />
        )}
      </AnimatePresence>

      {/* --- MAIN APP CONTAINER --- */}
      <motion.div 
        layout
        className={`bg-white/80 backdrop-blur-xl border-white/60 w-full max-w-7xl flex flex-col relative overflow-hidden z-10 transition-all duration-500 
          ${screen === 'intro' ? 'h-[100dvh] md:h-[90vh] md:max-h-[900px] rounded-none md:rounded-[2.5rem] shadow-none md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]' : 'h-[100dvh] md:h-[90vh] md:max-h-[900px] rounded-none md:rounded-[2.5rem] shadow-none md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border'}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        
        {/* --- INTRO SCREEN (Landing Page Redesign) --- */}
        {screen === 'intro' && (
          <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden p-6 md:p-12">
            
            {/* Background SVG Pattern for Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
                 <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
                        </pattern>
                        <linearGradient id="fade-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="white" stopOpacity="0" />
                            <stop offset="50%" stopColor="white" stopOpacity="1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                 </svg>
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
            </div>

            <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
               
               {/* Badge */}
               <motion.div 
                 initial={{ opacity: 0, y: -20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 shadow-sm mb-8"
               >
                  <Zap size={14} className="text-orange-500 fill-orange-500" />
                  <span className="text-xs font-bold text-orange-800 uppercase tracking-widest">Personalized Growth Engine</span>
               </motion.div>

               {/* Headline */}
               <motion.h1 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.1, duration: 0.5 }}
                 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-gray-900 leading-none"
               >
                 What's your <br className="hidden md:block" /> 
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">AI Score?</span>
               </motion.h1>
               
               {/* Subhead 1 */}
               <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-3xl text-gray-800 mb-4 font-bold max-w-3xl"
               >
                 Measure your AI readiness and unlock your growth roadmap.
               </motion.p>

               {/* Subhead 2 (Description) */}
               <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl leading-relaxed"
               >
                 Answer a few questions and get a personalized roadmap with curated free tools, frameworks, and resources tailored to your role and goals.
               </motion.p>
               
               {/* CTA */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
                 className="flex flex-col sm:flex-row gap-4 w-full justify-center"
               >
                 <button
                   onClick={() => {
                       playSelectSound();
                       setScreen('quiz');
                   }}
                   className="group relative overflow-hidden bg-gray-900 hover:bg-gray-800 text-white text-lg font-bold py-4 px-10 rounded-xl shadow-2xl hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
                 >
                   <span className="relative z-10">Check My Score</span>
                   <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                   
                   {/* Shine Effect */}
                   <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
                 </button>
               </motion.div>

               {/* Clean Feature List */}
               <motion.div 
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="flex flex-wrap justify-center gap-6 md:gap-12 mt-16 text-sm font-medium text-gray-400 uppercase tracking-wider"
               >
                   <div className="flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-green-500" />
                       <span>Takes 2 Minutes</span>
                   </div>
                   <div className="flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-green-500" />
                       <span>Free Forever</span>
                   </div>
                   <div className="flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-green-500" />
                       <span>Actionable Advice</span>
                   </div>
               </motion.div>

            </div>
          </div>
        )}

        {/* --- QUIZ SCREEN (SPLIT LAYOUT) --- */}
        {screen === 'quiz' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative h-full">
            
            {/* LEFT PANEL: Context & Text */}
            <div className="w-full md:w-5/12 lg:w-4/12 p-6 md:p-12 bg-orange-50/60 md:bg-orange-50/40 border-b md:border-b-0 md:border-r border-orange-100/50 flex flex-col md:justify-center relative z-20 shrink-0">
                <div className="mb-4 md:mb-8 flex items-center justify-between md:block">
                   {/* Enhanced Progress */}
                   <div className="flex items-center justify-between mb-2 md:mb-4 w-full">
                      <span className="text-orange-600 font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase">
                         Question {currentQIndex + 1} / {QUESTIONS.length}
                      </span>
                   </div>
                   <div className="flex gap-1.5 flex-wrap">
                       {QUESTIONS.map((_, idx) => {
                           const isCompleted = idx < currentQIndex;
                           const isCurrent = idx === currentQIndex;
                           return (
                               <motion.div 
                                  key={idx}
                                  initial={false}
                                  animate={{ 
                                      width: isCurrent ? 32 : 8,
                                      backgroundColor: isCurrent ? "#F97316" : (isCompleted ? "#FDBA74" : "#E5E7EB")
                                  }}
                                  className="h-1.5 md:h-2 rounded-full transition-all duration-300"
                               />
                           );
                       })}
                   </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-start"
                    >
                         {/* Category Badge - Hidden on very small mobile to save space, shown on larger */}
                         <div className="hidden md:inline-flex mb-6 items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-orange-100 shadow-sm">
                            {(() => {
                                const MetaIcon = QUESTION_META[currentQuestion.id]?.icon || Brain;
                                return <MetaIcon size={14} className="text-orange-500" />;
                            })()}
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                {QUESTION_META[currentQuestion.id]?.label || 'Question'}
                            </span>
                         </div>

                         {/* Title */}
                         <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight md:leading-[1.1] mb-2 md:mb-6">
                            {currentQuestion.title}
                         </h2>

                         {/* Subtitle - Collapsible/Smaller on mobile */}
                         {currentQuestion.subtitle && (
                            <p className="text-sm md:text-lg text-gray-500 font-medium leading-relaxed max-w-md hidden md:block">
                                {currentQuestion.subtitle}
                            </p>
                         )}
                         <p className="text-sm text-gray-500 md:hidden">{currentQuestion.subtitle}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* RIGHT PANEL: Inputs & Navigation (Scrollable) */}
            <div className="w-full md:w-7/12 lg:w-8/12 bg-white/40 flex flex-col relative z-10 h-full overflow-hidden">
                
                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 flex flex-col justify-start md:justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                        key={currentQIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={shakeKey ? { x: [0, -10, 10, -10, 10, 0], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-3xl mx-auto pb-20 md:pb-0" // Add padding bottom for mobile so content isn't covered by sticky nav if it overlays
                        >
                            {renderQuestion()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Navigation (Sticky Bottom of Right Panel) */}
                <div className="flex-none p-4 md:p-6 border-t border-gray-100/50 bg-white/80 backdrop-blur-md md:bg-white/60 flex justify-between items-center z-30 fixed bottom-0 left-0 right-0 md:static">
                    <button 
                        onClick={() => {
                            playSelectSound();
                            setCurrentQIndex(prev => Math.max(0, prev - 1));
                        }}
                        disabled={currentQIndex === 0}
                        className={`flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors ${currentQIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                    >
                        <ArrowLeft size={16} /> <span className="hidden sm:inline">Back</span>
                    </button>

                    <button
                        onClick={handleNext}
                        className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 active:scale-95 bg-gray-900 text-white hover:bg-orange-600 group"
                    >
                        <span>{currentQIndex === QUESTIONS.length - 1 ? 'Finish' : 'Continue'}</span>
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
          </div>
        )}

        {/* --- CALCULATING SCREEN --- */}
        {screen === 'calculating' && (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center relative overflow-hidden h-[100dvh] md:h-auto">
            {/* Animated Background Pulse */}
            <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-tr from-orange-100 via-white to-purple-100 z-0"
            />

            <div className="relative z-10 bg-white p-8 rounded-3xl shadow-2xl mb-8">
                 <div className="w-24 h-24 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin" />
                 <div className="absolute inset-0 flex items-center justify-center">
                     <Sparkles className="text-orange-500 animate-pulse" />
                 </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-3 relative z-10">Analyzing your profile</h2>
            <p className="text-gray-500 text-lg relative z-10">Gemini is crafting your personalized roadmap...</p>
          </div>
        )}

        {/* --- RESULT SCREEN --- */}
        {screen === 'result' && (
          <div className="flex-1 overflow-y-auto bg-white/50 relative custom-scrollbar h-[100dvh] md:h-auto">
            {isLocked && (
              <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-white/60 backdrop-blur-xl">
                 <LeadCaptureDialog onSubmit={handleUnlock} />
              </div>
            )}
            <div className="py-10 px-6 md:px-12">
                <ResultDashboard 
                    score={score}
                    level={level}
                    roadmap={roadmap}
                    onRetake={handleRetake}
                />
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
}

export default App;
