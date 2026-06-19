import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { consistencyData } from "@/lib/mock-data";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

const severityColors = { low: "text-cyan border-cyan/30 bg-cyan/10", medium: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10", high: "text-red-400 border-red-400/30 bg-red-400/10" };
const statusColors = { aligned: "bg-cyan/20 text-cyan", drifting: "bg-yellow-400/20 text-yellow-400", misaligned: "bg-red-400/20 text-red-400" };
const statusLabels = { aligned: "Aligned", drifting: "Drifting", misaligned: "Misaligned" };

export function ConsistencyGuardian() {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(consistencyData.overallScore), 300);
    return () => clearTimeout(timer);
  }, []);

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (circumference * animatedScore) / 100;
  const scoreColor = animatedScore >= 90 ? "#06B6D4" : animatedScore >= 70 ? "#EAB308" : "#EF4444";

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-cyan mb-3">
          <Shield className="size-3.5" /> Brand Consistency Guardian
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Brand <span className="text-gradient">Consistency</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Prevent content drift. Stay authentically you.</p>
      </motion.div>

      {/* Score + Chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Score gauge */}
        <motion.div variants={item} className="lg:col-span-2 glass rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 size-48 rounded-full bg-cyan/10 blur-3xl" />
          <div className="relative">
            <svg width="160" height="160" viewBox="0 0 120 120" className="transform -rotate-90">
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="54" fill="none"
                stroke={scoreColor} strokeWidth="10" strokeLinecap="round"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold" style={{ color: scoreColor }}>{animatedScore}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Consistency</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-cyan">
            <TrendingUp className="size-3.5" /> +3 pts this month
          </div>
        </motion.div>

        {/* Trend chart */}
        <motion.div variants={item} className="lg:col-span-3 glass rounded-2xl p-6 relative overflow-hidden">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Trend</div>
          <div className="text-base font-semibold mb-4">Consistency Over Time</div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={consistencyData.trend}>
                <defs>
                  <linearGradient id="consistencyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                />
                <Area type="monotone" dataKey="score" stroke="#06B6D4" fill="url(#consistencyGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Drift Detection */}
      <motion.div variants={item}>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Detection</div>
        <div className="text-base font-semibold mb-4">Drift Alerts</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {consistencyData.drifts.map((d) => (
            <div key={d.type} className={`glass rounded-xl p-5 border ${severityColors[d.severity].split(" ").slice(1).join(" ")}`}>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className={`size-4 ${severityColors[d.severity].split(" ")[0]}`} />
                <div className="text-sm font-medium">{d.type} Drift</div>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold ${severityColors[d.severity]}`}>
                  {d.severity}
                </span>
              </div>
              <div className="text-xs text-foreground/80 mb-2">{d.description}</div>
              <div className="text-[11px] text-muted-foreground italic">"{d.example}"</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Content Audit */}
      <motion.div variants={item}>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Audit</div>
        <div className="text-base font-semibold mb-4">Recent Content</div>
        <div className="glass rounded-2xl overflow-hidden">
          {consistencyData.recentContent.map((c, idx) => (
            <div key={c.id} className={`flex items-center gap-4 px-5 py-3.5 ${idx !== 0 ? "border-t border-white/5" : ""} hover:bg-white/[0.02] transition`}>
              <div className="size-8 grid place-items-center rounded-lg bg-white/5 text-xs font-medium text-muted-foreground shrink-0">
                {c.platform.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{c.title}</div>
                <div className="text-[11px] text-muted-foreground">{c.platform} · {c.date}</div>
              </div>
              <div className="text-sm font-semibold tabular-nums" style={{ color: c.score >= 90 ? "#06B6D4" : c.score >= 70 ? "#EAB308" : "#EF4444" }}>
                {c.score}
              </div>
              <span className={`text-[9px] px-2 py-1 rounded-full font-medium ${statusColors[c.status]}`}>
                {statusLabels[c.status]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Alignment Suggestions */}
      <motion.div variants={item}>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-1">Recommendations</div>
        <div className="text-base font-semibold mb-4">Alignment Suggestions</div>
        <div className="space-y-3">
          {consistencyData.suggestions.map((s) => (
            <div key={s.id} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedSuggestion(expandedSuggestion === s.id ? null : s.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition"
              >
                <div className="size-8 grid place-items-center rounded-lg bg-violet/15 text-violet shrink-0">
                  <CheckCircle2 className="size-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{s.title}</div>
                  <div className="text-[11px] text-muted-foreground">{s.description}</div>
                </div>
                <span className="text-xs text-cyan shrink-0">{s.impact}</span>
                <ArrowRight className={`size-4 text-muted-foreground transition-transform ${expandedSuggestion === s.id ? "rotate-90" : ""}`} />
              </button>
              {expandedSuggestion === s.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-5 pb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                      <div className="text-[9px] uppercase tracking-widest text-red-400 mb-1">Before</div>
                      <div className="text-xs text-foreground/70 italic">{s.before}</div>
                    </div>
                    <div className="rounded-lg border border-cyan/20 bg-cyan/5 p-3">
                      <div className="text-[9px] uppercase tracking-widest text-cyan mb-1">After</div>
                      <div className="text-xs text-foreground/90 italic">{s.after}</div>
                    </div>
                  </div>
                  <button className="mt-3 text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-violet to-cyan text-white font-medium hover:-translate-y-0.5 transition">
                    Apply Suggestion
                  </button>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
