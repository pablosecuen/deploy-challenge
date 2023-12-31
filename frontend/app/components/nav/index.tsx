"use client";
import React, { ChangeEvent, useState } from "react";
import Toogle from "../button/Toogle";
import { useFilterContext } from "@/app/context/FilterContext";
import SelectCategories from "../select/Select-categories";
import SearchButton from "../button/Searh-button";

interface NavbarProps {
  handleTitleFilter: (value: string) => void;
  handleCategoryFilter: (value: string) => void;
  handleToggle: (isChecked: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleToggle }) => {
  const { setTitleFilter, setCategoryFilter, applyFilters } = useFilterContext();
  const categories: string[] = ["Personal", "Work", "Important", "Others"];
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleTitleSearch = () => {
    setTitleFilter(searchValue);
    applyFilters();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCategoryFilter(category);
    applyFilters();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      setTitleFilter("");
      applyFilters();
    }
  };

  return (
    <nav className="absolute border rounded-2xl justify-evenly  px-4 py-2 top-0 w-full right-1/2 translate-x-1/2 text-black grid grid-cols-4 gap-2 ">
      <input
        type="text"
        placeholder="Buscar por título"
        className="bg-transparent border rounded-full text-white/80 pl-2"
        value={searchValue}
        onChange={handleInputChange}
      />{" "}
      <SearchButton onClick={handleTitleSearch} color="blue" />{" "}
      <SelectCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={handleCategoryChange}
      />
      <div className=" flex justify-center items-center">
        <Toogle handleToggle={handleToggle} />
      </div>
    </nav>
  );
};

export default Navbar;
