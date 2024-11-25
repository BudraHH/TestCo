import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSystemCheck = (assessmentId) => {
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
      const isFirefox = /firefox/.test(userAgent);
      setChecks(prev => ({ ...prev, browser: isChrome || isFirefox }));
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

  const startAssessment = () => {
    if (allChecksPass) {
      navigate(`/student/start-test/${assessmentId}`);
    }
  };

  return {
    checks,
    isFullscreen,
    requestMediaPermissions,
    toggleFullscreen,
    allChecksPass,
    startAssessment
  };
};