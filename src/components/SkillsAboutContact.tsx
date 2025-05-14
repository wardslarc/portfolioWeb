"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
  ExternalLink,
} from "lucide-react";

interface SkillProps {
  name: string;
  level: number;
  category: string;
}

interface SocialLinkProps {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

// ✅ Inline Progress component that visually reflects percentage
const Progress = ({ value }: { value: number }) => (
  <div className="w-full bg-gray-200 rounded h-2 overflow-hidden">
    <div
      className="bg-blue-600 h-full transition-all duration-300 ease-in-out"
      style={{ width: `${value}%` }}
    />
  </div>
);

const SkillsAboutContact = () => {
  const skills: SkillProps[] = [
    { name: "React", level: 60, category: "Frontend" },
    { name: "JavaScript", level: 50, category: "Frontend" },
    { name: "TypeScript", level: 60, category: "Frontend" },
    { name: "HTML/CSS", level: 95, category: "Frontend" },
    { name: "Tailwind CSS", level: 60, category: "Frontend" },
    { name: "Next.js", level: 65, category: "Frontend" },
    { name: "Node.js", level: 75, category: "Backend" },
    { name: "Express", level: 30, category: "Backend" },
    { name: "MongoDB", level: 65, category: "Backend" },
    { name: "PostgreSQL", level: 30, category: "Backend" },
    { name: "Git", level: 60, category: "Tools" },
    { name: "Docker", level: 20, category: "Tools" },
    { name: "AWS", level: 50, category: "Tools" },
    { name: "Figma", level: 30, category: "Tools" },
  ];

  const socialLinks: SocialLinkProps[] = [
    {
      platform: "GitHub",
      url: "https://github.com/carlescalo",
      icon: <Github className="h-5 w-5" />,
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/carlescalo",
      icon: <Linkedin className="h-5 w-5" />,
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/carlescalo",
      icon: <Twitter className="h-5 w-5" />,
    },
    {
      platform: "Email",
      url: "mailto:carl@example.com",
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  const skillsByCategory = skills.reduce<Record<string, SkillProps[]>>(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {}
  );

  return (
    <div
      id="contact"
      className="bg-background w-full py-16 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Skills Section */}
          <TabsContent value="skills" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I specialize in modern web development technologies with a focus
                on creating responsive, accessible, and performant web
                applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills]) => (
                  <Card key={category} className="shadow-md">
                    <CardHeader>
                      <CardTitle>{category}</CardTitle>
                      <CardDescription>
                        {category === "Frontend" &&
                          "Building beautiful user interfaces"}
                        {category === "Backend" &&
                          "Server-side development & databases"}
                        {category === "Tools" &&
                          "Development tools & platforms"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                          <Progress value={skill.level} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">About Me</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get to know more about my professional background and personal
                journey.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Professional Background</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    I'm Carls Dale Escalo. I studied Computer Science and took a
                    job related to IT, but my passion for web development led me to
                    pursue a career in this field. I have experience in
                    developing web applications using modern technologies like
                    React, Next.js, and Node.js. I enjoy creating user-friendly
                    interfaces and building robust backend systems that power
                    them.
                  </p>
                  <p>
                    Throughout my career, I've worked with a company that made me 
                    wear different hats. I've developed websites, purchased domains 
                    for my previous company, and have a strong understanding of the full 
                    web development lifecycle. I thrive in collaborative
                    environments and enjoy working with cross-functional teams to
                    deliver high-quality products.
                  </p>
                  <div className="pt-4">
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                      <a href="/resume.pdf" download>
                        <Download className="h-4 w-4" /> Download Resume
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Education & Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">
                      Bachelor of Science in Computer Science
                    </h4>
                    <p className="text-muted-foreground">
                      University of Technology, 2018
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">
                      Web Development Certification
                    </h4>
                    <p className="text-muted-foreground">Tech Academy, 2019</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">AWS Certified Developer</h4>
                    <p className="text-muted-foreground">
                      Amazon Web Services, 2021
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">React Advanced Patterns</h4>
                    <p className="text-muted-foreground">
                      Frontend Masters, 2022
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    My journey into web development began during college when I
                    built my first website for a local business. The ability to
                    create something from scratch that could help a real
                    business fascinated me, and I've been hooked ever since.
                  </p>
                  <p className="mb-4">
                    Outside of coding, I enjoy hiking, photography, and
                    exploring new coffee shops. I believe that these diverse
                    interests help fuel my creativity and problem-solving
                    abilities as a developer.
                  </p>
                  <p>
                    I'm passionate about creating accessible web experiences and
                    believe that technology should be inclusive for all users.
                    This philosophy guides my approach to every project I work
                    on.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have a project in mind or want to discuss potential
                opportunities? I'd love to hear from you!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>
                    Send me a message and I'll get back to you as soon as
                    possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" placeholder="Your name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subject
                      </label>
                      <Input id="subject" placeholder="What is this regarding?" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Your message" rows={5} />
                    </div>
                    <Button type="submit" className="w-full sm:w-auto">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Connect With Me</CardTitle>
                  <CardDescription>
                    Find me on social media or send me an email directly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => (
                      <Button
                        key={link.platform}
                        variant="outline"
                        asChild
                        className="flex items-center gap-2"
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.icon}
                          <span>{link.platform}</span>
                        </a>
                      </Button>
                    ))}
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold mb-2">Availability</h4>
                    <p className="text-muted-foreground mb-4">
                      I'm currently available for freelance work and open to
                      discussing full-time opportunities.
                    </p>

                    <h4 className="font-semibold mb-2">Location</h4>
                    <p className="text-muted-foreground">
                      Based in San Francisco, CA — Available for remote work
                      worldwide
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a
                        href="/portfolio.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" /> View Portfolio PDF
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkillsAboutContact;
