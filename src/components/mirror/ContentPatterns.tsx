import { motion } from "framer-motion";
import { contentPatterns } from "@/lib/mock-data";
import { Zap, Target, BookOpen, Film, Quote } from "lucide-react";

const iconMap: Record<string, typeof Zap> = {
  zap: Zap,
  target: Target,
  book: BookOpen,
  film: Film,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ContentPatterns() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Discovered</div>
        <div className="text-base font-semibold">Content Patterns</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contentPatterns.map((p) => {
          const Icon = iconMap[p.icon] || Zap;
          return (
            <motion.div
              key={p.id}
              variants={item}
              className="glass rounded-xl p-5 relative overflow-hidden group hover:-translate-y-1 transition-transform"
            >
              <div className="absolute -top-12 -right-12 size-32 rounded-full bg-violet/8 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="size-9 grid place-items-center rounded-lg bg-violet/15 text-violet">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.category}</div>
                    <div className="text-sm font-medium">{p.title}</div>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <div className="text-3xl font-bold text-gradient">{p.stat}</div>
                  <div className="text-xs text-muted-foreground">{p.statLabel}</div>
                </div>

                <div className="text-sm text-foreground/80 mb-3">{p.description}</div>

                <div className="rounded-lg bg-gradient-to-br from-violet/8 to-cyan/5 border border-violet/15 p-3">
                  <Quote className="size-3 text-violet mb-1.5" />
                  <div className="text-xs italic text-foreground/85 leading-relaxed">{p.example}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
