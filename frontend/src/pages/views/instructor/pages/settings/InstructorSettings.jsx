import { useState } from "react";
import {
    User,
    Shield,
} from "lucide-react";
import Profile from "./Profile.jsx";
import Security from "./Security.jsx";

const InstructorSettings = () => {
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Shield }
    ];

    return (
        <div className="p-4 flex flex-col gap-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className=" font-bold text-white">Account Settings</h1>
            </div>

            {/* Main Layout */}
            <div className="flex gap-4">
                {/* Tabs */}
                <div>
                    <div className="w-72 flex-initial bg-palatte-primary3 p-4 flex flex-col gap-2 rounded-lg">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ease-in-out ${
                                        activeTab === tab.id
                                            ? "text-white ring-2 ring-palatte-secondary bg-palatte-dark shadow-md"
                                            : "text-palatte-medium hover:bg-palatte-primary3 hover:text-palatte-light"
                                    }`}
                                >
                                    <Icon className="h-6 w-6 text-palatte-medium" />
                                    <span
                                        className={`ml-4 ${
                                            activeTab === tab.id ? "text-white" : "text-palatte-medium"
                                        }`}
                                    >
                    {tab.label}
                  </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="rounded-lg shadow-lg ">
                        {/* Profile Tab Content */}
                        {activeTab === "profile" && (
                            <Profile/>
                        )}

                        {/* Security Tab Content */}
                        {activeTab === "security" && (
                            <Security/>
                        )}

                        {/* Add other Tab Contents (Notifications, Privacy, Data Management) here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorSettings;
