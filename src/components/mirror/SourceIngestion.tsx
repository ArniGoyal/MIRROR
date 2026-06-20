import { motion } from "framer-motion";
import { useState } from "react";
import { mockSources } from "@/lib/mock-data";
import { ArrowRight, Link, FileText, Video, Image as ImageIcon } from "lucide-react";

interface Props {
  onContinue: (sources: { type: string; content: string; url?: string }[]) => void;
}

export function SourceIngestion({ onContinue }: Props) {
  const [sources] = useState(mockSources);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-cyan mb-3">Step 4 of 6</div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
          Extract <span className="text-gradient">Style DNA</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          MIRROR will analyze these sources to extract your Tone, Hook Pattern, and CTA Style.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {sources.map((src, i) => (
          <motion.div
            key={src.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-5 border border-white/5"
          >
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/5">
              <div className="size-8 rounded-full bg-violet/15 text-violet grid place-items-center">
                {src.type === "video_transcript" && <Video className="size-4" />}
                {src.type === "image_caption" && <ImageIcon className="size-4" />}
                {src.type === "text" && <FileText className="size-4" />}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground/90">{src.platform}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {src.type.replace("_", " ")}
                </div>
              </div>
              <div className="ml-auto">
                <Link className="size-4 text-white/20" />
              </div>
            </div>
            
            {src.type === "image" && src.url && (
              <div className="mb-4 rounded-lg overflow-hidden border border-white/10 aspect-video">
                <img src={src.url} alt="Source" className="w-full h-full object-cover" />
              </div>
            )}
            
            {src.type === "video" && src.url && (
              <div className="mb-4 rounded-lg overflow-hidden border border-white/10 aspect-video">
                <video src={src.url} controls muted className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="text-sm text-foreground/70 leading-relaxed whitespace-pre-wrap">
              {src.content.length > 150 ? src.content.substring(0, 150) + "..." : src.content}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => onContinue(sources.map(s => ({ type: s.type, content: s.content, url: s.url })))}
          className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:-translate-y-0.5 transition"
        >
          Synthesize Style DNA <ArrowRight className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}
