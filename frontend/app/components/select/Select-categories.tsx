import React, { ChangeEvent } from "react";

interface SelectCategorias {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

const SelectCategories = ({ categories, selectedCategory, onChange }: SelectCategorias) => {
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={selectedCategory}
      className="bg-transparent border rounded-full text-white/80 pl-2"
      onChange={handleCategoryChange}
    >
      <option value="" className="bg-black border rounded-full text-white/80 pl-2">
        All Categories
      </option>
      {categories.map((category, index) => (
        <option
          className="bg-black border rounded-full text-white/80 pl-2"
          key={index}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>
  );
};

export default SelectCategories;
