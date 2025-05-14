import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import getIcon from '../utils/iconUtils';

function MainFeature({ onTasksChange }) {
  // Icon declarations
  const PlusIcon = getIcon('Plus');
  const CheckIcon = getIcon('Check');
  const TrashIcon = getIcon('Trash');
  const PencilIcon = getIcon('Pencil');
  const CalendarIcon = getIcon('Calendar');
  const FlagIcon = getIcon('Flag');
  const XIcon = getIcon('X');
  const ArrowUpIcon = getIcon('ArrowUp');
  const ArrowDownIcon = getIcon('ArrowDown');
  const MoveIcon = getIcon('Move');
  const TagIcon = getIcon('Tag');
  const FilterIcon = getIcon('Filter');
  
  // State management
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { 
        id: '1', 
        title: 'Welcome to TaskTide!', 
        description: 'This is your first task. Try editing or completing it.',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        isCompleted: false,
        category: 'Personal'
      }
    ];
  });
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'Personal'
  });
  
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Categories with colors
  const categories = [
    { id: 'personal', name: 'Personal', color: '#3b82f6' },
    { id: 'work', name: 'Work', color: '#8b5cf6' },
    { id: 'shopping', name: 'Shopping', color: '#ec4899' },
    { id: 'health', name: 'Health', color: '#10b981' },
  ];
  
  // Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Calculate completed tasks
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    
    // Update parent component
    onTasksChange(completedTasks, tasks.length);
  }, [tasks, onTasksChange]);
  
  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    // Status filter
    if (filter === 'active' && task.isCompleted) return false;
    if (filter === 'completed' && !task.isCompleted) return false;
    
    // Priority filter
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    
    return true;
  });
  
  // Add a new task
  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      setFormError('Please enter a task title');
      return;
    }
    
    const task = {
      id: Date.now().toString(),
      ...newTask,
      createdAt: new Date().toISOString(),
      isCompleted: false,
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'Personal'
    });
    setShowForm(false);
    toast.success('Task added successfully!');
  };
  
  // Delete a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Task deleted successfully!');
  };
  
  // Toggle task completion
  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? {...task, isCompleted: !task.isCompleted} : task
    ));
  };
  
  // Start editing a task
  const handleEditClick = (task) => {
    setCurrentTask(task);
    setEditMode(true);
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category
    });
    setShowForm(true);
  };
  
  // Update a task
  const handleUpdateTask = () => {
    if (!newTask.title.trim()) {
      setFormError('Please enter a task title');
      return;
    }
    
    setTasks(tasks.map(task => 
      task.id === currentTask.id ? {...task, ...newTask} : task
    ));
    
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'Personal'
    });
    setEditMode(false);
    setCurrentTask(null);
    setShowForm(false);
    toast.success('Task updated successfully!');
  };
  
  // Cancel editing/adding
  const handleCancel = () => {
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'Personal'
    });
    setEditMode(false);
    setCurrentTask(null);
    setShowForm(false);
    setFormError('');
  };
  
  // Get priority style
  const getPriorityStyles = (priority) => {
    switch(priority) {
      case 'high':
        return {
          icon: <FlagIcon className="w-4 h-4 text-red-500" />,
          text: 'text-red-700 dark:text-red-400',
          bg: 'bg-red-50 dark:bg-red-900/20'
        };
      case 'medium':
        return {
          icon: <FlagIcon className="w-4 h-4 text-amber-500" />,
          text: 'text-amber-700 dark:text-amber-400',
          bg: 'bg-amber-50 dark:bg-amber-900/20'
        };
      case 'low':
        return {
          icon: <FlagIcon className="w-4 h-4 text-green-500" />,
          text: 'text-green-700 dark:text-green-400',
          bg: 'bg-green-50 dark:bg-green-900/20'
        };
      default:
        return {
          icon: <FlagIcon className="w-4 h-4 text-surface-400" />,
          text: 'text-surface-700 dark:text-surface-300',
          bg: 'bg-surface-50 dark:bg-surface-800'
        };
    }
  };
  
  // Get category color
  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
    return category ? category.color : '#94a3b8';
  };
  
  return (
    <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden">
      <div className="p-6 border-b border-surface-200 dark:border-surface-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
            <MoveIcon className="text-primary" />
            My Tasks
          </h2>
          
          <div className="flex gap-2">
            <div className="relative">
              <button 
                onClick={() => setShowForm(!showForm)}
                className="btn btn-primary font-medium flex items-center gap-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Add Task</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none text-sm bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white rounded-lg px-3 py-2 pr-8 border border-surface-200 dark:border-surface-600 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
                <FilterIcon className="absolute right-2 top-2.5 w-4 h-4 text-surface-400" />
              </div>
              
              <div className="relative">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="appearance-none text-sm bg-surface-50 dark:bg-surface-700 text-surface-900 dark:text-white rounded-lg px-3 py-2 pr-8 border border-surface-200 dark:border-surface-600 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <ArrowDownIcon className="absolute right-2 top-2.5 w-4 h-4 text-surface-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 border-b border-surface-200 dark:border-surface-700 bg-primary/5 dark:bg-primary/10">
              <h3 className="font-semibold mb-4 text-surface-800 dark:text-white">
                {editMode ? 'Edit Task' : 'Add New Task'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Task Title*
                  </label>
                  <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={newTask.title}
                    onChange={(e) => {
                      setNewTask({...newTask, title: e.target.value});
                      if (e.target.value.trim()) setFormError('');
                    }}
                    className="input"
                    autoFocus
                  />
                  {formError && (
                    <p className="mt-1 text-sm text-red-500">{formError}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Add details about this task..."
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    className="input min-h-[80px]"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Priority
                    </label>
                    <div className="flex items-center gap-2">
                      {['low', 'medium', 'high'].map(priority => {
                        const isActive = newTask.priority === priority;
                        const styles = getPriorityStyles(priority);
                        
                        return (
                          <button
                            key={priority}
                            type="button"
                            onClick={() => setNewTask({...newTask, priority})}
                            className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium flex items-center justify-center gap-1.5 transition-all
                                      ${isActive 
                                        ? `${styles.bg} border-${priority === 'high' ? 'red' : priority === 'medium' ? 'amber' : 'green'}-300 dark:border-${priority === 'high' ? 'red' : priority === 'medium' ? 'amber' : 'green'}-700 ${styles.text}` 
                                        : 'bg-white dark:bg-surface-700 border-surface-200 dark:border-surface-600 text-surface-600 dark:text-surface-300'}`}
                          >
                            {styles.icon}
                            <span className="capitalize">{priority}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Category
                    </label>
                    <select
                      value={newTask.category}
                      onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                      className="input"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  
                  <button
                    type="button"
                    onClick={editMode ? handleUpdateTask : handleAddTask}
                    className="btn btn-primary"
                  >
                    {editMode ? 'Update Task' : 'Add Task'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="p-2 sm:p-4 max-h-[500px] overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-surface-100 dark:bg-surface-700 rounded-full p-5 mb-4">
              <TagIcon className="w-8 h-8 text-surface-400" />
            </div>
            <h3 className="text-lg font-medium text-surface-800 dark:text-surface-200">
              No tasks found
            </h3>
            <p className="text-surface-500 dark:text-surface-400 max-w-md mt-2">
              {filter === 'completed' 
                ? "You haven't completed any tasks yet." 
                : filter === 'active' 
                  ? "You don't have any active tasks. Great job!" 
                  : "Start by adding a new task using the Add Task button above."}
            </p>
          </div>
        ) : (
          <motion.ul className="space-y-2">
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <motion.li 
                  key={task.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`task-item priority-${task.priority} ${task.isCompleted ? 'opacity-70' : ''}`}
                >
                  <div 
                    className={`task-checkbox ${task.isCompleted 
                      ? 'bg-primary border-primary' 
                      : 'bg-white dark:bg-surface-700 border-surface-300 dark:border-surface-500'}`}
                    onClick={() => handleToggleComplete(task.id)}
                  >
                    {task.isCompleted && <CheckIcon className="w-3 h-3 text-white" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 
                          className={`font-medium ${task.isCompleted ? 'line-through text-surface-500 dark:text-surface-400' : 'text-surface-900 dark:text-white'}`}
                        >
                          {task.title}
                        </h4>
                        
                        {task.description && (
                          <p className="text-sm text-surface-600 dark:text-surface-400 mt-1 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <div 
                        className="text-xs py-0.5 px-2 rounded-full flex items-center gap-1"
                        style={{
                          backgroundColor: `${getCategoryColor(task.category)}20`, 
                          color: getCategoryColor(task.category)
                        }}
                      >
                        <span>{task.category}</span>
                      </div>
                      
                      <div className="text-xs text-surface-500 dark:text-surface-400 flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{format(new Date(task.createdAt), 'MMM d, yyyy')}</span>
                      </div>
                      
                      <div className={`text-xs flex items-center gap-1 ${getPriorityStyles(task.priority).text}`}>
                        {getPriorityStyles(task.priority).icon}
                        <span className="capitalize">{task.priority}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 transition-colors"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-surface-500 hover:text-red-600 dark:text-surface-400 dark:hover:text-red-400 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </div>
  );
}

export default MainFeature;