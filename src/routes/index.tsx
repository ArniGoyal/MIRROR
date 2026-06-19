import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/mirror/Sidebar";
import { SearchHero } from "@/components/mirror/SearchHero";
import { LoadingSequence } from "@/components/mirror/LoadingSequence";
import { PlaybookDashboard } from "@/components/mirror/PlaybookDashboard";
import { SuccessModal } from "@/components/mirror/SuccessModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MIRROR — Playbook Engine" },
      { name: "description", content: "Discover the Style DNA of top creators in any niche and seed your AI creative twin." },
    ],
  }),
  component: Index,
});

type Stage = "search" | "loading" | "results";

function Index() {
  const [stage, setStage] = useState<Stage>("search");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);

  return (
    <div className="min-h-screen flex relative">
      <Sidebar />

      <main className="flex-1 relative z-10 flex flex-col">
        {/* Top bar */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6">
          <div className="text-xs text-muted-foreground">
            <span className="text-foreground/70">Playbook Engine</span> <span className="mx-2 opacity-40">/</span> Discovery
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-cyan animate-pulse" /> Twin offline
            </div>
            <div className="size-8 rounded-full bg-gradient-to-br from-violet to-cyan grid place-items-center text-xs font-semibold">
              N
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 sm:px-8 py-10 sm:py-16">
          <AnimatePresence mode="wait">
            {stage === "search" && (
              <SearchHero
                key="search"
                onSearch={(q) => {
                  setQuery(q);
                  setStage("loading");
                }}
              />
            )}
            {stage === "loading" && (
              <LoadingSequence
                key="loading"
                query={query}
                onDone={() => setStage("results")}
              />
            )}
            {stage === "results" && (
              <PlaybookDashboard
                key="results"
                query={query}
                onReset={() => { setStage("search"); setQuery(""); }}
                onSeed={() => setModal(true)}
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      <SuccessModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
