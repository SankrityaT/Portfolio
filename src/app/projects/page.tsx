'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

export default function Projects() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const projects = [
    {
      title: 'CommUnity',
      description: 'A web platform designed to resolve conflicts through voting and AI-powered mediation',
      image: '/community.png',
      tech: ['React', 'Node.js', 'AWS', 'OpenAI'],
      live: 'https://main.dg788ocmeaqpm.amplifyapp.com/',
      year: '2024'
    },
    {
      title: 'AI Product Research Assistant',
      description: 'An AI-powered application that provides personalized product recommendations using Groq AI.',
      image: '/product-research-assistant.png',
      tech: ['Next.js', 'Groq', 'TailwindCSS', 'TypeScript'],
      live: 'https://main.d7s82rsfumk6c.amplifyapp.com/',
      year: '2024'
    },
    {
      title: 'WagMeet',
      description: 'An app where dog owners connect, schedule meetups, and explore dog-friendly parks in their local areas.',
      image: '/wagmeet.png',
      tech: ['React Native', 'Firebase', 'Node.js', 'Express'],
      github: 'https://github.com/SankrityaT/WagMeet/tree/frontend',
      year: '2023'
    },
    {
      title: 'Money Splitting App',
      description: 'A real-time expense splitting app that ensures fair share calculations among friends.',
      image: '/money-splitting-app.jpg',
      tech: ['React', 'Firebase', 'Material-UI', 'JavaScript'],
      github: 'https://github.com/SankrityaT/FairSplit',
      year: '2023'
    },
    {
      title: 'Premier League Prediction App',
      description: 'An app that predicts Premier League match outcomes using machine learning algorithms.',
      image: '/premier-league.jpg',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
      github: 'https://github.com/SankrityaT/Sankritya-premier-league-prediction',
      year: '2023'
    },
    {
      title: 'Real Estate Website',
      description: 'A modern and responsive real estate website that helps users find their dream place.',
      image: '/real-estate.jpg',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/SankrityaT/RealEstateUI',
      year: '2023'
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold font-nunito text-white mb-16 text-center"
        >
          Featured Projects
        </motion.h2>

        <div className="relative">
          {/* Vertical timeline line with animated gradient */}
          <div className="absolute left-[20px] lg:left-1/2 top-0 bottom-0 w-1">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-purple-500/50">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>
          </div>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline node with year */}
                <div className="absolute left-0 lg:left-1/2 transform lg:-translate-x-1/2 flex flex-col items-center">
                  {/* Animated dot */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-black" />
                    </div>
                    {/* Ping animation */}
                    <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-20" />
                  </div>
                  {/* Year label */}
                  <div className="mt-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="text-sm font-medium text-purple-300">{project.year}</span>
                  </div>
                </div>

                {/* Project Card */}
                <div className={`w-full lg:w-[calc(50%-3rem)] ml-16 lg:ml-0 ${
                  index % 2 === 0 ? 'lg:mr-auto' : 'lg:ml-auto'
                }`}>
                  <div className="group">
                    {/* Card with hover effects */}
                    <div className="relative overflow-hidden rounded-xl bg-white/5 p-1">
                      {/* Animated border */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative rounded-xl bg-black/90 p-6 backdrop-blur-xl">
                        {/* Background gradient */}
                        <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500" />
                        
                        <div className="relative">
                          {/* Project Image */}
                          <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden group-hover:shadow-xl transition-shadow duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 mix-blend-overlay z-10" />
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              quality={95}
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              priority={index < 2}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20" />
                          </div>
                          
                          {/* Project Title */}
                          <h3 className="text-2xl font-bold font-nunito text-white mb-3">{project.title}</h3>
                          
                          {/* Project Description */}
                          <p className="text-gray-300 mb-6 font-nunito">{project.description}</p>
                          
                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-sm rounded-full bg-white/10 text-purple-300 backdrop-blur-sm border border-purple-500/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          
                          {/* Links */}
                          <div className="flex gap-4">
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300 group/link"
                              >
                                <FiGithub className="w-5 h-5 text-white group-hover/link:text-purple-300 transition-colors" />
                              </a>
                            )}
                            {project.live && (
                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300 group/link"
                              >
                                <FiExternalLink className="w-5 h-5 text-white group-hover/link:text-purple-300 transition-colors" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
