"use client"
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FC } from 'react';

// Define the prop types
interface StyledButtonProps {
  onClick: () => void; // onClick is a function that takes no arguments and returns nothing
  showChat: boolean;   // showChat is a boolean
}

const StyledButton: FC<StyledButtonProps> = ({ onClick, showChat }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={onClick}
        variant="contained"
        size="large"
        sx={{
          backgroundColor: '#f0f4f8',
          color: '#4169E1',
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 600,
          fontSize: '1rem',
          px: 3,
          py: 1.5,
          borderRadius: '30px', // Adds a more rounded, "cute" look
          textTransform: 'none', // No capital letters, for a modern, subtle look
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: '#e0f0ff', // Subtle hover color change
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)', // More pronounced shadow on hover
            transform: 'translateY(-2px)', // Small lift on hover
          },
          '&:active': {
            boxShadow: '0 3px 12px rgba(0, 0, 0, 0.2)', // Smaller shadow on click
            transform: 'translateY(1px)', // Slight push effect on click
          },
        }}
      >
        {showChat ? 'Back to About Me' : 'Get to Know More About Me Through My Chat Bot!'}
      </Button>
    </motion.div>
  );
};

export default StyledButton;
