'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export default function Experience() {
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
      transition: { staggerChildren: 0.3 }
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

  const experiences = [
    {
      company: 'SEEME LLC',
      location: 'Phoenix, AZ',
      position: 'Software / iOS Developer Intern',
      date: '08/2024 – Present',
      link: 'https://seememobile.netlify.app',
      points: [
        'Developing an intuitive iOS application using SwiftUI, focusing on dynamic and interactive UI components to enhance user engagement.',
        'Collaborating with cross-functional teams in an agile environment, participating in sprint planning, code reviews, and feature implementation to deliver high-quality, maintainable code.',
        'Applied advanced object-oriented principles for modular, reusable code, improving application maintainability.'
      ]
    },
    {
      company: 'HCL TECH',
      location: 'Noida, India',
      position: 'Software Developer Intern',
      date: '05/2023 - 08/2023',
      points: [
        'Optimized code structure and implemented efficient front-end solutions for a real estate web application using HTML, CSS, JavaScript, and Node.js.',
        'Worked in an agile team, executing sprint tasks, and collaborating with cross-functional teams to ensure scalable and maintainable code.',
        'Improved SEO performance and landing page metrics by 15% using data-driven techniques, resulting in higher user engagement.'
      ]
    },
    {
      company: 'Arizona State University',
      location: 'Tempe, AZ',
      position: 'Office Assistant, University Registrar Services',
      date: '08/2022 - Present',
      points: [
        'Resolved over 4000+ Registrar\'s Office inquiries, ensuring timely and accurate service.',
        'Improved student record maintenance via Salesforce, PeopleSoft reducing response times by 50%.'
      ]
    },
    {
      company: 'Arizona State University',
      location: 'Tempe, AZ',
      position: 'Gold Guide, New Student Programs',
      date: '01/2022 - 08/2022',
      points: [
        'Guided 200+ prospective students through the ASU admission process.',
        'Conducted multiple campus tours and assisted in organizing 50+ events.'
      ]
    }
  ];

  return (
    <section id="experience" className="min-h-screen py-20">
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
          Journey Through Time
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line with gradient - Hidden on mobile */}
          <div className="absolute hidden md:block left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-purple-500/50 transform -translate-x-[0.5px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
          </div>

          {/* Mobile timeline line */}
          <div className="absolute md:hidden left-8 sm:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-purple-500/50">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
          </div>

          <div className="space-y-8 md:space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-start md:items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } ${
                  // Mobile layout
                  'flex-row pl-16 sm:pl-24 md:pl-0'
                } gap-4 md:gap-8`}
              >
                {/* Timeline dot with ring effect */}
                <div className={`absolute ${
                  // Mobile position
                  'left-8 sm:left-12 top-0 md:top-1/2 md:left-1/2'
                } transform ${
                  // Desktop position
                  'md:-translate-y-1/2 md:-translate-x-1/2'
                } flex items-center justify-center`}>
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-500 rounded-full z-10 relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
                  </div>
                  <div className="absolute w-6 h-6 md:w-8 md:h-8 border border-blue-500/30 rounded-full" />
                </div>

                {/* Content card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                }`}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 md:p-8 hover:bg-white/10 transition-all duration-300 border border-purple-500/20 relative overflow-hidden group">
                    {/* Gradient orb */}
                    <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-500" />
                    
                    <div className="relative">
                      <div className="flex flex-col gap-2 mb-4">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-nunito text-white">{exp.company}</h3>
                        <p className="text-base sm:text-lg text-purple-400 font-nunito leading-tight">{exp.position}</p>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-400 gap-1">
                          <span>{exp.location}</span>
                          <span className="text-purple-400/80">{exp.date}</span>
                        </div>
                      </div>
                      
                      {exp.link && (
                        <a 
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="text-purple-400 hover:text-purple-300 transition-colors mb-4 inline-block text-sm md:text-base break-all sm:break-normal"
                        >
                          {exp.link}
                        </a>
                      )}

                      <ul className="space-y-2.5 mt-4">
                        {exp.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                            <p className="text-sm sm:text-base text-gray-300 font-nunito leading-relaxed">{point}</p>
                          </li>
                        ))}
                      </ul>
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
