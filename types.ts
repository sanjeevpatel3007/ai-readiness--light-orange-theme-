
export type QuestionType =
  | 'single'
  | 'multiple'
  | 'scale'
  | 'text'
  | 'true-false'
  | 'fill-blanks';

export type QuestionUiVariant =
  | 'role-cards'
  | 'timeline'
  | 'frequency-pill-toggle'
  | 'mood-badges'
  | 'goal-grid'
  | 'challenge-cards'
  | 'chat-bubble-fill'
  | 'score-bar'
  | 'learning-tabs'
  | 'time-slider';

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: QuestionType;
  uiVariant: QuestionUiVariant;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  scaleLabels?: {
    min: string;
    max: string;
  };
  placeholder?: string;
}

export type UserAnswers = Record<string, string | string[] | number>;

export type AiLevel =
  | 'AI Beginner'
  | 'Emerging Practitioner'
  | 'Applied AI Professional'
  | 'AI Power User'
  | 'AI Multiplier';

export interface ProjectItem {
  title: string;
  description: string;
}

export interface LaunchPadWeek {
  week: string;
  title: string;
  description: string;
}

export interface GeminiRoadmap {
  roleTitle: string;
  profileSummary: string;
  currentState: string;
  progressSteps: string[];
  frameworks: string[];
  exampleProjects: ProjectItem[];
  estimatedTime: string;
  careerPath: {
    from: string;
    to: string;
    milestones: string[];
  };
  launchPadCurriculum: LaunchPadWeek[];
  summaryQuote: string;
}
