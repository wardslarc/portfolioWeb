"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { AspectRatio } from "../components/ui/aspect-ratio";

interface ProjectModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  project?: {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    challenges?: string;
    solution?: string;
    technologies: string[];
    images: string[];
    liveUrl?: string;
    githubUrl?: string;
    category: string;
  };
  onPrevious?: () => void;
  onNext?: () => void;
}

const ProjectModal = ({
  isOpen = true,
  onClose = () => {},
  project = {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured online shopping platform with cart functionality and payment integration.",
    longDescription:
      "This e-commerce platform provides a seamless shopping experience with product filtering, user accounts, shopping cart functionality, and secure payment processing using Stripe integration.",
    challenges:
      "Implementing a responsive design that works across all devices while maintaining fast load times was challenging. Additionally, ensuring secure payment processing and handling product inventory in real-time required careful planning.",
    solution:
      "I utilized Next.js for server-side rendering to improve SEO and page load times. For the payment system, I integrated Stripe's API with custom hooks to manage the checkout flow. The product inventory is managed through a webhook system that updates stock levels in real-time.",
    technologies: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Stripe API",
      "MongoDB",
      "Redux",
    ],
    images: [
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      "https://images.unsplash.com/photo-1491897554428-130a60dd4757?w=800&q=80",
      "https://images.unsplash.com/photo-1600267165583-43c7b5a5af01?w=800&q=80",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project",
    category: "Web Apps",
  },
  onPrevious = () => {},
  onNext = () => {},
}: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-4 mb-6">
          <AspectRatio
            ratio={16 / 9}
            className="bg-muted overflow-hidden rounded-md"
          >
            <img
              src={project.images[currentImageIndex]}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>

          {project.images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm"
                onClick={handlePreviousImage}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous image</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next image</span>
              </Button>
            </div>
          )}

          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <div className="space-y-4">
              <p>{project.longDescription}</p>
              <div>
                <h4 className="font-medium mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="challenges" className="mt-4">
            <p>
              {project.challenges || "No challenges information available."}
            </p>
          </TabsContent>
          <TabsContent value="solution" className="mt-4">
            <p>{project.solution || "No solution information available."}</p>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex-col sm:flex-row gap-4 sm:gap-2 mt-6">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onPrevious}
              className="flex-1 sm:flex-none"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous Project
            </Button>
            <Button
              variant="outline"
              onClick={onNext}
              className="flex-1 sm:flex-none"
            >
              Next Project
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            {project.githubUrl && (
              <Button
                variant="outline"
                onClick={() => window.open(project.githubUrl, "_blank")}
                className="flex-1 sm:flex-none"
              >
                <Github className="mr-2 h-4 w-4" />
                Source Code
              </Button>
            )}
            {project.liveUrl && (
              <Button
                onClick={() => window.open(project.liveUrl, "_blank")}
                className="flex-1 sm:flex-none"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
