import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { config } from "dotenv";

config();

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return;
  const google = createGoogleGenerativeAI({ apiKey });
  
  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: "Say hello world in 3 words.",
    });
    console.log("Success:", text);
  } catch (e) {
    console.error("Error:", e);
  }
}

main();
