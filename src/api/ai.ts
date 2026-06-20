import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { styleDNA, generatedBlueprint, generationExamples } from "../lib/mock-data";
import { config } from "dotenv";

config(); // Load .env file explicitly into process.env

// Initialize AI SDK with Google provider (if API key is present)
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
const google = apiKey ? createGoogleGenerativeAI({ apiKey }) : null;

/**
 * Dual-Mode AI Generation
 * Uses real LLM if API key is present, otherwise falls back to highly realistic simulated responses.
 */
export async function generateDualMode(prompt: string | any[], systemContext: string, mode: "persona" | "content"): Promise<string> {
  if (google) {
    console.log(`[MIRROR AI] Using REAL Gemini API for ${mode} generation`);
    try {
      const options: any = {
        model: google("gemini-2.5-flash"),
        system: systemContext,
      };
      if (typeof prompt === "string") {
        options.prompt = prompt;
      } else {
        options.messages = prompt;
      }
      const { text } = await generateText(options);
      return text;
    } catch (e) {
      console.error("[MIRROR AI] Real AI Generation failed, falling back to simulation", e);
    }
  } else {
    console.log(`[MIRROR AI] Using SIMULATED AI for ${mode} generation (No API key found)`);
  }

  // Simulated AI mode (Zero-setup Hackathon Demo)
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (mode === "persona") {
    // Return a realistic JSON representing the generated Style DNA
    return JSON.stringify({
      tone: "Authoritative, stoic, slightly urgent",
      hookPattern: "Negative Shift — Start with a widely accepted belief → instantly contradict it",
      ctaStyle: "Direct imperative with urgency",
      storytellingFramework: "Problem → Personal anecdote → Framework → CTA",
      keywords: ["Discipline", "Friction", "Architecture", "Momentum", "Clarity"],
    });
  }

  if (mode === "content") {
    // If it's a specific platform from our mock data, return the realistic mirror output
    const promptStr = typeof prompt === "string" ? prompt : JSON.stringify(prompt);
    const platformMatch = promptStr.match(/linkedin|twitter|x|instagram/i)?.[0]?.toLowerCase();
    
    if (platformMatch && platformMatch.includes("linkedin")) {
      return generationExamples.linkedin.mirrorOutput;
    }
    if (platformMatch && platformMatch.includes("twitter") || platformMatch && platformMatch.includes("x")) {
      return generationExamples.twitter.mirrorOutput;
    }
    if (platformMatch && platformMatch.includes("instagram")) {
      return generationExamples.instagram.mirrorOutput;
    }

    // Generic simulated output using the Style DNA
    return `You don't need motivation.\n\nEvery creator who's ever built something real will tell you the same thing — motivation is a trap. It comes and goes like weather.\n\nWhat you need is architecture.\n\nA system so embedded in your day that consistency becomes invisible. Not a grind. Not discipline theater. Just... how you operate.\n\nBuild the system. The results will follow.\n\nStart today. Not tomorrow. Today.`;
  }

  return "Generated content unavailable.";
}
