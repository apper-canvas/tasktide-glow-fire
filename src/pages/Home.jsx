import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks } from '../services/taskService';
import { setTasks, setLoading, setError } from '../store/taskSlice';
import Layout from '../components/Layout';
import TaskCard from '../components/TaskCard';
import { PlusCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0
  });

  // Fetch tasks on component mount
  useEffect(() => {
    const loadTasks = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchTasks({}, 'createdAt', 'desc', 0, 5);
        dispatch(setTasks({ tasks: data, total: data.length }));
        
        // Calculate stats from all tasks
        const allTasks = await fetchTasks({}, 'createdAt', 'desc', 0, 100);
        
        setStats({
          total: allTasks.length,
          completed: allTasks.filter(task => task.isCompleted).length,
          pending: allTasks.filter(task => !task.isCompleted).length,
          highPriority: allTasks.filter(task => task.priority === 'high' && !task.isCompleted).length
        });
      } catch (error) {
        dispatch(setError(error.message));
      }
    };
    
    loadTasks();
  }, [dispatch]);

  // Calculate completion rate
  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.firstName || 'User'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Here's an overview of your tasks
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

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                <Clock size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                <CheckCircle size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.completed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
                <Clock size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
                <AlertTriangle size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">High Priority</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stats.highPriority}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Completion rate bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Completion Rate</h3>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Recent tasks */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Tasks</h2>
            <Link 
              to="/tasks" 
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              View all
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map(task => (
                <TaskCard key={task.Id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;