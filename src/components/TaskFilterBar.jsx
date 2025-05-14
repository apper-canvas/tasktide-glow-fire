import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/taskSlice';
import { Search, ArrowDownAZ, ArrowUpZA } from 'lucide-react';

const TaskFilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.tasks.filters);
  const [searchInput, setSearchInput] = useState(filters.search || '');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchInput }));
  };

  const handlePriorityChange = (e) => {
    dispatch(setFilters({ priority: e.target.value || null }));
  };

  const handleCategoryChange = (e) => {
    dispatch(setFilters({ category: e.target.value || null }));
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    dispatch(setFilters({ 
      isCompleted: value === 'all' ? null : value === 'completed'
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
      <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-4">
        {/* Search input */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full pl-10 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search tasks..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        
        {/* Priority filter */}
        <div className="w-full sm:w-auto">
          <select
            value={filters.priority || ''}
            onChange={handlePriorityChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
        {/* Category filter */}
        <div className="w-full sm:w-auto">
          <select
            value={filters.category || ''}
            onChange={handleCategoryChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
          </select>
        </div>
        
        {/* Status filter */}
        <div className="w-full sm:w-auto">
          <select
            value={filters.isCompleted === null ? 'all' : filters.isCompleted ? 'completed' : 'pending'}
            onChange={handleStatusChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        
        <button type="submit" className="py-2.5 px-5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Filter
        </button>
      </form>
    </div>
  );
};

export default TaskFilterBar;