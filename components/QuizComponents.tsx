import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types';
import { 
  Briefcase, Code, Rocket, Palette, Megaphone, User, Box,
  CheckCircle, Circle, Star, Zap, AlertCircle, Clock, Target,
  GraduationCap, Sprout, Trophy, Medal, Crown, Mountain, 
  BatteryLow, BatteryMedium, Battery, Flame,
  Smile, Search, CloudRain, HelpCircle,
  DollarSign, Hammer, TrendingUp, Map, Sparkles,
  Compass, Cpu, Hourglass, RefreshCw,
  BookOpen, Users, MonitorPlay,
  Coffee, Calendar, CheckCircle2
} from 'lucide-react';

interface BaseProps {
  question: Question;
  value: any;
  onChange: (val: any) => void;
}

const Icons: Record<string, any> = {
  Briefcase, Code, Rocket, Palette, Megaphone, User, Box, Zap, Clock, Target,
  GraduationCap, Sprout, Trophy, Medal, Crown, Mountain, Star,
  BatteryLow, BatteryMedium, Battery, Flame,
  Smile, Search, CloudRain, HelpCircle,
  DollarSign, Hammer, TrendingUp, Map, Sparkles,
  Compass, Cpu, Hourglass, RefreshCw,
  BookOpen, Users, MonitorPlay,
  Coffee, Calendar, CheckCircle, Circle, AlertCircle
};

// --- Helper: Background Patterns ---
const DotPattern = ({ color = "currentColor", opacity = 0.1 }) => (
  <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity }}>
    <svg width="100%" height="100%" fill="none">
      <pattern id="dot-pattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill={color} />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dot-pattern)" />
    </svg>
  </div>
);

const StripePattern = ({ color = "currentColor", opacity = 0.05 }) => (
  <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity }}>
    <svg width="100%" height="100%" fill="none">
      <pattern id="stripe-pattern" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="10" stroke={color} strokeWidth="2" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#stripe-pattern)" />
    </svg>
  </div>
);

// --- 1. Role Cards ---
export const RoleCards: React.FC<BaseProps> = ({ question, value, onChange }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {question.options?.map((opt) => {
        const Icon = opt.icon ? Icons[opt.icon] : User;
        const isSelected = value === opt.value;

        return (
          <motion.button
            key={opt.id}
            onClick={() => onChange(opt.value)}
            whileHover={{ scale: 1.03, y: -4, boxShadow: "0 15px 30px -10px rgba(249, 115, 22, 0.15)" }}
            whileTap={{ scale: 0.97 }}
            animate={{
              backgroundColor: isSelected ? "#FFF7ED" : "#FFFFFF",
              borderColor: isSelected ? "#F97316" : "rgba(229, 231, 235, 0.6)",
              borderWidth: isSelected ? "2px" : "1px",
              boxShadow: isSelected ? "0 15px 35px -10px rgba(249, 115, 22, 0.2)" : "0 4px 12px -2px rgba(0,0,0,0.03)"
            }}
            className="relative flex flex-col items-center justify-center p-6 rounded-2xl border min-h-[160px] transition-all group overflow-hidden"
          >
            {isSelected && <DotPattern color="#F97316" opacity={0.1} />}

            <motion.div 
              className="z-10 mb-4 p-4 rounded-2xl shadow-sm border border-gray-50/50"
              animate={{ 
                backgroundColor: isSelected ? "#F97316" : "#F9FAFB",
                color: isSelected ? "#FFFFFF" : "#9CA3AF",
                scale: isSelected ? 1.1 : 1
              }}
            >
              <Icon size={28} strokeWidth={2} />
            </motion.div>
            
            <span className={`z-10 text-sm font-bold text-center leading-snug px-2 ${isSelected ? 'text-orange-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
              {opt.label}
            </span>
            
            {isSelected && (
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 z-10"
              >
                <CheckCircle size={18} className="text-orange-500" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

// --- 2. Timeline ---
export const Timeline: React.FC<BaseProps> = ({ question, value, onChange }) => {
  const options = question.options || [];
  const currentIndex = options.findIndex(o => o.value === value);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {options.map((opt, idx) => {
             const isSelected = value === opt.value;
             const isPast = currentIndex >= 0 && idx <= currentIndex;
             const Icon = opt.icon ? Icons[opt.icon] : Circle;

             return (
               <motion.button
                  key={opt.id}
                  onClick={() => onChange(opt.value)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ 
                    backgroundColor: isSelected ? "#FFF7ED" : (isPast ? "#FFFAF0" : "#FFFFFF"),
                    borderColor: isSelected ? "#F97316" : (isPast ? "#FED7AA" : "#E5E7EB"),
                    borderWidth: isSelected ? "2px" : "1px",
                    boxShadow: isSelected ? "0 12px 24px -6px rgba(249, 115, 22, 0.2)" : "0 2px 8px rgba(0,0,0,0.03)"
                  }}
                  className="relative flex flex-col items-center p-5 rounded-2xl border min-h-[140px] justify-between overflow-hidden"
               >
                  {isSelected && <DotPattern color="#FB923C" opacity={0.1} />}

                  <div className="flex items-center justify-center w-full mb-2 z-10">
                    <motion.div
                      className={`p-3 rounded-full shadow-sm transition-colors duration-300`}
                      animate={{ 
                        backgroundColor: isSelected ? "#F97316" : (isPast ? "#FFF7ED" : "#F9FAFB"),
                        color: isSelected ? "#FFFFFF" : (isPast ? "#F97316" : "#9CA3AF")
                      }}
                    >
                       <Icon size={24} strokeWidth={isSelected ? 2.5 : 2} />
                    </motion.div>
                  </div>
                  
                  <span className={`z-10 text-sm font-extrabold uppercase tracking-tight text-center leading-tight ${isSelected ? 'text-orange-900' : 'text-gray-500'}`}>
                    {opt.label}
                  </span>

                  <div className={`absolute top-2 right-3 text-[10px] font-bold ${isSelected ? 'text-orange-400' : 'text-gray-200'}`}>
                    0{idx + 1}
                  </div>
               </motion.button>
             );
        })}
    </div>
  );
};

// --- 3. Frequency Pills ---
export const FrequencyPills: React.FC<BaseProps> = ({ question, value, onChange }) => {
  const options = question.options || [];
  const selectedIndex = options.findIndex(o => o.value === value);
  
  return (
    <div className="flex flex-col items-center justify-center py-6 w-full">
      <div className="flex items-end justify-center gap-3 w-full h-56 px-4 pb-4 relative">
            {/* Base Line */}
            <div className="absolute bottom-4 left-0 right-0 h-px bg-gray-100 rounded-full" />

            {options.map((opt, idx) => {
               const isCurrent = idx === selectedIndex;
               const isActive = selectedIndex >= 0 && idx <= selectedIndex;
               const heightPercent = 30 + (idx * 15);
               
               return (
                 <motion.button
                   key={opt.id}
                   onClick={() => onChange(opt.value)}
                   initial={{ height: "20%" }}
                   animate={{ 
                     height: `${heightPercent}%`,
                     backgroundColor: isCurrent ? "#F97316" : (isActive ? "#FDBA74" : "#F3F4F6"),
                   }}
                   whileHover={{ scaleY: 1.05, scaleX: 1.05 }}
                   className={`flex-1 rounded-2xl min-w-[12%] relative group border border-white/60 shadow-sm transition-all ${isCurrent ? 'z-10 shadow-xl shadow-orange-500/30' : 'z-0 hover:bg-gray-100'}`}
                 >
                    {isCurrent && (
                       <motion.div 
                         initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                         className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-lg whitespace-nowrap shadow-lg shadow-orange-900/10"
                       >
                         {opt.label}
                         <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                       </motion.div>
                    )}
                 </motion.button>
               );
            })}
      </div>
      
      <motion.div 
        key={value}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 text-center"
      >
         <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Selected Frequency</div>
         <div className="text-3xl font-black text-gray-900">
            {options.find(o => o.value === value)?.label || "..."}
         </div>
      </motion.div>
    </div>
  );
};

// --- 4. Mood Badges ---
export const MoodBadges: React.FC<BaseProps> = ({ question, value, onChange }) => {
  const selected = (value as string[]) || [];
  
  const toggle = (val: string) => {
    if (selected.includes(val)) onChange(selected.filter(v => v !== val));
    else onChange([...selected, val]);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 w-full px-4">
      {question.options?.map((opt) => {
        const isActive = selected.includes(opt.value);
        const Icon = opt.icon ? Icons[opt.icon] : Smile;

        return (
          <motion.button
            key={opt.id}
            onClick={() => toggle(opt.value)}
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0 8px 20px -6px rgba(249, 115, 22, 0.15)" }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundColor: isActive ? "#FFF7ED" : "#FFFFFF",
              borderColor: isActive ? "#F97316" : "#F3F4F6",
              scale: isActive ? 1.05 : 1,
              boxShadow: isActive ? "0 8px 25px -8px rgba(249, 115, 22, 0.25)" : "0 4px 8px -4px rgba(0,0,0,0.03)"
            }}
            className="flex items-center gap-3 px-6 py-4 rounded-full border-2 transition-all"
          >
            <div className={`p-1.5 rounded-full ${isActive ? 'bg-orange-100' : 'bg-gray-50'}`}>
                <Icon size={20} className={isActive ? 'text-orange-600' : 'text-gray-400'} strokeWidth={2.5} />
            </div>
            <span className={`font-bold text-base ${isActive ? 'text-orange-900' : 'text-gray-600'}`}>{opt.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

// --- 5. Goal Grid ---
export const GoalGrid: React.FC<BaseProps> = ({ question, value, onChange }) => {
  const selected = (value as string[]) || [];
  const toggle = (val: string) => {
    if (selected.includes(val)) onChange(selected.filter(v => v !== val));
    else onChange([...selected, val]);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {question.options?.map((opt) => {
        const isActive = selected.includes(opt.value);
        const Icon = opt.icon ? Icons[opt.icon] : Target;

        return (
          <motion.button
            key={opt.id}
            onClick={() => toggle(opt.value)}
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              backgroundColor: isActive ? "#1F2937" : "#FFFFFF",
              borderColor: isActive ? "#1F2937" : "#E5E7EB",
              color: isActive ? "#FFFFFF" : "#374151",
              boxShadow: isActive ? "0 20px 40px -10px rgba(0,0,0,0.2)" : "0 4px 10px -2px rgba(0,0,0,0.03)"
            }}
            className="relative p-6 rounded-2xl border text-left overflow-hidden h-40 flex flex-col justify-between group transition-colors"
          >
            <div className="flex justify-between items-start z-10">
              <Icon size={32} className={isActive ? 'text-orange-400' : 'text-gray-300 group-hover:text-gray-500'} />
              <motion.div 
                 initial={false} 
                 animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
              >
                <CheckCircle2 size={24} className="text-green-400" />
              </motion.div>
            </div>
            <span className="font-bold text-lg leading-tight block relative z-10">{opt.label}</span>
            
            {isActive && (
               <Icon size={120} className="absolute -bottom-6 -right-6 text-white/5 pointer-events-none rotate-12" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

// --- 6. Challenge Cards ---
export const ChallengeCards: React.FC<BaseProps> = ({ question, value, onChange }) => {
  const selected = (value as string[]) || [];
  const toggle = (val: string) => {
    if (selected.includes(val)) onChange(selected.filter(v => v !== val));
    else onChange([...selected, val]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {question.options?.map((opt) => {
        const isActive = selected.includes(opt.value);
        const Icon = opt.icon ? Icons[opt.icon] : AlertCircle;

        return (
          <motion.button
            key={opt.id}
            onClick={() => toggle(opt.value)}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              backgroundColor: isActive ? "#FEF2F2" : "#FFFFFF",
              borderColor: isActive ? "#F87171" : "#F3F4F6",
              borderLeftWidth: isActive ? "8px" : "1px",
              boxShadow: isActive ? "0 12px 24px -8px rgba(239, 68, 68, 0.2)" : "0 2px 6px rgba(0,0,0,0.02)"
            }}
            className="relative flex items-center p-5 rounded-xl border transition-all text-left overflow-hidden group min-h-[90px]"
          >
            {isActive && <StripePattern color="#FECACA" opacity={0.2} />}

            <div className={`relative z-10 mr-5 p-3 rounded-full transition-colors ${isActive ? 'bg-red-100 text-red-600' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
               <Icon size={24} />
            </div>
            
            <div className="flex-1 relative z-10">
                <span className={`block font-bold text-base ${isActive ? 'text-red-900' : 'text-gray-700'}`}>
                    {opt.label}
                </span>
            </div>
            
            {isActive && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative z-10">
                    <AlertCircle size={20} className="text-red-500 ml-2" />
                </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

// --- 7. Chat Input (Redesigned) ---
export const ChatFillInput: React.FC<BaseProps> = ({ question, value, onChange }) => (
  <div className="w-full max-w-2xl mx-auto relative">
    {/* Decorative Background Element */}
    <div className="absolute inset-0 -z-10 transform translate-x-4 translate-y-4 bg-orange-100 rounded-3xl opacity-50" />
    
    <motion.div 
      className="relative bg-white rounded-3xl shadow-xl shadow-orange-900/5 border border-gray-100 overflow-hidden"
      whileFocus={{ scale: 1.005, boxShadow: "0 20px 40px -10px rgba(249, 115, 22, 0.15)" }}
    >
       {/* SVG Background Pattern */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg width="100%" height="100%">
             <pattern id="chat-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M1 1h2v2H1z" fill="currentColor" />
             </pattern>
             <rect width="100%" height="100%" fill="url(#chat-grid)" />
          </svg>
       </div>

       <div className="p-6 md:p-8">
          <textarea
             className="w-full bg-transparent outline-none text-xl text-gray-800 placeholder-gray-300 font-medium leading-relaxed resize-none min-h-[200px] relative z-10"
             placeholder={question.placeholder}
             value={value || ''}
             onChange={(e) => onChange(e.target.value)}
             autoFocus
           />
       </div>

       {/* Footer Bar */}
       <div className="bg-gray-50/50 border-t border-gray-100 px-6 py-3 flex justify-between items-center">
           <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
             <Sparkles size={14} className="text-orange-400" /> 
             <span>Be specific for best results</span>
           </div>
           <motion.span 
             className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${value?.length > 10 ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}
             animate={{ scale: value?.length > 10 ? 1.05 : 1 }}
           >
             {value?.length || 0} chars
           </motion.span>
       </div>
    </motion.div>
  </div>
);

// --- 8. Score Slider ---
export const ScoreBarSlider: React.FC<BaseProps> = ({ question, value, onChange }) => {
  const val = (value as number) || 0;
  return (
    <div className="w-full py-12 px-8 bg-white rounded-3xl shadow-lg shadow-gray-100/50 border border-gray-100">
       <div className="relative h-10 bg-gray-100 rounded-full cursor-pointer group shadow-inner">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
            animate={{ width: `${val * 10}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
          
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={val}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
          
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.1)] border-4 border-orange-500 flex items-center justify-center pointer-events-none z-10"
            animate={{ left: `calc(${val * 10}% - 40px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <span className="text-3xl font-black text-orange-600">{val}</span>
          </motion.div>
       </div>
       
       <div className="flex justify-between mt-16 text-sm font-bold text-gray-400 uppercase tracking-widest px-2">
          <span className="flex items-center gap-2"><Star size={16} className="text-orange-300"/> Beginner</span>
          <span className="flex items-center gap-2">Expert <Crown size={16} className="text-orange-500"/></span>
       </div>
    </div>
  );
};

// --- 9. Learning Tabs ---
export const LearningTabs: React.FC<BaseProps> = ({ question, value, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {question.options?.map((opt) => {
        const Icon = opt.icon ? Icons[opt.icon] : BookOpen;
        const isSelected = value === opt.value;
        
        return (
          <motion.button
            key={opt.id}
            onClick={() => onChange(opt.value)}
            whileHover={{ scale: 1.02, y: -2, boxShadow: "0 12px 24px -8px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            animate={{
              backgroundColor: isSelected ? "#1F2937" : "#FFFFFF",
              borderColor: isSelected ? "#1F2937" : "#F3F4F6",
              color: isSelected ? "#FFFFFF" : "#374151",
              scale: isSelected ? 1.02 : 1
            }}
            className="flex items-center p-6 rounded-2xl border shadow-sm transition-all gap-5 text-left"
          >
             <motion.div 
               className={`p-3 rounded-xl flex-shrink-0`}
               animate={{ 
                 backgroundColor: isSelected ? "rgba(255,255,255,0.15)" : "#F9FAFB",
                 color: isSelected ? "#FDBA74" : "#9CA3AF"
               }}
             >
               <Icon size={28} />
             </motion.div>
             <div className="font-bold text-lg leading-snug">{opt.label}</div>
          </motion.button>
        );
      })}
    </div>
  );
};

// --- 10. Time Slider ---
export const TimeSlider: React.FC<BaseProps> = ({ question, value, onChange }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full items-end min-h-[280px] pb-4">
     {question.options?.map((opt, idx) => {
        const isSelected = value === opt.value;
        const heightClass = idx === 0 ? 'h-40' : idx === 1 ? 'h-48' : idx === 2 ? 'h-56' : 'h-64';
        
        return (
          <motion.button
            key={opt.id}
            onClick={() => onChange(opt.value)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              backgroundColor: isSelected ? "#F97316" : "#FFFFFF",
              borderColor: isSelected ? "#EA580C" : "#E5E7EB",
              color: isSelected ? "#FFFFFF" : "#4B5563",
              scale: isSelected ? 1.05 : 1,
              zIndex: isSelected ? 10 : 1,
              boxShadow: isSelected ? "0 25px 50px -12px rgba(249, 115, 22, 0.3)" : "0 4px 12px -2px rgba(0,0,0,0.03)"
            }}
            className={`${heightClass} w-full rounded-2xl border-2 flex flex-col justify-between items-center p-5 transition-all relative overflow-hidden`}
          >
             {isSelected && <StripePattern color="#FFFFFF" opacity={0.1} />}
             
             <div className="flex-1 flex items-center justify-center relative z-10">
                <Clock size={32} className={isSelected ? "text-white" : "text-orange-100"} strokeWidth={isSelected ? 2 : 1.5} />
             </div>
             <span className="font-bold text-lg relative z-10">{opt.label}</span>
          </motion.button>
        )
     })}
  </div>
);