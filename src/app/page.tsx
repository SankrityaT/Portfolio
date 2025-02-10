'use client';

import { useEffect } from "react";
import Navbar from "./navbar/page";
import Hero from "./hero/page";
import About from "./about/page";
import Experience from "./experience/page";
import Projects from "./projects/page";
import Contact from "./contact/page";

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate progress through the page (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, scrollPosition / (documentHeight - windowHeight)));
      
      // Calculate which section we're in and how far through it we are
      const numSections = sections.length - 1; // Subtract 1 to account for transitions
      const sectionIndex = Math.min(numSections, scrollProgress * numSections);
      const currentSection = Math.floor(sectionIndex);
      const nextSection = Math.min(sections.length - 1, currentSection + 1);
      
      // Calculate progress within current section (0 to 1)
      const sectionProgress = sectionIndex - currentSection;
      
      // Get colors for current and next section
      const currentColors = getGradientColors(sections[currentSection]);
      const nextColors = getGradientColors(sections[nextSection]);
      
      // Interpolate between colors
      const primaryColor = interpolateColor(
        currentColors.primary,
        nextColors.primary,
        sectionProgress
      );
      const secondaryColor = interpolateColor(
        currentColors.secondary,
        nextColors.secondary,
        sectionProgress
      );

      // Update CSS variables
      document.documentElement.style.setProperty('--gradient-color-primary', primaryColor);
      document.documentElement.style.setProperty('--gradient-color-secondary', secondaryColor);
    };

    // Helper function to interpolate between two RGB colors
    const interpolateColor = (color1: string, color2: string, progress: number) => {
      // Extract RGB values
      const rgb1 = color1.match(/\d+/g)?.map(Number) || [0, 0, 0];
      const rgb2 = color2.match(/\d+/g)?.map(Number) || [0, 0, 0];
      
      // Interpolate each channel with easing
      const ease = (t: number) => t * t * (3 - 2 * t); // Smoothstep easing
      const easedProgress = ease(progress);
      
      const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * easedProgress);
      const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * easedProgress);
      const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * easedProgress);
      
      return `rgb(${r}, ${g}, ${b})`;
    };

    // Set initial gradient
    const initialColors = getGradientColors('home');
    document.documentElement.style.setProperty('--gradient-color-primary', initialColors.primary);
    document.documentElement.style.setProperty('--gradient-color-secondary', initialColors.secondary);
    
    // Initial call to set colors
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getGradientColors = (section: string) => {
    switch (section) {
      case 'home':
        return {
          primary: 'rgb(0, 97, 255)',      // Bright blue #0061ff
          secondary: 'rgb(111, 49, 255)'    // Vibrant purple #6F31FF
        };
      case 'about':
        return {
          primary: 'rgb(111, 49, 255)',    // Vibrant purple #6F31FF
          secondary: 'rgb(147, 51, 234)'    // Rich purple #9333EA
        };
      case 'experience':
        return {
          primary: 'rgb(147, 51, 234)',    // Rich purple #9333EA
          secondary: 'rgb(168, 85, 247)'    // Brighter purple #A855F7
        };
      case 'projects':
        return {
          primary: 'rgb(168, 85, 247)',    // Brighter purple #A855F7
          secondary: 'rgb(189, 116, 255)'   // Pastel purple #BD74FF
        };
      case 'contact':
        return {
          primary: 'rgb(189, 116, 255)',   // Pastel purple #BD74FF
          secondary: 'rgb(216, 180, 254)'   // Light purple #D8B4FE
        };
      default:
        return {
          primary: 'rgb(0, 97, 255)',
          secondary: 'rgb(111, 49, 255)'
        };
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-white"
      style={{
        background: `
          linear-gradient(to bottom right, var(--gradient-color-primary), transparent 70%),
          linear-gradient(to bottom left, var(--gradient-color-secondary), transparent 70%),
          radial-gradient(
            circle at 50% 150%,
            var(--gradient-color-primary) 0%,
            transparent 70%
          ),
          #000000
        `,
        transition: 'background 0.4s ease-in-out',
      }}
    >
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />
      
      <Navbar />

      <main className="pb-32"> 
        <section id="home" className="min-h-screen flex items-center justify-center">
          <Hero />
        </section>

        <section id="about" className="min-h-screen py-20">
          <About />
        </section>

        <Experience />

        <Projects />

        <Contact />
      </main>
    </div>
  );
}
