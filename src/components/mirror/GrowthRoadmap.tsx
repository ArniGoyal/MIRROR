import { motion } from "framer-motion";
import { growthRoadmap } from "@/lib/mock-data";
import { CheckCircle2, Circle, Sparkle, Rocket, ArrowRight } from "lucide-react";

interface Props {
  onFinish: () => void;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

const focusColors: Record<string, string> = {
  Attention: "from-orange-500/20 to-red-500/10 border-orange-500/30",
  Narrative: "from-violet/20 to-purple-500/10 border-violet/30",
  Systems: "from-cyan/20 to-blue-500/10 border-cyan/30",
  Exploration: "from-yellow-500/20 to-amber-500/10 border-yellow-500/30",
  Analytics: "from-green-500/20 to-emerald-500/10 border-green-500/30",
  Identity: "from-pink-500/20 to-fuchsia-500/10 border-pink-500/30",
};

export function GrowthRoadmap({ onFinish }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-cyan mb-3">Step 6 of 6</div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Your <span className="text-gradient">Growth Roadmap</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          6 weeks to finding and owning your creative identity.
        </p>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-4 bottom-4 w-px bg-gradient-to-b from-violet/50 via-cyan/30 to-transparent hidden sm:block" />

        <div className="space-y-4">
          {growthRoadmap.map((week) => (
            <motion.div key={week.week} variants={item} className="relative sm:pl-16">
              {/* Week marker */}
              <div className="hidden sm:flex absolute left-2 top-5 size-9 rounded-full glass glow-violet items-center justify-center">
                <span className="text-xs font-bold text-gradient">{week.week}</span>
              </div>

              <div className={`glass rounded-xl p-5 border bg-gradient-to-br ${focusColors[week.focus] || "border-white/10"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="sm:hidden text-[10px] text-cyan font-mono">WEEK {week.week}</span>
                  <div className="text-sm font-semibold">{week.title}</div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground ml-auto">{week.focus}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-3">{week.description}</div>
                <div className="space-y-1.5">
                  {week.tasks.map((task) => (
                    <div key={task} className="flex items-start gap-2 text-xs text-foreground/80">
                      <Circle className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <button
          onClick={onFinish}
          className="group inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 transition"
        >
          <Rocket className="size-4" />
          Initialize My MIRROR
          <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
        </button>
      </motion.div>
    </motion.div>
  );
}
