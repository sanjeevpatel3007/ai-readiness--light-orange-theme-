
import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, GeminiRoadmap } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateRoadmap(
  answers: UserAnswers,
  score: number,
  level: string
): Promise<GeminiRoadmap> {
  
  const prompt = `
    Act as an elite AI Career Coach. Generate a detailed "AI Readiness Report" for this user.
    
    User Profile:
    ${JSON.stringify(answers, null, 2)}
    
    Calculated Score: ${score}/100
    Assessed Level: ${level}
    
    Your goal is to provide a structured, professional report that guides them from their current role to an AI-enhanced version of that role.
    
    Crucial Requirements:
    1. **roleTitle**: Combine their role and experience (e.g., "Data Analyst (3-4 Years Experience)").
    2. **profileSummary**: A professional summary of who they are and their ambition.
    3. **currentState**: Explain where they are now and what they need to do next to bridge the gap to AI.
    4. **careerPath**: Define a path from their current role (e.g., "Data Analyst") to a future AI role (e.g., "AI Automation Specialist") with 4 milestones.
    5. **launchPadCurriculum**: Create a 6-8 week learning path (Weeks 1, 2, 4, 5, 6) focusing on specific skills like "Automate Workflows", "Build Assistants", "Dashboards", "Prototyping".
    6. **exampleProjects**: 4 specific, high-value projects they should build.
    
    Tone: Professional, encouraging, authoritative, and highly actionable.
  `;

  try {
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
    console.error("Gemini API Error:", error);
    // Fallback data
    return {
      roleTitle: "Professional (AI Explorer)",
      profileSummary: "You are a professional looking to upgrade your skills and leverage AI for career growth.",
      currentState: "You have a solid foundation but need to bridge the gap between your current expertise and AI-driven automation.",
      progressSteps: [
        "Automate repetitive tasks using AI",
        "Build dashboards & insights that dynamically update",
        "Experiment with AI prototypes"
      ],
      frameworks: [
        "Automate Workflows with AI",
        "Build AI Assistants",
        "Design AI-Driven Dashboards"
      ],
      exampleProjects: [
        { title: "AI Dashboard", description: "Build a dynamic dashboard that tracks key metrics automatically." },
        { title: "Data Assistant", description: "Create an AI assistant that suggests actionable insights." },
        { title: "Predictive Model", description: "Prototype a model to forecast trends." },
        { title: "Automated Workflows", description: "Set up automation pipelines for reporting." }
      ],
      estimatedTime: "With professional guidance, you could build 5+ meaningful projects in 8 weeks.",
      careerPath: {
        from: "Current Professional",
        to: "AI Power User",
        milestones: [
          "Build AI dashboards",
          "Learn agent workflows",
          "Create automation portfolio",
          "Position for AI roles"
        ]
      },
      launchPadCurriculum: [
        { week: "Week 2", title: "Build AI Assistants", description: "Create agents that generate actionable insights." },
        { week: "Week 4", title: "Automate Workflows", description: "Streamline repetitive tasks and boost efficiency." },
        { week: "Week 5", title: "Prototype AI Products", description: "Turn ideas into functional AI prototypes quickly." },
        { week: "Week 6", title: "Deploy Solutions", description: "Test, measure, and optimize AI solutions." }
      ],
      summaryQuote: "With your background, you are perfectly positioned to step into AI-driven automation. The next stage is hands-on building."
    };
  }
}
