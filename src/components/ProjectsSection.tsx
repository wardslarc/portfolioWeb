"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { AspectRatio } from "../components/ui/aspect-ratio";

import Image from "next/image";

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
  challenges?: string;
  isDeployed?: boolean;
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects: Project[] = [
    {
      id: "1",
      title: "Citimax Group of Companies",
      description: "A responsive website developed for Citimax",
      category: "Web Apps",
      image: "/images/citimax.png",
      technologies: ["Go daddy", "Go daddy website builder"],
      demoUrl: "https://citimax.ph",
      sourceUrl: "",
      detailedDescription: "Citimax.ph is a corporate web site for showcasing industrial products. Built with responsiveness and SEO in mind, the site features product and service listings, a blog, and a contact form.",
      challenges: "Buying a domain and hosting, setting up professional email and using GoDaddy's website builder to create a responsive site.",
      isDeployed: true
    },
    {
      id: "2",
      title: "Portfolio Website for Drawing",
      description: "A portfolio website showcasing my digital drawings and artwork.",
      category: "Web Apps",
      image: "/images/artportfolio.png", // replace with your actual image path
      technologies: ["React", "Next.js", "Tailwind CSS", "Firebase"],
      demoUrl: "https://carlsdaleescalo-ochre.vercel.app/", // replace with actual URL if deployed
      sourceUrl: "https://github.com/wardslarc/portfolioWeb", // replace with actual repo URL
      detailedDescription:
        "This portfolio website features galleries of my digital illustrations and drawings, categorized and filterable by style and medium. It includes a responsive design with smooth animations and modal views for artwork details.",
      challenges:
        "Implementing smooth image loading, responsive gallery layout, and optimizing performance for fast load times on various devices.",
      isDeployed: true,
    },
    {
      id: "3",
      title: "Admin Website for Drawing Portfolio",
      description: "A portfolio website showcasing my digital drawings and artwork.",
      category: "Web Apps",
      image: "/images/artadmin.png", // replace with your actual image path
      technologies: ["React", "Next.js", "Tailwind CSS", "Firebase"],
      demoUrl: "https://carls-escalo-web-admin.vercel.app/", // replace with actual URL if deployed
      sourceUrl: "https://github.com/wardslarc/art-portfolio-web-admin", // replace with actual repo URL
      detailedDescription:
        "This portfolio website features galleries of my digital illustrations and drawings, categorized and filterable by style and medium. It includes a responsive design with smooth animations and modal views for artwork details.",
      challenges:
        "Implementing smooth image loading, responsive gallery layout, and optimizing performance for fast load times on various devices.",
      isDeployed: true,
    },
    {
      id: "4",
      title: "Web Developer Portfolio",
      description: "A portfolio website showcasing my projects for website development and web design.",
      category: "Web Apps",
      image: "/images/personalweb.png", // replace with your actual image path
      technologies: ["React", "Next.js", "Tailwind CSS", "Firebase", "TypeScript", "Node.js", "Godaddy", "Vercel"],
      demoUrl: "https://carlsdaleescalo.com", // replace with actual URL if deployed
      sourceUrl: "https://github.com/wardslarc/portfolioWeb", // replace with actual repo URL
      detailedDescription:
        "This portfolio website features galleries of my digital illustrations and drawings, categorized and filterable by style and medium. It includes a responsive design with smooth animations and modal views for artwork details.",
      challenges:
        "Deployment of the website on Vercel, then purchasing a domain and hosting on GoDaddy, and setting up professional email accounts.",
      isDeployed: true,
    },
  ];

  const categories = ["All", "Web Apps", "Mobile", "UI/UX"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
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

  useEffect(() => {
    if (isModalOpen) {
      document.getElementById("closeModalButton")?.focus();
    }
  }, [isModalOpen]);

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
                className="px-4 py-2"
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
                  className="overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  onClick={() => openProjectModal(project)}
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
                      width={800}
                      height={450}
                      priority
                    />
                  </AspectRatio>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
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

      {selectedProject && isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-background w-full max-w-6xl max-h-[90vh] overflow-auto rounded-lg shadow-lg p-6 relative">
            <button
              id="closeModalButton"
              onClick={closeProjectModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black dark:hover:text-white text-xl"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>

              <div className="border rounded-lg overflow-hidden">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex gap-4">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                  >
                    {selectedProject.isDeployed ? "Visit Live Website" : "View Demo"}
                  </a>
                )}
                {selectedProject.sourceUrl && (
                  <a
                    href={selectedProject.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
                  >
                    View Source Code
                  </a>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Project Details</h3>
                  <p className="text-muted-foreground">{selectedProject.detailedDescription}</p>
                </div>

                <div>
                  <h4 className="font-semibold">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedProject.challenges && (
                  <div>
                    <h4 className="font-semibold">Challenges & Solutions</h4>
                    <p className="text-muted-foreground">{selectedProject.challenges}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
