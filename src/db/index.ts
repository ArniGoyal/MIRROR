import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import path from "path";

// Initialize SQLite database
const sqlite = new Database(path.join(process.cwd(), "mirror.db"));

// Create Drizzle ORM instance
export const db = drizzle(sqlite, { schema });
export * from "./schema";

// Initialize database schema (for MVP simplicity, we can just run queries directly or use Drizzle kit push)
// In a real app we would use migrations, but for the MVP Hackathon we'll ensure tables exist using raw SQL
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS personas (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    tone TEXT NOT NULL,
    hook_pattern TEXT NOT NULL,
    cta_style TEXT NOT NULL,
    storytelling_framework TEXT NOT NULL,
    keywords TEXT NOT NULL,
    identity_score INTEGER NOT NULL DEFAULT 85,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS contents (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    platform TEXT NOT NULL,
    prompt TEXT NOT NULL,
    generated_content TEXT NOT NULL,
    consistency_score INTEGER NOT NULL DEFAULT 90,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  -- Insert a mock user if none exists
  INSERT OR IGNORE INTO users (id, name, email) VALUES ('user_1', 'Demo Creator', 'creator@mirror.ai');
  
  -- Insert a highly distinctive dummy persona so the user can see the AI actually uses it
  INSERT OR IGNORE INTO personas (id, user_id, tone, hook_pattern, cta_style, storytelling_framework, keywords, identity_score) 
  VALUES (
    'persona_1', 
    'user_1', 
    'Gen-Z hyper-energetic, uses modern slang (no cap, bet, unalived), explains complex tech using pop culture/trends', 
    'Start with a crazy claim like "Your [tech stack] is literally giving boomer energy 💀" or a trendy hook', 
    'Tell them to drop a W in the chat or share with someone who needs to touch grass', 
    'Roast an outdated tech concept -> Explain the new hyped concept like it''s drama -> Prove it with "literal data" -> Drop the mic', 
    '["no cap", "bruh", "tech stack", "literally", "vibes", "touch grass", "rizz"]',
    99
  );
`);
