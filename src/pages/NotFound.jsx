import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  // Icon declarations
  const AlertTriangleIcon = getIcon('AlertTriangle');
  const HomeIcon = getIcon('Home');
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-surface-900 dark:to-surface-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-5">
            <AlertTriangleIcon className="w-16 h-16 text-amber-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white mb-2">
          Page Not Found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-300 text-lg mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 
                     bg-primary hover:bg-primary-dark text-white font-medium 
                     rounded-lg transition-colors duration-300 shadow-sm"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Return Home</span>
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-16 text-surface-500 dark:text-surface-400 text-sm"
      >
        <p>
          Lost in TaskTide? Find your way back to managing your tasks!
        </p>
      </motion.div>
    </div>
  );
}

export default NotFound;