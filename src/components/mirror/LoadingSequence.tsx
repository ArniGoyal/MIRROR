import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Database, Brain, Dna } from "lucide-react";

const steps = [
  { label: "Querying Anonymized Playbook RAG…", icon: Database },
  { label: "Extracting Top 1% Creator Patterns…", icon: Brain },
  { label: "Synthesizing Style DNA…", icon: Dna },
];

export function LoadingSequence({ query, onDone }: { query: string; onDone: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 900),
      setTimeout(() => setStep(2), 1900),
      setTimeout(() => onDone(), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto text-center"
    >
      <div className="relative mx-auto mb-10 size-40">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet/30 to-cyan/20 blur-2xl animate-pulse" />
        <div className="absolute inset-4 rounded-full border border-violet/40 animate-[spin_6s_linear_infinite]" />
        <div className="absolute inset-8 rounded-full border border-cyan/40 animate-[spin_4s_linear_infinite_reverse]" />
        <div className="absolute inset-0 grid place-items-center">
          <Dna className="size-10 text-cyan" />
        </div>
      </div>

      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">Analyzing niche</div>
      <div className="text-2xl font-semibold mb-8">"{query}"</div>

      <div className="space-y-3 text-left max-w-md mx-auto">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const active = i === step;
          const done = i < step;
          return (
            <div
              key={s.label}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active ? "glass glow-violet" : done ? "bg-white/[0.02] border border-white/5" : "opacity-40"
              }`}
            >
              <div className={`size-8 grid place-items-center rounded-lg ${active ? "bg-violet/20 text-violet" : done ? "bg-cyan/15 text-cyan" : "bg-white/5 text-muted-foreground"}`}>
                <Icon className="size-4" />
              </div>
              <div className="flex-1 text-sm">{s.label}</div>
              <AnimatePresence>
                {active && (
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="size-2 rounded-full bg-violet animate-pulse"
                  />
                )}
                {done && <span className="text-xs text-cyan">✓</span>}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
