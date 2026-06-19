import { motion } from "framer-motion";
import { Zap, Film, Languages, Quote, CheckCircle2, ArrowRight, Sparkles, RotateCcw } from "lucide-react";

interface Props {
  query: string;
  onReset: () => void;
  onSeed: () => void;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function PlaybookDashboard({ query, onReset, onSeed }: Props) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full max-w-6xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={item} className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs text-cyan mb-2">
            <Sparkles className="size-3.5" /> Style DNA Extracted
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Playbook for <span className="text-gradient">"{query}"</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Synthesized from <span className="text-foreground/80">2,148 anonymized top-performing videos</span>
          </p>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition px-3 py-2 rounded-lg border border-white/10 hover:border-white/20"
        >
          <RotateCcw className="size-4" /> New search
        </button>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 auto-rows-min">
        {/* Hook Architecture - large */}
        <motion.div variants={item} className="lg:col-span-3 lg:row-span-2 glass rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform glow-violet">
          <div className="absolute -top-20 -right-20 size-56 rounded-full bg-violet/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-10 grid place-items-center rounded-xl bg-violet/15 text-violet">
                <Zap className="size-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Card 01</div>
                <div className="text-sm font-medium">Hook Architecture</div>
              </div>
            </div>

            <div className="my-6">
              <div className="text-6xl font-bold text-gradient leading-none">78%</div>
              <div className="text-sm text-muted-foreground mt-2">
                of top videos use the <span className="text-foreground font-medium">"Negative Shift"</span> hook
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-4 mb-4">
              <div className="text-[10px] uppercase tracking-widest text-cyan mb-2">Pattern</div>
              <div className="text-sm text-foreground/90">
                Start with a widely accepted belief → instantly contradict it.
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-violet/10 to-cyan/5 border border-violet/20 p-4">
              <Quote className="size-4 text-violet mb-2" />
              <div className="text-sm italic text-foreground/90 leading-relaxed">
                "You think you need more motivation. You don't. You need a system."
              </div>
            </div>
          </div>
        </motion.div>

        {/* Visual Pacing */}
        <motion.div variants={item} className="lg:col-span-3 glass rounded-2xl p-6 relative overflow-hidden hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-10 grid place-items-center rounded-xl bg-cyan/15 text-cyan">
              <Film className="size-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Card 02</div>
              <div className="text-sm font-medium">Visual Pacing</div>
            </div>
          </div>

          <div className="flex items-end gap-4">
            <div>
              <div className="text-5xl font-bold text-gradient leading-none">2.4s</div>
              <div className="text-xs text-muted-foreground mt-1">avg scene cut</div>
            </div>
            <div className="flex-1 flex items-end gap-1 h-16">
              {[40, 70, 30, 85, 55, 90, 45, 75, 60, 95, 50, 80].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-violet/40 to-cyan/60"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 text-sm text-foreground/80">
            High-contrast B-roll paired with slow, deliberate voiceovers.
          </div>
        </motion.div>

        {/* Vocabulary DNA */}
        <motion.div variants={item} className="lg:col-span-3 glass rounded-2xl p-6 relative overflow-hidden hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-2 mb-4">
            <div className="size-10 grid place-items-center rounded-xl bg-violet/15 text-violet">
              <Languages className="size-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Card 03</div>
              <div className="text-sm font-medium">Vocabulary DNA</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {["Discipline", "Friction", "Architecture", "Momentum", "Void"].map((k) => (
              <span
                key={k}
                className="px-3 py-1.5 text-xs rounded-full border border-violet/30 bg-violet/10 text-foreground/90"
              >
                {k}
              </span>
            ))}
          </div>

          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="text-[10px] uppercase tracking-widest text-cyan mb-2">Tone</div>
            <div className="text-sm text-foreground/90">Authoritative, stoic, slightly urgent.</div>
          </div>
        </motion.div>
      </div>

      {/* Blueprint */}
      <motion.div variants={item} className="mt-10 glass rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 size-72 rounded-full bg-cyan/10 blur-3xl" />
        <div className="absolute -top-32 -right-32 size-72 rounded-full bg-violet/15 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan mb-2">
            <span className="size-1.5 rounded-full bg-cyan" /> Your Blueprint
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-1">A 3-step plan to ship your first video</h3>
          <p className="text-sm text-muted-foreground mb-8">Generated from the Style DNA above.</p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                n: "01",
                title: "Draft a Negative Shift hook",
                body: 'Open with a belief your audience holds, then break it. Template: "You think [X]. You don\'t. You need [system].".',
              },
              {
                n: "02",
                title: "Cut B-roll to a 2.4s cadence",
                body: "Storyboard 10–12 high-contrast clips. Layer a slow, deliberate VO using your stoic-authoritative tone.",
              },
              {
                n: "03",
                title: "Lock vocabulary anchors",
                body: "Use 3+ DNA keywords (Discipline, Friction, Architecture, Momentum, Void) across the script.",
              },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-violet/40 transition">
                <div className="text-xs text-violet font-mono mb-3">STEP {s.n}</div>
                <div className="text-base font-semibold mb-2">{s.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{s.body}</div>
                <CheckCircle2 className="size-4 text-cyan mt-4" />
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              MIRROR will fine-tune your twin using this DNA profile.
            </div>
            <button
              onClick={onSeed}
              className="group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 transition"
            >
              Seed My MIRROR with this DNA
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
