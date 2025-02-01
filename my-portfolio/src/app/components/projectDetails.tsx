"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";

interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

const projectDetails: Project[] = [
  {
    id: "01",
    number: "01",
    title: "KONTRANS",
    description: "Detailed description of KONTRANS project.",
    image: "https://picsum.photos/seed/brand/600/400",
  },
  {
    id: "02",
    number: "02",
    title: "OSA ENGENEERING",
    description: "Detailed description of OSA ENGENEERING project.",
    image: "https://picsum.photos/seed/digital/600/400",
  },
  {
    id: "03",
    number: "03",
    title: "OFFICE PLANNER",
    description: "Detailed description of OFFICE PLANNER project.",
    image: "https://picsum.photos/seed/video/600/400",
  },
  {
    id: "04",
    number: "04",
    title: "WEB PREDENCE",
    description: "Detailed description of WEB PREDENCE project.",
    image: "https://picsum.photos/seed/web/600/400",
  },
  {
    id: "05",
    number: "05",
    title: "CREATIVE DIRECTR",
    description: "Detailed description of CREATIVE DIRECTR project.",
    image: "https://picsum.photos/seed/creative/600/400",
  },
];

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      const foundProject = projectDetails.find((proj) => proj.id === id);
      setProject(foundProject || null);
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <section className="min-h-screen text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            {project.title}
          </h2>
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="object-cover rounded-lg mb-8"
          />
          <p className="text-lg md:text-xl">{project.description}</p>
        </motion.div>
      </div>
    </section>
  );
}
