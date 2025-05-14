import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../App';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

function Home() {
  // Icon declarations
  const WaveIcon = getIcon('Wave');
  const CheckCircleIcon = getIcon('CheckCircle');
  const ListTodoIcon = getIcon('ListTodo');
  
  const { logout } = useContext(AuthContext);
  const { user } = useSelector(state => state.user);
  
  // State for completed tasks count
  const [completedCount, setCompletedCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  
  const LogoutIcon = getIcon('LogOut');
  
  // Handle task status changes from MainFeature
  const handleTasksChange = (completed, total) => {
    setCompletedCount(completed);
    setTaskCount(total);
  };

  // Calculate completion percentage
  const completionPercentage = taskCount > 0 
    ? Math.round((completedCount / taskCount) * 100) 
    : 0;

  // Get time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 
                  dark:from-surface-900 dark:to-surface-800 pb-20">
      <header className="pt-16 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-surface-900 dark:text-white tracking-tight">
                  <span className="text-primary">Task</span>Tide
                </h1>
                <WaveIcon className="w-6 h-6 text-primary-light animate-pulse" />
              </div>
              <p className="mt-1 text-surface-600 dark:text-surface-300">
                {getGreeting()}{user ? `, ${user.firstName || 'there'}` : ''}, let's organize your tasks
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white dark:bg-surface-800 p-3 rounded-xl shadow-soft">
                <div className="flex-1">
                  <div className="text-sm text-surface-500 dark:text-surface-400 mb-1 flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4" />
                    <span>Task Completion</span>
                  </div>
                  <div className="bg-surface-100 dark:bg-surface-700 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: '0%' }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <div className="font-semibold text-lg text-primary">{completionPercentage}%</div>
              </div>
            
              <button
                onClick={logout}
                className="btn btn-outline flex items-center gap-2"
                aria-label="Log out"
              >
                <LogoutIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MainFeature onTasksChange={handleTasksChange} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default Home;