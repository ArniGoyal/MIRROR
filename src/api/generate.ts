import { createServerFn } from "@tanstack/react-start";
import { db, personas, contents } from "../db/index";
import { eq } from "drizzle-orm";
import { generateDualMode } from "./ai";
import crypto from "crypto";

export const generateContentFn = createServerFn({ method: "POST" })
  .validator((data: { prompt: string; platform: string }) => data)
  .handler(async ({ data }) => {
    // Fetch persona to inject into the system prompt
    const userPersona = db.select().from(personas).where(eq(personas.userId, "user_1")).get();
    
    let systemContext = "You are a generic AI assistant.";
    if (userPersona) {
      systemContext = `You are a specialized AI Creative Twin for this user. 
        Your job is to generate content that exactly matches their Style DNA.
        Tone: ${userPersona.tone}
        Hook Pattern: ${userPersona.hookPattern}
        CTA Style: ${userPersona.ctaStyle}
        Story Framework: ${userPersona.storytellingFramework}
        Keywords to use if relevant: ${JSON.parse(userPersona.keywords).join(", ")}
        Target Platform: ${data.platform}
        Never break character. Never use generic AI fluff. Be authentic to the Style DNA.`;
    }

    const generatedText = await generateDualMode(data.prompt, systemContext, "content");
    
    // Save generated content to database
    const newContent = {
      id: `content_${crypto.randomUUID()}`,
      userId: "user_1",
      platform: data.platform,
      prompt: data.prompt,
      generatedContent: generatedText,
      consistencyScore: Math.floor(Math.random() * 15) + 80, // Random score 80-94 for MVP
    };

    db.insert(contents).values(newContent).run();

    return { success: true, text: generatedText, consistencyScore: newContent.consistencyScore };
  });
