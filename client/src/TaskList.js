// TaskList.js
import React, { useContext } from "react";
import { TaskListContext } from "./TaskListProvider";
import TaskCard from "./TaskCard";

function TaskList() {
  const { tasks } = useContext(TaskListContext);

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
