"use client";
import { Grid, Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const skills = [
  { name: "HTML", img: "https://cdn-icons-png.flaticon.com/128/1051/1051277.png" },
  { name: "React", img: "https://cdn-icons-png.flaticon.com/128/875/875209.png" },
  { name: "Scss", img: "https://cdn-icons-png.flaticon.com/128/5968/5968358.png" },
  { name: "MongoDB", img: "https://pluspng.com/img-png/logo-mongodb-png-mongodb-1600.png" },
  { name: "JavaScript", img: "https://cdn-icons-png.flaticon.com/128/5968/5968292.png" },
  { name: "Typescript", img: "https://cdn-icons-png.flaticon.com/128/5968/5968381.png" },
  { name: "Express.js", img: "https://th.bing.com/th/id/R.c502658a509d27b53679b3ef73c0d82f?rik=dFP%2b9LyCq64MMg&pid=ImgRaw&r=0" },
  { name: "MySQL", img: "https://cdn-icons-png.flaticon.com/128/5968/5968313.png" },
  { name: "Node.js", img: "https://cdn-icons-png.flaticon.com/128/15379/15379746.png" },
  { name: "ASP.NET", img: "https://cdn-icons-png.flaticon.com/128/10093/10093894.png" },
  { name: "Git", img: "https://cdn-icons-png.flaticon.com/128/15466/15466163.png" },
  { name: "Java", img: "https://cdn-icons-png.flaticon.com/128/226/226777.png" },
  { name: "C++", img: "https://cdn-icons-png.flaticon.com/128/6132/6132222.png" },
  { name: "Python", img: "https://cdn-icons-png.flaticon.com/128/5968/5968350.png" },
];

const Skills = () => {
  const animateSkills = () => {
    const skillsTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".skills-subtitle",
        start: "top 80%",
      },
    });

    skillsTL.to(".skills-title", {
      y: 0,
      opacity: 1,
      duration: 0.35,
    });

    skillsTL.to(".skills-subtitle", {
      y: 0,
      opacity: 1,
      duration: 0.25,
      delay: 0.15,
    });

    skillsTL.to(".skill-item", {
      y: 0,
      opacity: 1,
      duration: 0.15,
      stagger: 0.2,
    });
  };

  useEffect(() => {
    animateSkills();
  }, []);

  return (
    <Grid
      container
      id="Skills"
      className="skills-section"
      sx={{
        zIndex: 10,
        pb: 13,
        pt: 12,
        px: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "transparent", // Blending with global background
      }}
    >
      <Box
        sx={{
          width: "100%",
          py: 4,
          textAlign: "center",
        }}
      >
        <Typography
          className="skills-title"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "3em", sm: "3em", md: "4em" },
            mb: 1,
            fontFamily: "Nunito, sans-serif",
            color: "white",
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          My Technical Skills
        </Typography>
        <Typography
          className="skills-subtitle"
          sx={{
            fontWeight: 400,
            fontSize: { xs: ".99em", sm: ".95em", md: "2em" },
            fontFamily: "Nunito, sans-serif",
            color: "white",
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          My expertise and technical abilities that I have acquired over the years.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
          maxWidth: "lg",
        }}
        className="skills-container"
      >
        {skills.map((i) => (
          <Box
            key={i.name}
            className="skill-item"
            sx={{
              width: "150px", // Fixed width for consistency
              height: "150px", // Fixed height for consistency
              border: "1px solid #ffffff21",
              background: "#0c102178",
              borderRadius: "8px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "transform 0.5s, opacity 0.5s",
              "&:hover": {
                transform: "scale(1.1) rotate(5deg)", // Added rotation for dynamic effect
              },
            }}
          >
            <Box sx={{ width: "50px", height: "50px", position: "relative" }}>
              <Image
                src={i.img}
                alt={i.name}
                layout="fill"
                objectFit="contain"
              />
            </Box>
            <Typography
              sx={{
                color: "white",
                fontWeight: 600,
                fontSize: "1em",
                textAlign: "center",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              {i.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Grid>
  );
};

export default Skills;
