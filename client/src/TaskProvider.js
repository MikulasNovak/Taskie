import React, { createContext, useEffect, useState } from "react";
export const TaskContext = createContext();

function TaskProvider({ children }) {
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

  async function handleCreate(task) {
    setTaskLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch("http://localhost:8000/task/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const serverResponse = await response.json();
    if (response.status < 400) {
      setTaskLoadObject((current) => {
        const newData = [...current.data, serverResponse];
        return { state: "ready", data: newData };
      });
    }
  }

  async function handleDelete(task) {
    setTaskLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/task/delete?id=${task.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status < 400) {
      setTaskLoadObject((current) => {
        const newData = current.data.filter((t) => t.id !== task.id);
        return { state: "ready", data: newData };
      });
    }
  }

  async function handleUpdate(task) {
    setTaskLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/task/update?id=${task.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task.id),
      }
    );
    const serverResponse = await response.json();
    if (response.status < 400) {
      setTaskLoadObject((current) => {
        const taskIndex = current.data.findIndex(
          (e) => e.id === serverResponse.id
        );
        current.data[taskIndex] = serverResponse;
        return { state: "ready", data: current.data };
      });
    }
  }


  const value = {
    state: taskLoadObject.state,
    tasks: taskLoadObject.data || [],
    handlerMap: {
      handleCreate,
      handleUpdate,
      handleDelete,
      handleLoad,
    },
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export default TaskProvider;
