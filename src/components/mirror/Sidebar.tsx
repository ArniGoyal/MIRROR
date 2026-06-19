import { Fingerprint, BookOpenCheck, TrendingUp, Sparkles, Settings, Sparkle } from "lucide-react";

const items = [
  { id: "mirror", label: "My Mirror", sub: "Style DNA", icon: Fingerprint },
  { id: "playbook", label: "Playbook Engine", sub: "Discover patterns", icon: BookOpenCheck, active: true },
  { id: "trends", label: "Trend Injector", sub: "Live signals", icon: TrendingUp },
  { id: "studio", label: "Generation Studio", sub: "Create content", icon: Sparkles },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-72 shrink-0 flex-col gap-2 border-r border-white/5 bg-neutral-950/60 backdrop-blur-xl p-5 relative z-10">
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
          return (
            <button
              key={it.id}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                it.active
                  ? "glass glow-violet"
                  : "hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              {it.active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] rounded-r bg-gradient-to-b from-violet to-cyan" />
              )}
              <div className={`size-9 grid place-items-center rounded-lg ${it.active ? "bg-violet/15 text-violet" : "bg-white/5 text-muted-foreground group-hover:text-foreground"}`}>
                <Icon className="size-4.5" size={18} />
              </div>
              <div className="min-w-0">
                <div className={`text-sm font-medium ${it.active ? "text-foreground" : "text-foreground/85"}`}>{it.label}</div>
                <div className="text-[11px] text-muted-foreground truncate">{it.sub}</div>
              </div>
            </button>
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
    </aside>
  );
}
