import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTaskById, updateTask, deleteTask } from '../services/taskService';
import { setCurrentTask, clearCurrentTask, removeTask } from '../store/taskSlice';
import Layout from '../components/Layout';
import { 
  Calendar, 
  Tag, 
  Clock, 
  CheckCircle, 
  Edit, 
  Trash2, 
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from 'react-toastify';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
        dispatch(setCurrentTask(data));
      } catch (error) {
        console.error('Error fetching task:', error);
        toast.error('Failed to load task details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();

    return () => {
      dispatch(clearCurrentTask());
    };
  }, [id, dispatch]);

  const handleStatusToggle = async () => {
    try {
      const updatedTask = await updateTask(id, {
        ...task,
        isCompleted: !task.isCompleted
      });
      setTask(updatedTask);
      dispatch(setCurrentTask(updatedTask));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      dispatch(removeTask(id));
      navigate('/tasks');
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  // Priority styling
  const priorityClasses = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">Loading task details...</p>
        </div>
      </Layout>
    );
  }

  if (!task) {
    return (
      <Layout>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Task Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The task you're looking for doesn't exist or has been removed.</p>
          <Link to="/tasks" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <ArrowLeft size={18} className="mr-2" />
            Back to Tasks
          </Link>
        </div>
      </Layout>
    );
  }

  const timeAgo = task.createdAt
    ? formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })
    : 'Unknown date';

  const formattedDate = task.createdAt
    ? format(new Date(task.createdAt), 'PPP')
    : 'Unknown date';

  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* Back button and actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <Link to="/tasks" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-4 sm:mb-0">
            <ArrowLeft size={20} className="mr-1" />
            Back to Tasks
          </Link>
          
          <div className="flex space-x-3">
            <button
              onClick={handleStatusToggle}
              className={`px-4 py-2 rounded-md flex items-center ${
                task.isCompleted 
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-green-600 text-white'
              }`}
            >
              <CheckCircle size={18} className="mr-2" />
              {task.isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
            </button>
            
            <Link
              to={`/tasks/${id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
            >
              <Edit size={18} className="mr-2" />
              Edit
            </Link>
            
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center"
            >
              <Trash2 size={18} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
        
        {/* Task details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {task.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {task.priority && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityClasses[task.priority] || 'bg-gray-100 text-gray-800'}`}>
                Priority: {task.priority}
              </span>
            )}
            {task.category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                <Tag size={12} className="mr-1" />{task.category}
              </span>
            )}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              <Calendar size={12} className="mr-1" />{formattedDate}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              task.isCompleted 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
            }`}>
              {task.isCompleted ? 
                <CheckCircle size={12} className="mr-1" /> : 
                <Clock size={12} className="mr-1" />
              }
              {task.isCompleted ? 'Completed' : 'Pending'}
            </span>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-6 text-gray-700 dark:text-gray-300">
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Description</h3>
            <p className="whitespace-pre-line">{task.description || 'No description provided'}</p>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Created {timeAgo}
          </div>
        </div>
      </div>
      
      {/* Delete confirmation modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Delete Task
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default TaskDetail;