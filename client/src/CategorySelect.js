// CategoryList.js
import React, { useContext } from "react";
import { CategoryListContext } from "./CategorySelectProvider";

function CategoryList() {
  const { categories } = useContext(CategoryListContext);
  
  return (
    <div className="category-select">
      <select name="categories" id="categories">
        {categories.map((category) => (
          <option key={category.id} value={category.title}>
            {category.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryList;
