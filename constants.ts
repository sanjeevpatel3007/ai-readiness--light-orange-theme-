import { Question } from './types';

export const APP_NAME = "AI Readiness Accelerator";
export const ACCENT_COLOR = "#F97316"; // Orange-500

export const QUESTIONS: Question[] = [
  {
    id: 'role',
    title: 'Which best describes your current role?',
    subtitle: 'Select your identity to personalize your AI roadmap.',
    type: 'single',
    uiVariant: 'role-cards',
    options: [
      { id: 'product',   label: 'Product Manager', value: 'product', icon: 'Box' },
      { id: 'developer', label: 'Developer / Engineer', value: 'developer', icon: 'Code' },
      { id: 'founder',   label: 'Startup Founder', value: 'founder', icon: 'Rocket' },
      { id: 'business',  label: 'Business / Ops', value: 'business', icon: 'Briefcase' },
      { id: 'creative',  label: 'Creative / Design', value: 'creative', icon: 'Palette' },
      { id: 'marketing', label: 'Marketing', value: 'marketing', icon: 'Megaphone' },
      { id: 'other',     label: 'Other Professional', value: 'other', icon: 'User' }
    ]
  },
  {
    id: 'experience',
    title: 'How many years of working experience do you have?',
    subtitle: 'This helps us gauge your professional context.',
    type: 'single',
    uiVariant: 'timeline',
    options: [
      { id: 'intern', label: 'Internship / Student', value: 'intern', icon: 'GraduationCap' },
      { id: '0-1', label: '0–1 year', value: '0-1', icon: 'Sprout' },
      { id: '2-4', label: '2–4 years', value: '2-4', icon: 'Briefcase' },
      { id: '5-7', label: '5–7 years', value: '5-7', icon: 'Trophy' },
      { id: '8-10', label: '8–10 years', value: '8-10', icon: 'Medal' },
      { id: '11-15', label: '11–15 years', value: '11-15', icon: 'Star' },
      { id: '16-20', label: '16–20 years', value: '16-20', icon: 'Crown' },
      { id: '20+', label: '20+ years', value: '20+', icon: 'Mountain' }
    ]
  },
  {
    id: 'ai-usage',
    title: 'How often do you currently use AI tools?',
    subtitle: 'Think ChatGPT, Gemini, Claude, Copilot, etc.',
    type: 'single',
    uiVariant: 'frequency-pill-toggle',
    options: [
      { id: 'never', label: 'Never or rarely', value: 'never', icon: 'BatteryLow' },
      { id: 'monthly', label: 'Monthly', value: 'monthly', icon: 'BatteryMedium' },
      { id: 'weekly', label: 'Weekly', value: 'weekly', icon: 'Battery' },
      { id: 'daily', label: 'Daily', value: 'daily', icon: 'Zap' },
      { id: 'multiple', label: 'Multiple times daily', value: 'multiple', icon: 'Flame' }
    ]
  },
  {
    id: 'ai-perspective',
    title: "What's your honest take on AI right now?",
    subtitle: 'Pick all that apply.',
    type: 'multiple',
    uiVariant: 'mood-badges',
    options: [
      { id: 'excited', label: 'Excited & ready', value: 'excited', icon: 'Smile' }, // Using icon key for emoji mapping or lucide
      { id: 'curious', label: 'Curious but cautious', value: 'curious', icon: 'Search' },
      { id: 'overwhelmed', label: 'Overwhelmed', value: 'overwhelmed', icon: 'CloudRain' },
      { id: 'skeptical', label: 'Skeptical', value: 'skeptical', icon: 'HelpCircle' },
      { id: 'falling-behind', label: 'Feel behind', value: 'falling-behind', icon: 'Clock' }
    ]
  },
  {
    id: 'main-goal',
    title: 'What is your main goal with AI?',
    subtitle: 'Select all outcomes you want.',
    type: 'multiple',
    uiVariant: 'goal-grid',
    options: [
      { id: 'financial', label: 'Gain financial skills', value: 'financial', icon: 'DollarSign' },
      { id: 'projects', label: 'Build personal projects', value: 'projects', icon: 'Hammer' },
      { id: 'growth', label: 'Professional growth', value: 'growth', icon: 'TrendingUp' },
      { id: 'future', label: 'Plan for my future', value: 'future', icon: 'Map' },
      { id: 'improvement', label: 'Self-Improvement', value: 'improvement', icon: 'Sparkles' }
    ]
  },
  {
    id: 'challenges',
    title: 'What are your biggest challenges with AI?',
    subtitle: 'Identify what is blocking your path.',
    type: 'multiple',
    uiVariant: 'challenge-cards',
    options: [
      { id: 'start', label: "Don't know where to start", value: 'start', icon: 'Compass' },
      { id: 'technical', label: 'Too technical', value: 'technical', icon: 'Cpu' },
      { id: 'time', label: 'No time to learn', value: 'time', icon: 'Hourglass' },
      { id: 'use-cases', label: 'No use-case clarity', value: 'use-cases', icon: 'Search' },
      { id: 'stuck', label: "Tried before, didn’t stick", value: 'stuck', icon: 'RefreshCw' }
    ]
  },
  {
    id: 'ai-solution',
    title: 'If you could build ONE AI solution tomorrow, what would it do?',
    subtitle: 'Dream big. What problem would it solve?',
    type: 'text',
    uiVariant: 'chat-bubble-fill',
    placeholder: 'E.g. “An assistant that writes client emails for me...”'
  },
  {
    id: 'ai-skills',
    title: 'Rate your current AI skills',
    subtitle: 'Your AI journey starts here.',
    type: 'scale',
    uiVariant: 'score-bar',
    min: 0,
    max: 10,
    scaleLabels: {
      min: 'Beginner',
      max: 'Expert'
    }
  },
  {
    id: 'learning-style',
    title: 'How do you learn best?',
    subtitle: 'Choose what resonates.',
    type: 'single',
    uiVariant: 'learning-tabs',
    options: [
      { id: 'hands-on', label: 'Learn by building', value: 'hands-on', icon: 'Hammer' },
      { id: 'structured', label: 'Structured lessons', value: 'structured', icon: 'BookOpen' },
      { id: 'mentorship', label: 'With others / mentorship', value: 'mentorship', icon: 'Users' },
      { id: 'self-paced', label: 'Self-paced videos', value: 'self-paced', icon: 'MonitorPlay' }
    ]
  },
  {
    id: 'time-commitment',
    title: 'How much time can you commit per week?',
    subtitle: 'Your roadmap adapts to your schedule.',
    type: 'single',
    uiVariant: 'time-slider',
    options: [
      { id: '2-3', label: '2–3 hours', value: '2-3', icon: 'Coffee' },
      { id: '4-6', label: '4–6 hours', value: '4-6', icon: 'Clock' },
      { id: '7-10', label: '7–10 hours', value: '7-10', icon: 'Calendar' },
      { id: '10+', label: '10+ hours', value: '10+', icon: 'Rocket' }
    ]
  }
];