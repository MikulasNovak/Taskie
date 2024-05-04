import Modal from "../../Modal"; // Import the Modal component
import CategoryProvider from "../../Category/CategoryProvider";
import CategorySelect from "../../Category/CategorySelect";

function TaskEditModal({ isModalOpen, closeModal, handleSubmit, taskValues }) {
  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <form onSubmit={handleSubmit} className="task-form">
        <div>
          <div>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              defaultValue={taskValues.title}
              required
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
              required
            />
          </div>
          <div className="task-form-priority">
            <input
              type="radio"
              id="priority"
              name="priority"
              value="high"
              defaultChecked={taskValues.priority === "high"}
              required
            ></input>
            <input
              type="radio"
              id="priority"
              name="priority"
              value="medium"
              defaultChecked={taskValues.priority === "medium"}
              required
            ></input>
            <input
              type="radio"
              id="priority"
              name="priority"
              value="low"
              defaultChecked={taskValues.priority === "low"}
              required
            ></input>
          </div>
        </div>

        <div>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            defaultValue={taskValues.description}
            required
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
  );
}

export default TaskEditModal;
