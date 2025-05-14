/**
 * Service for managing task operations with the Apper backend
 * Uses ApperClient for all Apper operations
 */

import { toast } from 'react-toastify';

// Get tasks for the current user
export async function fetchTasks(filterOptions = {}) {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    // Prepare fetch parameters
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "title" } },
        { Field: { Name: "description" } },
        { Field: { Name: "priority" } },
        { Field: { Name: "category" } },
        { Field: { Name: "isCompleted" } },
        { Field: { Name: "createdAt" } },
        { Field: { Name: "Owner" } }
      ],
      orderBy: [
        { field: "createdAt", direction: "desc" }
      ]
    };

    // Add filter conditions if provided
    if (filterOptions.status) {
      if (filterOptions.status === 'active') {
        params.where = [
          { fieldName: "isCompleted", Operator: "ExactMatch", values: [false] }
        ];
      } else if (filterOptions.status === 'completed') {
        params.where = [
          { fieldName: "isCompleted", Operator: "ExactMatch", values: [true] }
        ];
      }
    }

    if (filterOptions.priority && filterOptions.priority !== 'all') {
      if (!params.where) params.where = [];
      params.where.push({
        fieldName: "priority",
        Operator: "ExactMatch",
        values: [filterOptions.priority]
      });
    }

    const response = await apperClient.fetchRecords("task", params);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

// Create a new task
export async function createTask(taskData) {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.createRecord("task", { records: [taskData] });
    return response.results?.[0]?.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

// Update an existing task
export async function updateTask(taskData) {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    const response = await apperClient.updateRecord("task", { records: [taskData] });
    return response.results?.[0]?.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
}

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    await apperClient.deleteRecord("task", { RecordIds: [taskId] });
    
    toast.success("Task deleted successfully!");
    return true;
  } catch (error) {
    console.error(`Error deleting task with ID ${taskId}:`, error);
    toast.error(error.message || "Failed to delete task. Please try again.");
    throw error;
  }
};

// Get a task by ID
export async function getTaskById(taskId) {
  // Implementation for fetching a single task by ID
  // This function is mentioned in the default export but not implemented
  // Adding a placeholder implementation
  return null;
}

// Export the service as default for easier imports
export default { fetchTasks, getTaskById, createTask, updateTask, deleteTask };