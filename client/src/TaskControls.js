import React, { useState, useContext } from "react";
import Modal from "./Modal"; // Import the Modal component
import CategorySelectProvider from "./CategorySelectProvider";
import CategorySelect from "./CategorySelect";
import { TaskContext } from "./TaskProvider";
import { useCallback } from "react";

function TaskControls() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state, handlerMap } = useContext(TaskContext);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      <div className="task-control-button" onClick={openModal}>
        Add task
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <form onSubmit={handleSubmit}>
          <input type="text" id="title" name="title" />
          <input type="date" id="date-time" name="date-time" />
          <textarea id="description" name="description" />
          <CategorySelectProvider>
            <CategorySelect />
          </CategorySelectProvider>
          <div>
            <input
              type="radio"
              id="priority"
              name="priority"
              value="high"
            ></input>
          </div>
          <button type="submit" variant="primary">
            Save
          </button>
          <button onClick={closeModal}>Close</button>
        </form>
      </Modal>

      <div className="task-control-button">FILTER</div>
      <div className="task-control-button">FILTER</div>
    </div>
  );
}
export default TaskControls;
