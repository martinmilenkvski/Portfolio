"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HoverPreviewProps {
  hoveredProject: { image: string; title: string } | null;
  mousePosition: { x: number; y: number };
}

export default function HoverPreview({ hoveredProject, mousePosition }: HoverPreviewProps) {
  return (
    <AnimatePresence>
      {hoveredProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: mousePosition.x,
            y: mousePosition.y
          }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed pointer-events-none w-[300px] h-[200px] z-10000"
          style={{
            top: 0,
            left: 0,
            transform: `translate(-50%, -50%)`
          }}
        >
          <Image
            src={hoveredProject.image || "/placeholder.svg"}
            alt={hoveredProject.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
