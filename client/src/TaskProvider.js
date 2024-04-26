import React, { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

function TaskProvider({ children }) {
  const [taskLoadObject, setTaskLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  async function handleCreate(task) {
    try {
      const response = await fetch("http://localhost:8000/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      // Reload tasks after creation
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  async function handleDelete(taskId) {
    try {
      const response = await fetch(`http://localhost:8000/task/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      // Reload tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function handleUpdate(updatedTask) {
    try {
      const response = await fetch(
        `http://localhost:8000/task/${updatedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      // Reload tasks after update

    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const value = {
    state: taskLoadObject.state,
    tasks: taskLoadObject.data || [],
    handlerMap: { handleCreate, handleUpdate, handleDelete },
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskProvider;
