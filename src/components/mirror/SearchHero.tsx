import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";

interface Props {
  onSearch: (query: string) => void;
  disabled?: boolean;
}

const suggestions = ["Motivational Videos", "Tech Reviews", "Cinematic Vlogs", "Finance Explainers"];

export function SearchHero({ onSearch, disabled }: Props) {
  const [value, setValue] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSearch(value.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto text-center"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-6">
        <Sparkles className="size-3.5 text-cyan" />
        <span>Playbook Engine · Anonymized RAG</span>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
        Decode the <span className="text-gradient">Style DNA</span><br />
        of any creator niche.
      </h1>
      <p className="mt-5 text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
        Search a niche. MIRROR surfaces the hooks, pacing, and vocabulary the top 1% actually use.
      </p>

      <form onSubmit={submit} className="relative mt-10 group">
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-violet/60 via-cyan/40 to-violet/60 opacity-70 blur-md group-focus-within:opacity-100 transition" />
        <div className="relative glass rounded-2xl flex items-center gap-3 pl-5 pr-2 py-2 glow-violet">
          <Search className="size-5 text-muted-foreground shrink-0" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            placeholder="What kind of creator do you want to be? (e.g., Motivational speaker, Tech reviewer)..."
            className="flex-1 bg-transparent py-4 text-base outline-none placeholder:text-muted-foreground/70 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.45)] transition hover:-translate-y-0.5 disabled:opacity-40 disabled:translate-y-0"
          >
            Analyze <ArrowRight className="size-4" />
          </button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Try:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => { setValue(s); onSearch(s); }}
            disabled={disabled}
            className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-foreground/80 hover:border-violet/50 hover:text-foreground transition"
          >
            {s}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
