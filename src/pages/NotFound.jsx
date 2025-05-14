import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const FileQuestion = getIcon('FileQuestion');
  const { isAuthenticated } = useSelector(state => state.user);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-surface-900 dark:to-surface-800 p-4">
      <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-8 max-w-md w-full text-center">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20">
          <FileQuestion className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">Page Not Found</h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to={isAuthenticated ? '/' : '/login'} className="btn btn-primary inline-block">
          {isAuthenticated ? 'Go to Dashboard' : 'Return to Login'}
        </Link>
      </div>
    </div>
  );
}

export default NotFound;