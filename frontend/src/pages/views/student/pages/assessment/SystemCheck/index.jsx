import React from 'react';
import SystemHeader from './SystemHeader';
import RequirementChecks from './RequirementChecks';
import Guidelines from './Guidelines';
import StartButton from './StartButton';
import { useSystemCheck } from './hooks/useSystemCheck';

const SystemCheck = ({ assessmentId }) => {
  const { 
    checks, 
    isFullscreen,
    requestMediaPermissions,
    toggleFullscreen,
    allChecksPass,
    startAssessment
  } = useSystemCheck(assessmentId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <SystemHeader />
        <RequirementChecks 
          checks={checks}
          isFullscreen={isFullscreen}
          requestMediaPermissions={requestMediaPermissions}
          toggleFullscreen={toggleFullscreen}
        />
        <Guidelines />
        <StartButton 
          allChecksPass={allChecksPass}
          onStart={startAssessment}
        />
      </div>
    </div>
  );
};

export default SystemCheck;