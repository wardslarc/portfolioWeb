"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900 text-white animate-slide-down",
        isScrolled ? "shadow-md py-2" : "py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-xl font-bold text-white">
            Carls <span className="text-white">Escalo</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {["hero", "projects", "skills", "about"].map((section, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(section)}
              className="text-white px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-105 hover:text-black hover:bg-white"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection("contact")}
            className="ml-2 bg-white text-black hover:scale-105 transition-all duration-200"
            size="sm"
          >
            Contact Me
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white shadow-lg py-4 px-4 absolute top-full left-0 right-0 animate-slide-down">
          <nav className="flex flex-col space-y-2">
            {["hero", "projects", "skills", "about"].map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(section)}
                className="text-white text-left w-full px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-105 hover:text-black hover:bg-white"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-white text-black hover:scale-105 transition-all duration-200"
              size="sm"
            >
              Contact Me
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
