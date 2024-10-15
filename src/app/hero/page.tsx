'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Button, Container, Typography, Box } from '@mui/material';
import Image from 'next/image';
import { Link as ScrollLink } from 'react-scroll';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={heroRef}
      sx={{
        minHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ flex: 1, mb: { xs: 4, md: 0 } }}>
            <Typography
              variant="h1"
              className="hero-text"
              sx={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                color: 'white',
                mb: 2,
              }}
            >
              Hi, I'm Sankritya
            </Typography>
            <Typography
              variant="h2"
              className="hero-text"
              sx={{
                fontFamily: 'Courier Prime, monospace',
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 4,
              }}
            >
              Full-Stack Developer & UI/UX Enthusiast
            
            </Typography>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        {/* Scroll to the 'projects' section */}
        <ScrollLink
          to="projects" // This id should match the section you're scrolling to
          smooth={true} // Enable smooth scroll
          duration={500} // Scroll duration in milliseconds
          offset={-70} // Adjust the offset to consider any fixed headers
        >
          <Button
            variant="contained"
            size="large"
            className="hero-text"
            sx={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 600,
              backgroundColor: 'white',
              color: '#4169E1',
              '&:hover': {
                backgroundColor: '#F0F8FF',
              },
            }}
          >
            View Projects
          </Button>
        </ScrollLink>
      </motion.div>

            <Typography
              variant="body1"
              className="hero-text"
              sx={{
                fontFamily: 'Courier Prime, monospace',
                color: 'rgba(255, 255, 255, 0.8)',
                mt: 2,
              }}
            >
              Explore my latest work and see how I can help bring your ideas to life.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: [20, -20, 20] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            >
            <Image
              src="/memoji1_e.png"
              alt="Your Memoji"
              width={300}
              height={400}
              className="hero-text"
            />

            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
