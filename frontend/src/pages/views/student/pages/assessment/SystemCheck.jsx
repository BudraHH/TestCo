import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wifi,
  Camera,
  Mic,
  Chrome,
  Monitor,
  CheckCircle,
  XCircle,
  AlertCircle,
  Maximize2,
  Lock
} from 'lucide-react';

const SystemCheck = ({ assessmentId }) => {
  const navigate = useNavigate();
  const [checks, setChecks] = useState({
    internet: false,
    camera: false,
    microphone: false,
    browser: false,
    fullscreen: false
  });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Check internet connectivity
    const checkInternet = () => {
      setChecks(prev => ({ ...prev, internet: navigator.onLine }));
    };
    window.addEventListener('online', checkInternet);
    window.addEventListener('offline', checkInternet);
    checkInternet();

    // Check browser compatibility
    const checkBrowser = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isChrome = /chrome/.test(userAgent);
      setChecks(prev => ({ ...prev, browser: isChrome  }));
    };
    checkBrowser();

    // Check fullscreen capability
    const checkFullscreen = () => {
      setChecks(prev => ({
        ...prev,
        fullscreen: document.fullscreenEnabled || document.webkitFullscreenEnabled
      }));
    };
    checkFullscreen();

    return () => {
      window.removeEventListener('online', checkInternet);
      window.removeEventListener('offline', checkInternet);
    };
  }, []);

  // Request camera and microphone permissions
  const requestMediaPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setChecks(prev => ({ ...prev, camera: true, microphone: true }));
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Media permission error:', error);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const allChecksPass = Object.values(checks).every(check => check);

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

  const startAssessment = () => {
    if (allChecksPass) {
      navigate(`/student/start-test/${assessmentId}`);
    }
  };

  return (
      <div className="w-[100vw] bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">System Requirements Check</h1>
            <p className="text-gray-400">Complete all system checks before starting the assessment</p>
          </div>

          {/* System Checks */}
          <div className=" bg-gray-800 rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-4">System Requirements</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Internet Connection */}
              <div className="flex items-center space-x-4">
                <Wifi className={checks.internet ? 'text-green-400' : 'text-red-400'} size={24}/>
                <div>
                  <p className="font-medium">Internet Connection</p>
                  <p className="text-sm text-gray-400">Stable connection required</p>
                </div>
                {checks.internet ?
                    <CheckCircle className="text-green-400 ml-auto" size={20}/> :
                    <XCircle className="text-red-400 ml-auto" size={20}/>
                }
              </div>

              {/* Camera */}
              <div className="flex items-center space-x-4">
                <Camera className={checks.camera ? 'text-green-400' : 'text-red-400'} size={24}/>
                <div>
                  <p className="font-medium">Camera Access</p>
                  <p className="text-sm text-gray-400">Working webcam required</p>
                </div>
                {checks.camera ?
                    <CheckCircle className="text-green-400 ml-auto" size={20}/> :
                    <button
                        onClick={requestMediaPermissions}
                        className="ml-auto px-3 py-1 bg-blue-600 rounded-lg text-sm"
                    >
                      Allow Access
                    </button>
                }
              </div>

              {/* Microphone */}
              <div className="flex items-center space-x-4">
                <Mic className={checks.microphone ? 'text-green-400' : 'text-red-400'} size={24}/>
                <div>
                  <p className="font-medium">Microphone Access</p>
                  <p className="text-sm text-gray-400">Working microphone required</p>
                </div>
                {checks.microphone ?
                    <CheckCircle className="text-green-400 ml-auto" size={20}/> :
                    <button
                        onClick={requestMediaPermissions}
                        className="ml-auto px-3 py-1 bg-blue-600 rounded-lg text-sm"
                    >
                      Allow Access
                    </button>
                }
              </div>

              {/* Browser Compatibility */}
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  <Chrome className="text-gray-400" size={24}/>
                </div>
                <div>
                  <p className="font-medium">Browser Compatibility</p>
                  <p className="text-sm text-gray-400">Chrome is required</p>
                </div>
                {checks.browser ?
                    <CheckCircle className="text-green-400 ml-auto" size={20}/> :
                    <XCircle className="text-red-400 ml-auto" size={20}/>
                }
              </div>

              {/* Fullscreen Mode */}
              <div className="flex items-center space-x-4">
                <Monitor className={isFullscreen ? 'text-green-400' : 'text-red-400'} size={24}/>
                <div>
                  <p className="font-medium">Fullscreen Mode</p>
                  <p className="text-sm text-gray-400">Required during assessment</p>
                </div>
                <button
                    onClick={toggleFullscreen}
                    className="ml-auto px-3 py-1 bg-blue-600 rounded-lg text-sm flex items-center space-x-2"
                >
                  <Maximize2 size={16}/>
                  <span>{isFullscreen ? 'Exit' : 'Enter'} Fullscreen</span>
                </button>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="text-yellow-400" size={24}/>
              <h2 className="text-xl font-semibold">Important Guidelines</h2>
            </div>
            <ul className="space-y-3">
              {guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Lock className="text-gray-400 mt-1 flex-shrink-0" size={16}/>
                    <span className="text-gray-300">{guideline}</span>
                  </li>
              ))}
            </ul>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
                onClick={startAssessment}
                disabled={!allChecksPass}
                className={`px-8 py-3 rounded-lg font-semibold ${
                    allChecksPass
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-600 cursor-not-allowed text-gray-300'
                } transition-colors`}
            >
              {allChecksPass ? 'Start Assessment' : 'Complete System Checks'}
            </button>
            {!allChecksPass && (
                <p className="mt-2 text-red-400 text-sm">
                  Please complete all system checks before proceeding
                </p>
            )}
          </div>
        </div>
      </div>
  );
};

export default SystemCheck;