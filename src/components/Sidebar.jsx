import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../App';
import { 
  Home, 
  CheckSquare, 
  List, 
  PlusCircle, 
  LogOut, 
  User,
  Menu, 
  X 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { user } = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/', icon: <Home size={20} />, text: 'Dashboard' },
    { path: '/tasks', icon: <List size={20} />, text: 'All Tasks' },
    { path: '/tasks/new', icon: <PlusCircle size={20} />, text: 'New Task' },
    { path: '/tasks/completed', icon: <CheckSquare size={20} />, text: 'Completed' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 md:hidden z-50 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-800 shadow-md transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 overflow-y-auto`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">TaskTide</h2>
        </div>

        {/* User info */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-medium">
              {user?.firstName?.charAt(0) || user?.emailAddress?.charAt(0) || 'U'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.emailAddress || 'User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.emailAddress}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    location.pathname === item.path ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button */}
        <div className="px-4 py-4 mt-auto border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;