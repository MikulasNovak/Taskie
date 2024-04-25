// TaskListProvider.js
import React, { createContext, useEffect, useState } from "react";

export const TaskListContext = createContext();

function TaskListProvider({ children }) {
  const [taskLoadObject, setTaskLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setTaskLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const response = await fetch("http://localhost:8000/task/list/all");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const tasks = await response.json();
      setTaskLoadObject({ state: "ready", data: tasks });
    } catch (error) {
      setTaskLoadObject({ state: "error", error: error.message });
    }
  }

  const value = {
    state: taskLoadObject.state,
    tasks: taskLoadObject.data || [],
  };

  return (
    <TaskListContext.Provider value={value}>
      {children}
    </TaskListContext.Provider>
  );
}

export default TaskListProvider;
