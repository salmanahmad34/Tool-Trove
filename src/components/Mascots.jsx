import React from 'react';
import { motion } from 'framer-motion';

export const OwlMascot = () => (
  <motion.svg 
    viewBox="0 0 100 100" 
    className="w-16 h-16 drop-shadow-md"
    animate={{ y: [0, -5, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <circle cx="50" cy="50" r="45" fill="#5D4037" />
    <circle cx="35" cy="40" r="10" fill="white" />
    <circle cx="65" cy="40" r="10" fill="white" />
    <motion.circle 
      cx="35" cy="40" r="4" fill="black" 
      animate={{ scaleY: [1, 0.1, 1] }} 
      transition={{ repeat: Infinity, duration: 4, times: [0, 0.95, 1] }}
    />
    <motion.circle 
      cx="65" cy="40" r="4" fill="black" 
      animate={{ scaleY: [1, 0.1, 1] }} 
      transition={{ repeat: Infinity, duration: 4, times: [0, 0.95, 1] }}
    />
    <path d="M45 55 L50 65 L55 55 Z" fill="#FFA000" />
  </motion.svg>
);

export const LionMascot = () => (
  <motion.svg 
    viewBox="0 0 100 100" 
    className="w-16 h-16 drop-shadow-md"
    animate={{ rotate: [-2, 2, -2] }}
    transition={{ duration: 4, repeat: Infinity }}
  >
    <circle cx="50" cy="50" r="45" fill="#FFB300" />
    <circle cx="50" cy="50" r="35" fill="#FFE082" />
    <circle cx="38" cy="45" r="4" fill="#3E2723" />
    <circle cx="62" cy="45" r="4" fill="#3E2723" />
    <path d="M45 60 Q50 65 55 60" stroke="#3E2723" strokeWidth="2" fill="none" />
    <path d="M20 30 Q10 50 20 70 M80 30 Q90 50 80 70" stroke="#E65100" strokeWidth="8" strokeLinecap="round" fill="none" />
  </motion.svg>
);

export const ElephantMascot = () => (
  <motion.svg 
    viewBox="0 0 100 100" 
    className="w-16 h-16 drop-shadow-md"
  >
    <circle cx="50" cy="55" r="40" fill="#90A4AE" />
    <circle cx="35" cy="45" r="15" fill="#90A4AE" />
    <circle cx="65" cy="45" r="15" fill="#90A4AE" />
    <motion.path 
      d="M50 65 Q50 85 40 85" 
      stroke="#90A4AE" 
      strokeWidth="12" 
      strokeLinecap="round" 
      fill="none"
      animate={{ d: ["M50 65 Q50 85 40 85", "M50 65 Q50 85 60 85", "M50 65 Q50 85 40 85"] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <circle cx="40" cy="50" r="3" fill="#263238" />
    <circle cx="60" cy="50" r="3" fill="#263238" />
  </motion.svg>
);

export const ChameleonMascot = () => (
  <motion.svg 
    viewBox="0 0 100 100" 
    className="w-16 h-16 drop-shadow-md"
    animate={{ fill: ["#4CAF50", "#2196F3", "#F44336", "#4CAF50"] }}
    transition={{ duration: 8, repeat: Infinity }}
  >
    <path d="M20 70 Q50 20 80 70" stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="round" />
    <circle cx="75" cy="65" r="10" fill="currentColor" />
    <motion.circle 
      cx="75" cy="65" r="4" fill="white" 
      animate={{ x: [-2, 2, -2], y: [-2, 2, -2] }}
      transition={{ duration: 1, repeat: Infinity }}
    />
  </motion.svg>
);

export const FoxMascot = () => (
  <motion.svg 
    viewBox="0 0 100 100" 
    className="w-16 h-16 drop-shadow-md"
    animate={{ rotate: [-3, 3, -3] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <polygon points="50,15 20,55 80,55" fill="#E65100" />
    <polygon points="50,45 20,55 80,55" fill="#F57C00" />
    <polygon points="50,55 35,90 65,90" fill="#FFCC80" />
    <polygon points="50,65 42,90 58,90" fill="#212121" />
    <circle cx="40" cy="50" r="3" fill="#212121" />
    <circle cx="60" cy="50" r="3" fill="#212121" />
  </motion.svg>
);
