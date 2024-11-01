import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import '../../../css/parents/changeTheme.css';

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative flex items-center gap-2">
        <Sun 
          className={`w-5 h-5 transition-all duration-300 ${!isDarkMode ? 'text-yellow-500' : 'text-gray-400'}`}
        />
        
        <button
          onClick={toggleTheme}
          className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">
            {isDarkMode ? 'Activar modo día' : 'Activar modo noche'}
          </span>
          
          <span
            className={`absolute w-6 h-6 transition-transform duration-300 transform bg-white rounded-full shadow-lg ${isDarkMode ? 'translate-x-8' : 'translate-x-1'}`}
          />
        </button>
        
        <Moon 
          className={`w-5 h-5 transition-all duration-300 ${isDarkMode ? 'text-blue-400' : 'text-gray-400'}`}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
