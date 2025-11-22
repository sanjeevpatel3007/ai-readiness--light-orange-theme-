import React from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, AlertCircle, Zap, Sparkles } from 'lucide-react';

export const LevelUpParticles = () => {
  // Generate random particles with mixed shapes
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // -50% to 50% relative to center
    y: Math.random() * -50 - 20, // Start slightly above
    rotation: Math.random() * 360,
    scale: Math.random() * 0.6 + 0.4,
    color: ['#F97316', '#FDBA74', '#FFD700', '#34D399', '#38BDF8', '#F472B6'][Math.floor(Math.random() * 6)],
    delay: Math.random() * 0.3,
    type: Math.random() > 0.6 ? 'star' : Math.random() > 0.5 ? 'circle' : 'square'
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{ 
            x: `${p.x}vw`, 
            y: `${p.y}vh`, 
            opacity: 0, 
            scale: p.scale, 
            rotate: p.rotation + 720 
          }}
          transition={{ duration: 1.5, ease: "easeOut", delay: p.delay }}
          className="absolute"
        >
          {p.type === 'star' ? (
             <Star fill={p.color} stroke="none" size={24} />
          ) : p.type === 'circle' ? (
             <div className="w-4 h-4 rounded-full" style={{ backgroundColor: p.color }} />
          ) : (
             <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.color }} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export const EncouragementToast: React.FC<{ message: string; type?: 'error' | 'info' }> = ({ message, type = 'info' }) => {
  // 'info' is for coaching (e.g. "Think harder"), 'error' is for validation (e.g. "Required")
  const isError = type === 'error';

  return (
    <div className="absolute bottom-32 left-0 right-0 flex justify-center pointer-events-none z-[100] px-4">
        <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border backdrop-blur-md max-w-md w-full md:w-auto ${
            isError 
            ? 'bg-white/95 border-red-200 text-red-600' 
            : 'bg-white/95 border-blue-200 text-blue-700'
        }`}
        >
        <div className={`p-2 rounded-full ${isError ? 'bg-red-100' : 'bg-blue-100'}`}>
            {isError ? (
                <AlertCircle size={20} className="text-red-500" />
            ) : (
                <Sparkles size={20} className="text-blue-500" />
            )}
        </div>
        <div className="flex-1">
            <p className="font-bold text-sm md:text-base leading-tight">{message}</p>
            {!isError && <p className="text-xs opacity-70 mt-1">Give it another shot!</p>}
        </div>
        </motion.div>
    </div>
  );
};