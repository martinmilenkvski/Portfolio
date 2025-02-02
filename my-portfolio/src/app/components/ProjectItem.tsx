"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  number: string;
  title: string;
  image: string;
}

// The props expected by the ProjectItem component:
// • project: the Project object to be displayed.
// • isInView: a boolean indicating if the component is within the viewport (used for triggering animations).
// • onMouseEnter: a callback function executed when the mouse enters the component.
// • onMouseLeave: a callback function executed when the mouse leaves the component.

interface ProjectItemProps {
  project: Project;
  isInView: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

// Define variants for the container animation using framer-motion.
// These variants describe the starting point ("hidden") and the final state ("visible")
// including transition properties.

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring", // Use a spring physics animation for a natural effect.
      stiffness: 100, // Stiffness of the spring.
      damping: 10,    // Damping to control overshooting.
      delay: 0.1      // Delay before starting the transition.
    }
  }
};

// Define variants for the hover state animation.
// This variant reduces opacity quickly on hover, creating a subtle fade effect.
const hoverVariants = {
  initial: { opacity: 1 },
  hover: {
    opacity: 0.3,
    transition: { duration: 0.1, ease: "easeOut" } // Quick transition for hover effect.
  }
};


export default function ProjectItem({
  project,
  isInView,
  onMouseEnter,
  onMouseLeave
}: ProjectItemProps) {

  // The Link component wraps the entire project item to provide
  // client-side navigation to the project details page based on the project id.
  
  return (
    <Link href={`/projects/${project.id}`} key={project.id}>
      {/* motion.div is used instead of a normal div to enable animation properties */}
      <motion.div
        className="group cursor-pointer"
        onMouseEnter={onMouseEnter} // Trigger the onMouseEnter callback when mouse enters.
        onMouseLeave={onMouseLeave} // Trigger the onMouseLeave callback when mouse leaves.
        variants={itemVariants}     // Apply the defined animation variants.
        initial="hidden"            // Starting animation state.
        animate={isInView ? "visible" : "hidden"} // Animate to visible state if in view.
        whileHover="hover"          // Use the hover state from hoverVariants when hovered.
      >
        {/* Container for project number and title */}
        <div className="flex items-baseline gap-4 overflow-hidden">
          {/* Animated span for the project number */}
          <motion.span
            className="text-lg opacity-50"
            // Initial animation properties for the number text.
            initial={{ y: 20, opacity: 0 }}
            // Animate to a slightly visible state on load.
            animate={{ y: 0, opacity: 0.5 }}
            // Transition settings to control the timing and easing of the animation.
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            {project.number}
          </motion.span>
          {/* Animated heading for the project title */}
          <motion.h3
            className="text-6xl md:text-8xl font-bold tracking-tighter"
            // Initially start with the text offset vertically.
            initial={{ y: 100 }}
            // Animate the title into its final position.
            animate={{ y: 0 }}
            // Transition settings for smooth motion.
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            // Apply hoverVariants when hovered (opacity change).
            variants={hoverVariants}
          >
            {project.title}
          </motion.h3>
        </div>
      </motion.div>
    </Link>
  );
}