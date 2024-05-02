import Modal from "../../Modal"; // Import the Modal component
import CategoryProvider from "../../Category/CategoryProvider";
import CategorySelect from "../../Category/CategorySelect";

function TaskCreateModal({ isModalOpen, closeModal, handleSubmit}) {
  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <form onSubmit={handleSubmit} className="task-form">
        <div>
          <div>
            <input type="text" id="title" name="title" placeholder="Title" />
          </div>
          <CategoryProvider>
            <CategorySelect />
          </CategoryProvider>
          <div>
            <input type="date" id="date-time" name="date-time" />
          </div>
          <div className="task-form-priority">
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
  );
}

export default TaskCreateModal;
