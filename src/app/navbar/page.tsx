"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link, Events, scrollSpy } from "react-scroll";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

const navItems = ["home", "about", "portfolio", "skills", "contact"];

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Register scroll events for react-scroll
    Events.scrollEvent.register("begin", () => console.log("Scroll event started"));
    Events.scrollEvent.register("end", () => console.log("Scroll event ended"));
    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  // Explicitly defining 'section' as a string type
  const handleSetActive = (section: string) => {
    setActiveSection(section);
    setOpen(false); // Close menu on mobile after clicking
  };

  const navbarHeight = 70;
  const scrollDuration = 500;

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "90%", sm: "auto" },
          padding: { xs: "0", sm: "10px 40px" },
          backgroundColor: { xs: "transparent", sm: "rgba(0, 0, 0, 0.8)" }, // Hide background for mobile
          backdropFilter: { xs: "none", sm: "blur(10px)" }, // Remove blur for mobile
          borderRadius: { xs: "0", sm: "50px" }, // Remove border-radius for mobile
          boxShadow: { xs: "none", sm: "0px 4px 20px rgba(0, 0, 0, 0.3)" }, // Remove shadow for mobile
        }}
      >
        {/* Menu Toggle Icon for Mobile */}
        <Box
          onClick={() => setOpen(!isOpen)}
          sx={{
            width: "30px",
            height: "30px",
            display: { xs: "flex", sm: "none" },
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            position: "absolute",
            left: "20px",
          }}
        >
          {isOpen ? <CloseIcon sx={{ color: "white", fontSize: "30px" }} /> : <MenuIcon sx={{ color: "white", fontSize: "30px" }} />}
        </Box>

        {/* Navigation Items */}
        <Box
          sx={{
            display: { xs: isOpen ? "flex" : "none", sm: "flex" },
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: { xs: 2, sm: 4 },
            position: { xs: "absolute", sm: "relative" },
            top: { xs: "50px", sm: "auto" },
            left: { xs: 0, sm: "auto" },
            backgroundColor: { xs: "rgba(0, 0, 0, 0.8)", sm: "transparent" }, // Background for mobile menu
            width: { xs: "100%", sm: "auto" },
            borderRadius: { xs: "10px", sm: "0" },
            padding: { xs: "10px", sm: "0" },
          }}
        >
          {/* Nav Links */}
          {navItems.map((item) => (
            <Typography
              key={item}
              component={Link}
              to={item}
              smooth={true}
              duration={scrollDuration}
              offset={-navbarHeight}
              spy={true}
              onSetActive={() => handleSetActive(item)}
              sx={{
                color: activeSection === item ? "#1E90FF" : "white",
                fontFamily: "'Space Mono', monospace",
                zIndex: 1,
                position: "relative",
                padding: "8px 16px",
                cursor: "pointer",
                "&:hover": {
                  color: "#1E90FF",
                },
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Typography>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
