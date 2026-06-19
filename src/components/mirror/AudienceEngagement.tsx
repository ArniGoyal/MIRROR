import { motion } from "framer-motion";
import { engagementPatterns } from "@/lib/mock-data";
import { MessageCircle, Users, Reply } from "lucide-react";

const iconMap: Record<string, typeof MessageCircle> = {
  Questions: MessageCircle,
  Community: Users,
  Replies: Reply,
};

export function AudienceEngagement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute -bottom-16 -right-16 size-40 rounded-full bg-cyan/10 blur-3xl" />

      <div className="relative">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Engagement</div>
        <div className="text-base font-semibold mb-5">Audience Interaction DNA</div>

        <div className="space-y-4">
          {engagementPatterns.map((ep) => {
            const Icon = iconMap[ep.type] || MessageCircle;
            return (
              <div key={ep.type} className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="size-8 grid place-items-center rounded-lg bg-cyan/15 text-cyan">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{ep.type}</div>
                      <div className="text-[11px] text-muted-foreground">{ep.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gradient">{ep.frequency}%</div>
                    <div className="text-[10px] text-muted-foreground">frequency</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-white/5 mb-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${ep.frequency}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-violet to-cyan"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {ep.examples.map((ex) => (
                    <span key={ex} className="text-[10px] px-2 py-1 rounded-full border border-white/8 bg-white/[0.03] text-foreground/70 italic">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
