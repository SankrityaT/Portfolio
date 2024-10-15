'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, FileText, Mail } from 'lucide-react';


const socialIcons = [
  { Icon: Github, href: 'https://github.com/SankrityaT' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/sankrityat/' },
  { Icon: FileText, href: 'https://drive.google.com/file/d/1pY6gkZJAOYHAdxJ1l8AGGaB2JFdD3BUT/view?usp=sharing', isDownload: true },
];

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 border-t border-gray-700 mt-auto w-full"
      style={{ fontFamily: 'Nunito, sans-serif' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Branding Section */}
          <motion.div variants={childVariants} className="text-center md:text-left">
            <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition-colors">
              Sankritya Thakur
            </Link>
            <p className="mt-2 text-sm text-gray-400">Building the future, one line of code at a time.</p>
          </motion.div>

          {/* Contact & Social Icons Section */}
          <motion.div
            variants={childVariants}
            className="flex flex-col md:flex-row items-center md:justify-start text-center md:text-left"
          >
            {/* Email Section */}
            <p className="flex items-center mb-4 md:mb-0 md:mr-6">
              <Mail className="mr-2" size={22} />
              <a href="mailto:sankritya09.02@gmail.com" className="hover:text-blue-400 transition-colors">
                sankritya09.02@gmail.com
              </a>
            </p>

            {/* Social Icons Section */}
            <div className="flex space-x-6">
              {socialIcons.map(({ Icon, href, isDownload }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  target={isDownload ? '_self' : '_blank'}
                  rel={isDownload ? 'noopener' : 'noopener noreferrer'}
                  download={isDownload}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:text-blue-400 transition-colors"
                >
                  <Icon size={32} /> {/* Increased icon size to 32 */}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div variants={childVariants} className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Sankritya Thakur. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
