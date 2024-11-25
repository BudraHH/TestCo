import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, Camera, Mic, Chrome, Firefox, 
  Monitor, CheckCircle, XCircle, Maximize2 
} from 'lucide-react';

const RequirementCheck = ({ icon: Icon, title, description, status, action }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all"
  >
    <Icon className={status ? 'text-green-400' : 'text-red-400'} size={24} />
    <div className="flex-grow">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    {action || (
      status ? 
        <CheckCircle className="text-green-400" size={20} /> : 
        <XCircle className="text-red-400" size={20} />
    )}
  </motion.div>
);

const RequirementChecks = ({ 
  checks, 
  isFullscreen, 
  requestMediaPermissions, 
  toggleFullscreen 
}) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700"
  >
    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
      System Requirements
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <RequirementCheck
        icon={Wifi}
        title="Internet Connection"
        description="Stable connection required"
        status={checks.internet}
      />

      <RequirementCheck
        icon={Camera}
        title="Camera Access"
        description="Working webcam required"
        status={checks.camera}
        action={!checks.camera && (
          <button 
            onClick={requestMediaPermissions}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
          >
            Allow Access
          </button>
        )}
      />

      <RequirementCheck
        icon={Mic}
        title="Microphone Access"
        description="Working microphone required"
        status={checks.microphone}
        action={!checks.microphone && (
          <button 
            onClick={requestMediaPermissions}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
          >
            Allow Access
          </button>
        )}
      />

      <RequirementCheck
        icon={Chrome}
        title="Browser Compatibility"
        description="Chrome or Firefox required"
        status={checks.browser}
      />

      <RequirementCheck
        icon={Monitor}
        title="Fullscreen Mode"
        description="Required during assessment"
        status={isFullscreen}
        action={(
          <button 
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center space-x-2 transition-colors"
          >
            <Maximize2 size={16} />
            <span>{isFullscreen ? 'Exit' : 'Enter'} Fullscreen</span>
          </button>
        )}
      />
    </div>
  </motion.div>
);