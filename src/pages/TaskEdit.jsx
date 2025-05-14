import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';
import { getTaskById } from '../services/taskService';
import { toast } from 'react-toastify';

const TaskEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (error) {
        console.error('Error fetching task:', error);
        setError('Failed to load task details');
        toast.error('Failed to load task details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSuccess = () => {
    navigate(`/tasks/${id}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <Link to={`/tasks/${id}`} className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft size={20} className="mr-1" />
          Back to Task Details
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">Loading task...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Error</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <Link to="/tasks" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Back to Tasks
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Task</h1>
              <TaskForm task={task} onSuccess={handleSuccess} />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TaskEdit;