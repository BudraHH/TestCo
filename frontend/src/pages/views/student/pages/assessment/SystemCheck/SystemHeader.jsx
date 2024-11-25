import React from 'react';
import { motion } from 'framer-motion';

const SystemHeader = () => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
      System Requirements Check
    </h1>
    <p className="text-gray-400 text-lg">
      Complete all system checks before starting the assessment
    </p>
  </motion.div>
);