import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/mirror/Sidebar";
import { InterestSelector } from "@/components/mirror/InterestSelector";
import { CreatorShowcase } from "@/components/mirror/CreatorShowcase";
import { PersonalStyleBuilder } from "@/components/mirror/PersonalStyleBuilder";
import { StyleBlueprint } from "@/components/mirror/StyleBlueprint";
import { GrowthRoadmap } from "@/components/mirror/GrowthRoadmap";
import { LoadingSequence } from "@/components/mirror/LoadingSequence";
import { SuccessModal } from "@/components/mirror/SuccessModal";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "MIRROR — Creator Discovery Mode" },
      { name: "description", content: "Discover your creative identity. Learn from top creators. Build your unique style." },
    ],
  }),
  component: DiscoverPage,
});

type Step = "interests" | "loading" | "creators" | "style-builder" | "blueprint" | "roadmap";

function DiscoverPage() {
  const [step, setStep] = useState<Step>("interests");
  const [modal, setModal] = useState(false);

  return (
    <div className="min-h-screen flex relative">
      <Sidebar />

      <main className="flex-1 relative z-10 flex flex-col">
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6">
          <div className="text-xs text-muted-foreground">
            <span className="text-foreground/70">Discovery Mode</span> <span className="mx-2 opacity-40">/</span>
            {step === "interests" && "Select Interests"}
            {step === "loading" && "Analyzing…"}
            {step === "creators" && "Creator Patterns"}
            {step === "style-builder" && "Style Builder"}
            {step === "blueprint" && "Blueprint"}
            {step === "roadmap" && "Roadmap"}
          </div>
          <div className="flex items-center gap-3">
            {/* Step indicator */}
            <div className="hidden sm:flex items-center gap-1.5">
              {(["interests", "loading", "creators", "style-builder", "blueprint", "roadmap"] as const).map((s, i) => {
                const steps: Step[] = ["interests", "loading", "creators", "style-builder", "blueprint", "roadmap"];
                const currentIdx = steps.indexOf(step);
                const thisIdx = i;
                return (
                  <div
                    key={s}
                    className={`size-1.5 rounded-full transition-all ${
                      thisIdx <= currentIdx
                        ? "bg-gradient-to-r from-violet to-cyan scale-110"
                        : "bg-white/15"
                    }`}
                  />
                );
              })}
            </div>
            <div className="size-8 rounded-full bg-gradient-to-br from-violet to-cyan grid place-items-center text-xs font-semibold">
              N
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 sm:px-8 py-10 sm:py-16 overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === "interests" && (
              <InterestSelector
                key="interests"
                onContinue={() => setStep("loading")}
              />
            )}

            {step === "loading" && (
              <LoadingSequence
                key="loading"
                query="your selected niches"
                onDone={() => setStep("creators")}
              />
            )}

            {step === "creators" && (
              <CreatorShowcase
                key="creators"
                onContinue={() => setStep("style-builder")}
              />
            )}

            {step === "style-builder" && (
              <PersonalStyleBuilder
                key="builder"
                onContinue={() => setStep("blueprint")}
              />
            )}

            {step === "blueprint" && (
              <StyleBlueprint
                key="blueprint"
                onContinue={() => setStep("roadmap")}
              />
            )}

            {step === "roadmap" && (
              <GrowthRoadmap
                key="roadmap"
                onFinish={() => setModal(true)}
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      <SuccessModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}
