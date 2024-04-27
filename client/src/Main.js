import TaskList from "./TaskList";
import TaskProvider from "./TaskProvider";
import CategorySelectProvider from "./CategorySelectProvider";
import CategorySelect from "./CategorySelect";
import TaskControls from "./TaskControls";

function Main() {
  return (
    <TaskProvider>
      <main>
        <section>
          <CategorySelectProvider>
            <CategorySelect />
          </CategorySelectProvider>
        </section>
        <section>
          <TaskControls />
        </section>
        <section>
          <TaskList />
        </section>
      </main>
    </TaskProvider>
  );
}

export default Main;
