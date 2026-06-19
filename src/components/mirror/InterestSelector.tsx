import { motion } from "framer-motion";
import { useState } from "react";
import { interestCategories } from "@/lib/mock-data";
import { Check } from "lucide-react";

interface Props {
  onContinue: (selected: string[]) => void;
}

export function InterestSelector({ onContinue }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto text-center"
    >
      <div className="text-[10px] uppercase tracking-[0.25em] text-cyan mb-3">Step 1 of 6</div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
        What <span className="text-gradient">excites</span> you?
      </h2>
      <p className="text-sm text-muted-foreground mb-8">Select the topics that fire you up. We'll find the best creator patterns for you.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {interestCategories.map((cat, idx) => {
          const isSelected = selected.includes(cat.id);
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.04 }}
              onClick={() => toggle(cat.id)}
              className={`relative flex flex-col items-center gap-2 p-5 rounded-xl border transition-all ${
                isSelected
                  ? "glass glow-violet border-violet/40"
                  : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 size-5 grid place-items-center rounded-full bg-violet text-white"
                >
                  <Check className="size-3" strokeWidth={3} />
                </motion.div>
              )}
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs font-medium">{cat.name}</span>
            </motion.button>
          );
        })}
      </div>

      <button
        onClick={() => onContinue(selected)}
        disabled={selected.length === 0}
        className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition disabled:opacity-40 disabled:translate-y-0"
      >
        Continue ({selected.length} selected)
      </button>
    </motion.div>
  );
}
