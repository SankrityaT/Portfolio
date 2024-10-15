"use client";
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const projects = [
  {

    imgSrc: '/community.png',
    title: 'CommUnity',
    description: 'A web platform designed to resolve conflicts through voting and AI-powered mediation',
    link: 'https://main.dg788ocmeaqpm.amplifyapp.com/'
  },
  {


    imgSrc: '/product-research-assistant.png', 
    title: 'AI Product Research Assistant',
    description: 'An AI-powered application that provides personalized product recommendations using Groq AI.',
    link: 'https://main.d346l4qj34l94.amplifyapp.com/', 

  },
  {


    imgSrc: '/wagmeet.png',
    title: 'WagMeet',
    description: 'An app where dog owners connect, schedule meetups, and explore dog-friendly parks in their local areas.',
    link: 'https://github.com/SankrityaT/WagMeet/tree/frontend'    

  },
  {
    imgSrc: '/money-splitting-app.jpg',
    title: 'Money Splitting App',
    description: 'A real-time expense splitting app that ensures fair share calculations among friends.',
    link: 'https://github.com/SankrityaT/FairSplit',
    
  },
  {
    imgSrc: '/premier-league.jpg',
    title: 'Premier League Prediction App',
    description: 'An app that predicts Premier League match outcomes using machine learning algorithms.',
    link: 'https://github.com/SankrityaT/Sankritya-premier-league-prediction',


  },
  {
    imgSrc: '/real-estate.jpg',
    title: 'Real Estate Website',
    description: 'A modern and responsive real estate website that helps users find their dream place.',
    link: 'https://github.com/SankrityaT/RealEstateUI',

  },
];

const Portfolio = () => {
  return (
    <Box
    id="projects"
      sx={{
        zIndex: 10,
        px: { xs: 2, sm: 4, md: 6, lg: 10 },
        py: { xs: 4, sm: 6, md: 8 },
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: '2.5em', sm: '3em', md: '4em' },
          mb: 1,
          fontFamily: 'Nunito, sans-serif',
          color: '#ffff',
        }}
      >
        My Projects
      </Typography>
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: { xs: '1em', sm: '1.25em', md: '2em' },
          fontFamily: 'Nunito, sans-serif',
          mb: 4,
          color: '#ffff',
        }}
      >
        Below are a few of my personal projects
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {projects.map((project, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                backgroundColor: '#1E3A8A',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '200px',
                  backgroundImage: `url(${project.imgSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Box sx={{ padding: '20px' }}>
                <Typography
                  sx={{ fontWeight: 'bold', fontSize: '18px', mb: 1, color: '#ffff', fontFamily: 'Nunito, sans-serif' }}
                >
                  {project.title}
                </Typography>
                <Typography
                  sx={{ fontSize: '14px', mb: 2, color: '#fff', fontFamily: 'Nunito, sans-serif' }}
                >
                  {project.description}
                </Typography>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Typography
                    sx={{
                      color: '#1E90FF',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      '&:hover': {
                        color: '#fff',
                      },
                    }}
                  >
                    View Project
                  </Typography>
                </a>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Portfolio;
