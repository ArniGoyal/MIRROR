import { motion } from "framer-motion";
import { creatorArchetypes } from "@/lib/mock-data";
import { User, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface Props {
  onContinue: () => void;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } } };

export function CreatorShowcase({ onContinue }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-cyan mb-3">Steps 2–3 of 6</div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Top Creator <span className="text-gradient">Patterns</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          We analyzed top creators in your niche. Here are their anonymized style patterns.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {creatorArchetypes.map((c) => (
          <motion.div
            key={c.id}
            variants={item}
            className="glass rounded-2xl p-6 relative overflow-hidden hover:-translate-y-1 transition-transform"
          >
            <div className="absolute -top-16 -right-16 size-40 rounded-full bg-violet/8 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-xl bg-gradient-to-br from-violet/20 to-cyan/10 grid place-items-center">
                  <User className="size-5 text-violet" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-[11px] text-muted-foreground">{c.type}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground mb-2">Strengths</div>
                <div className="space-y-1.5">
                  {c.strengths.map((s) => (
                    <div key={s} className="flex items-center gap-2 text-xs text-foreground/80">
                      <CheckCircle2 className="size-3 text-cyan shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/8 bg-black/30 p-3 mb-4">
                <div className="text-[9px] uppercase tracking-widest text-violet mb-1">Hook Style</div>
                <div className="text-xs text-foreground/80">{c.hookStyle}</div>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-violet/8 to-cyan/5 border border-violet/15 p-3 mb-3">
                <div className="text-[9px] uppercase tracking-widest text-cyan mb-1">Sample</div>
                <div className="text-xs text-foreground/85 italic">{c.sampleLine}</div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground">{c.toneDescription}</span>
                <div className="flex items-center gap-1">
                  <Sparkles className="size-3 text-violet" />
                  <span className="text-xs font-medium text-foreground/80">{c.matchScore}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition"
        >
          Build My Style <ArrowRight className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}
