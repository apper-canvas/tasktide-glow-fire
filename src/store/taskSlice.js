import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Task list state
  tasks: [],
  totalTasks: 0,
  
  // Active task state
  currentTask: null,
  
  // UI state
  isLoading: false,
  error: null,
  
  // Filter and pagination state
  filters: {
    search: '',
    priority: '',
    category: '',
    isCompleted: null
  },
  sortField: 'createdAt',
  sortDirection: 'desc',
  currentPage: 0,
  pageSize: 10
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Loading state actions
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    
    // Task list actions
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
      state.totalTasks = action.payload.total;
      state.isLoading = false;
    },
    
    // Current task actions
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
      state.isLoading = false;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    
    // Task mutation actions
    addTask: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
      state.totalTasks += 1;
    },
    updateTaskInList: (state, action) => {
      const index = state.tasks.findIndex(task => task.Id === action.payload.Id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.Id !== action.payload);
      state.totalTasks -= 1;
    },
    
    // Filter and pagination actions
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 0; // Reset to first page when filters change
    },
    setSorting: (state, action) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  }
});

export const { 
  setLoading, setError, setTasks, setCurrentTask, clearCurrentTask,
  addTask, updateTaskInList, removeTask, setFilters, setSorting, setCurrentPage 
} = taskSlice.actions;

export default taskSlice.reducer;