import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

const TopBar = ({userDetails}) => {
  return (
      <div className="bg-palatte-primary1  p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-right">
              <p className="text-sm font-medium text-white">Welcome, <span className={`text-lg font-bold`}>{` `}{userDetails.name || "loading..."}</span></p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-myColor-medium hover:text-myColor-secondary ">
              <Bell className="w-6 h-6 text-palatte-medium fill-current hover:text-palatte-light" />

              <span className="absolute top-1 right-1 w-3 h-3 bg-palatte-warning rounded-full"></span>
            </button>

            <div className="flex items-center space-x-4">

              <img
                 src={userDetails.profileImage || ""} alt="Profile"
                  className="w-9 h-9 rounded-full cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default TopBar;