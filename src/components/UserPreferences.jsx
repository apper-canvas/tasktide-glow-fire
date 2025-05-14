import { useRef, useEffect } from 'react';
import getIcon from '../utils/iconUtils';

function UserPreferences({ 
  darkMode, 
  toggleDarkMode, 
  fontSize, 
  setFontSize, 
  contrastMode, 
  setContrastMode, 
  reducedMotion, 
  setReducedMotion,
  setShowPreferences
}) {
  const panelRef = useRef(null);
  
  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowPreferences(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowPreferences]);

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-12 bg-white dark:bg-surface-800 rounded-lg shadow-card 
                 dark:shadow-none dark:border dark:border-surface-700 p-4 w-72"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100">Display Preferences</h3>
        <button
          onClick={() => setShowPreferences(false)}
          className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
          aria-label="Close preferences panel"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Dark Mode</span>
          <button
            onClick={toggleDarkMode}
            className="bg-surface-100 dark:bg-surface-700 rounded-full p-2
                      transition-all hover:bg-surface-200 dark:hover:bg-surface-600"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={darkMode}
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-surface-700" />}
          </button>
        </div>
        
        {/* Font Size Selector */}
        <div className="space-y-2">
          <span className="text-sm font-medium block">Text Size</span>
          <div className="flex gap-2">
            {[
              { label: 'Default', value: 100 },
              { label: 'Large', value: 125 },
              { label: 'Extra Large', value: 150 }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setFontSize(option.value)}
                className={`px-3 py-1 text-xs rounded-full transition-all ${
                  fontSize === option.value 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
                aria-pressed={fontSize === option.value}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contrast Mode Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">High Contrast</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={contrastMode === 'high'} 
              onChange={() => setContrastMode(contrastMode === 'high' ? 'normal' : 'high')}
              aria-label="Toggle high contrast mode"
            />
            <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer 
                         dark:bg-surface-700 peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] 
                         after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
                         after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Reduce Motion</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={reducedMotion}
              onChange={() => setReducedMotion(!reducedMotion)}
              aria-label="Toggle reduced motion"
            />
            <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer 
                         dark:bg-surface-700 peer-checked:after:translate-x-full peer-checked:bg-primary after:content-[''] 
                         after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
                         after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
      </div>
    </div>
  );
}

const X = getIcon('X');
const Sun = getIcon('Sun');
const Moon = getIcon('Moon');

export default UserPreferences;