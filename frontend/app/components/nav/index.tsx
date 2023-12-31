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
    <nav className="md:absolute md:w-full  border rounded-3xl w-[360px] mx-auto  justify-evenly my-2 md:my-0  px-4 py-6 md:px-0 md:py-2 top-0  right-1/2 md:translate-x-1/2  text-black grid md:flex gap-2 ">
      <div className="flex justify-around  mdL:w-1/2">
        <input
          type="text"
          placeholder="Buscar por título"
          className="bg-transparent border rounded-full text-white/80 pl-2 placeholder:pl-2"
          value={searchValue}
          onChange={handleInputChange}
        />{" "}
        <SearchButton onClick={handleTitleSearch} color="green" />{" "}
      </div>
      <div className="flex justify-around  md:w-1/2">
        <SelectCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={handleCategoryChange}
        />
        <div className=" w-full flex  justify-end items-center md:pr-4">
          <Toogle handleToggle={handleToggle} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
