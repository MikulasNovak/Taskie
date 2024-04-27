import React, { useState, useContext } from "react";
import Modal from "./Modal"; // Import the Modal component
import CategorySelectProvider from "./CategorySelectProvider";
import CategorySelect from "./CategorySelect";
import { TaskContext } from "./TaskProvider";
import { useCallback } from "react";

function TaskControls() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { handlerMap } = useContext(TaskContext);

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
      <div className="task-control-button" onClick={openModal}>
        Add task
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <form onSubmit={handleSubmit} className="task-create-form">
          <div>
            <input type="text" id="title" name="title" placeholder="Title" />
            <CategorySelectProvider>
              <CategorySelect />
            </CategorySelectProvider>
            <input type="date" id="date-time" name="date-time" />
            <div className="task-create-form-priority">
              <input
                type="radio"
                id="priority"
                name="priority"
                value="high"
              ></input>
              <input
                type="radio"
                id="priority"
                name="priority"
                value="medium"
              ></input>
              <input
                type="radio"
                id="priority"
                name="priority"
                value="low"
              ></input>
            </div>
          </div>
          <div>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
            />
          </div>
          <div>
            <button onClick={closeModal}>Close</button>
            <button type="submit" variant="primary">
              Save
            </button>
          </div>
        </form>
      </Modal>

      <div className="task-control-button">FILTER</div>
      <div className="task-control-button">FILTER</div>
    </div>
  );
}

export default TaskControls;
