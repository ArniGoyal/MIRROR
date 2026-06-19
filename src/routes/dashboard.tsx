import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/mirror/Sidebar";
import { StyleDNAProfile } from "@/components/mirror/StyleDNAProfile";
import { StyleMetrics } from "@/components/mirror/StyleMetrics";
import { PlatformCards } from "@/components/mirror/PlatformCards";
import { ContentPatterns } from "@/components/mirror/ContentPatterns";
import { AudienceEngagement } from "@/components/mirror/AudienceEngagement";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "MIRROR — Style DNA Dashboard" },
      { name: "description", content: "Explore your creator voice, Style DNA analysis, and audience metrics." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen flex relative">
      <Sidebar />

      <main className="flex-1 relative z-10 flex flex-col">
        {/* Top bar */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6">
          <div className="text-xs text-muted-foreground">
            <span className="text-foreground/70">My Mirror</span> <span className="mx-2 opacity-40">/</span> Style DNA
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

        {/* Dashboard Content */}
        <div className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto space-y-8">
          <StyleDNAProfile />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <PlatformCards />
              <ContentPatterns />
            </div>
            <div className="space-y-8">
              <StyleMetrics />
              <AudienceEngagement />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
