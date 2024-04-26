import TaskList from "./TaskList";
import TaskListProvider from "./TaskListProvider";
import TaskProvider from "./TaskProvider";
import CategorySelectProvider from "./CategorySelectProvider";
import CategorySelect from "./CategorySelect";
import TaskControls from "./TaskControls";

function Main() {
  return (
    <main>
      <section>
        <CategorySelectProvider>
          <CategorySelect />
        </CategorySelectProvider>
      </section>
      <section>
        <TaskProvider>
          <TaskControls />
        </TaskProvider>
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
