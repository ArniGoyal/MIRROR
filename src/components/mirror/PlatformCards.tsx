import { motion } from "framer-motion";
import { platforms } from "@/lib/mock-data";
import { Plus, RefreshCcw } from "lucide-react";

export function PlatformCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Connected</div>
          <div className="text-base font-semibold">Platforms</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {platforms.map((p, idx) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.06 }}
            className={`glass rounded-xl p-4 relative overflow-hidden group hover:-translate-y-0.5 transition-transform ${
              p.connected ? "border-white/10" : "border-dashed border-white/10 opacity-60"
            }`}
          >
            {p.connected && (
              <div className="absolute top-3 right-3">
                <div className="size-2 rounded-full bg-cyan animate-pulse" />
              </div>
            )}
            <div className="flex items-center gap-3 mb-3">
              <div className="size-10 grid place-items-center rounded-lg bg-white/5 text-lg">
                {p.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  {p.connected ? `${p.piecesAnalyzed} pieces` : "Not connected"}
                </div>
              </div>
            </div>

            {p.connected && p.sparkline.length > 0 ? (
              <>
                <div className="flex items-end gap-[2px] h-8 mb-2">
                  {p.sparkline.map((v, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-gradient-to-t from-violet/40 to-cyan/60 transition-all group-hover:from-violet/60 group-hover:to-cyan/80"
                      style={{ height: `${v}%` }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">Synced {p.lastSync}</span>
                  <button className="text-[10px] text-cyan hover:text-cyan/80 flex items-center gap-1 transition">
                    <RefreshCcw className="size-3" /> Sync
                  </button>
                </div>
              </>
            ) : (
              <button className="w-full mt-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-white/15 text-xs text-muted-foreground hover:text-foreground hover:border-violet/40 transition">
                <Plus className="size-3.5" /> Connect
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
