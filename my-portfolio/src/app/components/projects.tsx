"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

interface Project {
  id: string;
  number: string;
  title: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "01",
    number: "01",
    title: "KONTRANS",
    image: "https://picsum.photos/seed/brand/300/200",
  },
  {
    id: "02",
    number: "02",
    title: "OSA ENGENEERING",
    image: "https://picsum.photos/seed/digital/300/200",
  },
  {
    id: "03",
    number: "03",
    title: "OFFICE PLANNER",
    image: "https://picsum.photos/seed/video/300/200",
  },
  {
    id: "04",
    number: "04",
    title: "WEB PREDENCE",
    image: "https://picsum.photos/seed/web/300/200",
  },
  {
    id: "05",
    number: "05",
    title: "CREATIVE DIRECTR",
    image: "https://picsum.photos/seed/creative/300/200",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Increased stagger
      delayChildren: 0.5,    // Increased delay
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.4 // Added delay
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.7, // Increased delay
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen text-white py-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-xl mb-20 text-center" // Increased font size from text-sm to text-xl
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          OUR PROJECTS
        </motion.h2>
        <motion.div
          className="space-y-8 flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              variants={itemVariants}
            >
              <div className="flex items-baseline gap-4 overflow-hidden">
                <motion.span
                  className="text-lg opacity-50" // Increased font size from text-sm to text-lg
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.5 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }} // Added delay
                >
                  {project.number}
                </motion.span>
                <motion.h3
                  className="text-6xl md:text-8xl font-bold tracking-tighter" // Increased font size
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} // Added delay
                >
                  {project.title}
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed pointer-events-none w-[300px] h-[200px] z-10000" // Changed z-index from z-50 to z-10000
            style={{
              top: 0,
              left: 0,
              transform: `translate(-50%, -50%)`,
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
    </section>
  );
}