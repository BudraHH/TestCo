import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-palatte-primary1  p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-lg text-myColor-light  rounded-lg ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-palatte-medium hover:text-palatte-extraLight w-5 h-5 cursor-pointer" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-white bg-palatte-primary2 border border-palatte-secondary rounded-lg focus:outline-none focus:bg-palatte-primary4 "
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-myColor-medium hover:text-myColor-secondary ">
          <Bell className="w-6 h-6 text-palatte-medium fill-current hover:text-palatte-light" />

            <span className="absolute top-1 right-1 w-3 h-3 bg-palatte-warning rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-lg font-bold text-white">John Doe</p>
            </div>
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