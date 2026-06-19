import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, X } from "lucide-react";

export function SuccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="relative glass rounded-2xl p-8 max-w-md w-full text-center glow-violet"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>

            <div className="relative mx-auto size-20 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet to-cyan blur-xl opacity-70 animate-pulse" />
              <div className="relative size-full rounded-full bg-gradient-to-br from-violet to-cyan grid place-items-center">
                <Sparkle className="size-9 text-white" />
              </div>
            </div>

            <div className="text-xs uppercase tracking-[0.25em] text-cyan mb-2">Initialized</div>
            <h3 className="text-2xl font-bold mb-2">Style DNA Initialized</h3>
            <p className="text-muted-foreground mb-6">Welcome to MIRROR.</p>

            <button
              onClick={onClose}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold bg-gradient-to-r from-violet to-cyan text-white"
            >
              Enter Generation Studio
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
