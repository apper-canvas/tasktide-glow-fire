/** @type {import('tailwindcss').Config} */

// Create a custom plugin for high-contrast mode
const highContrastPlugin = ({ addVariant }) => {
  // Add a variant for high-contrast mode
  addVariant('high-contrast', '.high-contrast &');
  
  // Add variants for high-contrast mode in dark mode
  addVariant('high-contrast-dark', '.high-contrast.dark &');
  
  // Add variants for high-contrast mode in light mode
  addVariant('high-contrast-light', '.high-contrast:not(.dark) &');
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing colors
        primary: {
          DEFAULT: '#3b82f6',
          light: '#93c5fd',
          dark: '#1d4ed8'
        },
        secondary: {
          DEFAULT: '#8b5cf6',
          light: '#c4b5fd',
          dark: '#6d28d9'
        },
        accent: '#f43f5e',
        surface: {
          50: '#f8fafc',   // Lightest
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',  // Added
          500: '#64748b',  // Added
          600: '#475569',  // Added
          700: '#334155',  // Added
          800: '#1e293b',  // Added
          900: '#0f172a'   // Darkest
        }      
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'neu-light': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'neu-dark': '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    // Add the high-contrast plugin
    highContrastPlugin,
    // Other plugins can be added here
  ],
}

// Note: The variants key is deprecated in Tailwind CSS v3.x
// We're now using the plugin API to register variants