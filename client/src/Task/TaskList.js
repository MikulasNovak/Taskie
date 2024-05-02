// TaskList.js
import React, { useContext } from "react";
import { TaskContext } from "./TaskProvider";
import TaskCard from "./TaskCard";


function TaskList() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
