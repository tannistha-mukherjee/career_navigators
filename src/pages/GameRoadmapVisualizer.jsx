import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Laptop,
  Code,
  Briefcase,
  Rocket,
  Award,
} from "lucide-react";

const roadmapSteps = [
  {
    title: "Learn Programming Basics",
    icon: <BookOpen size={28} />,
    detail:
      "Start with a language like Python, Java, or C++ and understand variables, loops, and functions.",
  },
  {
    title: "Data Structures & Algorithms",
    icon: <Laptop size={28} />,
    detail:
      "Master arrays, linked lists, trees, graphs, sorting, and searching algorithms.",
  },
  {
    title: "Build Projects",
    icon: <Code size={28} />,
    detail:
      "Work on small real-world projects to apply your knowledge and showcase skills.",
  },
  {
    title: "System Design & Databases",
    icon: <Briefcase size={28} />,
    detail:
      "Learn SQL, NoSQL, normalization, and design scalable systems.",
  },
  {
    title: "Internships & Experience",
    icon: <Rocket size={28} />,
    detail:
      "Apply for internships or open-source contributions to gain experience.",
  },
  {
    title: "Crack Interviews",
    icon: <Award size={28} />,
    detail:
      "Prepare with mock interviews, problem-solving platforms, and system design interviews.",
  },
];

export default function RoadmapPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 p-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-400 opacity-40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-0 w-96 h-96 bg-yellow-300 opacity-40 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-600 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <h1 className="text-4xl font-extrabold text-white text-center mb-16 drop-shadow-lg">
        🚀 Software Engineering Roadmap
      </h1>

      <div className="relative flex flex-col items-center">
        {/* Zig-zag glowing road */}
        <svg
          className="absolute w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M 50 100 
              Q 400 200, 50 300 
              Q 400 400, 50 500 
              Q 400 600, 50 700 
              Q 400 800, 50 900`}
            fill="transparent"
            stroke="url(#roadGradient)"
            strokeWidth="50"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="roadGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f472b6" stopOpacity="0.9" />
            </linearGradient>
          </defs>
        </svg>

        {/* Steps aligned alternately */}
        <div className="space-y-32">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={index}
              className={`relative flex items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } w-full`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.div
                className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 shadow-2xl cursor-pointer border-4 border-white z-10"
                whileHover={{ scale: 1.2 }}
              >
                {step.icon}
              </motion.div>

              {/* Tooltip */}
              {hovered === index && (
                <motion.div
                  className={`absolute ${
                    index % 2 === 0 ? "left-28" : "right-28"
                  } bg-white shadow-xl rounded-2xl p-4 w-64 text-gray-800 text-sm z-20`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold text-pink-600 mb-2">
                    {step.title}
                  </h3>
                  <p>{step.detail}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
