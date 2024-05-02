import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon
import { useCallback } from "react";
import { TaskContext } from "./TaskProvider";

import TaskDeleteModal from "./Modal/TaskDeleteModal";
import TaskEditModal from "./Modal/TaskEditModal";
import TaskDetailModal from "./Modal/TaskDetailModal";

import React, { useState, useContext } from "react";

function TaskCard({ task }) {
  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "#AB363B"; // Set background color to red for high priority
      case "medium":
        return "#A86320"; // Set background color to orange for medium priority
      case "low":
        return "#39753E"; // Set background color to green for low priority
      default:
        return "transparent"; // Default background color
    }
  };
  const getCardColor = () => {
    const taskDate = new Date(task.date);
    const now = new Date(); // get the current date and time

    if (taskDate < now && !task.completed) {
      return "#3F0000";
    } else {
      switch (task.completed) {
        case true:
          return "#5F8955"; // Set background color to red for high priority
        case false:
          return "#242424"; // Set background color to orange for medium priority
        default:
          return "#242424"; // Default background color
      }
    }
  };

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
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

  const openModalDetail = () => setIsModalDetailOpen(true);
  const closeModalDetail = useCallback(
    () => setIsModalDetailOpen(false),
    [setIsModalDetailOpen]
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
        console.log(updatedTask);
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
      <div
        className="task-card"
        style={{ "--complete-color": getCardColor() }}
        onClick={openModalDetail}
      >
        <div>
          {!task.completed && (
            <div
              className="task-priority"
              style={{ "--priority-color": getPriorityColor() }}
            ></div>
          )}

          <div className="task-text">
            <p className="task-title">{task.title}</p>
            <p>{task.date}</p>
          </div>
        </div>
        <div className="task-card-buttons">
          <div
            className="task-card-trashIco"
            onClick={(e) => {
              e.stopPropagation();
              openModalDelete();
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </div>
          <div
            className="task-card-editIco"
            onClick={(e) => {
              e.stopPropagation();
              openModalEdit();
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          {!task.completed && (
            <div
              className="task-card-checkIco"
              onClick={(e) => {
                e.stopPropagation();

                handlerMap.handleComplete(task);
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
        </div>
      </div>
      <TaskDeleteModal
        closeModal={closeModalDelete}
        handleSubmit={handleDeleteSubmit}
        isModalOpen={isModalDeleteOpen}
      />
      <TaskEditModal
        closeModal={closeModalEdit}
        handleSubmit={handleEditSubmit}
        isModalOpen={isModalEditOpen}
        taskValues={task}
      />

      <TaskDetailModal
        closeModal={closeModalDetail}
        isModalOpen={isModalDetailOpen}
        taskValues={task}
      />
    </div>
  );
}

export default TaskCard;
