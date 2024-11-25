import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Lock } from 'lucide-react';

const guidelines = [
  "Ensure you are in a quiet, well-lit room",
  "Close all other applications and browser tabs",
  "Do not attempt to switch tabs or windows during the test",
  "Keep your camera and microphone on throughout the test",
  "No mobile phones or other electronic devices allowed",
  "Do not use any external resources unless specified",
  "Maintain proper posture and face the camera",
  "In case of technical issues, contact the proctor immediately"
];

const Guidelines = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700"
  >
    <div className="flex items-center space-x-3 mb-6">
      <AlertCircle className="text-yellow-400" size={24} />
      <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
        Important Guidelines
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {guidelines.map((guideline, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 * index }}
          className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700"
        >
          <Lock className="text-gray-400 mt-1 flex-shrink-0" size={16} />
          <span className="text-gray-300">{guideline}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);