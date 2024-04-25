import TaskList from "./TaskList";
import TaskListProvider from "./TaskListProvider";
import CategorySelectProvider from "./CategorySelectProvider";
import CategorySelect from "./CategorySelect";

function Main() {
  return (
    <main>
      <section>
        <CategorySelectProvider>
          <CategorySelect />
        </CategorySelectProvider>
      </section>
      <section>
        <div className="task-controls">
          <div>Add task</div>
          <div>Add task</div>
          <div>Add task</div>
        </div>
      </section>
      <section>
        <TaskListProvider>
          <TaskList />
        </TaskListProvider>
      </section>
    </main>
  );
}

export default Main;
