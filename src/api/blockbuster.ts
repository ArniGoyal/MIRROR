import { createServerFn } from "@tanstack/react-start";
import { db, personas } from "../db/index";
import { eq } from "drizzle-orm";
import { generateDualMode } from "./ai";

export const generateIdeasFn = createServerFn({ method: "POST" })
  .validator((data: { niche?: string }) => data)
  .handler(async ({ data }) => {
    // Fetch persona to inform idea generation
    const userPersona = db.select().from(personas).where(eq(personas.userId, "user_1")).get();

    const personaContext = userPersona
      ? `Creator's Style DNA:
        - Tone: ${userPersona.tone}
        - Hook Pattern: ${userPersona.hookPattern}
        - CTA Style: ${userPersona.ctaStyle}
        - Storytelling Framework: ${userPersona.storytellingFramework}
        - Signature Keywords: ${JSON.parse(userPersona.keywords).join(", ")}`
      : "No Style DNA available — generate general creator-focused ideas.";

    const systemContext = `You are MIRROR's Creative Block Buster AI. You generate content ideas personalized to a creator's Style DNA.
      ${personaContext}
      
      IMPORTANT: Return ONLY a valid JSON array of exactly 6 idea objects. No markdown, no code fences, no extra text.
      Each object must have these exact fields:
      - "title": string (catchy content title, max 10 words)
      - "description": string (2-3 sentence description of the idea)
      - "platform": string (one of "LinkedIn", "YouTube", "X / Twitter", "Instagram")
      - "estimatedEngagement": string (one of "Very High", "High", "Medium-High", "Medium")
      - "tags": array of 3 strings (relevant topic tags)
      - "basedOn": string (explain which Style DNA trait inspired this idea)`;

    const prompt = data.niche
      ? `Generate 6 unique, creative content ideas for a creator in the "${data.niche}" space. Each idea should leverage their Style DNA traits.`
      : `Generate 6 unique, creative content ideas that leverage this creator's Style DNA. Cover different platforms and content types.`;

    const result = await generateDualMode(prompt, systemContext, "content");

    try {
      let cleanJson = result.trim();
      if (cleanJson.startsWith("```json")) cleanJson = cleanJson.substring(7);
      else if (cleanJson.startsWith("```")) cleanJson = cleanJson.substring(3);
      if (cleanJson.endsWith("```")) cleanJson = cleanJson.slice(0, -3);

      const parsed = JSON.parse(cleanJson.trim());
      const ideas = Array.isArray(parsed) ? parsed : [parsed];

      return {
        success: true,
        ideas: ideas.map((idea: any, i: number) => ({
          id: `ai_${Date.now()}_${i}`,
          title: idea.title || "Untitled Idea",
          description: idea.description || "",
          platform: idea.platform || "LinkedIn",
          estimatedEngagement: idea.estimatedEngagement || "High",
          tags: idea.tags || [],
          basedOn: idea.basedOn || "Style DNA analysis",
        })),
      };
    } catch (e) {
      console.error("[MIRROR] Failed to parse AI ideas response:", e);
      // Return the raw text wrapped in a single idea as fallback
      return {
        success: true,
        ideas: [{
          id: `ai_${Date.now()}_0`,
          title: "AI-Generated Content Strategy",
          description: result.substring(0, 200),
          platform: "LinkedIn",
          estimatedEngagement: "High",
          tags: ["AI Generated", "Style DNA"],
          basedOn: "Generated from your Style DNA profile",
        }],
      };
    }
  });
