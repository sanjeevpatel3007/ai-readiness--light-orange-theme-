import { UserAnswers, AiLevel } from '../types';

function scoreAiUsage(value: string): number {
  switch (value) {
    case 'never': return 5;
    case 'monthly': return 15;
    case 'weekly': return 30;
    case 'daily': return 45;
    case 'multiple': return 55;
    default: return 0;
  }
}

function scoreAiSkills(v: number): number {
  const clamped = Math.max(0, Math.min(10, v));
  return clamped * 4;
}

function scorePerspective(arr: string[]): number {
  let base = 10;
  if (arr.includes('excited')) base += 10;
  if (arr.includes('curious')) base += 5;
  if (arr.includes('falling-behind')) base += 5;
  if (arr.includes('overwhelmed')) base -= 5;
  if (arr.includes('skeptical')) base -= 5;
  return Math.max(0, Math.min(30, base));
}

function penaltyChallenges(arr: string[]): number {
  return Math.min(20, arr.length * 3);
}

export function computeAiScore(ans: UserAnswers): number {
  const usage = scoreAiUsage((ans['ai-usage'] as string) || 'never');
  const skill = scoreAiSkills((ans['ai-skills'] as number) || 0);
  
  const perspectiveVal = ans['ai-perspective'];
  const perspectiveArr = Array.isArray(perspectiveVal) ? perspectiveVal as string[] : [];
  const perspective = scorePerspective(perspectiveArr);
  
  const challengesVal = ans['challenges'];
  const challengesArr = Array.isArray(challengesVal) ? challengesVal as string[] : [];
  const penalty = penaltyChallenges(challengesArr);

  let raw = usage + skill + perspective - penalty;
  return Math.round(Math.max(0, Math.min(100, raw)));
}

export function getAiLevel(score: number): AiLevel {
  if (score < 25) return 'AI Beginner';
  if (score < 45) return 'Emerging Practitioner';
  if (score < 65) return 'Applied AI Professional';
  if (score < 85) return 'AI Power User';
  return 'AI Multiplier';
}
