import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks } from '../services/taskService';
import { 
  setTasks, setLoading, setError, setFilters
} from '../store/taskSlice';
import Layout from '../components/Layout';
import TaskCard from '../components/TaskCard';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const CompletedTasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector(state => state.tasks);
  
  // Set the completed filter and fetch tasks
  useEffect(() => {
    const loadCompletedTasks = async () => {
      dispatch(setLoading(true));
      dispatch(setFilters({ isCompleted: true }));
      
      try {
        const data = await fetchTasks({ isCompleted: true }, 'createdAt', 'desc');
        dispatch(setTasks({ tasks: data, total: data.length }));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };
    
    loadCompletedTasks();
  }, [dispatch]);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <Link to="/tasks" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft size={20} className="mr-1" />
          Back to All Tasks
        </Link>
        
        <div className="flex items-center mb-6">
          <CheckCircle size={24} className="text-green-600 dark:text-green-400 mr-3" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Completed Tasks
          </h1>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">Loading completed tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No completed tasks found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map(task => (
              <TaskCard key={task.Id} task={task} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CompletedTasks;