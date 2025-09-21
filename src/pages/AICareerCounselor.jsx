import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Bot, ArrowLeft, RefreshCw } from "lucide-react";
import Aptitude from "./Aptitude";

const AICareerCounselor = () => {
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [showAptitude, setShowAptitude] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const conversationFlow = {
    start: {
      id: "start",
      question:
        "Hi there! I'm your AI Career Counselor. To guide you better, tell me why you’re here?",
      options: [
        {
          id: "explore_careers",
          text: "I want to explore career options",
          next: "interest_assessment",
        },
        {
          id: "specific_field",
          text: "I already have a field in mind",
          next: "field_selection",
        },
      ],
    },
    interest_assessment: {
      id: "interest_assessment",
      question: "What excites you most in daily life?",
      options: [
        {
          id: "problem_solving",
          text: "Solving logical or analytical problems",
          next: "tech_interests",
        },
        {
          id: "creative_work",
          text: "Building, designing or expressing creativity",
          next: "creative_fields",
        },
        {
          id: "helping_others",
          text: "Helping, teaching, or supporting people",
          next: "social_fields",
        },
      ],
    },
    tech_interests: {
      id: "tech_interests",
      question: "Great! Which describes you better?",
      options: [
        {
          id: "coding",
          text: "I enjoy coding, data, and digital tools",
          next: "study_background",
        },
        {
          id: "hardware",
          text: "I prefer machines, circuits, and real-world systems",
          next: "engineering_paths",
        },
      ],
    },
    study_background: {
      id: "study_background",
      question: "What is your current education background?",
      options: [
        {
          id: "highschool",
          text: "High school / Intermediate",
          next: "career_goals",
        },
        {
          id: "bachelors",
          text: "Bachelor’s degree (B.Tech, B.Sc, etc.)",
          next: "career_goals",
        },
        { id: "masters", text: "Master’s degree", next: "career_goals" },
      ],
    },
    career_goals: {
      id: "career_goals",
      question: "What’s your long-term career goal?",
      options: [
        { id: "research", text: "Research and innovation", next: "tech_paths" },
        {
          id: "corporate",
          text: "Corporate / Industry job",
          next: "tech_paths",
        },
        { id: "startup", text: "Build my own startup", next: "business_paths" },
      ],
    },
    field_selection: {
      id: "field_selection",
      question: "Awesome! Which field do you want to explore?",
      options: [
        { id: "it", text: "Information Technology", next: "tech_paths" },
        { id: "arts", text: "Arts and Design", next: "design_paths" },
        {
          id: "business",
          text: "Business and Management",
          next: "business_paths",
        },
      ],
    },
    tech_paths: {
      id: "tech_paths",
      isRecommendation: true,
      question: "Here are some tech career paths for you:",
      recommendations: [
        {
          title: "Software Engineer",
          description: "Develop apps, websites, or AI systems.",
          link: "/roadmap",
        },
        {
          title: "Data Scientist",
          description: "Analyze data to solve real-world problems.",
          link: "/roadmap/data-scientist",
        },
        {
          title: "Cybersecurity Analyst",
          description: "Protect systems and networks from threats.",
          link: "/roadmap/cybersecurity",
        },
      ],
    },
    engineering_paths: {
      id: "engineering_paths",
      isRecommendation: true,
      question: "Here are engineering career options:",
      recommendations: [
        {
          title: "Mechanical Engineer",
          description: "Work with machines and robotics.",
          link: "/roadmap/mechanical-engineer",
        },
        {
          title: "Civil Engineer",
          description: "Design and manage construction projects.",
          link: "/roadmap/civil-engineer",
        },
        {
          title: "Electrical Engineer",
          description: "Specialize in electronics and power systems.",
          link: "/roadmap/electrical-engineer",
        },
      ],
    },
    design_paths: {
      id: "design_paths",
      isRecommendation: true,
      question: "Creative career options for you:",
      recommendations: [
        {
          title: "UI/UX Designer",
          description: "Design user-friendly digital interfaces.",
          link: "/roadmap/uiux-designer",
        },
        {
          title: "Graphic Designer",
          description: "Work in branding and visuals.",
          link: "/roadmap/graphic-designer",
        },
        {
          title: "Product Designer",
          description: "Create innovative physical/digital products.",
          link: "/roadmap/product-designer",
        },
      ],
    },
    business_paths: {
      id: "business_paths",
      isRecommendation: true,
      question: "Business and management paths for you:",
      recommendations: [
        {
          title: "Entrepreneur",
          description: "Start and grow your business.",
          link: "/roadmap/entrepreneur",
        },
        {
          title: "Marketing Manager",
          description: "Manage brands and campaigns.",
          link: "/roadmap/marketing-manager",
        },
        {
          title: "Financial Analyst",
          description: "Guide financial decisions.",
          link: "/roadmap/financial-analyst",
        },
      ],
    },
  };

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => scrollToBottom(), [messages]);

  const startChat = () => {
    setChatStarted(true);
    setIsTyping(true);
    setTimeout(() => {
      const startNode = conversationFlow.start;
      setCurrentQuestion(startNode);
      setMessages([
        {
          id: Date.now(),
          type: "bot",
          content: startNode.question,
          options: startNode.options,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleOptionClick = (option) => {
    const userMessage = {
      id: Date.now(),
      type: "user",
      content: option.text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      if (option.id === "it") {
        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: "Before suggesting IT careers, take this aptitude test:",
          options: [{ id: "start_aptitude", text: "Start Aptitude Test" }],
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setCurrentQuestion(botMessage);
      } else if (option.id === "start_aptitude") {
        setShowAptitude(true);
      } else {
        const nextNode = conversationFlow[option.next];
        if (nextNode) {
          const botMessage = {
            id: Date.now() + 1,
            type: "bot",
            content: nextNode.question,
            options: nextNode.options,
            recommendations: nextNode.recommendations,
            isRecommendation: nextNode.isRecommendation,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botMessage]);
          setCurrentQuestion(nextNode);
        }
      }
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    AI Career Planning
                  </h1>
                  <p className="text-sm text-gray-600">
                    Your personalized assistant
                  </p>
                </div>
              </div>
            </div>
            {chatStarted && (
              <button
                onClick={() => {
                  setMessages([]);
                  setCurrentQuestion(null);
                  setChatStarted(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:block text-sm font-medium">
                  Reset
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {showAptitude ? (
          <div className="flex-1 overflow-y-auto p-4">
            <Aptitude
              onComplete={(score) => {
                setShowAptitude(false);
                const itNode =
                  score < 3
                    ? {
                        question:
                          "Based on your score, start with basic IT courses:",
                        recommendations: [
                          {
                            title: "Programming Basics",
                            description: "Learn Python or JavaScript.",
                            link: "/roadmap/programming-basics",
                          },
                          {
                            title: "Web Development",
                            description: "HTML, CSS, JS.",
                            link: "/roadmap/web-development",
                          },
                        ],
                        isRecommendation: true,
                      }
                    : conversationFlow.tech_paths;

                setMessages((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    type: "bot",
                    content: itNode.question,
                    recommendations: itNode.recommendations,
                    isRecommendation: true,
                    timestamp: new Date(),
                  },
                ]);
              }}
            />
          </div>
        ) : !chatStarted ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Bot className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome</h2>
              <p className="text-lg text-gray-600 mb-8">
                I'm here to guide your career journey.
              </p>
              <button
                onClick={startChat}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
              >
                Start Counseling
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs sm:max-w-md p-3 rounded-xl ${
                      message.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{message.content}</p>

                    {/* Options */}
                    {message.options &&
                      message.options.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => handleOptionClick(opt)}
                          className="mt-2 w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-sm font-medium text-blue-700"
                        >
                          {opt.text}
                        </button>
                      ))}

                    {/* Recommendations */}
                    {message.isRecommendation &&
                      message.recommendations?.map((rec, i) => (
                        <div
                          key={i}
                          onClick={() => rec.link && navigate(rec.link)}
                          className="cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 mt-3 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                        >
                          <h4 className="font-bold text-lg text-gray-900">
                            {rec.title}
                          </h4>
                          <p className="text-gray-700">{rec.description}</p>
                          {rec.link && (
                            <p className="mt-3 text-sm text-blue-600 underline">
                              View Roadmap →
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {isTyping && (
              <div className="px-4 py-2 text-sm text-gray-500">
                Counselor is typing...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AICareerCounselor;
