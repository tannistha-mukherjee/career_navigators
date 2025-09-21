import React from "react";
import { Search, Bell, User, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center bg-white shadow-sm px-6 py-4 sticky top-0 z-10">
      <h1 className="text-xl md:text-2xl font-bold text-gray-800">Welcome Rohit!</h1>
      <div className="flex items-center space-x-4">
        <Search className="w-5 h-5 text-gray-500 cursor-pointer" />
        <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
        <User className="w-8 h-8 text-gray-600 cursor-pointer" />
        <Settings className="w-5 h-5 text-gray-500 cursor-pointer" />
      </div>
    </header>
  );
};

export default Navbar;
