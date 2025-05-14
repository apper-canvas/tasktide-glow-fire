/**
 * Service for managing task operations with the Apper backend
 * Uses ApperClient for all Apper operations
 */

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
export async function deleteTask(taskId) {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });

    await apperClient.deleteRecord("task", { RecordIds: [taskId] });
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

/**
 * Delete a task by ID
 */
export const deleteTask = async (taskId) => {
  try {
    const client = getClient();
    const response = await client.deleteRecord(TABLE_NAME, {
      recordIds: [taskId]
    });
    
    if (response.success && response.results && response.results[0].success) {
      toast.success("Task deleted successfully!");
      return true;
    } else {
      throw new Error(response.results?.[0]?.message || "Failed to delete task");
    }
  } catch (error) {
    console.error(`Error deleting task with ID ${taskId}:`, error);
    toast.error(error.message || "Failed to delete task. Please try again.");
    throw error;
  }
};

// Export the service as default for easier imports
export default { fetchTasks, getTaskById, createTask, updateTask, deleteTask };