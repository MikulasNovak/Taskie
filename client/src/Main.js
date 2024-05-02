import TaskList from "./Task/TaskList";
import TaskProvider from "./Task/TaskProvider";
import CategoryProvider from "./Category/CategoryProvider";
//import CategorySelect from "./Category/CategorySelect";
import CategorySelectFilter from "./Category/CategorySelectFilter";
import TaskControls from "./Task/TaskControls";

function Main() {
  return (
    <TaskProvider>
      <CategoryProvider>
        <main>
          <section>
            <CategorySelectFilter />
          </section>
          <section>
            <TaskControls />
          </section>
          <section>
            <TaskList />
          </section>
        </main>
      </CategoryProvider>
    </TaskProvider>
  );
}

export default Main;
