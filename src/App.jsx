import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UserPreferences from './components/UserPreferences';

function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  // Font size preference (100 = default, 125 = large, 150 = extra large)
  const [fontSize, setFontSize] = useState(100);
  // Contrast mode (normal, high)
  const [contrastMode, setContrastMode] = useState('normal');
  // Reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  // Preferences panel visibility
  const [showPreferences, setShowPreferences] = useState(false);

  // Initialize preferences from localStorage or user preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedFontSize = localStorage.getItem('fontSize');
    const savedContrastMode = localStorage.getItem('contrastMode');
    const savedReducedMotion = localStorage.getItem('reducedMotion');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedContrastMode) setContrastMode(savedContrastMode);
    if (savedReducedMotion === 'true') setReducedMotion(true);
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
  
  // Apply font size to document root
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);
  
  // Apply contrast mode
  useEffect(() => {
    if (contrastMode === 'high') {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('contrastMode', contrastMode);
  }, [contrastMode]);
  
  // Apply reduced motion preference
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    localStorage.setItem('reducedMotion', reducedMotion.toString());
  }, [reducedMotion]);

  return (
    <div className="min-h-screen transition-colors motion-safe:duration-200 motion-reduce:duration-0">
      <div className="fixed top-4 right-4 z-50">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="bg-surface-100 dark:bg-surface-800 rounded-full p-2 
                      shadow-soft dark:shadow-none hover:bg-surface-200 
                      dark:hover:bg-surface-700 transition-all"
            aria-label="View display preferences"
            aria-expanded={showPreferences}
          >
            <Settings className="h-5 w-5 text-primary dark:text-primary-light" />
          </button>
          
          {showPreferences && (
            <UserPreferences darkMode={darkMode} toggleDarkMode={toggleDarkMode} fontSize={fontSize} setFontSize={setFontSize} contrastMode={contrastMode} setContrastMode={setContrastMode} reducedMotion={reducedMotion} setReducedMotion={setReducedMotion} setShowPreferences={setShowPreferences} />
          )}
        </div>
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
const Settings = getIcon('Settings');

export default App;