import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Users Table
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
});

// Personas (Style DNA) Table
export const personas = sqliteTable("personas", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  tone: text("tone").notNull(),
  hookPattern: text("hook_pattern").notNull(),
  ctaStyle: text("cta_style").notNull(),
  storytellingFramework: text("storytelling_framework").notNull(),
  // Store JSON string for array of strings
  keywords: text("keywords").notNull(), 
  identityScore: integer("identity_score").notNull().default(85),
});

// Contents Table
export const contents = sqliteTable("contents", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  platform: text("platform").notNull(), // e.g. "LinkedIn", "Twitter"
  prompt: text("prompt").notNull(),
  generatedContent: text("generated_content").notNull(),
  consistencyScore: integer("consistency_score").notNull().default(90),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
