import Modal from "../../Modal"; // Import the Modal component
import CategoryProvider from "../../Category/CategoryProvider";
import CategorySelect from "../../Category/CategorySelect";

function TaskEditModal({ isModalOpen, closeModal, taskValues }) {
  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <form className="task-form">
        <div>
          <div>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              defaultValue={taskValues.title}
              disabled
            />
          </div>
          <CategoryProvider>
            <CategorySelect defaultValue={taskValues.category_id} />
          </CategoryProvider>
          <div>
            <input
              type="date"
              id="date-time"
              name="date-time"
              defaultValue={taskValues.date}
              disabled
            />
          </div>
          <div className="task-form-priority">
            <input
              type="radio"
              id="priority"
              name="priority"
              value="high"
              defaultChecked={taskValues.priority === "high"}
              disabled
            ></input>
            <input
              type="radio"
              id="priority"
              name="priority"
              value="medium"
              defaultChecked={taskValues.priority === "medium"}
              disabled
            ></input>
            <input
              type="radio"
              id="priority"
              name="priority"
              value="low"
              defaultChecked={taskValues.priority === "low"}
              disabled
            ></input>
          </div>
        </div>

        <div>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            defaultValue={taskValues.description}
            disabled
          />
        </div>

        <div>
          <button onClick={closeModal}>Close</button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskEditModal;
