"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ProjectsSection from "@/app/components/projects";

// Define the smoothScroll function
const smoothScroll = (targetId: string) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000; // Duration in milliseconds for half speed

  let start: number | null = null;

  const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percent = Math.min(progress / duration, 1);
    window.scrollTo(0, startPosition + distance * easeInOutQuad(percent));
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

const hrRevealVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } // Increased delay
  }
};

const navListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // Increased stagger
      delayChildren: 0.5,    // Increased delay
    }
  }
};

const navItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.3 // Added delay
    }
  }
};

const letterVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 1.0 + (i * 0.2), // Increased delay
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const subtitleVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 1.5, // Increased delay
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const imageRevealVariants = {
  hidden: {
    clipPath: 'inset(0 100% 0 0)',
    scale: 1.2
  },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    scale: 1,
    transition: {
      clipPath: {
        delay: 2.0, // Increased delay
        duration: 1.2,
        ease: "easeInOut"
      },
      scale: {
        delay: 2.0, // Increased delay
        duration: 1.4,
        ease: "easeOut"
      }
    }
  }
};

export default function Home() {
  // Removed scrollContainerRef as we'll use the window's scroll
  const { scrollY } = useScroll(); // Monitor window's scroll

  // Adjusted transformation ranges for slower animation response
  const titleScale = useTransform(scrollY, [0, 600], [1, 0.7]); // Increased input range
  const titleOpacity = useTransform(scrollY, [0, 600], [1, 0.3]); // Increased input range
  
  // Adjusted scroll ranges for video to accommodate increased height with slower response
  const videoScale = useTransform(scrollY, [100, 1400], [1, 0.7]); // Increased input range
  const videoOpacity = useTransform(scrollY, [100, 1400], [1, 0.3]); // Increased input range

  // New transformation for subtitle opacity
  const subtitleOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  return (
    <div>
      {" "}
      {/* Removed ref and overflow-auto */}
      <nav>
        <motion.hr
          className="my-4"
          variants={hrRevealVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.ul
          className="flex flex-row justify-between"
          variants={navListVariants}
          initial="hidden"
          animate="visible"
        >
          {["HOME", "PORTFOLIO", "CONTACT"].map((item) => (
            <motion.li
              key={item}
              variants={navItemVariants}
              className="relative cursor-pointer"
              onClick={() => smoothScroll(item.toLowerCase())} // Added onClick handler
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
        <div className="flex justify-center mt-4">
          <motion.h1
            className="title leading-none tracking-tight flex overflow-hidden"
            style={{
              scale: titleScale,
              opacity: titleOpacity,
            }}
          >
            {Array.from("MARTIN").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block cursor-pointer"
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </nav>
      <motion.div
        className="uppercase flex items-center justify-between text-sm mb-6"
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
        style={{
          opacity: subtitleOpacity, // Apply the transformed opacity
        }}
      >
        <h2 id="home" className="cursor-pointer">
          {" "}
          {/* Added id */}
          * Based in Skopje, <br /> available everywhere
        </h2>
        <h2 id="portfolio" className="mx-auto cursor-pointer">
          {" "}
          {/* Added id */}
          Frontend Developer | UI DESIGNER | GRAPHIC DESIGNER
        </h2>
        <h2 id="contact" className="cursor-pointer">
          {" "}
          {/* Added id */}
          FB IN LN GIT DRB
        </h2>
      </motion.div>
      <div className="h-[70vh] relative overflow-hidden" id="projects">
        {" "}
        {/* Changed height from 50vh to 70vh */}
        <motion.video
          className="w-full h-full object-cover cursor-pointer"
          src="https://videos.pexels.com/video-files/7308108/7308108-hd_1920_1080_24fps.mp4" // Replace with your video URL
          autoPlay
          loop
          muted
          playsInline
          style={{
            scale: videoScale, // Updated scale based on new scroll range
            opacity: videoOpacity, // Updated opacity based on new scroll range
          }}
          variants={imageRevealVariants}
          initial="hidden"
          animate="visible"
        />
      </div>
      <ProjectsSection />
    </div>
  );
}
