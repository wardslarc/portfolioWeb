"use client";

import React from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowUp,
} from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-gray-900 text-white py-10 px-4 md:px-12 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        {/* Section 1: Brand or Message */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Let's build something great</h2>
          <p className="text-sm text-gray-400">
            I'm open to freelance projects, full-time roles, or just grabbing a virtual coffee ☕
          </p>
        </div>

        {/* Section 2: Social Icons */}
        <div className="flex justify-start md:justify-center space-x-4">
          {[
            { icon: <Github />, url: "https://github.com/carlescalo" },
            { icon: <Linkedin />, url: "https://linkedin.com/in/carlescalo" },
            { icon: <Twitter />, url: "https://twitter.com/carlescalo" },
            { icon: <Mail />, url: "mailto:carl@example.com" },
          ].map(({ icon, url }, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              <div className="p-2 rounded-full hover:bg-white hover:text-gray-900 transition">
                {icon}
              </div>
            </a>
          ))}
        </div>

        {/* Section 3: Back to Top */}
        <div className="flex justify-start md:justify-end">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
          >
            <ArrowUp className="w-4 h-4" />
            Back to Top
          </button>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center mt-10 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Carls Dale Escalo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
