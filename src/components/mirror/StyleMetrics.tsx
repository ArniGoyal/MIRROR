import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { styleDNA } from "@/lib/mock-data";

export function StyleMetrics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 size-40 rounded-full bg-violet/10 blur-3xl" />

      <div className="relative">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Analysis</div>
        <div className="text-base font-semibold mb-4">Style Radar</div>

        <div className="w-full aspect-square max-h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={styleDNA.radarMetrics} cx="50%" cy="50%">
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 10 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="Style"
                dataKey="value"
                stroke="#8B5CF6"
                fill="url(#radarFill)"
                fillOpacity={0.4}
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {styleDNA.radarMetrics.map((m) => (
            <div key={m.axis} className="text-[10px] px-2 py-1 rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground">
              {m.axis}: <span className="text-foreground font-medium">{m.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
