import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { styleDNA } from "@/lib/mock-data";

/**
 * Derives radar metrics from a persona's text fields.
 * Uses simple heuristics on the persona attributes to produce numeric scores.
 */
function deriveRadarFromPersona(persona: any) {
  const tone = (persona.tone || "").toLowerCase();
  const hook = (persona.hookPattern || "").toLowerCase();
  const cta = (persona.ctaStyle || "").toLowerCase();
  const story = (persona.storytellingFramework || "").toLowerCase();
  const keywords = persona.keywords || [];

  // Vocabulary Complexity — longer, more specific descriptions suggest higher complexity
  const vocabComplexity = Math.min(95, 40 + (tone.length + hook.length) % 50);

  // Emotional Intensity — check for emotional words
  const emotionWords = ["urgent", "passionate", "energetic", "emotional", "hyper", "fire", "intense", "bold"];
  const emotionHits = emotionWords.filter(w => tone.includes(w) || hook.includes(w)).length;
  const emotionalIntensity = Math.min(95, 45 + emotionHits * 15 + keywords.length * 3);

  // Humor Level — check for humor/casual indicators
  const humorWords = ["humor", "funny", "lol", "meme", "joke", "casual", "slang", "gen-z", "bruh"];
  const humorHits = humorWords.filter(w => tone.includes(w) || cta.includes(w)).length;
  const humorLevel = Math.min(95, 20 + humorHits * 20);

  // Sentence Structure — story framework complexity
  const arrowCount = (story.match(/→|->|—/g) || []).length;
  const sentenceStructure = Math.min(95, 40 + arrowCount * 15);

  // Tone Authority — authoritative/stoic indicators
  const authWords = ["authoritative", "stoic", "serious", "commanding", "direct", "expert", "analytical"];
  const authHits = authWords.filter(w => tone.includes(w)).length;
  const toneAuthority = Math.min(95, 35 + authHits * 20 + (cta.toLowerCase().includes("direct") ? 15 : 0));

  // Engagement — CTA and hook aggressiveness
  const engagementWords = ["urgency", "share", "drop", "follow", "comment", "tag", "subscribe"];
  const engHits = engagementWords.filter(w => cta.includes(w) || hook.includes(w)).length;
  const engagement = Math.min(95, 40 + engHits * 12 + keywords.length * 4);

  return [
    { axis: "Vocabulary Complexity", value: vocabComplexity },
    { axis: "Emotional Intensity", value: emotionalIntensity },
    { axis: "Humor Level", value: humorLevel },
    { axis: "Sentence Structure", value: sentenceStructure },
    { axis: "Tone Authority", value: toneAuthority },
    { axis: "Engagement", value: engagement },
  ];
}

export function StyleMetrics({ persona }: { persona?: any }) {
  // Use persona-derived metrics if available, otherwise fall back to mock data
  const radarMetrics = persona ? deriveRadarFromPersona(persona) : styleDNA.radarMetrics;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 size-40 rounded-full bg-violet/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between mb-1">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Analysis</div>
          {persona && (
            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-cyan/15 text-cyan font-bold uppercase tracking-wider">
              LIVE
            </span>
          )}
        </div>
        <div className="text-base font-semibold mb-4">Style Radar</div>

        <div className="w-full aspect-square max-h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarMetrics} cx="50%" cy="50%">
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="Style"
                dataKey="value"
                stroke="#8B5CF6"
                fill="url(#radarFill)"
                fillOpacity={0.4}
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {radarMetrics.map((m) => (
            <div key={m.axis} className="text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground">
              {m.axis}: <span className="text-foreground font-medium">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
