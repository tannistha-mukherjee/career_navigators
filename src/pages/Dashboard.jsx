import React, { useState, useEffect } from 'react';
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
  Star,
  Clock,
  Target,
  Zap,
  Search,
  Bell,
  User,
  Settings,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const sidebarItems = [
    { icon: BookOpen, label: 'Academics' },
    { icon: MapPin, label: 'Global Programs' },
    { icon: Award, label: 'Achievements' },
    { icon: Users, label: 'Community' },
    { icon: Calendar, label: 'Events' },
    { icon: Brain, label: 'Research' },
    { icon: BarChart3, label: 'Statistics' },
    { icon: DollarSign, label: 'Funding' },
  ];

  const stats = [
    { icon: Users, label: 'Students', value: '25K+' },
    { icon: Award, label: 'Awards', value: '1.2K+' },
    { icon: Globe, label: 'Countries', value: '85+' },
    { icon: BookOpen, label: 'Courses', value: '350+' },
  ];

  const coreFeatures = [
    { icon: TrendingUp, title: 'Growth', desc: 'Sustainable development', color: 'bg-blue-100 text-blue-600', delay: 'animate-fadeInUp' },
    { icon: MapPin, title: 'Global', desc: 'Worldwide presence', color: 'bg-green-100 text-green-600', delay: 'animate-fadeInUp' },
    { icon: Award, title: 'Excellence', desc: 'Award winning faculty', color: 'bg-purple-100 text-purple-600', delay: 'animate-fadeInUp' },
    { icon: Brain, title: 'Innovation', desc: 'Cutting-edge research', color: 'bg-pink-100 text-pink-600', delay: 'animate-fadeInUp' },
  ];

  const innovativeFeatures = [
    { icon: Star, title: 'Quality', desc: 'Top-ranked programs', color: 'bg-yellow-100 text-yellow-600' },
    { icon: Clock, title: 'Timely', desc: 'Efficient learning paths', color: 'bg-red-100 text-red-600' },
    { icon: Target, title: 'Focused', desc: 'Career-oriented approach', color: 'bg-indigo-100 text-indigo-600' },
    { icon: Zap, title: 'Dynamic', desc: 'Modern teaching methods', color: 'bg-teal-100 text-teal-600' },
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-white shadow-lg transition-all duration-300">
        <div className="p-4 flex items-center justify-center lg:justify-start">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <span className="hidden lg:block ml-2 font-bold text-xl">EduWorld</span>
        </div>
        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center p-4 hover:bg-blue-50 transition-colors cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <item.icon className="w-6 h-6 text-gray-600" />
              <span className="hidden lg:block ml-3 text-gray-700">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4 animate-fadeInDown">
          <div className="flex items-center w-full lg:w-auto">
            <Search className="w-5 h-5 text-gray-400 absolute ml-3" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full lg:w-80 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
            <Settings className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <User className="w-8 h-8 text-gray-600" />
              <span className="hidden lg:block">Profile</span>
              <ChevronRight className="w-4 h-4 text-gray-400 hidden lg:block" />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-4 lg:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow animate-fadeInUp"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Core Features */}
        <section className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 animate-fadeInLeft">Core Features</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {coreFeatures.map((feature) => (
              <div key={feature.id} className={`group cursor-pointer ${feature.delay}`}>
                <div className="bg-white p-4 lg:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={`w-10 h-10 lg:w-12 lg:h-12 ${feature.color} rounded-lg flex items-center justify-center mb-3 lg:mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="w-6 h-6 lg:w-7 lg:h-7" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1 lg:mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Innovative Features */}
        <section>
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 animate-fadeInLeft">Innovative Features</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {innovativeFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-3 lg:p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer hover-lift animate-fadeInUp"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div
                  className={`w-8 h-8 lg:w-10 lg:h-10 ${feature.color} rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110`}
                >
                  <feature.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <h3 className="mt-2 lg:mt-3 font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-xs lg:text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
