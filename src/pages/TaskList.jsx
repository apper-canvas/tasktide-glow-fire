import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks } from '../services/taskService';
import { 
  setTasks, setLoading, setError, 
  setCurrentPage, setSorting 
} from '../store/taskSlice';
import Layout from '../components/Layout';
import TaskFilterBar from '../components/TaskFilterBar';
import TaskCard from '../components/TaskCard';
import { PlusCircle, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

const TaskList = () => {
  const dispatch = useDispatch();
  const { 
    tasks, totalTasks, isLoading, error,
    filters, sortField, sortDirection, currentPage, pageSize
  } = useSelector(state => state.tasks);
  
  // Calculate total pages
  const totalPages = Math.ceil(totalTasks / pageSize);

  // Fetch tasks when filters, sort, or page changes
  useEffect(() => {
    const loadTasks = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchTasks(
          filters, 
          sortField, 
          sortDirection, 
          currentPage, 
          pageSize
        );
        
        // Get total count with the same filters but no pagination
        const allData = await fetchTasks(
          filters, 
          sortField, 
          sortDirection
        );
        
        dispatch(setTasks({ 
          tasks: data,
          total: allData.length
        }));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };
    
    loadTasks();
  }, [dispatch, filters, sortField, sortDirection, currentPage, pageSize]);
  
  // Toggle sort direction
  const handleSort = (field) => {
    dispatch(setSorting({ 
      field, 
      direction: field === sortField && sortDirection === 'asc' ? 'desc' : 'asc' 
    }));
  };

  // Pagination handlers
  const goToPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              All Tasks
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and organize your tasks
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              to="/tasks/new" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle size={18} className="mr-2" />
              New Task
            </Link>
          </div>
        </div>
        
        {/* Filter bar */}
        <TaskFilterBar />
        
        {/* Sort controls */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <button
              onClick={() => handleSort('title')}
              className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <span>Title</span>
              <ArrowUpDown size={14} className="ml-1" />
            </button>
            <button
              onClick={() => handleSort('priority')}
              className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <span>Priority</span>
              <ArrowUpDown size={14} className="ml-1" />
            </button>
            <button
              onClick={() => handleSort('createdAt')}
              className="flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <span>Date</span>
              <ArrowUpDown size={14} className="ml-1" />
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {tasks.length} of {totalTasks} tasks
          </p>
        </div>
        
        {/* Tasks grid/list */}
        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No tasks found</p>
            <Link 
              to="/tasks/new" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PlusCircle size={18} className="mr-2" />
              Create your first task
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {tasks.map(task => (
              <TaskCard key={task.Id} task={task} />
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              <button
                onClick={() => goToPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="px-3 py-1 rounded-md mr-2 text-gray-700 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-300"
              >
                <ChevronLeft size={18} />
              </button>
              
              {[...Array(totalPages).keys()].map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 rounded-md mx-1 ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              
              <button
                onClick={() => goToPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1 rounded-md ml-2 text-gray-700 bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-300"
              >
                <ChevronRight size={18} />
              </button>
            </nav>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TaskList;