import { createServerFn } from "@tanstack/react-start";
import { db, personas } from "../db/index";
import { eq } from "drizzle-orm";
import { generateDualMode } from "./ai";
import crypto from "crypto";

export const getPersonaFn = createServerFn({ method: "GET" }).handler(async () => {
  // Hardcoded 'user_1' for MVP simplicity
  const userPersona = db.select().from(personas).where(eq(personas.userId, "user_1")).get();
  
  if (!userPersona) return null;

  return {
    ...userPersona,
    keywords: JSON.parse(userPersona.keywords),
  };
});

export const generatePersonaFn = createServerFn({ method: "POST" })
  .validator((data: { interests: string[]; styleAnswers: Record<string, string> }) => data)
  .handler(async ({ data }) => {
    const prompt = `Analyze these interests: ${data.interests.join(", ")} and quiz answers: ${JSON.stringify(data.styleAnswers)}. 
    Return a JSON object with tone, hookPattern, ctaStyle, storytellingFramework, and an array of 5 keywords.`;
    
    const systemContext = "You are an expert creator analyst extracting a user's unique Style DNA.";

    const jsonString = await generateDualMode(prompt, systemContext, "persona");
    
    try {
      const parsed = JSON.parse(jsonString);
      
      const newPersona = {
        id: `persona_${crypto.randomUUID()}`,
        userId: "user_1",
        tone: parsed.tone || "Neutral",
        hookPattern: parsed.hookPattern || "Direct question",
        ctaStyle: parsed.ctaStyle || "Follow for more",
        storytellingFramework: parsed.storytellingFramework || "Problem -> Solution",
        keywords: JSON.stringify(parsed.keywords || []),
        identityScore: 85,
      };

      // Check if persona already exists and update or insert
      const existing = db.select().from(personas).where(eq(personas.userId, "user_1")).get();
      if (existing) {
        db.update(personas).set(newPersona).where(eq(personas.userId, "user_1")).run();
      } else {
        db.insert(personas).values(newPersona).run();
      }

      return { success: true, persona: newPersona };
    } catch (e) {
      console.error("Failed to parse AI persona response", e);
      throw new Error("Failed to generate persona");
    }
  });
