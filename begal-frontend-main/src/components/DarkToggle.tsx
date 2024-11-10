import { useState, useLayoutEffect } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    const systemPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark =
      savedMode === "enabled" || (savedMode === null && systemPreference);

    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
    <button
      aria-label="Toggle dark mode"
      className="relative inline-flex items-center cursor-pointer"
      onClick={toggleDarkMode}
    >
      <span className="absolute left-0 top-0 w-14 h-8 bg-gray-200 dark:bg-gray-800 rounded-full"></span>
      <div
        className={`flex items-center justify-center w-7 h-7 bg-white dark:bg-gray-900 rounded-full transition-transform duration-300 ${
          isDarkMode ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDarkMode ? (
          <Moon className="text-yellow-500 w-5 h-5" />
        ) : (
          <Sun className="text-yellow-500 w-5 h-5" />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;
