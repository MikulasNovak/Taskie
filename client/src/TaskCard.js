import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon

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

  return (
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
        <div className="task-card-trashIco">
          <FontAwesomeIcon icon={faTrashCan} />
        </div>
        <div className="task-card-editIco">
          <FontAwesomeIcon icon={faPenToSquare} />
        </div>
        <div className="task-card-checkIco">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      </div>
    </div>
  );
}
export default TaskCard;
