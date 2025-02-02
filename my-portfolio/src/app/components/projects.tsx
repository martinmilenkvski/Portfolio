"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import ProjectItem from "./ProjectItem";
import HoverPreview from "./HoverPreview";

interface Project {
  id: string;
  number: string;
  title: string;
  image: string;
}

const projects: Project[] = [
  { id: "01", number: "01", title: "KONTRANS", image: "https://picsum.photos/seed/brand/300/400" },
  { id: "02", number: "02", title: "OSA ENGENEERING", image: "https://picsum.photos/seed/digital/300/200" },
  { id: "03", number: "03", title: "OFFICE PLANNER", image: "https://picsum.photos/seed/video/300/200" },
  { id: "04", number: "04", title: "WEB PREDENCE", image: "https://picsum.photos/seed/web/300/200" },
  { id: "05", number: "05", title: "CREATIVE DIRECTR", image: "https://picsum.photos/seed/creative/300/200" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.8, ease: "easeOut" } }
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
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen text-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-xl mb-20 text-center"
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
            <ProjectItem
              key={project.id}
              project={project}
              isInView={isInView}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            />
          ))}
        </motion.div>
      </div>
      <HoverPreview hoveredProject={hoveredProject} mousePosition={mousePosition} />
    </section>
  );
}