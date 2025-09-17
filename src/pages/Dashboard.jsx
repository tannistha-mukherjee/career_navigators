import React, { useState, useEffect } from "react";
import {
  BookOpen,
  TrendingUp,
  MapPin,
  Award,
  Globe,
  DollarSign,
  Calendar,
  Brain,
  BarChart3,
  Users,
  Target,
  Search,
  Bell,
  User,
  Settings,
  PlayCircle,
} from "lucide-react";
import { Link } from "react-router-dom"; // ✅ import Link

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sidebarOptions = [
    { id: "overview", icon: BookOpen, label: "Dashboard", active: true },
    { id: "aptitude", icon: Brain, label: "Aptitude Test" },
    { id: "steam", icon: TrendingUp, label: "STEAM Paths" },
    { id: "career", icon: Target, label: "Career Planning" },
    { id: "colleges", icon: MapPin, label: "College Directory" },
    { id: "cutoff", icon: Award, label: "Cut-offs & Eligibility" },
    { id: "scholarship", icon: DollarSign, label: "Scholarships" },
    { id: "timeline", icon: Calendar, label: "Timeline Tracker" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
  ];

  const coreFeatures = [
    {
      id: "aptitude",
      icon: Brain,
      title: "Aptitude & Interest Test",
      description: "AI-powered assessment to discover your strengths",
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
      stats: "85% Accuracy",
      action: "Take Test",
      delay: "animate-fadeInUp",
    },
    {
      id: "steam",
      icon: TrendingUp,
      title: "STEAM Suggestions",
      description: "Personalized Science, Tech, Engineering, Arts & Math paths",
      color: "bg-gradient-to-br from-blue-500 to-cyan-600",
      stats: "200+ Paths",
      action: "Explore",
      delay: "animate-fadeInUp animation-delay-100",
    },
    {
      id: "career",
      icon: Target,
      title: "Course to Career",
      description: "Map your educational journey to dream career",
      color: "bg-gradient-to-br from-green-500 to-emerald-600",
      stats: "500+ Careers",
      action: "Start Planning",
      delay: "animate-fadeInUp animation-delay-200",
    },
    {
      id: "colleges",
      icon: MapPin,
      title: "Nearby Colleges Directory",
      description: "Find government colleges in your area",
      color: "bg-gradient-to-br from-orange-500 to-red-600",
      stats: "1000+ Colleges",
      action: "Search",
      delay: "animate-fadeInUp animation-delay-300",
    },
    {
      id: "cutoff",
      icon: Award,
      title: "Cut-off & Eligibility",
      description: "Latest admission requirements and cut-off marks",
      color: "bg-gradient-to-br from-indigo-500 to-purple-600",
      stats: "Updated Daily",
      action: "Check Now",
      delay: "animate-fadeInUp animation-delay-400",
    },
    {
      id: "multilingual",
      icon: Globe,
      title: "Multilingual Support",
      description: "Available in 12+ regional languages",
      color: "bg-gradient-to-br from-teal-500 to-blue-600",
      stats: "12 Languages",
      action: "Switch Language",
      delay: "animate-fadeInUp animation-delay-500",
    },
    {
      id: "scholarship",
      icon: DollarSign,
      title: "Scholarship Info",
      description: "Find financial aid and scholarship opportunities",
      color: "bg-gradient-to-br from-yellow-500 to-orange-600",
      stats: "₹50L+ Available",
      action: "Apply Now",
      delay: "animate-fadeInUp animation-delay-600",
    },
    {
      id: "timeline",
      icon: Calendar,
      title: "Admission Timeline",
      description: "Never miss important application deadlines",
      color: "bg-gradient-to-br from-pink-500 to-rose-600",
      stats: "30+ Exams",
      action: "Track",
      delay: "animate-fadeInUp animation-delay-700",
    },
  ];

  const innovativeFeatures = [
    {
      id: "aicareer",
      icon: Brain,
      title: "AI Career Planning",
      description: "24/7 personalized guidance chatbot",
      color: "bg-gradient-to-br from-violet-500 to-purple-600",
      link: "/dashboard/aicareer", // ✅ add link
    },
    {
      id: "virtual",
      icon: PlayCircle,
      title: "Virtual Campus Tours",
      description: "360° immersive college experiences",
      color: "bg-gradient-to-br from-cyan-500 to-blue-600",
    },
    {
      id: "peerconnect",
      icon: Users,
      title: "Peer Connect",
      description: "Connect with students in similar fields",
      color: "bg-gradient-to-br from-green-500 to-teal-600",
    },
    {
      id: "mentorship",
      icon: Globe,
      title: "Industry Mentorship",
      description: "Connect with professionals in your field",
      color: "bg-gradient-to-br from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg fixed left-0 top-0 h-full p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Dashboard</h2>
        <nav>
          <ul className="space-y-3">
            {sidebarOptions.map((option, index) => (
              <li
                key={option.id}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeSection === option.id
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50"
                } ${
                  mounted ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveSection(option.id)}
              >
                <option.icon className="w-5 h-5" />
                <span className="font-medium">{option.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Rohit!</h1>
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 text-gray-500 cursor-pointer" />
            <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
            <User className="w-8 h-8 text-gray-600 cursor-pointer" />
            <Settings className="w-5 h-5 text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Core Features */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature) => (
              <div
                key={feature.id}
                className={`group cursor-pointer ${feature.delay} bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div
                  className={`w-10 h-10 lg:w-12 lg:h-12 ${feature.color} rounded-lg flex items-center justify-center mb-3 lg:mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Innovative Features */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Innovative Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {innovativeFeatures.map((feature, index) => {
              const Card = (
                <div
                  key={feature.id}
                  className={`bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md ${
                    mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <feature.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );

              // ✅ Wrap AI Career Counselor with Link
              return feature.link ? (
                <Link to={feature.link} key={feature.id}>
                  {Card}
                </Link>
              ) : (
                Card
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
