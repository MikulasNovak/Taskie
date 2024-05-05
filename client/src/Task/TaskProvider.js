import React, { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

function TaskProvider({ children }) {
  const [taskLoadObject, setTaskLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  const [filters, setFilters] = useState({
    category_id: ""
  });

  useEffect(() => {
    handleLoad();
  }, [filters]);

  function handleLoad() {
    setTaskLoadObject((current) => ({ ...current, state: "pending" }));
    fetch(`http://localhost:8000/task/list?${new URLSearchParams(filters)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setTaskLoadObject({
            state: "error",
            error: responseJson.error,
          });
        } else {
          setTaskLoadObject({ state: "ready", data: responseJson });
        }
      })
      .catch((error) => {
        setTaskLoadObject({
          state: "error",
          error: error.message,
        });
      });
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
        body: JSON.stringify(task),
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

  async function handleComplete(task) {
    setTaskLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(
      `http://localhost:8000/task/complete?id=${task.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
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
    filteredTasks: taskLoadObject.data || [],
    handlerMap: {
      handleCreate,
      handleUpdate,
      handleDelete,
      handleLoad,
      handleComplete,
      setFilters
    },
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;

}

export default TaskProvider;
