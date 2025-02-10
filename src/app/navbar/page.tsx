'use client';

import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', target: 'home' },
    { name: 'About', target: 'about' },
    { name: 'Experience', target: 'experience' },
    { name: 'Projects', target: 'projects' },
    { name: 'Contact', target: 'contact' },
  ];

  return (
    <>
      {/* Desktop Menu */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <motion.div
          className="flex space-x-2 bg-black/20 backdrop-blur-lg px-6 py-3 rounded-full border border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {menuItems.map((item) => (
            <ScrollLink
              key={item.target}
              to={item.target}
              smooth={true}
              duration={500}
              className="relative px-6 py-2.5 rounded-full cursor-pointer group"
            >
              <span
                className={`relative z-10 text-base font-medium transition-colors duration-300 ${
                  activeSection === item.target ? 'text-black' : 'text-white group-hover:text-black'
                }`}
              >
                {item.name}
              </span>
              {activeSection === item.target && (
                <motion.div
                  className="absolute inset-0 bg-white rounded-full -z-0"
                  layoutId="navbar-active"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </ScrollLink>
          ))}
        </motion.div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-5 h-5 relative flex items-center justify-center">
            <span
              className={`absolute h-0.5 w-5 bg-black transform transition-all duration-300 ease-in-out ${
                isOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-black transform transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-black transform transition-all duration-300 ease-in-out ${
                isOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-gradient-to-b from-purple-600 to-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
              {menuItems.map((item) => (
                <motion.div
                  key={item.target}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ScrollLink
                    to={item.target}
                    smooth={true}
                    duration={500}
                    onClick={() => setIsOpen(false)}
                    className="relative px-8 py-3 text-3xl font-medium transition-colors duration-300"
                  >
                    <span className="relative z-10">{item.name}</span>
                    {activeSection === item.target && (
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full -z-0"
                        layoutId="mobile-active"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </ScrollLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
