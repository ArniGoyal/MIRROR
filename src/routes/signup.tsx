import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Sparkle, Eye, EyeOff, ArrowRight, Mail, Lock, User } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "MIRROR — Sign Up" },
      { name: "description", content: "Create your MIRROR account and build your AI creative twin." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate({ to: "/dashboard" });
    }, 800);
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -15, 0], rotateZ: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[8%] size-28 rounded-3xl border border-cyan/15 bg-cyan/5 backdrop-blur-sm"
          style={{ transform: "perspective(800px) rotateX(12deg) rotateY(15deg)" }}
        />
        <motion.div
          animate={{ y: [0, 14, 0], rotateZ: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute bottom-[25%] left-[12%] size-20 rounded-full border border-violet/15 bg-violet/5 backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute top-[55%] right-[25%] size-14 rounded-xl border border-cyan/10 bg-cyan/3"
          style={{ transform: "perspective(600px) rotateY(-20deg)" }}
        />
      </div>

      {/* Left panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="size-9 rounded-lg bg-gradient-to-br from-violet to-cyan grid place-items-center">
              <Sparkle className="size-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-base font-bold text-gradient">MIRROR</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">Create your account</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Already have an account?{" "}
            <Link to="/login" className="text-violet hover:text-violet/80 font-medium transition">
              Log in
            </Link>
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-violet/40 focus:ring-1 focus:ring-violet/20 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-violet/40 focus:ring-1 focus:ring-violet/20 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-violet/40 focus:ring-1 focus:ring-violet/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                >
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer">
              <input type="checkbox" className="size-3.5 rounded border-white/20 bg-white/5 accent-violet mt-0.5" />
              <span>I agree to the <a href="#" className="text-violet hover:text-violet/80">Terms of Service</a> and <a href="#" className="text-violet hover:text-violet/80">Privacy Policy</a></span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:-translate-y-0.5 transition disabled:opacity-60 disabled:translate-y-0"
            >
              {loading ? (
                <>
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating your twin…
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/8" /></div>
            <div className="relative flex justify-center"><span className="bg-[var(--background)] px-3 text-xs text-muted-foreground">or sign up with</span></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => { setLoading(true); setTimeout(() => navigate({ to: "/dashboard" }), 800); }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-foreground/80 hover:border-white/20 hover:bg-white/[0.06] transition"
            >
              <svg className="size-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button
              onClick={() => { setLoading(true); setTimeout(() => navigate({ to: "/dashboard" }), 800); }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-foreground/80 hover:border-white/20 hover:bg-white/[0.06] transition"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right panel — branding (desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-12 rounded-xl bg-gradient-to-br from-violet to-cyan grid place-items-center glow-violet">
              <Sparkle className="size-6 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gradient">MIRROR</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Creative Twin</div>
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight leading-tight mb-4">
            Build your
            <br />
            <span className="text-gradient">creative twin.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            MIRROR learns your unique voice from your content across platforms and deploys as your AI alter ego — generating content that sounds unmistakably like you.
          </p>

          {/* Feature previews */}
          <div className="space-y-3">
            {[
              { emoji: "🧬", text: "Style DNA extracted from your content" },
              { emoji: "✨", text: "AI alter ego that writes in your voice" },
              { emoji: "🛡️", text: "Brand consistency monitoring" },
              { emoji: "📈", text: "Identity evolution tracking" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3 text-sm text-foreground/80">
                <span className="text-base">{f.emoji}</span>
                {f.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
