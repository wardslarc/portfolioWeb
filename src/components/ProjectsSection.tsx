"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import ProjectModal from "./ProjectModal";
import { AspectRatio } from "../components/ui/aspect-ratio";
import Dashboard from "@/components/taskmanagement/components/Dashboard"; // Importing your Dashboard component

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
  detailedDescription?: string;
  screenshots?: string[];
  challenges?: string;
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with cart and payment integration",
      category: "Web Apps",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      demoUrl: "https://example.com/demo",
      sourceUrl: "https://github.com/carlescalo/ecommerce",
      detailedDescription: "A comprehensive e-commerce solution...",
      screenshots: [],
      challenges: "Implementing a secure payment gateway...",
    },
    {
      id: "2",
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates",
      category: "Web Apps",
      image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
      technologies: ["NextJS", "Firebase", "Tailwind CSS"],
      demoUrl: "https://example.com/taskapp",
      sourceUrl: "https://github.com/carlescalo/taskapp",
      detailedDescription: "A task management application for teams...",
      screenshots: [],
      challenges: "Implementing real-time synchronization...",
    },
    {
      id: "3",
      title: "Fitness Tracker",
      description: "Mobile application for tracking workouts and nutrition",
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
      technologies: ["React Native", "Redux", "Firebase"],
      demoUrl: "https://example.com/fitness",
      sourceUrl: "https://github.com/carlescalo/fitness",
      detailedDescription: "A cross-platform mobile app...",
      screenshots: [],
      challenges: "Optimizing performance on older mobile devices...",
    },
    {
      id: "4",
      title: "Portfolio Website",
      description: "Professional portfolio website with interactive elements",
      category: "UI/UX",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
      demoUrl: "https://example.com/portfolio",
      sourceUrl: "https://github.com/carlescalo/portfolio",
      detailedDescription: "A modern portfolio site...",
      screenshots: [],
      challenges: "Creating smooth animations...",
    },
    {
      id: "5",
      title: "Weather Dashboard",
      description: "Interactive weather visualization with historical data",
      category: "Web Apps",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
      technologies: ["React", "D3.js", "OpenWeather API"],
      demoUrl: "https://example.com/weather",
      sourceUrl: "https://github.com/carlescalo/weather",
      detailedDescription: "A weather dashboard with data visualizations...",
      screenshots: [],
      challenges: "Processing and visualizing large datasets...",
    },
    {
      id: "6",
      title: "Restaurant Booking System",
      description: "Online reservation system for restaurants",
      category: "UI/UX",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      technologies: ["Vue.js", "Node.js", "PostgreSQL"],
      demoUrl: "https://example.com/restaurant",
      sourceUrl: "https://github.com/carlescalo/restaurant",
      detailedDescription: "A comprehensive booking system...",
      screenshots: [],
      challenges: "Implementing flexible reservation logic...",
    },
  ];

  const categories = ["All", "Web Apps", "Mobile", "UI/UX"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Projects</h2>
        <p className="text-muted-foreground text-center mb-8">
          Explore my recent work and technical projects
        </p>

        <Tabs defaultValue="All" className="w-full mb-8">
          <TabsList className="flex justify-center mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => openProjectModal(project)}
                >
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Custom rendering for Task Management App */}
      {selectedProject && isModalOpen && (
        selectedProject.title === "Task Management App" ? (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-background w-full max-w-5xl max-h-[90vh] overflow-auto rounded-lg shadow-lg p-6 relative">
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-black dark:hover:text-white text-xl"
              >
                ✕
              </button>
              <Dashboard />
            </div>
          </div>
        ) : (
          <ProjectModal
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={closeProjectModal}
          />
        )
      )}
    </section>
  );
}
