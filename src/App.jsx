import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage or user preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-200">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className="bg-surface-100 dark:bg-surface-800 rounded-full p-2 
                    shadow-soft dark:shadow-none hover:bg-surface-200 
                    dark:hover:bg-surface-700 transition-all"
          aria-label="Toggle dark mode"
        >
          {darkMode ? 
            <Sun className="h-5 w-5 text-amber-500" /> : 
            <Moon className="h-5 w-5 text-surface-700" />
          }
        </button>
      </div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
        toastClassName="!rounded-lg !font-medium !shadow-md"
      />
    </div>
  );
}

// Icon declarations
const Sun = getIcon('Sun');
const Moon = getIcon('Moon');

export default App;