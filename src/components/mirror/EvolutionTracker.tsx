import { motion } from "framer-motion";
import { GitBranch, Milestone, TrendingUp, Zap, Compass, Award, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { evolutionMilestones, toneEvolutionData, topicEvolutionData, growthMetricsData } from "@/lib/mock-data";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

const typeIcons: Record<string, typeof Milestone> = { style_change: Zap, growth: TrendingUp, milestone: Award, pivot: Compass };
const typeColors: Record<string, string> = { style_change: "text-violet bg-violet/15 border-violet/30", growth: "text-cyan bg-cyan/15 border-cyan/30", milestone: "text-yellow-400 bg-yellow-400/15 border-yellow-400/30", pivot: "text-pink-400 bg-pink-400/15 border-pink-400/30" };

export function EvolutionTracker() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-cyan mb-3">
          <GitBranch className="size-3.5" /> Identity Evolution Tracker
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Your <span className="text-gradient">Evolution</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">See how your creative identity has grown over time.</p>
      </motion.div>

      {/* Growth Metrics Cards */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Audience", value: growthMetricsData.audience.current.toLocaleString(), change: growthMetricsData.audience.change, sparkline: growthMetricsData.audience.sparkline },
          { label: "Engagement Rate", value: `${growthMetricsData.engagement.current}%`, change: growthMetricsData.engagement.change, sparkline: growthMetricsData.engagement.sparkline },
          { label: "Content/Week", value: growthMetricsData.contentVelocity.current.toString(), change: growthMetricsData.contentVelocity.change, sparkline: growthMetricsData.contentVelocity.sparkline },
          { label: "Brand Score", value: growthMetricsData.brandScore.current.toString(), change: growthMetricsData.brandScore.change, sparkline: growthMetricsData.brandScore.sparkline },
        ].map((m) => (
          <div key={m.label} className="glass rounded-xl p-4 relative overflow-hidden">
            <div className="text-[10px] text-muted-foreground mb-1">{m.label}</div>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">{m.value}</div>
              <span className="text-[10px] text-cyan">{m.change}</span>
            </div>
            <div className="flex items-end gap-[2px] h-8 mt-2">
              {m.sparkline.map((v, i) => {
                const max = Math.max(...m.sparkline);
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-violet/40 to-cyan/60"
                    style={{ height: `${(v / max) * 100}%` }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Tone Evolution Chart */}
      <motion.div variants={item} className="glass rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 size-48 rounded-full bg-violet/10 blur-3xl" />
        <div className="relative">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Analysis</div>
          <div className="text-base font-semibold mb-4">Tone Evolution</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={toneEvolutionData}>
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "rgba(0,0,0,0.85)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }} />
                <Line type="monotone" dataKey="authority" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="humor" stroke="#EAB308" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="emotion" stroke="#06B6D4" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="formality" stroke="#EC4899" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Topic Evolution */}
      <motion.div variants={item}>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Shift</div>
        <div className="text-base font-semibold mb-4">Topic Evolution</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-5">
            <div className="text-xs text-muted-foreground mb-3">6 Months Ago</div>
            <div className="space-y-2">
              {topicEvolutionData.past.map((t) => (
                <div key={t.topic}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-foreground/80">{t.topic}</span>
                    <span className="text-muted-foreground">{t.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${t.value}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full bg-white/20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-5 glow-violet">
            <div className="text-xs text-cyan mb-3">Now</div>
            <div className="space-y-2">
              {topicEvolutionData.current.map((t) => (
                <div key={t.topic}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-foreground/90">{t.topic}</span>
                    <span className="text-foreground/70">{t.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${t.value}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-violet to-cyan"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div variants={item}>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Journey</div>
        <div className="text-base font-semibold mb-6">Evolution Timeline</div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet/50 via-cyan/30 to-transparent" />

          <div className="space-y-4">
            {evolutionMilestones.map((m, idx) => {
              const Icon = typeIcons[m.type] || Milestone;
              const colorClass = typeColors[m.type] || typeColors.milestone;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.06 }}
                  className="relative pl-14"
                >
                  {/* Dot */}
                  <div className={`absolute left-2 top-3 size-7 grid place-items-center rounded-full border ${colorClass}`}>
                    <Icon className="size-3.5" />
                  </div>

                  <div className="glass rounded-xl p-4 hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] text-muted-foreground">{m.date}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${colorClass}`}>
                        {m.type.replace("_", " ")}
                      </span>
                    </div>
                    <div className="text-sm font-semibold mb-0.5">{m.title}</div>
                    <div className="text-xs text-muted-foreground">{m.description}</div>
                    {m.metric && (
                      <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-cyan">
                        <Sparkles className="size-3" /> {m.metric}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
