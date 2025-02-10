'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import Image from 'next/image';

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="relative min-h-[90vh] flex items-center justify-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="text-center md:text-left md:w-1/2">
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hi, I'm Sankritya
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl text-gray-200 mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A passionate developer crafting beautiful and functional web and mobile experiences
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                onClick={scrollToProjects}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-lg font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-white/20"
              >
                View My Work
              </button>
              <ScrollLink to="contact" smooth={true} duration={500}>
                <button className="px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-lg font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg backdrop-blur-sm">
                  Contact Me
                </button>
              </ScrollLink>
            </motion.div>
          </div>

          {/* Memoji */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative w-72 h-72 md:w-[350px] md:h-[350px] overflow-visible">
              {/* Multiple pulsating circles */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-400/15 to-teal-300/20 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.15, 0, 0.15],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/15 to-teal-300/20 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-400/25 via-blue-400/20 to-teal-300/25 rounded-[60%] origin-bottom"
                style={{
                  clipPath: 'inset(0 0 0 0 round 60%)',
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.25, 0, 0.25],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/25 via-cyan-400/20 to-teal-300/25 rounded-[55%] origin-bottom"
                style={{
                  clipPath: 'inset(0 0 0 0 round 55%)',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9,
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-teal-400/25 to-emerald-300/30 rounded-[50%] origin-bottom"
                style={{
                  clipPath: 'inset(0 0 0 0 round 50%)',
                }}
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.35, 0, 0.35],
                  filter: ['blur(0px)', 'blur(1px)', 'blur(0px)'],
                }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-teal-400/30 via-emerald-400/25 to-green-300/30 rounded-[45%] origin-bottom"
                style={{
                  clipPath: 'inset(0 0 0 0 round 45%)',
                }}
                animate={{
                  scale: [1, 1.7, 1],
                  opacity: [0.4, 0, 0.4],
                  filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'],
                }}
                transition={{
                  duration: 13,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />

              {/* Main glossy circle */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-blue-400/20 to-teal-300/30 rounded-full backdrop-blur-md border border-white/20"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent rounded-full" />
              
              {/* Memoji image */}
              <Image
                src="/memoji1_e.png"
                alt="Sankritya's Memoji"
                fill
                quality={100}
                sizes="(max-width: 768px) 288px, 350px"
                style={{ 
                  objectFit: "contain",
                }}
                className="transform hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
