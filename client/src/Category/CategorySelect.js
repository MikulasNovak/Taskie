// CategoryList.js
import React, { useContext } from "react";
import { CategoryListContext } from "./CategoryProvider";

function CategorySelect() {
  const { categories } = useContext(CategoryListContext);

  return (
    <div className="category-select">
      <select name="category" id="category">
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
