import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode) {
      setIsDarkMode(savedMode === "enabled");
      if (savedMode === "enabled") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const systemPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(systemPreference);
      if (systemPreference) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("dark-mode", newMode ? "enabled" : "disabled");

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div
      className="relative inline-flex items-center cursor-pointer"
      onClick={toggleDarkMode}
    >
      <span className="absolute left-0 top-0 w-16 h-8 bg-gray-200 dark:bg-gray-800 rounded-full"></span>
      <div
        className={`flex items-center justify-center w-7 h-7 bg-white dark:bg-gray-900 rounded-full transition-all duration-300 ${
          isDarkMode ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDarkMode ? (
          <Moon className="text-yellow-500 w-5 h-5" />
        ) : (
          <Sun className="text-yellow-500 w-5 h-5" />
        )}
      </div>
    </div>
  );
};

export default DarkModeToggle;
