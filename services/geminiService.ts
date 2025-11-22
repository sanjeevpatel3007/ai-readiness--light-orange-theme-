
import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, GeminiRoadmap } from "../types";

// Lazy initialization to prevent crash on load if API key is missing
let ai: GoogleGenAI | null = null;

export async function generateRoadmap(
  answers: UserAnswers,
  score: number,
  level: string
): Promise<GeminiRoadmap> {
  
  const fallbackData: GeminiRoadmap = {
    roleTitle: "Professional (AI Explorer)",
    profileSummary: "You are a professional looking to upgrade your skills and leverage AI for career growth.",
    currentState: "Right now, you have solid skills and some exposure to AI tools. Your next step is to bridge the gap between your current expertise and AI-driven automation.",
    progressSteps: [
      "Automate repetitive tasks using AI",
      "Build dashboards & insights that dynamically update",
      "Experiment with AI prototypes for business processes",
      "Leverage AI tools to accelerate your workflow"
    ],
    frameworks: [
      "Automate Product Workflows with AI – streamline repetitive analysis tasks",
      "Build AI Assistants for Data Insights – create agents that summarize trends",
      "Design AI-Driven Dashboards & Analytics – integrate AI predictions",
      "Prototype AI Products – build functional mini-projects"
    ],
    exampleProjects: [
      { title: "AI Dashboard with KPI Tracking", description: "Build a dynamic dashboard using Streamlit or Excel AI that tracks key metrics." },
      { title: "Data Assistant for Insights", description: "Create an AI assistant that suggests actionable insights from raw datasets." },
      { title: "Predictive Model", description: "Prototype a model using PandasAI to forecast trends." },
      { title: "Automated Workflows", description: "Set up automation pipelines to handle repetitive reporting." }
    ],
    estimatedTime: "With professional guidance, you could build 5+ meaningful projects and see measurable career impact within 8 weeks.",
    careerPath: {
      from: "Current Professional",
      to: "AI Power User",
      milestones: [
        "Build 5+ hands-on AI projects relevant to your role",
        "Learn practical agent workflows used in top AI companies",
        "Create a portfolio that shows measurable automation outcomes",
        "Position yourself for AI Data Engineer or Automation roles"
      ]
    },
    launchPadCurriculum: [
      { week: "Week 2", title: "Build AI Assistants", description: "Create agents that generate actionable insights." },
      { week: "Week 4", title: "Automate Workflows", description: "Streamline repetitive tasks and boost efficiency." },
      { week: "Week 5", title: "Prototype AI Products", description: "Turn ideas into functional AI prototypes quickly." },
      { week: "Week 6", title: "Deploy Solutions", description: "Test, measure, and optimize AI solutions for maximum impact." }
    ],
    summaryQuote: "With your background, you are perfectly positioned to step into AI-driven automation. The next stage of your journey is hands-on — building AI agents that analyze data, generate reports, and power decision-making."
  };

  try {
    // Initialize client only when needed
    if (!ai) {
       // Safety check: If process.env.API_KEY is undefined/empty, we rely on fallback
       // This prevents the "API key required" error from crashing the app logic
       if (!process.env.API_KEY) {
         console.warn("Gemini API Key is missing. Using fallback data.");
         return fallbackData;
       }
       ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }

    const prompt = `
      Act as an elite AI Career Coach. Generate a detailed "AI Readiness Report" for this user.
      
      User Profile:
      ${JSON.stringify(answers, null, 2)}
      
      Calculated Score: ${score}/100
      Assessed Level: ${level}
      
      Your goal is to provide a structured, professional report that guides them from their current role to an AI-enhanced version of that role.
      
      Crucial Requirements:
      1. **roleTitle**: Combine their role and experience (e.g., "Data Analyst (3–4 Years Experience)").
      2. **profileSummary**: A professional summary of who they are and their ambition.
      3. **currentState**: This section is titled "Where You Are & What You Can Do Next". Explain where they are now and what they need to do next to bridge the gap to AI.
      4. **progressSteps**: A list of actionable next steps (e.g., "Start automating repetitive data tasks", "Build dashboards").
      5. **frameworks**: A list of "Frameworks & Tools to Supercharge Your Growth". Include brief descriptions (e.g., "Automate Product Workflows with AI – streamline repetitive analysis tasks").
      6. **exampleProjects**: 4 specific, high-value projects they should build. Title and Description.
      7. **estimatedTime**: e.g., "With professional guidance, you could build 5+ meaningful projects... within 8 weeks".
      8. **careerPath**: Define a path from their current role to a future AI role.
         - from: Current Role
         - to: Target AI Role
         - milestones: 4 checklist items (e.g., "Build 5+ hands-on AI projects", "Learn practical agent workflows").
      9. **launchPadCurriculum**: Create a 6-8 week learning path (Weeks 1, 2, 4, 5, 6) focusing on specific skills like "Automate Workflows", "Build Assistants", "Dashboards", "Prototyping".
      10. **summaryQuote**: A final motivating summary paragraph.
      
      Tone: Professional, encouraging, authoritative, and highly actionable.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional AI Career Strategy expert.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            roleTitle: { type: Type.STRING },
            profileSummary: { type: Type.STRING },
            currentState: { type: Type.STRING, description: "Section: Where You Are & What You Can Do Next" },
            progressSteps: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }, 
              description: "List of bullet points for 'Here is how you can progress'" 
            },
            frameworks: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }, 
              description: "List of Frameworks & Tools to Supercharge Growth" 
            },
            exampleProjects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            estimatedTime: { type: Type.STRING, description: "e.g., 6-8 weeks" },
            careerPath: {
              type: Type.OBJECT,
              properties: {
                from: { type: Type.STRING, description: "Current Role" },
                to: { type: Type.STRING, description: "Target AI Role" },
                milestones: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            launchPadCurriculum: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  week: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              }
            },
            summaryQuote: { type: Type.STRING, description: "A final motivating summary paragraph." }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text returned from Gemini");
    return JSON.parse(text) as GeminiRoadmap;

  } catch (error) {
    console.error("Gemini API Error (using fallback):", error);
    return fallbackData;
  }
}
