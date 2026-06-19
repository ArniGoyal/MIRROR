import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/mirror/Sidebar";
import { ConsistencyGuardian } from "@/components/mirror/ConsistencyGuardian";

export const Route = createFileRoute("/consistency")({
  head: () => ({
    meta: [
      { title: "MIRROR — Brand Consistency Guardian" },
      { name: "description", content: "Monitor and prevent content drift. Keep your brand voice consistent." },
    ],
  }),
  component: ConsistencyPage,
});

function ConsistencyPage() {
  return (
    <div className="min-h-screen flex relative">
      <Sidebar />

      <main className="flex-1 relative z-10 flex flex-col">
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6">
          <div className="text-xs text-muted-foreground">
            <span className="text-foreground/70">Consistency Guard</span> <span className="mx-2 opacity-40">/</span> Monitor
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
          <ConsistencyGuardian />
        </div>
      </main>
    </div>
  );
}
