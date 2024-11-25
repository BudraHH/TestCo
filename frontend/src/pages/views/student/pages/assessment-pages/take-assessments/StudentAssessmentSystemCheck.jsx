import { useState, useEffect } from "react";

const StudentAssessmentSystemCheck = () => {
    const [cameraAccess, setCameraAccess] = useState(false);
    const [microphoneAccess, setMicrophoneAccess] = useState(false);
    const [internetConnected, setInternetConnected] = useState(true);
    const [browserCompatible, setBrowserCompatible] = useState(false);
    const [certify, setCertify] = useState(false);
    const [showTryAgain, setShowTryAgain] = useState(false); // New state for showing the try again button

    // Supported browsers list
    const supportedBrowsers = ["Chrome", "Edge", "Firefox", "Safari"];

    // Check for camera and microphone access
    const checkCameraAndMicrophone = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (stream.getVideoTracks().length > 0) setCameraAccess(true);
            if (stream.getAudioTracks().length > 0) setMicrophoneAccess(true);

            // Stop the stream after checking
            stream.getTracks().forEach((track) => track.stop());
        } catch (error) {
            console.error("Error accessing camera or microphone:", error);
        }
    };

    // Check browser compatibility
    const checkBrowserCompatibility = () => {
        const userAgent = navigator.userAgent;
        const browserMatch = supportedBrowsers.some((browser) =>
            userAgent.includes(browser)
        );
        setBrowserCompatible(browserMatch);
    };

    // Check internet connectivity
    const handleConnectivityChange = () => {
        setInternetConnected(navigator.onLine);
    };

    useEffect(() => {
        // Make the page full-screen on load
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }

        checkCameraAndMicrophone();
        checkBrowserCompatibility();
        handleConnectivityChange();

        // Add event listeners for connectivity changes
        window.addEventListener("online", handleConnectivityChange);
        window.addEventListener("offline", handleConnectivityChange);

        return () => {
            window.removeEventListener("online", handleConnectivityChange);
            window.removeEventListener("offline", handleConnectivityChange);
        };
    }, []);

    // Check if the start button should be enabled
    const isStartButtonEnabled =
        cameraAccess && microphoneAccess && internetConnected && browserCompatible && certify;

    // Handle exit button
    const handleExit = () => {
        window.close(); // Close the window if it was opened by JavaScript
    };

    // Handle try again button
    const handleTryAgain = () => {
        setCameraAccess(false);
        setMicrophoneAccess(false);
        setInternetConnected(true);
        setBrowserCompatible(false);
        setShowTryAgain(false); // Reset the try again state
    };

    // Show the try again button if any of the checks fail
    useEffect(() => {
        if (!cameraAccess || !microphoneAccess || !internetConnected || !browserCompatible) {
            setShowTryAgain(true);
        } else {
            setShowTryAgain(false);
        }
    }, [cameraAccess, microphoneAccess, internetConnected, browserCompatible]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
            <div className="flex flex-col md:flex-row bg-white text-gray-900 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg shadow-xl overflow-hidden">
                {/* Left Panel: Instructions */}
                <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-gray-300">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Instructions</h2>
                    <ul className="list-disc pl-6 space-y-4 text-lg text-gray-700">
                        <li>This assessment consists of multiple-choice questions (MCQs) only.</li>
                        <li>Test duration is <strong>30 minutes</strong>. Complete the test within the allocated time.</li>
                        <li>Negative marking applies for incorrect answers.</li>
                        <li>Ensure <strong>no background noise</strong> or distractions during the test.</li>
                        <li>Do not switch tabs during the test. Doing so will terminate the test automatically.</li>
                        <li>Use a stable internet connection to avoid disruptions.</li>
                        <li>Rough sheets and calculators are <strong>not allowed</strong>.</li>
                        <li>Click the <strong>Start Test</strong> button only after completing the compatibility check.</li>
                    </ul>
                    <div className="mt-8 flex items-center space-x-3">
                        <input
                            type="checkbox"
                            className="h-5 w-5 text-blue-600"
                            checked={certify}
                            onChange={() => setCertify(!certify)}
                        />
                        <span className="text-sm text-gray-700">I certify that I have read and agree to the instructions.</span>
                    </div>
                </div>

                {/* Right Panel: System Compatibility */}
                <div className="flex-1 p-6">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">System Compatibility Check</h2>
                    <p className="text-lg text-gray-700">Please ensure your system meets the following requirements:</p>
                    <ul className="list-none space-y-4 mt-6 text-lg text-gray-700">
                        <li>
                            <span className="font-medium">Camera Access:</span>{" "}
                            {cameraAccess ? (
                                <span className="text-green-500 font-semibold">Enabled</span>
                            ) : (
                                <span className="text-red-500 font-semibold">Not Accessible</span>
                            )}
                        </li>
                        <li>
                            <span className="font-medium">Microphone Access:</span>{" "}
                            {microphoneAccess ? (
                                <span className="text-green-500 font-semibold">Enabled</span>
                            ) : (
                                <span className="text-red-500 font-semibold">Not Accessible</span>
                            )}
                        </li>
                        <li>
                            <span className="font-medium">Internet Connectivity:</span>{" "}
                            {internetConnected ? (
                                <span className="text-green-500 font-semibold">Connected</span>
                            ) : (
                                <span className="text-red-500 font-semibold">Not Connected</span>
                            )}
                        </li>
                        <li>
                            <span className="font-medium">Browser Compatibility:</span>{" "}
                            {browserCompatible ? (
                                <span className="text-green-500 font-semibold">Compatible</span>
                            ) : (
                                <span className="text-red-500 font-semibold">Not Compatible</span>
                            )}
                        </li>
                    </ul>
                    <p className="mt-4 text-sm text-gray-600">
                        If your camera, microphone, or internet connectivity isn't accessible, please check your browser permissions or system settings.
                    </p>

                    <div className="mt-8 flex space-x-6">
                        <button
                            className={`px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 ${
                                isStartButtonEnabled
                                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!isStartButtonEnabled}
                            onClick={() => alert("Test started!")}
                        >
                            Start Test
                        </button>

                        {showTryAgain && (
                            <button
                                className="px-6 py-3 text-white font-semibold rounded-lg bg-yellow-600 hover:bg-yellow-700 transition-all duration-300"
                                onClick={handleTryAgain}
                            >
                                Try Again
                            </button>
                        )}
                        <button
                            className="px-6 py-3 text-white font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300"
                            onClick={handleExit}
                        >
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentAssessmentSystemCheck;
