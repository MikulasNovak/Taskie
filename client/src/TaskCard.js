import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon
import { useCallback } from "react";
import { TaskContext } from "./TaskProvider";
import Modal from "./Modal"; // Import the Modal component
import React, { useState, useContext } from "react";
import CategorySelectProvider from "./CategorySelectProvider";
import CategorySelect from "./CategorySelect";

function TaskCard({ task }) {
  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "#5F8955"; // Set background color to red for high priority
      case "medium":
        return "#A86320"; // Set background color to orange for medium priority
      case "low":
        return "#39753E"; // Set background color to green for low priority
      default:
        return "transparent"; // Default background color
    }
  };

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const { handlerMap } = useContext(TaskContext);

  const openModalDelete = () => setIsModalDeleteOpen(true);
  const closeModalDelete = useCallback(
    () => setIsModalDeleteOpen(false),
    [setIsModalDeleteOpen]
  );

  const openModalEdit = () => setIsModalEditOpen(true);
  const closeModalEdit = useCallback(
    () => setIsModalEditOpen(false),
    [setIsModalEditOpen]
  );

  const handleDeleteSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await handlerMap.handleDelete(task);
        closeModalDelete(); // close the modal after successful deletion
      } catch (error) {
        console.error(error);
      }
    },

    [handlerMap, closeModalDelete, task]
  );

  const handleEditSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        // Create an updated task object with the new values from the form
        const formData = new FormData(event.target);
        const updatedTask = {
          ...task,
          title: formData.get("title"),
          date: formData.get("date-time"),
          description: formData.get("description"),
          category_id: formData.get("category"),
          priority: formData.get("priority"),
        };
        // Call the handleUpdate function from the TaskContext
        await handlerMap.handleUpdate(updatedTask);
        // Close the modal after successful deletion
        closeModalEdit();
      } catch (error) {
        console.error(error);
      }
    },

    [handlerMap, closeModalEdit, task]
  );
  return (
    <div>
      <div className="task-card">
        <div>
          <div
            className="task-priority"
            style={{ "--priority-color": getPriorityColor() }}
          ></div>
          <div className="task-text">
            <p className="task-title">{task.title}</p>
            <p>{task.date}</p>
          </div>
        </div>

        <div>
          <div className="task-card-trashIco" onClick={openModalDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
          <div className="task-card-editIco" onClick={openModalEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div
            className="task-card-checkIco"
            onClick={handlerMap.handleComplete}
          >
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalDeleteOpen} closeModal={closeModalDelete}>
        <form onSubmit={handleDeleteSubmit} className="task-create-form">
          <button onClick={closeModalDelete}>Close</button>
          <button type="submit" variant="primary">
            Save
          </button>
        </form>
      </Modal>

      <Modal isOpen={isModalEditOpen} closeModal={closeModalEdit}>
        <form onSubmit={handleEditSubmit} className="task-create-form">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            defaultValue={task.title}
          />

          <CategorySelectProvider>
            <CategorySelect defaultValue={task.category} />
          </CategorySelectProvider>

          <input
            type="date"
            id="date-time"
            name="date-time"
            defaultValue={task.date}
          />

          <div className="task-create-form-priority">
            <input
              type="radio"
              id="priority"
              name="priority"
              value="high"
              defaultChecked={task.priority === "high"}
            />

            <input
              type="radio"
              id="priority"
              name="priority"
              value="medium"
              defaultChecked={task.priority === "medium"}
            />

            <input
              type="radio"
              id="priority"
              name="priority"
              value="low"
              defaultChecked={task.priority === "low"}
            />
          </div>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            defaultValue={task.description}
          />
          <button onClick={closeModalEdit}>Close</button>
          <button type="submit" variant="primary">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}
export default TaskCard;
