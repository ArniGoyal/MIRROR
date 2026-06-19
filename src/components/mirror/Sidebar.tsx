import { Link, useMatchRoute } from "@tanstack/react-router";
import { Fingerprint, BookOpenCheck, TrendingUp, Sparkles, Settings, Sparkle, Shield, Lightbulb, GitBranch, Compass, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { id: "mirror", label: "My Mirror", sub: "Style DNA", icon: Fingerprint, path: "/dashboard" as const },
  { id: "alter-ego", label: "Alter Ego", sub: "Generate content", icon: Sparkles, path: "/alter-ego" as const },
  { id: "consistency", label: "Consistency Guard", sub: "Brand voice", icon: Shield, path: "/consistency" as const },
  { id: "block-buster", label: "Block Buster", sub: "Overcome blocks", icon: Lightbulb, path: "/block-buster" as const },
  { id: "evolution", label: "Evolution", sub: "Track growth", icon: GitBranch, path: "/evolution" as const },
  { id: "discover", label: "Discovery Mode", sub: "Find your style", icon: Compass, path: "/discover" as const },
];

export function Sidebar() {
  const matchRoute = useMatchRoute();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <>
      <div className="flex items-center gap-3 px-2 py-3">
        <div className="relative">
          <div className="size-9 rounded-xl bg-gradient-to-br from-violet to-cyan grid place-items-center glow-violet">
            <Sparkle className="size-5 text-white" strokeWidth={2.2} />
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold tracking-wide text-gradient">MIRROR</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Creative Twin</div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = !!matchRoute({ to: it.path, fuzzy: it.path === "/" ? false : true });
          return (
            <Link
              key={it.id}
              to={it.path}
              onClick={() => setMobileOpen(false)}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                isActive
                  ? "glass glow-violet"
                  : "hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] rounded-r bg-gradient-to-b from-violet to-cyan"
                />
              )}
              <div className={`size-9 grid place-items-center rounded-lg ${isActive ? "bg-violet/15 text-violet" : "bg-white/5 text-muted-foreground group-hover:text-foreground"}`}>
                <Icon className="size-4.5" size={18} />
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-medium ${isActive ? "text-foreground" : "text-foreground/85"}`}>{it.label}</div>
                <div className="text-[11px] text-muted-foreground truncate">{it.sub}</div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="size-2 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs text-muted-foreground">RAG Index online</span>
          </div>
          <div className="text-sm text-foreground/90 font-medium">12.4M creator signals</div>
          <div className="text-[11px] text-muted-foreground">Updated 2 minutes ago</div>
        </div>
        <button className="mt-3 flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground hover:text-foreground transition">
          <Settings className="size-4" /> Settings
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-3 left-3 z-50 size-10 rounded-xl glass grid place-items-center text-foreground"
      >
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed left-0 top-0 bottom-0 z-40 w-72 flex flex-col gap-2 border-r border-white/5 bg-neutral-950/95 backdrop-blur-xl p-5"
          >
            {navContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-72 shrink-0 flex-col gap-2 border-r border-white/5 bg-neutral-950/60 backdrop-blur-xl p-5 relative z-10">
        {navContent}
      </aside>
    </>
  );
}
