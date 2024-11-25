import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-palatte-primary1  p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-right">
            <p className="text-sm font-medium text-white">Welcome, <span className={`text-lg font-bold`}>{` `}John Doe</span></p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-myColor-medium hover:text-myColor-secondary ">
          <Bell className="w-6 h-6 text-palatte-medium fill-current hover:text-palatte-light" />

            <span className="absolute top-1 right-1 w-3 h-3 bg-palatte-warning rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-4">

            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-9 h-9 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;