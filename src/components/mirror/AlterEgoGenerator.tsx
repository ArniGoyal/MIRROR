import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, Sparkles, Copy, RefreshCcw, CheckCircle2, ArrowLeftRight, Wand2 } from "lucide-react";
import { generationExamples } from "@/lib/mock-data";
import { generateContentFn } from "@/api/generate";

const platformOptions = [
  { id: "linkedin", label: "LinkedIn", icon: "in" },
  { id: "twitter", label: "X / Twitter", icon: "𝕏" },
  { id: "instagram", label: "Instagram", icon: "📷" },
];

type Stage = "input" | "generating" | "result";

export function AlterEgoGenerator() {
  const [platform, setPlatform] = useState("linkedin");
  const [prompt, setPrompt] = useState("");
  const [stage, setStage] = useState<Stage>("input");
  const [showComparison, setShowComparison] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [generatedResult, setGeneratedResult] = useState("");
  const [consistencyScore, setConsistencyScore] = useState(0);

  const data = generationExamples[platform];

  const generate = async (currentPrompt?: string) => {
    const textToGenerate = currentPrompt || prompt.trim() || data.prompt;
    if (!textToGenerate) return;
    
    // Update the textarea to show what we are actually generating if it was empty
    if (!prompt.trim()) {
      setPrompt(textToGenerate);
    }
    
    setStage("generating");
    setTypedText("");
    
    try {
      const result = await generateContentFn({ data: { prompt: textToGenerate, platform } });
      setGeneratedResult(result.text);
      setConsistencyScore(result.consistencyScore);
      setStage("result");
    } catch (e) {
      console.error(e);
      // Fallback
      setGeneratedResult(data.mirrorOutput);
      setConsistencyScore(85);
      setStage("result");
    }
  };

  // Typing effect
  useEffect(() => {
    if (stage !== "result" || !generatedResult) return;
    const text = generatedResult;
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 8);
    return () => clearInterval(interval);
  }, [stage, generatedResult]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setStage("input");
    setPrompt("");
    setTypedText("");
    setShowComparison(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-cyan mb-3">
          <Wand2 className="size-3.5" /> AI Alter Ego · Your Voice, Amplified
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Generate as <span className="text-gradient">You</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Content that sounds authentically like you — powered by your Style DNA.
        </p>
      </motion.div>

      {/* Platform selector */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2"
      >
        {platformOptions.map((p) => (
          <button
            key={p.id}
            onClick={() => { setPlatform(p.id); if (stage === "result") reset(); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              platform === p.id
                ? "glass glow-violet text-foreground"
                : "border border-white/8 bg-white/[0.02] text-muted-foreground hover:text-foreground hover:border-white/15"
            }`}
          >
            <span className="text-base">{p.icon}</span>
            {p.label}
          </button>
        ))}
      </motion.div>

      {/* Input / Output area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-6 flex flex-col"
        >
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">Your Prompt</div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={data.prompt}
            rows={5}
            className="flex-1 w-full bg-transparent border border-white/8 rounded-xl p-4 text-sm text-foreground/90 placeholder:text-muted-foreground/50 outline-none focus:border-violet/40 transition resize-none"
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-[11px] text-muted-foreground">{prompt.length} characters</span>
            <button
              onClick={() => generate()}
              disabled={stage === "generating"}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition disabled:opacity-50 disabled:translate-y-0"
            >
              {stage === "generating" ? (
                <>
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Generate
                </>
              )}
            </button>
          </div>

          {/* Style DNA being used */}
          {(stage === "result" || stage === "generating") && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 rounded-xl border border-violet/20 bg-violet/5 p-4"
            >
              <div className="text-[10px] uppercase tracking-widest text-violet mb-2">Style DNA Applied</div>
              <div className="flex flex-wrap gap-1.5">
                {data.patternsUsed.map((p) => (
                  <span key={p} className="text-[10px] px-2 py-1 rounded-full border border-violet/30 bg-violet/10 text-foreground/80">
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right: Output */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 flex flex-col relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 size-48 rounded-full bg-violet/10 blur-3xl" />

          <div className="relative flex items-center justify-between mb-3">
            <div className="text-[11px] uppercase tracking-widest text-cyan">
              {showComparison ? "Comparison View" : "MIRROR Output"}
            </div>
            {stage === "result" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="text-[10px] px-2.5 py-1.5 rounded-lg border border-white/10 text-muted-foreground hover:text-foreground transition flex items-center gap-1"
                >
                  <ArrowLeftRight className="size-3" />
                  {showComparison ? "MIRROR only" : "Compare"}
                </button>
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <AnimatePresence mode="wait">
              {stage === "input" && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex items-center justify-center h-48 text-center"
                >
                  <div>
                    <Sparkles className="size-8 text-muted-foreground/30 mx-auto mb-3" />
                    <div className="text-sm text-muted-foreground">Your generated content will appear here</div>
                    <div className="text-[11px] text-muted-foreground/60 mt-1">Click "Generate" or try the demo prompt</div>
                  </div>
                </motion.div>
              )}

              {stage === "generating" && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex items-center justify-center h-48"
                >
                  <div className="text-center">
                    <div className="relative mx-auto size-16 mb-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet/30 to-cyan/20 blur-xl animate-pulse" />
                      <div className="absolute inset-2 rounded-full border border-violet/40 animate-[spin_3s_linear_infinite]" />
                      <div className="absolute inset-4 rounded-full border border-cyan/40 animate-[spin_2s_linear_infinite_reverse]" />
                      <div className="absolute inset-0 grid place-items-center">
                        <Sparkles className="size-5 text-cyan" />
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Applying Style DNA…</div>
                  </div>
                </motion.div>
              )}

              {stage === "result" && !showComparison && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="rounded-xl border border-white/8 bg-black/30 p-4 mb-4 max-h-[320px] overflow-y-auto">
                    <div className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">{typedText}</div>
                    {typedText.length < generatedResult.length && (
                      <span className="inline-block w-0.5 h-4 bg-cyan animate-pulse ml-0.5" />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-cyan" />
                      <span className="text-xs text-muted-foreground">
                        Consistency: <span className="text-foreground font-medium">{consistencyScore}%</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={handleCopy} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-muted-foreground hover:text-foreground transition flex items-center gap-1">
                        <Copy className="size-3" /> {copied ? "Copied!" : "Copy"}
                      </button>
                      <button onClick={reset} className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-muted-foreground hover:text-foreground transition flex items-center gap-1">
                        <RefreshCcw className="size-3" /> New
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {stage === "result" && showComparison && (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 max-h-[160px] overflow-y-auto">
                    <div className="text-[10px] uppercase tracking-widest text-red-400 mb-2">Generic AI Output</div>
                    <div className="text-xs text-foreground/70 whitespace-pre-wrap leading-relaxed">{data.genericOutput}</div>
                  </div>
                  <div className="rounded-xl border border-cyan/20 bg-cyan/5 p-4 max-h-[160px] overflow-y-auto">
                    <div className="text-[10px] uppercase tracking-widest text-cyan mb-2">MIRROR Output</div>
                    <div className="text-xs text-foreground/90 whitespace-pre-wrap leading-relaxed">{generatedResult}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
