import { createServerFn } from "@tanstack/react-start";
import { db, personas } from "../db/index";
import { eq } from "drizzle-orm";
import { generateDualMode } from "./ai";
import crypto from "crypto";
import fs from "fs";
import path from "path";

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
  .validator((data: { interests: string[]; sources: { type: string; content: string; url?: string }[] }) => data)
  .handler(async ({ data }) => {
    const contentParts: any[] = [];
    contentParts.push({ type: 'text', text: `Analyze these interests: ${data.interests.join(", ")} and the following raw content from the creator's past posts/videos. Return a JSON object with tone, hookPattern, ctaStyle, storytellingFramework, and an array of 5 keywords.` });

    for (const source of data.sources) {
      if (source.type === "text") {
        contentParts.push({ type: 'text', text: `Text post:\n${source.content}` });
      } else if (source.type === "image" && source.url) {
        const filePath = path.join(process.cwd(), "public", source.url);
        if (fs.existsSync(filePath)) {
          const buffer = fs.readFileSync(filePath);
          contentParts.push({ type: 'text', text: `Image caption: ${source.content}` });
          contentParts.push({ type: 'image', image: buffer });
        }
      } else if (source.type === "video" && source.url) {
        const filePath = path.join(process.cwd(), "public", source.url);
        if (fs.existsSync(filePath)) {
          const buffer = fs.readFileSync(filePath);
          contentParts.push({ type: 'text', text: `Video context: ${source.content}` });
          contentParts.push({ type: 'file', data: buffer, mimeType: "video/mp4" });
        }
      }
    }

    const promptMessage = [{ role: "user", content: contentParts }];
    
    const systemContext = "You are an expert creator analyst extracting a user's unique Style DNA.";

    const jsonString = await generateDualMode(promptMessage, systemContext, "persona");
    
    try {
      let cleanJson = jsonString.trim();
      if (cleanJson.startsWith("```json")) {
        cleanJson = cleanJson.substring(7);
      } else if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson.substring(3);
      }
      if (cleanJson.endsWith("```")) {
        cleanJson = cleanJson.slice(0, -3);
      }
      const parsed = JSON.parse(cleanJson.trim());
      
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
