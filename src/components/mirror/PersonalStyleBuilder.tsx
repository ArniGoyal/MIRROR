import { motion } from "framer-motion";
import { useState } from "react";
import { styleQuestions } from "@/lib/mock-data";
import { ArrowRight, Check } from "lucide-react";

interface Props {
  onContinue: (answers: Record<string, string>) => void;
}

export function PersonalStyleBuilder({ onContinue }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const allAnswered = styleQuestions.every((q) => answers[q.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-cyan mb-3">Step 4 of 6</div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Define <span className="text-gradient">Your Style</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Tell MIRROR about your preferences — we'll build your unique blueprint.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {styleQuestions.map((q, qIdx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: qIdx * 0.1 }}
            className="glass rounded-xl p-5"
          >
            <div className="text-sm font-semibold mb-3">{q.question}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-left text-xs transition-all ${
                      isSelected
                        ? "border border-violet/40 bg-violet/10 text-foreground glow-violet"
                        : "border border-white/8 bg-white/[0.02] text-foreground/80 hover:border-white/15"
                    }`}
                  >
                    <div className={`size-5 grid place-items-center rounded-full border shrink-0 ${
                      isSelected ? "border-violet bg-violet" : "border-white/20"
                    }`}>
                      {isSelected && <Check className="size-3 text-white" strokeWidth={3} />}
                    </div>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => onContinue(answers)}
          disabled={!allAnswered}
          className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition disabled:opacity-40 disabled:translate-y-0"
        >
          Generate Blueprint <ArrowRight className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}
