"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
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
  description?: string;
  imageUrl?: string;
  resumeUrl?: string;
}

const titles = ["Web Developer", "Illustrator", "Digital Artist"];

const HeroSection = ({
  name = "Carls Escalo",
  description =
    "Passionate about creating beautiful, responsive, and user-friendly web applications with modern technologies.",
  imageUrl = "/images/profile.png",
  resumeUrl = "#",
}: HeroSectionProps) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out

      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % titles.length); // update title
        setFade(true); // fade in
      }, 500); // fade out duration
    }, 3000); // total duration per title

    return () => clearInterval(interval);
  }, []);

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
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-slide-up">
                Hi, I'm <span className="text-primary">{name}</span>
              </h1>
              <h2
                className={`text-2xl md:text-3xl font-medium text-muted-foreground transition-opacity duration-500 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              >
                {titles[titleIndex]}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl animate-slide-up">
              {description}
            </p>

            {/* Buttons with slide-up animation */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start opacity-0 animate-slide-up animation-delay-200">
              <Button
                size="lg"
                className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                asChild
              >
                <a href="#projects">
                  View My Work <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                <a href={resumeUrl} download>
                  Download CV <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Social icons with slide-up animation */}
            <div className="flex gap-4 justify-center md:justify-start pt-4 opacity-0 animate-slide-up animation-delay-300">
              {[
                {
                  href: "https://github.com/wardslarc",
                  icon: <Github className="h-6 w-6" />,
                  label: "GitHub",
                },
                {
                  href: "https://www.linkedin.com/in/carls-dale-escalo-797701366/",
                  icon: <Linkedin className="h-6 w-6" />,
                  label: "LinkedIn",
                },
                {
                  href: "https://twitter.com/daleonigiri",
                  icon: <Twitter className="h-6 w-6" />,
                  label: "Twitter",
                },
                {
                  href: "mailto:admin@carlsdaleescalo.com",
                  icon: <Mail className="h-6 w-6" />,
                  label: "Email",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300"
                >
                  {item.icon}
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right content - Profile Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative">
              <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[450px] lg:w-[450px] overflow-hidden rounded-full border-4 border-background shadow-xl">
                <img
                  src={imageUrl}
                  alt={name}
                  className="object-cover w-full h-full animate-pop-up"
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
