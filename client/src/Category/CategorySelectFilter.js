// CategoryList.js

import React, { useContext } from "react";
import { CategoryListContext } from "./CategoryProvider";
import { TaskContext } from "../Task/TaskProvider";
function CategorySelect() {
  const { categories } = useContext(CategoryListContext);
  const { handlerMap } = useContext(TaskContext);

  return (
    <div className="category-select">
      <select
        name="category"
        id="category"
        onChange={(e) => handlerMap.setFilters({ category_id: e.target.value })}
      >
        <option key="" value="">All</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelect;
