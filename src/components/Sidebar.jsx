import React, { useState, useEffect } from "react";
import {
  BookOpen,
  TrendingUp,
  MapPin,
  Award,
  DollarSign,
  Calendar,
  Brain,
  BarChart3,
  Target,
  Menu,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();

  const sidebarOptions = [
    { id: "overview", icon: BookOpen, label: "Dashboard", path: "/" },
    { id: "aptitude", icon: Brain, label: "Aptitude Test", path: "/aptitude" },
    { id: "steam", icon: TrendingUp, label: "STEAM Paths", path: "/steam" },
    { id: "career", icon: Target, label: "Career Planning", path: "/career" },
    { id: "colleges", icon: MapPin, label: "College Directory", path: "/colleges" },
    { id: "cutoff", icon: Award, label: "Cut-offs & Eligibility", path: "/cutoff" },
    { id: "scholarship", icon: DollarSign, label: "Scholarships", path: "/scholarship" },
    { id: "timeline", icon: Calendar, label: "Timeline Tracker", path: "/timeline" },
    { id: "analytics", icon: BarChart3, label: "Analytics", path: "/analytics" },
  ];

  // Detect screen size for mobile default collapse
  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, [setCollapsed]);

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white shadow-lg fixed left-0 top-0 h-full p-4 transition-all duration-300 z-20`}
    >
      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center mb-6 p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
      >
        <Menu className="w-5 h-5" />
      </button>

      <nav>
        <ul className="space-y-2">
          {sidebarOptions.map((option) => {
            const active = location.pathname === option.path;
            return (
              <li key={option.id}>
                <Link
                  to={option.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <option.icon className="w-5 h-5" />
                  {!collapsed && <span>{option.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
