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
    // Simulate checking for authentication token (avoid localStorage in artifacts)
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
      //  For local host: 
      // const response = await fetch("http://localhost:5000/api/career-profile", {

      // For Render : 
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
      setSidebarOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigationItems = [
    { id: "form-section", label: "Career Analysis", icon: Rocket },
    { id: "results-section", label: "Recommendations", icon: Lightbulb },
    { id: "testimonials-section", label: "Testimonials", icon: Users },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800"
          : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      }`}
    >
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-full w-72 shadow-2xl transition-all duration-300 z-50 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          darkMode
            ? "bg-gradient-to-b from-gray-900 via-gray-800 to-slate-900 text-white"
            : "bg-gradient-to-b from-indigo-900 via-indigo-800 to-purple-900 text-white"
        }`}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${
            darkMode ? "border-gray-700" : "border-indigo-700"
          }`}
        >
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              SKILLUP
            </div>
            <p
              className={`text-sm mt-1 ${
                darkMode ? "text-gray-300" : "text-indigo-200"
              }`}
            >
              Career Development Platform
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-indigo-700"
            }`}
          >
            <X size={20} />
          </button>
        </div>

        <ul className="mt-6 space-y-2 px-4">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 hover:translate-x-1 ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-indigo-700"
                } ${
                  activeSection === id
                    ? `${
                        darkMode ? "bg-gray-700" : "bg-indigo-700"
                      } shadow-lg border-l-4 border-yellow-400`
                    : ""
                }`}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div
          className={`absolute bottom-6 left-6 text-xs ${
            darkMode ? "text-gray-400" : "text-indigo-300"
          }`}
        >
          © 2024 SkillUp Platform
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-72 transition-all duration-300">
        {/* Header */}
        <header
          className={`backdrop-blur-md shadow-lg sticky top-0 z-30 border-b transition-colors duration-300 ${
            darkMode
              ? "bg-gray-900/80 border-gray-700"
              : "bg-white/80 border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                darkMode
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Menu size={24} />
            </button>

            <nav className="hidden md:flex space-x-8">
              {["Home", "About", "Services", "Blog", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`transition-colors font-medium text-sm ${
                    darkMode
                      ? "text-gray-300 hover:text-indigo-400"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
                title={
                  darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  <X size={16} className="mr-2" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-12 lg:py-20 px-4 lg:px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1
                className={`text-4xl lg:text-6xl font-bold leading-tight ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Unlock Your{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Career Potential
                </span>
              </h1>
              <p
                className={`text-lg lg:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Get personalized career recommendations, skill-building
                resources, and job opportunities tailored just for you.
              </p>
              <button
                onClick={() => scrollToSection("form-section")}
                className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Started
                <Rocket size={20} className="ml-2" />
              </button>
            </div>
            <div className="relative">
              <div
                className="w-full h-64 lg:h-96 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url('/bg-image.png')` }}
              ></div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section
          id="form-section"
          className={`py-12 lg:py-16 px-4 lg:px-6 transition-colors duration-300 ${
            darkMode
              ? "bg-gradient-to-r from-gray-800 to-slate-800"
              : "bg-gradient-to-r from-indigo-50 to-purple-50"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <div
              className={`rounded-3xl shadow-2xl p-6 lg:p-12 transition-colors duration-300 ${
                darkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <h2
                className={`text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-10 flex items-center justify-center ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                <Rocket
                  className="text-indigo-600 mr-3 animate-bounce"
                  size={32}
                />
                Career Profile Analysis
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  {
                    label: "Current Role",
                    name: "role",
                    icon: User,
                    placeholder: "Software Developer",
                  },
                  {
                    label: "Existing Skills",
                    name: "skills",
                    icon: Settings,
                    placeholder: "Python, JavaScript, SQL",
                  },
                  {
                    label: "Skill Gaps",
                    name: "skill_gaps",
                    icon: TrendingUp,
                    placeholder: "Machine Learning, AWS",
                  },
                  {
                    label: "Career Goals",
                    name: "career_ambitions",
                    icon: Target,
                    placeholder: "Senior Developer, Tech Lead",
                  },
                  {
                    label: "Preferred Language",
                    name: "language",
                    icon: Globe,
                    placeholder: "English, Spanish",
                  },
                ].map(({ label, name, icon: Icon, placeholder }) => (
                  <div key={name} className="space-y-2">
                    <label
                      htmlFor={name}
                      className={`flex items-center font-semibold text-sm lg:text-base ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      <Icon className="text-indigo-600 mr-2" size={18} />
                      {label}
                    </label>
                    <input
                      id={name}
                      type="text"
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      placeholder={placeholder}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm lg:text-base ${
                        darkMode
                          ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      required
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Generate Career Plan
                      <TrendingUp size={20} className="ml-2" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section id="results-section" className="py-12 lg:py-16 px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div
              className={`rounded-3xl shadow-2xl p-6 lg:p-12 transition-colors duration-300 ${
                darkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <h2
                className={`text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12 flex items-center justify-center ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                <Lightbulb className="text-yellow-500 mr-3" size={32} />
                Personalized Recommendations
              </h2>

              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Courses */}
                <div className="space-y-4">
                  <div className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl">
                    <GraduationCap className="mr-3" size={24} />
                    <h3 className="text-lg lg:text-xl font-semibold">
                      Learning Path
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {recommendations.courses.map((course, index) => (
                      <a
                        key={index}
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-4 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer ${
                          darkMode
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-50 hover:bg-blue-50"
                        }`}
                      >
                        <div className="flex items-center">
                          <BookOpen className="text-blue-600 mr-3" size={20} />
                          <div>
                            <div
                              className={`font-semibold text-sm lg:text-base ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {course.name}
                            </div>
                            <div
                              className={`text-xs lg:text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {course.platform}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Videos */}
                <div className="space-y-4">
                  <div className="flex items-center bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-4 rounded-xl">
                    <Video className="mr-3" size={24} />
                    <h3 className="text-lg lg:text-xl font-semibold">
                      Video Resources
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {recommendations.videos.map((video, index) => (
                      <a
                        key={index}
                        href={video.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block p-4 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer ${
                          darkMode
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-50 hover:bg-red-50"
                        }`}
                      >
                        <div className="flex items-center">
                          <Play className="text-red-600 mr-3" size={20} />
                          <div>
                            <div
                              className={`font-semibold text-sm lg:text-base ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {video.name}
                            </div>
                            <div
                              className={`text-xs lg:text-sm ${
                                darkMode ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {video.platform}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Roadmap */}
                <div className="space-y-4">
                  <div className="flex items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-4 rounded-xl">
                    <MapPin className="mr-3" size={24} />
                    <h3 className="text-lg lg:text-xl font-semibold">
                      Roadmap
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {recommendations.roadmap.map((step, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg hover:shadow-lg transition-all duration-300 ${
                          darkMode
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-50 hover:bg-purple-50"
                        }`}
                      >
                        <div
                          className={`font-semibold mb-2 text-sm lg:text-base ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {step.step}
                        </div>
                        <p
                          className={`text-xs lg:text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials-section"
          className={`py-12 lg:py-16 px-4 lg:px-6 transition-colors duration-300 ${
            darkMode
              ? "bg-gradient-to-r from-gray-800 to-slate-800"
              : "bg-gradient-to-r from-indigo-50 to-purple-50"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <h2
              className={`text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              What Our Users Say
            </h2>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              <div
                className={`p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  darkMode ? "bg-gray-900" : "bg-white"
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-white" size={32} />
                </div>
                <p
                  className={`text-center mb-4 italic text-sm lg:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  "SkillUp helped me identify my skill gaps and provided a clear
                  roadmap to achieve my career goals. The recommendations were
                  spot on!"
                </p>
                <div
                  className={`text-center font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  - John Doe, Software Engineer
                </div>
              </div>

              <div
                className={`p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  darkMode ? "bg-gray-900" : "bg-white"
                }`}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-white" size={32} />
                </div>
                <p
                  className={`text-center mb-4 italic text-sm lg:text-base ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  "The personalized recommendations were amazing. I landed my
                  dream job within 3 months of following the career plan!"
                </p>
                <div
                  className={`text-center font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  - Jane Smith, Product Manager
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`py-8 px-4 lg:px-6 transition-colors duration-300 ${
            darkMode ? "bg-black text-white" : "bg-gray-900 text-white"
          }`}
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">
              SKILLUP
            </div>
            <p
              className={`text-sm mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-400"
              }`}
            >
              Empowering careers through personalized learning and development
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a
                href="#"
                className={`transition-colors ${
                  darkMode ? "hover:text-indigo-300" : "hover:text-indigo-400"
                }`}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className={`transition-colors ${
                  darkMode ? "hover:text-indigo-300" : "hover:text-indigo-400"
                }`}
              >
                Terms of Service
              </a>
              <a
                href="#"
                className={`transition-colors ${
                  darkMode ? "hover:text-indigo-300" : "hover:text-indigo-400"
                }`}
              >
                Contact Us
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
