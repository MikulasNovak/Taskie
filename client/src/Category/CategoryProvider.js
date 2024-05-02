// CategorySelectProvider.js
import React, { createContext, useEffect, useState } from "react";

export const CategoryListContext = createContext();

function CategorySelectProvider({ children }) {
  const [CategoryLoadObject, setCategoryLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setCategoryLoadObject((current) => ({ ...current, state: "pending" }));
    try {
      const response = await fetch("http://localhost:8000/category/list");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const Categories = await response.json();
      setCategoryLoadObject({ state: "ready", data: Categories });
    } catch (error) {
      setCategoryLoadObject({ state: "error", error: error.message });
    }
  }

  const value = {
    state: CategoryLoadObject.state,
    categories: CategoryLoadObject.data || [],
  };

  return (
    <CategoryListContext.Provider value={value}>
      {children}
    </CategoryListContext.Provider>
  );
}

export default CategorySelectProvider;
