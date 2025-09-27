import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Bot, ArrowLeft, RefreshCw, BookOpen, GraduationCap, Award, Calendar, Users, TrendingUp, DollarSign, Clock } from "lucide-react";
import Aptitude from "./Aptitude";
import CollegeSuggestions from "../components/CollegeSuggestions";


const AICareerCounselor = () => {
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [showAptitude, setShowAptitude] = useState(false);
  const [userGrade, setUserGrade] = useState(null);
  const [userResults, setUserResults] = useState({});
  const [userInterest, setUserInterest] = useState(null);
  const [showResultInput, setShowResultInput] = useState(false);
  const [subjectCombo, setSubjectCombo] = useState(null);
  const messagesEndRef = useRef(null);

  const conversationFlow = {
    start: {
      id: "start",
      question: "Hi there! I'm your AI Career Counselor. To provide you with the most relevant guidance, I need to know about your educational background. Which exam did you appear for most recently?",
      options: [
        {
          id: "class_10",
          text: "Class 10th Boards",
          next: "class_10_results",
        },
        {
          id: "class_12",
          text: "Class 12th Boards",
          next: "class_12_subject_combo",
        },
      ],
    },

    class_10_results: {
      id: "class_10_results",
      question: "Great! I need your Class 10th results to provide personalized stream recommendations. Please share your overall percentage and key subject scores.",
      requiresInput: true,
      inputType: "results_10th",
      next: "class_10_interest",
    },

    class_10_interest: {
      id: "class_10_interest",
      question: "Based on your results, what subject area interests you the most for your future studies?",
      options: [
        {
          id: "science_interest",
          text: "Science & Mathematics - I enjoy problem-solving and logical thinking",
          next: "aptitude_test_10",
        },
        {
          id: "commerce_interest",
          text: "Commerce & Business - I'm interested in finance, economics, and business",
          next: "aptitude_test_10",
        },
        {
          id: "arts_interest",
          text: "Arts & Humanities - I love literature, history, and social sciences",
          next: "aptitude_test_10",
        },
      ],
    },

    aptitude_test_10: {
      id: "aptitude_test_10",
      question: "Perfect! Now let's take a quick aptitude assessment to better understand your strengths and provide the best stream recommendations for Class 11th.",
      options: [
        {
          id: "start_aptitude_10",
          text: "Start Aptitude Assessment",
          next: "stream_suggestions",
        },
      ],
    },

    class_12_subject_combo: {
      id: "class_12_subject_combo",
      question: "Which subject combination did you study in Class 12th?",
      options: [
        { id: "pcm_combo", text: "PCM (Physics, Chemistry, Mathematics)", next: "class_12_results_pcm" },
        { id: "pcb_combo", text: "PCB (Physics, Chemistry, Biology)", next: "class_12_results_pcb" },
        { id: "commerce_combo", text: "Commerce (Accountancy, Business Studies, Economics)", next: "class_12_results_commerce" },
        { id: "arts_combo", text: "Arts/Humanities", next: "class_12_results_arts" },
        { id: "other_combo", text: "Other/Multiple", next: "class_12_results_other" },
      ],
    },

    class_12_results_pcm: {
      id: "class_12_results_pcm",
      question: "Please share your Class 12th marks for Physics, Chemistry, Mathematics, and any other key subjects.",
      requiresInput: true,
      inputType: "results_12th_pcm",
      next: "class_12_interest",
    },
    class_12_results_pcb: {
      id: "class_12_results_pcb",
      question: "Please share your Class 12th marks for Physics, Chemistry, Biology, and any other key subjects.",
      requiresInput: true,
      inputType: "results_12th_pcb",
      next: "class_12_interest",
    },
    class_12_results_commerce: {
      id: "class_12_results_commerce",
      question: "Please share your Class 12th marks for Accountancy, Business Studies, Economics, and any other key subjects.",
      requiresInput: true,
      inputType: "results_12th_commerce",
      next: "class_12_interest",
    },
    class_12_results_arts: {
      id: "class_12_results_arts",
      question: "Please share your Class 12th marks for your main Arts/Humanities subjects.",
      requiresInput: true,
      inputType: "results_12th_arts",
      next: "class_12_interest",
    },
    class_12_results_other: {
      id: "class_12_results_other",
      question: "Please share your Class 12th marks for your main subjects.",
      requiresInput: true,
      inputType: "results_12th_other",
      next: "class_12_interest",
    },

    class_12_interest: {
      id: "class_12_interest",
      question: "What career field interests you the most based on your 12th grade background and personal inclinations?",
      options: [
        {
          id: "engineering_interest",
          text: "Engineering & Technology",
          next: "aptitude_test_12",
        },
        {
          id: "medical_interest",
          text: "Medical & Healthcare",
          next: "aptitude_test_12",
        },
        {
          id: "commerce_career",
          text: "Commerce, Finance & Management",
          next: "aptitude_test_12",
        },
        {
          id: "arts_career",
          text: "Arts, Literature & Social Sciences",
          next: "aptitude_test_12",
        },
        {
          id: "law_interest",
          text: "Law & Legal Studies",
          next: "aptitude_test_12",
        },
        {
          id: "not_sure_12",
          text: "Not sure, I need comprehensive guidance",
          next: "aptitude_test_12",
        },
      ],
    },

    aptitude_test_12: {
      id: "aptitude_test_12",
      question: "Let's take an aptitude assessment to identify your strengths and provide comprehensive career guidance tailored to your profile.",
      options: [
        {
          id: "start_aptitude_12",
          text: "Start Aptitude Assessment",
          next: "career_options_12",
        },
      ],
    },

    career_options_12: {
      id: "career_options_12",
      question: "Based on your profile, I can provide guidance in two key areas. Which would you like to explore first?",
      options: [
        {
          id: "competitive_exams",
          text: "🎯 Career-related Competitive Exams",
          next: "exam_suggestions",
        },
        {
          id: "course_suggestions",
          text: "📚 Career-related Course Suggestions",
          next: "course_options",
        },
      ],
    },

    exam_suggestions: {
      id: "exam_suggestions",
      question: "Here are some competitive exams you can consider:",
      options: [],
    },
    course_options: {
      id: "course_options",
      question: "What aspect of courses would you like to explore?",
      options: [
        {
          id: "explore_courses",
          text: "🔍 Explore preferred courses and job opportunities",
          next: "course_exploration",
        },
        {
          id: "college_selection",
          text: "🏛 College selection based on suggested courses",
          next: "college_suggestions",
        },
      ],
    },
    course_exploration: {
      id: "course_exploration",
      question: "Here are some top courses and job opportunities based on your interests:",
      options: [],
    },
    college_suggestions: {
      id: "college_suggestions",
      question: "Here are some top colleges based on your profile and preferences:",
      content: <CollegeSuggestions />,
      options: [],
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

  const generateRecommendations = (nodeType, grade, results, interest, aptitudeScore) => {
    if (nodeType === "stream_suggestions") {
      const recommendations = [];
      // ...existing stream logic...
      if ((interest === "science_interest" && results.overall >= 70) && 
        (results.subjects?.Mathematics >= 75 && results.subjects?.Science >= 75)) {
        recommendations.push({
          title: "Science Stream - PCM (Physics, Chemistry, Mathematics)",
          description: "Perfect for Engineering, Architecture, and Technology careers",
          details: "Subjects: Physics, Chemistry, Mathematics, English + Optional subject",
          icon: "🔬",
          prospects: ["Engineering Colleges", "Architecture", "Pure Sciences", "Technology"],
          scholarships: "Merit-based scholarships available for 85%+ students",
        });

        if (results.subjects?.Science >= 80) {
          recommendations.push({
            title: "Science Stream - PCB (Physics, Chemistry, Biology)",
            description: "Gateway to Medical, Dental, and Life Sciences",
            details: "Subjects: Physics, Chemistry, Biology, English + Optional subject",
            icon: "🧬",
            prospects: ["MBBS", "BDS", "Veterinary Science", "Biotechnology"],
            scholarships: "Government scholarships for aspiring doctors",
          });
        }
      }
      if (interest === "commerce_interest" && results.subjects?.Mathematics >= 65) {
        recommendations.push({
          title: "Commerce Stream",
          description: "Foundation for Business, Finance, and Management careers",
          details: "Subjects: Business Studies, Economics, Accountancy, English + Optional",
          icon: "💼",
          prospects: ["CA", "CS", "MBA", "Banking", "Finance"],
          scholarships: "Industry-sponsored scholarships available",
        });
      }
      if (interest === "arts_interest" && results.subjects?.Mathematics >= 65)
        recommendations.push({
          title: "Arts/Humanities Stream",
          description: "Diverse opportunities in Literature, Social Sciences, and Civil Services",
          details: "Subjects: History, Political Science, Geography/Psychology, English + Optional",
          icon: "📚",
          prospects: ["Civil Services", "Journalism", "Teaching", "Social Work"],
          scholarships: "Merit and need-based scholarships available",
        });
      return recommendations;
    }

    if (nodeType === "exam_suggestions") {
      const exams = [];
      if (interest === "engineering_interest") {
        exams.push({
          title: "JEE Main & Advanced",
          description: "Gateway to IITs, NITs, and premier engineering colleges",
          timeline: "Registration: Sep-Oct | Exam: Jan-Apr | Results: May",
          cutoff: "JEE Main: 85+ percentile | JEE Advanced: Top 2.5L qualifiers",
          icon: "⚙",
        });
        exams.push({
          title: "State Engineering Entrance Exams",
          description: "KCET, MHT CET, WBJEE, COMEDK for state colleges",
          timeline: "Registration: Dec-Mar | Exam: Apr-May | Counseling: Jun-Jul",
          cutoff: "Varies by state: 60-90 percentile range",
          icon: "🏭",
        });
      }
      if (interest === "medical_interest") {
        exams.push({
          title: "NEET UG",
          description: "National entrance for MBBS, BDS, AYUSH courses",
          timeline: "Registration: Dec-Jan | Exam: May | Counseling: Jul-Sep",
          cutoff: "General: 720+ | OBC: 690+ | SC/ST: 610+",
          icon: "🏥",
        });
      }
      if (interest === "commerce_career") {
        exams.push({
          title: "CAT (Common Admission Test)",
          description: "For admission to IIMs and top MBA colleges",
          timeline: "Registration: Jul-Aug | Exam: Nov | Results: Jan",
          cutoff: "IIM calls: 95+ percentile | Good colleges: 80+",
          icon: "📊",
        });
      }
      return exams;
    }

    if (nodeType === "course_exploration") {
      const courses = [];
      if (interest === "engineering_interest") {
        courses.push({
          title: "Computer Science Engineering",
          description: "Software development, AI, and technology innovation",
          duration: "4 years",
          avgSalary: "₹6-25 LPA",
          jobRoles: ["Software Engineer", "Data Scientist", "AI Engineer"],
          growth: "Excellent - Growing 15% annually",
        });
        courses.push({
          title: "Electronics & Communication Engineering",
          description: "Electronics, telecommunications, and embedded systems",
          duration: "4 years",
          avgSalary: "₹5-20 LPA",
          jobRoles: ["Electronics Engineer", "Network Engineer", "Hardware Designer"],
          growth: "Good - Steady demand",
        });
      }
      if (interest === "medical_interest") {
        courses.push({
          title: "MBBS",
          description: "Bachelor of Medicine and Bachelor of Surgery",
          duration: "5.5 years",
          avgSalary: "₹8-20 LPA",
          jobRoles: ["Doctor", "Surgeon", "Medical Researcher"],
          growth: "High - Healthcare sector expansion",
        });
        courses.push({
          title: "BDS",
          description: "Bachelor of Dental Surgery",
          duration: "5 years",
          avgSalary: "₹5-12 LPA",
          jobRoles: ["Dentist", "Dental Surgeon"],
          growth: "Steady demand",
        });
      }
      if (interest === "commerce_career") {
        courses.push({
          title: "B.Com (Bachelor of Commerce)",
          description: "Accounting, finance, and business management",
          duration: "3 years",
          avgSalary: "₹3-8 LPA",
          jobRoles: ["Accountant", "Financial Analyst", "Auditor"],
          growth: "Good - Corporate sector demand",
        });
        courses.push({
          title: "BBA (Bachelor of Business Administration)",
          description: "Business management and administration",
          duration: "3 years",
          avgSalary: "₹4-10 LPA",
          jobRoles: ["Manager", "HR Executive", "Marketing Analyst"],
          growth: "Excellent - Expanding business sector",
        });
      }
      if (interest === "arts_career") {
        courses.push({
          title: "BA (Bachelor of Arts)",
          description: "Humanities, social sciences, and languages",
          duration: "3 years",
          avgSalary: "₹2-6 LPA",
          jobRoles: ["Teacher", "Journalist", "Civil Services"],
          growth: "Good - Diverse opportunities",
        });
        courses.push({
          title: "BFA (Bachelor of Fine Arts)",
          description: "Visual arts, performing arts, and design",
          duration: "3-4 years",
          avgSalary: "₹3-7 LPA",
          jobRoles: ["Artist", "Designer", "Animator"],
          growth: "Creative industry growth",
        });
      }
      if (interest === "law_interest") {
        courses.push({
          title: "BA LLB",
          description: "Integrated law degree (Arts + Law)",
          duration: "5 years",
          avgSalary: "₹5-15 LPA",
          jobRoles: ["Lawyer", "Legal Advisor", "Judge"],
          growth: "High - Legal sector expansion",
        });
      }
      return courses;
    }

    if (nodeType === "college_suggestions") {
      const colleges = [];
      colleges.push({
        title: "Indian Institute of Technology (IITs)",
        location: "Multiple locations across India",
        seats: "11,000+ total seats across all IITs",
        cutoff: "JEE Advanced Rank 1-10,000",
        fees: "₹2.5 LPA (with hostel)",
        highlights: ["World-class faculty", "100% placement", "Research opportunities"],
        admissionProcess: "JEE Advanced + Counseling",
      });
      colleges.push({
        title: "National Institute of Technology (NITs)",
        location: "31 NITs across India",
        seats: "23,000+ seats",
        cutoff: "JEE Main 95+ percentile",
        fees: "₹1.5-2 LPA",
        highlights: ["Excellent placement record", "Industry connections", "Research facilities"],
        admissionProcess: "JEE Main + JoSAA Counseling",
      });
      return colleges;
    }

    return [];
  };

  const handleResultsInput = (grade, results) => {
    setUserResults(results);
    setShowResultInput(false);

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: `My ${grade} results: Overall ${results.overall}% | Key subjects: ${Object.entries(results.subjects).map(([sub, mark]) => `${sub}: ${mark}%`).join(', ')}`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const nextNode = conversationFlow[grade === "10th" ? "class_10_interest" : "class_12_interest"];
      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: nextNode.question,
        options: nextNode.options,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setCurrentQuestion(nextNode);
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

    if (option.id === "class_10" || option.id === "class_12") {
      setUserGrade(option.id);
    }
    if (option.id.includes("_interest") || option.id.includes("_career")) {
      setUserInterest(option.id);
    }
    if (option.id.endsWith("_combo")) {
      setSubjectCombo(option.id);
    }

    const nextNode = conversationFlow[option.next];
    if (nextNode?.requiresInput) {
      setShowResultInput(true);
      setCurrentQuestion(nextNode);
      return;
    }
    if (option.id.includes("start_aptitude")) {
      setShowAptitude(true);
      return;
    }

    setIsTyping(true);

    setTimeout(() => {
      if (nextNode) {
        let recommendations = [];
        let nodeType = nextNode.id;
        if (nodeType === "exam_suggestions") {
          recommendations = generateRecommendations("exam_suggestions", userGrade, userResults, userInterest);
        } else if (nodeType === "course_exploration") {
          recommendations = generateRecommendations("course_exploration", userGrade, userResults, userInterest);
        } else if (nodeType === "college_suggestions") {
          recommendations = generateRecommendations("college_suggestions", userGrade, userResults, userInterest);
        }

        const botMessage = {
          id: Date.now() + 1,
          type: "bot",
          content: nextNode.question,
          options: nextNode.options,
          recommendations: recommendations.length > 0 ? recommendations : nextNode.recommendations,
          isRecommendation: recommendations.length > 0 || nextNode.isRecommendation,
          nodeType: nodeType,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
        setCurrentQuestion(nextNode);
      }
      setIsTyping(false);
    }, 1500);
  };

  const ResultsInputForm = ({ grade, onSubmit, inputType }) => {
    let subjectsList = [];
    if (inputType === "results_12th_pcm") {
      subjectsList = ["Physics", "Chemistry", "Mathematics", "English"];
    } else if (inputType === "results_12th_pcb") {
      subjectsList = ["Physics", "Chemistry", "Biology", "English"];
    } else if (inputType === "results_12th_commerce") {
      subjectsList = ["Accountancy", "Business Studies", "Economics", "English"];
    } else if (inputType === "results_12th_arts") {
      subjectsList = ["History", "Political Science", "Geography", "English"];
    } else if (inputType === "results_12th_other") {
      subjectsList = ["Subject 1", "Subject 2", "Subject 3", "English"];
    } else if (grade === "class_10") {
      subjectsList = ["Mathematics", "Science", "English", "Social Science", "Hindi"];
    }

    const [overall, setOverall] = useState("");
    const [subjects, setSubjects] = useState(
      Object.fromEntries(subjectsList.map((sub) => [sub, ""]))
    );

    const handleSubmit = () => {
      if (overall && Object.values(subjects).some(s => s !== "")) {
        onSubmit(grade === "class_10" ? "10th" : "12th", {
          overall: parseFloat(overall),
          subjects: Object.fromEntries(
            Object.entries(subjects).filter(([_, value]) => value !== "")
              .map(([key, value]) => [key, parseFloat(value)])
          ),
        });
      }
    };

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Enter your {grade === "class_10" ? "Class 10th" : "Class 12th"} Results
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overall Percentage
            </label>
            <input
              type="number"
              value={overall}
              onChange={(e) => setOverall(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="85.5"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Subject Marks (%)
            </label>
            <div className="space-y-2">
              {Object.keys(subjects).map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 w-24">{subject}:</span>
                  <input
                    type="number"
                    value={subjects[subject]}
                    onChange={(e) =>
                      setSubjects(prev => ({ ...prev, [subject]: e.target.value }))
                    }
                    className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="85"
                    min="0"
                    max="100"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Submit Results
          </button>
        </div>
      </div>
    );
  };

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
                  <h1 className="text-xl font-bold text-gray-900">
                    AI Career Counselor
                  </h1>
                  <p className="text-sm text-gray-600">
                    Personalized guidance for your future
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
                  setUserGrade(null);
                  setUserResults({});
                  setUserInterest(null);
                  setShowResultInput(false);
                  setSubjectCombo(null);
                }}
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
        {showAptitude ? (
          <div className="flex-1 overflow-y-auto p-4">
            <Aptitude
              onComplete={(score) => {
                setShowAptitude(false);

                let recommendations = [];
                let content = "";

                if (userGrade === "class_10") {
                  recommendations = generateRecommendations("stream_suggestions", userGrade, userResults, userInterest, score);
                  content = "Based on your results, interests, and aptitude assessment, here are the recommended streams for Class 11th:";
                } else if (userGrade === "class_12") {
                  content = "Great! Based on your comprehensive profile, I can now provide targeted career guidance. What would you like to explore first?";
                }

                const botMessage = {
                  id: Date.now(),
                  type: "bot",
                  content: content,
                  recommendations: userGrade === "class_10" ? recommendations : undefined,
                  options: userGrade === "class_12" ? conversationFlow.career_options_12.options : undefined,
                  isRecommendation: userGrade === "class_10",
                  additionalInfo: userGrade === "class_10" ? {
                    scholarships: true,
                    examInfo: true,
                  } : undefined,
                  timestamp: new Date(),
                };

                setMessages((prev) => [...prev, botMessage]);
              }}
            />
          </div>
        ) : showResultInput ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <ResultsInputForm
              grade={userGrade}
              inputType={currentQuestion?.inputType}
              onSubmit={handleResultsInput}
            />
          </div>
        ) : !chatStarted ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                AI Career Counselor
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get personalized career guidance based on your academic performance, interests, and aptitude.
                Whether you've completed 10th or 12th grade, I'm here to help you make informed decisions about your future.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <BookOpen className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Stream Selection</h3>
                  <p className="text-sm text-gray-600">For Class 10th students - Get personalized stream recommendations</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <Award className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Career Planning</h3>
                  <p className="text-sm text-gray-600">For Class 12th students - Comprehensive career guidance</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <Calendar className="h-10 w-10 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Exam Timeline</h3>
                  <p className="text-sm text-gray-600">Track important exam dates and preparation schedules</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <Users className="h-10 w-10 text-red-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">College Selection</h3>
                  <p className="text-sm text-gray-600">Find the best colleges based on your profile and preferences</p>
                </div>
              </div>

              <button
                onClick={startChat}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Your Career Journey
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
                    className={`max-w-xs sm:max-w-md lg:max-w-lg p-4 rounded-xl shadow ${
                      message.type === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.nodeType === "college_suggestions"
                      ? <CollegeSuggestions />
                      : <>
                          {message.content}
                          {/* Render recommendations if present */}
                          {message.isRecommendation && message.recommendations && (
                            <div className="mt-4 space-y-4">
                              {message.recommendations.map((rec, idx) => (
                                <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-2xl">{rec.icon}</span>
                                    <span className="font-semibold">{rec.title}</span>
                                  </div>
                                  <div className="text-sm text-gray-700 mb-1">{rec.description}</div>
                                  {rec.details && <div className="text-xs text-gray-500">{rec.details}</div>}
                                  {rec.prospects && (
                                    <div className="mt-1 text-xs text-gray-600">
                                      <strong>Prospects:</strong> {rec.prospects.join(", ")}
                                    </div>
                                  )}
                                  {rec.scholarships && (
                                    <div className="mt-1 text-xs text-blue-600">
                                      <strong>Scholarships:</strong> {rec.scholarships}
                                    </div>
                                  )}
                                  {rec.timeline && (
                                    <div className="mt-1 text-xs text-gray-600">
                                      <strong>Timeline:</strong> {rec.timeline}
                                    </div>
                                  )}
                                  {rec.cutoff && (
                                    <div className="mt-1 text-xs text-gray-600">
                                      <strong>Cutoff:</strong> {rec.cutoff}
                                    </div>
                                  )}
                                  {rec.duration && (
                                    <div className="mt-1 text-xs text-gray-600">
                                      <strong>Duration:</strong> {rec.duration}
                                    </div>
                                  )}
                                  {rec.avgSalary && (
                                    <div className="mt-1 text-xs text-green-600">
                                      <strong>Avg Salary:</strong> {rec.avgSalary}
                                    </div>
                                  )}
                                  {rec.jobRoles && (
                                    <div className="mt-1 text-xs text-gray-600">
                                      <strong>Job Roles:</strong> {rec.jobRoles.join(", ")}
                                    </div>
                                  )}
                                  {rec.growth && (
                                    <div className="mt-1 text-xs text-purple-600">
                                      <strong>Growth:</strong> {rec.growth}
                                    </div>
                                  )}
                                  {rec.location && (
                                    <div className="mt-1 text-xs text-gray-600">
                                      <strong>Location:</strong> {rec.location}
                                    </div>
                                  )}
                                  {rec.seats && (
                                    <div className="mt-1 text-xs text-gray-600">
                                      <strong>Seats:</strong> {rec.seats}
                                    </div>
                                  )}
                                  {rec.fees && (
                                    <div className="mt-1 text-xs text-gray-600">
                                      <strong>Fees:</strong> {rec.fees}
                                    </div>
                                  )}
                                  {rec.highlights && (
                                    <div className="mt-1 text-xs text-gray-600">
                                      <strong>Highlights:</strong> {rec.highlights.join(", ")}
                                    </div>
                                  )}
                                  {rec.admissionProcess && (
                                    <div className="mt-1 text-xs text-gray-600">
                                      <strong>Admission Process:</strong> {rec.admissionProcess}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                    }
                    {/* Render options if present */}
                    {message.options && (
                      <div className="mt-4 space-y-2">
                        {message.options.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleOptionClick(option)}
                            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium py-2 px-4 rounded-lg transition-all"
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            {/* You can add additional chat UI elements here if needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AICareerCounselor;