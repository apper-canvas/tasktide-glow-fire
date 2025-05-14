import React from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const darkMode = useSelector(state => state.user.darkMode);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <Sidebar />
      
      <main className="md:ml-64 min-h-screen transition-all duration-300">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;