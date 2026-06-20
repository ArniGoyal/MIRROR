import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle2, ArrowRight, TrendingUp, Send, Sparkles, Copy, FileText } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { consistencyData } from "@/lib/mock-data";
import { auditContentFn } from "@/api/consistency";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

const severityColors = { low: "text-cyan border-cyan/30 bg-cyan/10", medium: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10", high: "text-red-400 border-red-400/30 bg-red-400/10" };
const statusColors = { aligned: "bg-cyan/20 text-cyan", drifting: "bg-yellow-400/20 text-yellow-400", misaligned: "bg-red-400/20 text-red-400" };
const statusLabels = { aligned: "Aligned", drifting: "Drifting", misaligned: "Misaligned" };

interface AuditResult {
  consistencyScore: number;
  overallVerdict: string;
  strengths: string[];
  drifts: { type: string; severity: string; description: string; suggestion: string }[];
  rewrittenVersion: string;
}

const platformOptions = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "X / Twitter" },
  { id: "instagram", label: "Instagram" },
  { id: "youtube", label: "YouTube" },
];

export function ConsistencyGuardian() {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);
  
  // Live audit state
  const [auditContent, setAuditContent] = useState("");
  const [auditPlatform, setAuditPlatform] = useState("linkedin");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [auditAnimatedScore, setAuditAnimatedScore] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(consistencyData.overallScore), 300);
    return () => clearTimeout(timer);
  }, []);

  // Animate audit score
  useEffect(() => {
    if (auditResult) {
      const timer = setTimeout(() => setAuditAnimatedScore(auditResult.consistencyScore), 300);
      return () => clearTimeout(timer);
    }
  }, [auditResult]);

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (circumference * animatedScore) / 100;
  const scoreColor = animatedScore >= 90 ? "#06B6D4" : animatedScore >= 70 ? "#EAB308" : "#EF4444";

  // Audit circle values
  const auditCircumference = 2 * Math.PI * 54;
  const auditStrokeDashoffset = auditCircumference - (auditCircumference * auditAnimatedScore) / 100;
  const auditScoreColor = auditAnimatedScore >= 80 ? "#06B6D4" : auditAnimatedScore >= 60 ? "#EAB308" : "#EF4444";
  const verdictColor = auditResult?.overallVerdict === "Aligned" ? "text-cyan" : auditResult?.overallVerdict === "Drifting" ? "text-yellow-400" : "text-red-400";

  const handleAudit = async () => {
    if (!auditContent.trim()) return;
    setIsAuditing(true);
    setAuditResult(null);
    setAuditAnimatedScore(0);

    try {
      const result = await auditContentFn({ data: { content: auditContent, platform: auditPlatform } });
      if (result.success && result.audit) {
        setAuditResult(result.audit);
      }
    } catch (e) {
      console.error("Audit failed:", e);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleCopyRewrite = () => {
    if (auditResult?.rewrittenVersion) {
      navigator.clipboard.writeText(auditResult.rewrittenVersion);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

      {/* ─── LIVE CONTENT AUDIT PANEL ─────────────────────────────────── */}
      <motion.div variants={item}>
        <div className="glass rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute -top-32 -right-32 size-72 rounded-full bg-violet/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 grid place-items-center rounded-lg bg-gradient-to-br from-violet to-cyan">
                <FileText className="size-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold">Check My Content</div>
                <div className="text-[11px] text-muted-foreground">Paste any content and AI will audit it against your Style DNA</div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Platform selector */}
              <div className="flex gap-2">
                {platformOptions.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setAuditPlatform(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      auditPlatform === p.id
                        ? "bg-violet/15 text-violet border border-violet/30"
                        : "border border-white/8 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Content textarea */}
              <textarea
                value={auditContent}
                onChange={(e) => setAuditContent(e.target.value)}
                placeholder="Paste your content here… e.g. a LinkedIn post, tweet, or Instagram caption you want to check for brand consistency."
                rows={4}
                className="w-full bg-transparent border border-white/8 rounded-xl p-4 text-sm text-foreground/90 placeholder:text-muted-foreground/40 outline-none focus:border-violet/40 transition resize-none"
              />

              {/* Audit button */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">{auditContent.length} characters</span>
                <button
                  onClick={handleAudit}
                  disabled={isAuditing || !auditContent.trim()}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition disabled:opacity-50 disabled:translate-y-0"
                >
                  {isAuditing ? (
                    <>
                      <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Auditing…
                    </>
                  ) : (
                    <>
                      <Send className="size-4" /> Audit Content
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── AUDIT RESULTS ────────────────────────────────────────────── */}
      {isAuditing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <div className="relative mx-auto size-20 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet/30 to-cyan/20 blur-xl animate-pulse" />
            <div className="absolute inset-2 rounded-full border-2 border-violet/40 animate-[spin_3s_linear_infinite]" />
            <div className="absolute inset-5 rounded-full border-2 border-cyan/40 animate-[spin_2s_linear_infinite_reverse]" />
            <div className="absolute inset-0 grid place-items-center">
              <Shield className="size-6 text-cyan" />
            </div>
          </div>
          <div className="text-sm font-medium text-muted-foreground animate-pulse">
            Analyzing content against your Style DNA…
          </div>
          <div className="text-[11px] text-muted-foreground/60 mt-2">Powered by Google Gemini</div>
        </motion.div>
      )}

      {auditResult && !isAuditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Score + Verdict */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Score gauge */}
            <div className="lg:col-span-2 glass rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute -top-20 -left-20 size-48 rounded-full bg-cyan/10 blur-3xl" />
              <div className="absolute top-3 right-3">
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-cyan/15 text-cyan font-bold uppercase tracking-wider">
                  LIVE
                </span>
              </div>
              <div className="relative">
                <svg width="140" height="140" viewBox="0 0 120 120" className="transform -rotate-90">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="54" fill="none"
                    stroke={auditScoreColor} strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={auditCircumference} strokeDashoffset={auditStrokeDashoffset}
                    style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold" style={{ color: auditScoreColor }}>{auditAnimatedScore}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Score</div>
                </div>
              </div>
              <div className={`mt-3 text-sm font-semibold ${verdictColor}`}>
                {auditResult.overallVerdict}
              </div>
            </div>

            {/* Strengths + Drifts */}
            <div className="lg:col-span-3 space-y-4">
              {/* Strengths */}
              {auditResult.strengths.length > 0 && (
                <div className="glass rounded-2xl p-5">
                  <div className="text-[11px] uppercase tracking-widest text-cyan mb-3 flex items-center gap-2">
                    <CheckCircle2 className="size-3.5" /> Strengths
                  </div>
                  <div className="space-y-2">
                    {auditResult.strengths.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                        <CheckCircle2 className="size-3.5 text-cyan shrink-0 mt-0.5" />
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Drifts */}
              {auditResult.drifts.length > 0 && (
                <div className="glass rounded-2xl p-5">
                  <div className="text-[11px] uppercase tracking-widest text-yellow-400 mb-3 flex items-center gap-2">
                    <AlertTriangle className="size-3.5" /> Detected Drifts
                  </div>
                  <div className="space-y-3">
                    {auditResult.drifts.map((d, i) => (
                      <div key={i} className={`rounded-xl p-4 border ${
                        severityColors[d.severity as keyof typeof severityColors] || severityColors.medium
                      }`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium">{d.type} Drift</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                            severityColors[d.severity as keyof typeof severityColors] || severityColors.medium
                          }`}>
                            {d.severity}
                          </span>
                        </div>
                        <div className="text-xs text-foreground/80 mb-2">{d.description}</div>
                        <div className="text-[11px] text-muted-foreground italic">
                          💡 Fix: {d.suggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Rewritten Version */}
          {auditResult.rewrittenVersion && (
            <div className="glass rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 size-48 rounded-full bg-cyan/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-cyan" />
                    <div className="text-sm font-semibold">Style DNA Rewrite</div>
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-cyan/15 text-cyan font-bold uppercase tracking-wider">AI</span>
                  </div>
                  <button
                    onClick={handleCopyRewrite}
                    className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-muted-foreground hover:text-foreground transition flex items-center gap-1"
                  >
                    <Copy className="size-3" /> {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="rounded-xl border border-cyan/20 bg-cyan/[0.02] p-4">
                  <div className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {auditResult.rewrittenVersion}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── HISTORICAL DATA SECTION ─────────────────────────────────── */}
      <motion.div variants={item} className="pt-4">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4">Historical Overview</div>
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
