import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Rocket,
  Lightbulb,
  Users,
  User,
  TrendingUp,
  Target,
  Globe,
  BookOpen,
  Video,
  Briefcase,
  MapPin,
  GraduationCap,
  Play,
  Building,
  Settings,
  Sun,
  Moon,
  ChevronRight,
  Star,
  Award,
  Zap,
  Brain,
  ArrowRight,
} from "lucide-react";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("form-section");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [recommendations, setRecommendations] = useState({
    courses: [],
    videos: [],
    jobs: [],
    roadmap: [],
  });
  const [formData, setFormData] = useState({
    role: "",
    skills: "",
    skill_gaps: "",
    career_ambitions: "",
    language: "",
  });

  useEffect(() => {
    // This effect currently sets isLoggedIn to false on mount.
    // If you have an auth system, you'd check auth status here.
    setIsLoggedIn(false);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const API_BASE_URL = "https://skill-up-react-website-backend.onrender.com";
    try {
      // For LocalHost: 
      // const response = await fetch("http://localhost:5000/api/career-profile", {

      // For Render:
      const response = await fetch(`${API_BASE_URL}/api/career-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();

      setRecommendations(data);
      setActiveSection("results-section");
      setSidebarOpen(false); // Close sidebar after submission if open on mobile
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Potentially add logic to clear user data or redirect
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false); // Close sidebar when a nav item is clicked on mobile
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigationItems = [
    { id: "form-section", label: "Career Analysis", icon: Brain },
    { id: "results-section", label: "AI Recommendations", icon: Zap },
    { id: "testimonials-section", label: "Success Stories", icon: Award },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          : "bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50"
      }`}
    >
      {/* Mobile Overlay for Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Floating Sidebar */}
      <nav
        className={`fixed left-0 top-0 bottom-0 w-80 shadow-2xl transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${
          darkMode
            ? "bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900"
            : "bg-gradient-to-b from-white via-gray-50 to-white shadow-2xl"
        }`}
      >
        <div className="p-8 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-3xl font-black bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                PATHCRAFT
              </div>
              <p
                className={`text-sm mt-2 font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                AI-Powered Career Growth
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`lg:hidden p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                darkMode 
                  ? "hover:bg-gray-800 text-gray-400 hover:text-white" 
                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
              }`}
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-3 flex-grow">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`w-full group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  activeSection === id
                    ? `${
                        darkMode 
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25" 
                          : "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/25"
                      }`
                    : `${
                        darkMode 
                          ? "hover:bg-gray-800/50 text-gray-300 hover:text-white" 
                          : "hover:bg-white/50 text-gray-600 hover:text-gray-900" // Tailwind JIT needs complete class names
                      }`
                }`}
              >
                <div className="flex items-center">
                  <Icon size={22} className="mr-4" />
                  <span className="font-semibold text-sm">{label}</span>
                </div>
                <ChevronRight 
                  size={18} 
                  className={`transition-transform duration-300 ${
                    activeSection === id ? "rotate-90" : "group-hover:translate-x-1"
                  }`} 
                />
              </button>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-gray-200/20"> {/* Changed from mt-12 to mt-auto for better footer positioning */}
            <div className="flex items-center space-x-3 mb-6"> {/* Added mb-6 for spacing before copyright */}
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center`}>
                <User size={20} className="text-white" />
              </div>
              <div>
                <p className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Guest User
                </p>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Free Plan
                </p>
              </div>
            </div>
            <div
              className={`text-xs font-medium ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              © 2025 PathCraft AI Platform
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {/* On lg screens, ml-[22rem] = sidebar width (20rem) + sidebar left offset (1rem) + gap (1rem) */}
      <main className="lg:ml-[22rem] transition-all duration-500">
        {/* Floating Header */}
        {/* On lg screens, left-[23.5rem] aligns header content with main section content */}
        <header
  className={`fixed top-0 right-0 left-0 lg:left-[19.5rem] shadow-lg z-30 transition-all duration-500 ${
    darkMode
      ? "bg-gray-900/80 backdrop-blur-xl border border-gray-700/50"
      : "bg-white/80 backdrop-blur-xl border border-white/20"
  }`}
>

          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? "hover:bg-gray-800 text-gray-400"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Menu size={24} />
            </button>

            <nav className="hidden md:flex items-center space-x-8">
              {["Home", "Features", "Pricing", "About"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`relative font-medium text-sm transition-all duration-300 hover:scale-105 ${
                    darkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-orange-500 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isLoggedIn && ( // This button will not show as isLoggedIn is initialized to false and never set to true
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-semibold"
                >
                  <X size={16} className="mr-2" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        {/* Sections now have pt-24 (header height approx 4rem + top-4 (1rem) + desired space) instead of pt-32 */}
        <section className="pt-24 pb-20 px-6 lg:px-12"> 
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8 mb-16">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 backdrop-blur-sm">
                <Star className="text-orange-500 mr-2" size={16} />
                <span className={`text-sm font-semibold ${darkMode ? "text-orange-300" : "text-orange-600"}`}>
                  AI-Powered Career Intelligence
                </span>
              </div>
              
              <h1
                className={`text-5xl lg:text-7xl font-black leading-tight ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Transform Your{" "}
                <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Career Journey
                </span>
              </h1>
              
              <p
                className={`text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Unlock personalized career insights with our AI-powered platform. 
                Get tailored learning paths, skill assessments, and opportunity matching.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <button
                  onClick={() => scrollToSection("form-section")}
                  className="group inline-flex items-center bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300"
                >
                  Start Your Analysis
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className={`inline-flex items-center px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? "bg-gray-800/50 text-white hover:bg-gray-700/50 border border-gray-700" 
                    : "bg-white/50 text-gray-900 hover:bg-white/80 border border-white/50" // Tailwind JIT needs complete class names
                } backdrop-blur-sm`}>
                  Watch Demo
                  <Play size={20} className="ml-2" />
                </button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Brain, title: "AI Analysis", desc: "Smart career profiling" },
                { icon: Zap, title: "Instant Results", desc: "Real-time recommendations" },
                { icon: Target, title: "Goal Focused", desc: "Personalized roadmaps" }
              ].map(({ icon: Icon, title, desc }, idx) => (
                <div key={idx} className={`group p-8 rounded-3xl transition-all duration-500 hover:scale-105 ${
                  darkMode 
                    ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50" 
                    : "bg-white/50 hover:bg-white/80 border border-white/50" // Tailwind JIT needs complete class names
                } backdrop-blur-sm hover:shadow-2xl`}>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {title}
                  </h3>
                  <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        {/* Sections py-20 -> pt-24 pb-20 to account for fixed header */}
        <section
          id="form-section"
          className="pt-24 pb-20 px-6 lg:px-12"
        >
          <div className="max-w-4xl mx-auto">
            <div
              className={`rounded-3xl shadow-2xl p-8 lg:p-12 transition-all duration-500 ${
                darkMode 
                  ? "bg-gray-900/80 backdrop-blur-xl border border-gray-700/50" 
                  : "bg-white/80 backdrop-blur-xl border border-white/20" // Tailwind JIT needs complete class names
              }`}
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-orange-500 to-pink-500 mb-6">
                  <Brain className="text-white" size={36} />
                </div>
                <h2
                  className={`text-3xl lg:text-4xl font-black mb-4 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  AI Career Analysis
                </h2>
                <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Let our AI analyze your profile and create a personalized career roadmap
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      label: "Current Role",
                      name: "role",
                      icon: User,
                      placeholder: "e.g., Software Developer, Marketing Manager",
                    },
                    {
                      label: "Core Skills",
                      name: "skills",
                      icon: Settings,
                      placeholder: "e.g., Python, JavaScript, Digital Marketing",
                    },
                    {
                      label: "Skills to Develop",
                      name: "skill_gaps",
                      icon: TrendingUp,
                      placeholder: "e.g., Machine Learning, Leadership, AWS",
                    },
                    {
                      label: "Career Aspirations",
                      name: "career_ambitions",
                      icon: Target,
                      placeholder: "e.g., Senior Developer, Team Lead, CTO",
                    },
                  ].map(({ label, name, icon: Icon, placeholder }) => (
                    <div key={name} className="space-y-3">
                      <label
                        htmlFor={name}
                        className={`flex items-center font-bold text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 flex items-center justify-center mr-3">
                          <Icon className="text-orange-500" size={16} />
                        </div>
                        {label}
                      </label>
                      <input
                        id={name}
                        type="text"
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 ${
                          darkMode
                            ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-800"
                            : "bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white" // Tailwind JIT needs complete class names
                        } backdrop-blur-sm`}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="language"
                    className={`flex items-center font-bold text-sm ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 flex items-center justify-center mr-3">
                      <Globe className="text-orange-500" size={16} />
                    </div>
                    Preferred Language
                  </label>
                  <input
                    id="language"
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    placeholder="e.g., English, Spanish, Mandarin"
                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-800"
                        : "bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:bg-white" // Tailwind JIT needs complete class names
                    } backdrop-blur-sm`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-6 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Analyzing with AI...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Generate AI Career Plan
                      <Zap size={24} className="ml-3" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section id="results-section" className="pt-24 pb-20 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-purple-500 to-indigo-500 mb-6">
                <Lightbulb className="text-white" size={36} />
              </div>
              <h2
                className={`text-3xl lg:text-4xl font-black mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                AI-Generated Recommendations
              </h2>
              <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Your personalized career growth plan powered by artificial intelligence
              </p>
            </div>

            {recommendations.courses.length === 0 && recommendations.videos.length === 0 && recommendations.roadmap.length === 0 && !isLoading && (
                 <div className={`text-center p-8 rounded-2xl ${darkMode ? "bg-gray-800/50 text-gray-400" : "bg-white/50 text-gray-600"} backdrop-blur-sm`}>
                    <Zap size={48} className="mx-auto mb-4 opacity-50" />
                    <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>No recommendations yet.</h3>
                    <p>Fill out the Career Analysis form to get your personalized plan!</p>
                 </div>
            )}

            {(recommendations.courses.length > 0 || recommendations.videos.length > 0 || recommendations.roadmap.length > 0) && (
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Learning Path */}
                {recommendations.courses.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-3xl shadow-lg">
                      <GraduationCap className="mr-4" size={28} />
                      <h3 className="text-xl lg:text-2xl font-bold">
                        Learning Pathway
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {recommendations.courses.map((course, index) => (
                        <a
                          key={index}
                          href={course.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group block p-6 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                            darkMode
                              ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
                              : "bg-white/50 hover:bg-white/80 border border-white/50" // Tailwind JIT needs complete class names
                          } backdrop-blur-sm hover:shadow-xl`}
                        >
                          <div className="flex items-start">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                              <BookOpen className="text-white" size={20} />
                            </div>
                            <div className="flex-1">
                              <div
                                className={`font-bold text-lg mb-2 ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {course.name}
                              </div>
                              <div
                                className={`text-sm font-medium ${
                                  darkMode ? "text-blue-400" : "text-blue-600"
                                }`}
                              >
                                {course.platform}
                              </div>
                            </div>
                            <ChevronRight className={`${darkMode ? "text-gray-400" : "text-gray-500"} group-hover:translate-x-1 transition-transform duration-300`} size={20} />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video Resources */}
                {recommendations.videos.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center p-6 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-3xl shadow-lg">
                      <Video className="mr-4" size={28} />
                      <h3 className="text-xl lg:text-2xl font-bold">
                        Video Learning
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {recommendations.videos.map((video, index) => (
                        <a
                          key={index}
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group block p-6 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
                            darkMode
                              ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
                              : "bg-white/50 hover:bg-white/80 border border-white/50" // Tailwind JIT needs complete class names
                          } backdrop-blur-sm hover:shadow-xl`}
                        >
                          <div className="flex items-start">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                              <Play className="text-white" size={20} />
                            </div>
                            <div className="flex-1">
                              <div
                                className={`font-bold text-lg mb-2 ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {video.name}
                              </div>
                              <div
                                className={`text-sm font-medium ${
                                  darkMode ? "text-red-400" : "text-red-600"
                                }`}
                              >
                                {video.platform}
                              </div>
                            </div>
                            <ChevronRight className={`${darkMode ? "text-gray-400" : "text-gray-500"} group-hover:translate-x-1 transition-transform duration-300`} size={20} />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Career Roadmap */}
                {recommendations.roadmap.length > 0 && (
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-3xl shadow-lg">
                      <MapPin className="mr-4" size={28} />
                      <h3 className="text-xl lg:text-2xl font-bold">
                        Career Roadmap
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {recommendations.roadmap.map((step, index) => (
                        <div
                          key={index}
                          className={`group p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
                            darkMode
                              ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50"
                              : "bg-white/50 hover:bg-white/80 border border-white/50" // Tailwind JIT needs complete class names
                          } backdrop-blur-sm hover:shadow-xl`}
                        >
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <div
                                className={`font-bold text-lg mb-3 ${
                                  darkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {step.step}
                              </div>
                              <p
                                className={`text-sm leading-relaxed ${
                                  darkMode ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials-section"
          className="pt-24 pb-20 px-6 lg:px-12"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r from-green-500 to-emerald-500 mb-6">
                <Award className="text-white" size={36} />
              </div>
              <h2
                className={`text-3xl lg:text-4xl font-black mb-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Success Stories
              </h2>
              <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Real transformations from our AI-powered career platform
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div
                className={`group p-8 lg:p-10 rounded-3xl transition-all duration-500 hover:scale-105 ${
                  darkMode 
                    ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50" 
                    : "bg-white/50 hover:bg-white/80 border border-white/50" // Tailwind JIT needs complete class names
                } backdrop-blur-sm hover:shadow-2xl`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <div className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Alex Chen
                    </div>
                    <div className={`text-sm font-medium ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                      Software Engineer → Senior Tech Lead
                    </div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                
                <p
                  className={`text-lg leading-relaxed mb-6 italic ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  "PathCraft's AI analysis pinpointed exactly what I needed to advance. 
                  The personalized roadmap helped me transition from developer to tech lead in just 8 months. 
                  The recommended courses were spot-on!"
                </p>
                
                <div className={`text-sm font-semibold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                  ✓ 40% salary increase • ✓ Leadership role • ✓ 8 months timeline
                </div>
              </div>

              <div
                className={`group p-8 lg:p-10 rounded-3xl transition-all duration-500 hover:scale-105 ${
                  darkMode 
                    ? "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50" 
                    : "bg-white/50 hover:bg-white/80 border border-white/50" // Tailwind JIT needs complete class names
                } backdrop-blur-sm hover:shadow-2xl`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <div className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Sarah Johnson
                    </div>
                    <div className={`text-sm font-medium ${darkMode ? "text-pink-400" : "text-pink-600"}`}>
                      Marketing Coordinator → Product Manager
                    </div>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                
                <p
                  className={`text-lg leading-relaxed mb-6 italic ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  "The AI recommendations opened doors I didn't even know existed. 
                  From marketing to product management - the transition felt natural with 
                  the structured learning path. Now I'm leading a team at a Fortune 500!"
                </p>
                
                <div className={`text-sm font-semibold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                  ✓ Career pivot success • ✓ Team leadership • ✓ Fortune 500 company
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid md:grid-cols-4 gap-8">
              {[
                { number: "10K+", label: "Careers Transformed" },
                { number: "95%", label: "Success Rate" },
                { number: "3.2x", label: "Average Salary Boost" },
                { number: "6mo", label: "Average Timeline" }
              ].map(({ number, label }, idx) => (
                <div key={idx} className="text-center">
                  <div className={`text-3xl lg:text-4xl font-black mb-2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent`}>
                    {number}
                  </div>
                  <div className={`text-sm font-semibold ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`py-16 px-6 lg:px-12 transition-all duration-500 ${
            darkMode 
              ? "bg-gradient-to-r from-gray-900 to-black" 
              : "bg-gradient-to-r from-gray-900 to-gray-800" // Keeping footer dark for contrast
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-3xl font-black bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                PATHCRAFT
              </div>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Empowering the next generation of professionals through AI-driven career intelligence and personalized growth strategies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h4 className="text-white font-bold mb-4">Platform</h4>
                <div className="space-y-2">
                  {["Career Analysis", "AI Recommendations", "Learning Paths", "Progress Tracking"].map(item => (
                    <a key={item} href="#" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-4">Resources</h4>
                <div className="space-y-2">
                  {["Career Guide", "Industry Insights", "Skill Trends", "Success Stories"].map(item => (
                    <a key={item} href="#" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <div className="space-y-2">
                  {["About Us", "Careers", "Press", "Partners"].map(item => (
                    <a key={item} href="#" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-4">Support</h4>
                <div className="space-y-2">
                  {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"].map(item => (
                    <a key={item} href="#" className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 PathCraft AI Platform. All rights reserved.
              </div>
              <div className="flex space-x-6">
                {["Privacy", "Terms", "Cookies"].map(item => (
                  <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;