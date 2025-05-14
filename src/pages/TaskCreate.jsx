import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';

const TaskCreate = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/tasks');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <Link to="/tasks" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
          <ArrowLeft size={20} className="mr-1" />
          Back to Tasks
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Task</h1>
          
          <TaskForm onSuccess={handleSuccess} />
        </div>
      </div>
    </Layout>
  );
};

export default TaskCreate;