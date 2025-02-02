"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  number: string;
  title: string;
  image: string;
}

interface ProjectItemProps {
  project: Project;
  isInView: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.4
    }
  }
};

const hoverVariants = {
  initial: { opacity: 1 },
  hover: {
    opacity: 0.7,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export default function ProjectItem({
  project,
  isInView,
  onMouseEnter,
  onMouseLeave
}: ProjectItemProps) {
  return (
    <Link href={`/projects/${project.id}`} key={project.id}>
      <motion.div
        className="group cursor-pointer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        variants={itemVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover="hover"
      >
        <div className="flex items-baseline gap-4 overflow-hidden">
          <motion.span
            className="text-lg opacity-50"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            {project.number}
          </motion.span>
          <motion.h3
            className="text-6xl md:text-8xl font-bold tracking-tighter"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            variants={hoverVariants}
          >
            {project.title}
          </motion.h3>
        </div>
      </motion.div>
    </Link>
  );
}
