import React from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import profileImage from "../images/profile.png";

import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { Badge } from "./ui/badge";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string | StaticImageData;
  resumeUrl?: string;
}

const HeroSection = ({
  name = "Carls Escalo",
  title = "Web Developer",
  description = "Passionate about creating beautiful, responsive, and user-friendly web applications with modern technologies.",
  imageUrl = profileImage,
  resumeUrl = "#",
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 py-20 bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0"></div>

      <div className="container mx-auto max-w-6xl z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left content - Text and CTA */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="px-3 py-1 text-sm font-medium animate-fade-in"
              >
                Welcome to my portfolio
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Hi, I'm <span className="text-primary">{name}</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
                {title}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button size="lg">
                View My Work <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={resumeUrl} download>
                  Download CV <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="flex gap-4 justify-center md:justify-start pt-4">
              <a
                href="https://github.com/wardslarc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="carlsdaleescalo@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Right content - Profile Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-primary/50 blur-md opacity-70 animate-pulse"></div>
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-background shadow-xl">
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
