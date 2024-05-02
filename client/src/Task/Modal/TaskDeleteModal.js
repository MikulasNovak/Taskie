import Modal from "../../Modal"; // Import the Modal component
function TaskDeleteModal({ isModalOpen, closeModal, handleSubmit }) {
  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <form onSubmit={handleSubmit} className="task-delete-form">
        <p>Are you sure you want to delete task?</p>
        <div>
          <button className="task-delete-form-cancel" onClick={closeModal}>
            Close
          </button>
          <button
            className="task-delete-form-submit"
            type="submit"
            variant="primary"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskDeleteModal;
