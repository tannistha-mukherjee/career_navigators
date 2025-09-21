import React from "react";
import {
  Brain,
  TrendingUp,
  Target,
  MapPin,
  Award,
  DollarSign,
  Calendar,
  Globe,
  PlayCircle,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const coreFeatures = [
    {
      id: "aptitude",
      icon: Brain,
      title: "Aptitude & Interest Test",
      description: "AI-powered assessment",
      color: "bg-purple-500",
      path: "/aptitude",
    },
    {
      id: "steam",
      icon: TrendingUp,
      title: "STEAM Suggestions",
      description: "Personalized STEAM paths",
      color: "bg-blue-500",
      path: "/steam",
    },
    {
      id: "career",
      icon: Target,
      title: "Course to Career",
      description: "Plan your dream career",
      color: "bg-green-500",
      path: "/career",
    },
    {
      id: "colleges",
      icon: MapPin,
      title: "Nearby Colleges",
      description: "Find government colleges",
      color: "bg-orange-500",
      path: "/colleges",
    },
    {
      id: "cutoff",
      icon: Award,
      title: "Cut-off & Eligibility",
      description: "Latest admission requirements",
      color: "bg-indigo-500",
      path: "/cutoff",
    },
    {
      id: "scholarship",
      icon: DollarSign,
      title: "Scholarship Info",
      description: "Find financial aid opportunities",
      color: "bg-yellow-500",
      path: "/scholarship",
    },
    {
      id: "timeline",
      icon: Calendar,
      title: "Admission Timeline",
      description: "Never miss deadlines",
      color: "bg-pink-500",
      path: "/timeline",
    },
  ];

  const innovativeFeatures = [
    {
      id: "aicareer",
      icon: Brain,
      title: "AI Career Planning",
      description: "24/7 personalized guidance chatbot",
      path: "/aicareer",
    },
    {
      id: "virtual",
      icon: PlayCircle,
      title: "Virtual Campus Tours",
      description: "360° immersive experiences",
      path: "/virtual",
    },
    {
      id: "peerconnect",
      icon: Users,
      title: "Peer Connect",
      description: "Connect with students",
      path: "/peerconnect",
    },
    {
      id: "mentorship",
      icon: Globe,
      title: "Industry Mentorship",
      description: "Connect with professionals",
      path: "/mentorship",
    },
  ];

  return (
    <div className="p-6">
      {/* Core Features */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Core Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coreFeatures.map((feature) => (
          <Link key={feature.id} to={feature.path} className="h-full">
            <div className="group h-full flex flex-col justify-between bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div>
                <div
                  className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Innovative Features */}
      <h2 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">
        Innovative Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {innovativeFeatures.map((feature) => (
          <Link key={feature.id} to={feature.path}>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl hover:shadow-md transition-all">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <feature.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
