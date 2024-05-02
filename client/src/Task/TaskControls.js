import React, { useState, useContext } from "react";
import { TaskContext } from "./TaskProvider";
import TaskCreateModal from "./Modal/TaskCreateModal";
import { useCallback } from "react";

function TaskControls() {
  const { handlerMap } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = useCallback(() => setIsModalOpen(false), [setIsModalOpen]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const task = {
        title: formData.get("title"),
        date: formData.get("date-time"),
        description: formData.get("description"),
        category_id: formData.get("category"),
        priority: formData.get("priority"),
        completed: false,
      };
      try {
        await handlerMap.handleCreate(task);
        closeModal(); // close the modal after successful creation
      } catch (error) {
        console.error(error);
      }
    },
    [handlerMap, closeModal]
  );

  return (
    <div className="task-controls">
      <div className="task-control-button">Date</div>
      <div className="task-control-button">Priority</div>
      <div className="task-control-button" onClick={openModal}>
        Add task
      </div>

      <TaskCreateModal
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        isModalOpen={isModalOpen}
      />
    </div>
  );
}

export default TaskControls;
