import { motion } from "framer-motion";
import { Dna, Activity, Layers, BarChart3 } from "lucide-react";
import { styleDNA } from "@/lib/mock-data";
import { useEffect, useState } from "react";

export function StyleDNAProfile({ persona }: { persona: any }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const score = persona?.identityScore || styleDNA.identityScore;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (circumference * animatedScore) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 size-72 rounded-full bg-violet/15 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 size-56 rounded-full bg-cyan/10 blur-3xl" />

      <div className="relative flex flex-col sm:flex-row items-center gap-8">
        {/* Identity Score Ring */}
        <div className="relative shrink-0">
          <svg width="140" height="140" viewBox="0 0 120 120" className="transform -rotate-90">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke="url(#scoreGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-gradient">{animatedScore}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Identity</div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-cyan mb-3">
            <Dna className="size-3.5" /> Style DNA Active
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
            Your <span className="text-gradient">Creative Identity</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            MIRROR has analyzed your content and built a comprehensive style fingerprint.
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Layers, label: "Content Analyzed", value: styleDNA.contentAnalyzed },
              { icon: Activity, label: "Platforms", value: styleDNA.platformsConnected },
              { icon: BarChart3, label: "Consistency", value: `${styleDNA.consistencyScore}%` },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
                <stat.icon className="size-4 mx-auto mb-1.5 text-muted-foreground" />
                <div className="text-lg font-semibold">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
