'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { Box, Container, Typography, Grid } from '@mui/material';
import Image from 'next/image';
import { Code, Briefcase, Book, User } from 'lucide-react';
import AIChatUI from '../aichatui/page'; 
import StyledButton from '../../components/ui/StyledButton';

// Type for IconWrapper children
type IconWrapperProps = {
  children: ReactNode;
};

const IconWrapper = ({ children }: IconWrapperProps) => (
  <Box
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      marginRight: 2,
    }}
  >
    {children}
  </Box>
);

// Type for TextBlock props
type TextBlockProps = {
  icon: ReactNode;
  title: string;
  content: string;
};

const TextBlock = ({ icon, title, content }: TextBlockProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
        <IconWrapper>{icon}</IconWrapper>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Courier Prime, monospace',
              fontWeight: 700,
              mb: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Courier Prime, monospace',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            }}
          >
            {content}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default function About() {
  const [showChat, setShowChat] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      console.log('About section is in view!');
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Box ref={ref} sx={{ py: { xs: 6, md: 10 }, color: 'white' }}>
      <Container maxWidth="lg">
        {/* Button to Toggle Chat UI */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <StyledButton
            onClick={() => setShowChat(!showChat)}
            showChat={showChat}
          />
        </Box>

        {/* Conditional Rendering of "About Me" Section */}
        {!showChat && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: { xs: '300px', md: '400px' },
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src="/memoji2.png"
                      alt="Your Memoji"
                      width={300}
                      height={400}
                      className="hero-text"
                    />
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemVariants}>
                  <TextBlock
                    icon={<User size={34} />}
                    title="Who I Am"
                    content="I'm a Computer Science student at Arizona State University with a strong foundation in full-stack web development, iOS app development, and backend programming. I thrive on building user-centric applications and enhancing user experiences."
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <TextBlock
                    icon={<Code size={34} />}
                    title="My Skills"
                    content="Proficient in Java, C/C++, Python, JavaScript, TypeScript, Swift, and Kotlin. Experienced with Next.js, React, Node.js, AWS, MongoDB, and SQL. Strong foundation in responsive design, accessibility, and performance optimization."
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <TextBlock
                    icon={<Briefcase size={34} />}
                    title="Experience"
                    content="Currently an iOS Developer Intern at SeeMe LLC. Previously worked as a Frontend Developer Intern at HCL Tech, enhancing a real estate web application. 2+ years of professional experience in building scalable applications."
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <TextBlock
                    icon={<Book size={34} />}
                    title="Always Learning"
                    content="Constantly expanding my skillset through online courses, tech conferences, hackathons and personal projects. Currently exploring machine learning and its applications in web development."
                  />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {/* Conditional Rendering of AIChatUI */}
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AIChatUI />
          </motion.div>
        )}
      </Container>
    </Box>
  );
}
