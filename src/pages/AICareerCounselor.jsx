import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  ArrowLeft, 
  Sparkles, 
  Brain, 
  TrendingUp, 
  Target, 
  BookOpen,
  RefreshCw,
  Download,
  Share2,
  Lightbulb,
  MapPin,
  Award,
  Menu,
  X
} from 'lucide-react';

const AICareerCounselor = () => {
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Predefined conversation flow (shortened here — keep your full flow)
  const conversationFlow = {
    start: {
      id: 'start',
      question: "Hi there! I'm your AI Career Counselor. What brings you here today?",
      options: [
        { id: 'explore_careers', text: "I want to explore careers", next: 'interest_assessment' },
        { id: 'specific_field', text: "I'm interested in a specific field", next: 'field_selection' }
      ]
    },
    interest_assessment: {
      id: 'interest_assessment',
      question: "Which of these excites you the most?",
      options: [
        { id: 'problem_solving', text: "Solving problems", next: 'tech_interests' },
        { id: 'creative_work', text: "Creating and designing things", next: 'creative_fields' }
      ]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startChat = () => {
    setChatStarted(true);
    setIsTyping(true);

    setTimeout(() => {
      const startNode = conversationFlow.start;
      setCurrentQuestion(startNode);
      setMessages([{
        id: Date.now(),
        type: 'bot',
        content: startNode.question,
        options: startNode.options,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleOptionClick = (option) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: option.text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const nextNode = conversationFlow[option.next];
      if (nextNode) {
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: nextNode.question,
          options: nextNode.options,
          recommendations: nextNode.recommendations,
          isRecommendation: nextNode.isRecommendation,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setCurrentQuestion(nextNode);

        if (nextNode.recommendations) {
          setRecommendations(nextNode.recommendations);
        }
      } else if (option.next === 'end') {
        const endMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: "Thanks for using AI Career Counselor! 🌟",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, endMessage]);
        setCurrentQuestion(null);
      }
      setIsTyping(false);
    }, 2000);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentQuestion(null);
    setChatStarted(false);
    setRecommendations([]);
  };

  const RecommendationCard = ({ recommendation }) => (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 mb-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-bold text-lg text-gray-900">{recommendation.title}</h4>
        <Target className="h-6 w-6 text-blue-600" />
      </div>
      <p className="text-gray-700 mb-4">{recommendation.description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AI Career Counselor</h1>
                  <p className="text-sm text-gray-600">Your personalized assistant</p>
                </div>
              </div>
            </div>
            {chatStarted && (
              <button
                onClick={resetChat}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:block text-sm font-medium">Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {!chatStarted ? (
            // Welcome
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
            // Chat Interface
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs sm:max-w-md p-3 rounded-xl ${
                      message.type === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}>
                      <p>{message.content}</p>
                      {message.isRecommendation && message.recommendations?.map((rec, i) => (
                        <RecommendationCard key={i} recommendation={rec} />
                      ))}
                      {message.options && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => handleOptionClick(opt)}
                              className="w-full bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm"
                            >
                              {opt.text}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2">
                      <span className="animate-pulse">Typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AICareerCounselor;
