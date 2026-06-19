import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/mirror/Sidebar";
import { EvolutionTracker } from "@/components/mirror/EvolutionTracker";

export const Route = createFileRoute("/evolution")({
  head: () => ({
    meta: [
      { title: "MIRROR — Identity Evolution Tracker" },
      { name: "description", content: "Track how your creative identity evolves over time." },
    ],
  }),
  component: EvolutionPage,
});

function EvolutionPage() {
  return (
    <div className="min-h-screen flex relative">
      <Sidebar />

      <main className="flex-1 relative z-10 flex flex-col">
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6">
          <div className="text-xs text-muted-foreground">
            <span className="text-foreground/70">Evolution</span> <span className="mx-2 opacity-40">/</span> Timeline
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-cyan animate-pulse" /> Twin active
            </div>
            <div className="size-8 rounded-full bg-gradient-to-br from-violet to-cyan grid place-items-center text-xs font-semibold">
              N
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto">
          <EvolutionTracker />
        </div>
      </main>
    </div>
  );
}
