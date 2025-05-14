import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CheckSquare, Clock, Tag, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
};

const categoryColors = {
  Personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  Work: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Shopping: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  Health: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300'
};

const TaskCard = ({ task }) => {
  // Calculate time ago
  const timeAgo = task.createdAt
    ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })
    : 'Unknown date';

  return (
    <Link to={`/tasks/${task.Id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {task.title}
          </h3>
          
          <div className="flex items-center space-x-2">
            {task.isCompleted ? (
              <span className="flex items-center text-sm text-green-600 dark:text-green-400">
                <CheckSquare size={16} className="mr-1" /> Completed
              </span>
            ) : (
              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock size={16} className="mr-1" /> Pending
              </span>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 text-sm">
          {task.description || 'No description provided'}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {task.priority && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
              {task.priority}
            </span>
          )}
          {task.category && (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[task.category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
              <Tag size={12} className="mr-1" />{task.category}
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            <Calendar size={12} className="mr-1" />{timeAgo}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;