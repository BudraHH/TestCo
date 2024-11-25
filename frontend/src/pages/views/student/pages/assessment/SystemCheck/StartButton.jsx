import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const StartButton = ({ allChecksPass, onStart }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    className="text-center"
  >
    <motion.button
      whileHover={{ scale: allChecksPass ? 1.05 : 1 }}
      whileTap={{ scale: allChecksPass ? 0.95 : 1 }}
      onClick={onStart}
      disabled={!allChecksPass}
      className={`
        px-8 py-3 rounded-xl font-semibold flex items-center justify-center mx-auto space-x-2
        ${allChecksPass 
          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white cursor-pointer' 
          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        } transition-all duration-300
      `}
    >
      <span>{allChecksPass ? 'Start Assessment' : 'Complete System Checks'}</span>
      {allChecksPass && <ArrowRight size={20} />}
    </motion.button>
    {!allChecksPass && (
      <p className="mt-4 text-red-400 text-sm">
        Please complete all system checks before proceeding
      </p>
    )}
  </motion.div>
);