import { createServerFn } from "@tanstack/react-start";
import { db, personas } from "../db/index";
import { eq } from "drizzle-orm";
import { generateDualMode } from "./ai";

export const auditContentFn = createServerFn({ method: "POST" })
  .validator((data: { content: string; platform: string }) => data)
  .handler(async ({ data }) => {
    // Fetch persona for comparison
    const userPersona = db.select().from(personas).where(eq(personas.userId, "user_1")).get();

    if (!userPersona) {
      return {
        success: false,
        error: "No Style DNA found. Complete Discovery Mode first to build your profile.",
      };
    }

    const systemContext = `You are MIRROR's Brand Consistency Guardian AI. You analyze content and score it against a creator's Style DNA.

      Creator's Style DNA:
      - Tone: ${userPersona.tone}
      - Hook Pattern: ${userPersona.hookPattern}
      - CTA Style: ${userPersona.ctaStyle}
      - Storytelling Framework: ${userPersona.storytellingFramework}
      - Signature Keywords: ${JSON.parse(userPersona.keywords).join(", ")}

      IMPORTANT: Return ONLY a valid JSON object. No markdown, no code fences, no extra text.
      The object must have these exact fields:
      - "consistencyScore": number (0-100, how well this content matches the Style DNA)
      - "overallVerdict": string (one of "Aligned", "Drifting", "Misaligned")
      - "strengths": array of 2-3 strings (what matches the Style DNA well)
      - "drifts": array of objects, each with:
          - "type": string (e.g. "Tone", "Vocabulary", "Structure", "Hook", "CTA")
          - "severity": string ("low", "medium", or "high")
          - "description": string (what specifically drifted)
          - "suggestion": string (how to fix it to match the Style DNA)
      - "rewrittenVersion": string (the same content rewritten to perfectly match the Style DNA, for the ${data.platform} platform)`;

    const prompt = `Analyze this ${data.platform} content against the creator's Style DNA and provide a detailed consistency audit:

"${data.content}"`;

    const result = await generateDualMode(prompt, systemContext, "content");

    try {
      let cleanJson = result.trim();
      if (cleanJson.startsWith("```json")) cleanJson = cleanJson.substring(7);
      else if (cleanJson.startsWith("```")) cleanJson = cleanJson.substring(3);
      if (cleanJson.endsWith("```")) cleanJson = cleanJson.slice(0, -3);

      const parsed = JSON.parse(cleanJson.trim());

      return {
        success: true,
        audit: {
          consistencyScore: parsed.consistencyScore ?? 70,
          overallVerdict: parsed.overallVerdict ?? "Drifting",
          strengths: parsed.strengths ?? [],
          drifts: (parsed.drifts ?? []).map((d: any) => ({
            type: d.type || "General",
            severity: d.severity || "medium",
            description: d.description || "",
            suggestion: d.suggestion || "",
          })),
          rewrittenVersion: parsed.rewrittenVersion ?? "",
        },
      };
    } catch (e) {
      console.error("[MIRROR] Failed to parse AI audit response:", e);
      return {
        success: true,
        audit: {
          consistencyScore: 65,
          overallVerdict: "Drifting",
          strengths: ["Content was analyzed but response format was unexpected"],
          drifts: [{
            type: "Analysis",
            severity: "medium",
            description: "AI returned unstructured feedback",
            suggestion: result.substring(0, 300),
          }],
          rewrittenVersion: "",
        },
      };
    }
  });
