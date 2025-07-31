import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function Welcome({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-12 transition-all duration-500 ${
        darkMode
          ? "bg-white/5 text-white font-[500] shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
          : "bg-white/50 text-[#1A237E] font-[500] shadow-[0_4px_8px_rgba(0,0,0,0.2)]"
      }`}
    >
      {/* 🌗 Dark Mode Toggle */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-xl shadow-md transition-colors duration-300 ${
            darkMode
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* ✨ Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl z-10 px-2 sm:px-4"
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Welcome to{" "}
          <span
            className={`font-bold transition-colors duration-300 ${
              darkMode ? "text-purple-400" : "text-yellow-400"
            }`}
          >
            Lavasoft
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg mb-8 leading-relaxed px-2 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Manage your analytics, dashboards, and business insights all in one
          place. Fast, clean and beautifully crafted.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <button
            onClick={() => navigate("/signin")}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 ${
              darkMode
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-white/50 text-[#1A237E] hover:bg-white/50"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg font-semibold shadow-md transition-all duration-300 ${
              darkMode
                ? "bg-purple-700 text-white hover:bg-purple-800"
                : "bg-[rgba(0,103,216,0.8)] text-white hover:bg-[rgba(0,103,216,1)]"
            }`}
          >
            Get Started
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
