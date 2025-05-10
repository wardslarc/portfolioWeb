import React from "react";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsAboutContact from "@/components/SkillsAboutContact";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <div id="hero">
        <HeroSection />
      </div>

      {/* Projects Section */}
      <div id="projects">
        <ProjectsSection />
      </div>

      {/* Skills, About, and Contact Sections */}
      <div id="skills">
        <SkillsAboutContact />
      </div>
    </main>
  );
}
