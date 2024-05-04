import Modal from "../../Modal"; // Import the Modal component
import CategoryProvider from "../../Category/CategoryProvider";
import CategorySelect from "../../Category/CategorySelect";

function TaskCreateModal({ isModalOpen, closeModal, handleSubmit }) {
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
              required
            />
          </div>
          <CategoryProvider>
            <CategorySelect />
          </CategoryProvider>
          <div>
            <input type="date" id="date-time" name="date-time" required />
          </div>
          <div className="task-form-priority">
            <input
              type="radio"
              id="priority"
              name="priority"
              value="high"
              required
            ></input>
            <input
              type="radio"
              id="priority"
              name="priority"
              value="medium"
              required
            ></input>
            <input
              type="radio"
              id="priority"
              name="priority"
              value="low"
              required
            ></input>
          </div>
        </div>

        <div>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
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

export default TaskCreateModal;
