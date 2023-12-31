"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { NoteItem } from "../types/NoteItem";
import { useNoteContext } from "./NoteContext";

interface FilterContextProps {
  titleFilter: string;
  categoryFilter: string;
  showArchived: boolean;
  setTitleFilter: React.Dispatch<React.SetStateAction<string>>;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  setShowArchived: React.Dispatch<React.SetStateAction<boolean>>;
  applyFilters: () => Promise<void>;
  filteredNotes: NoteItem[];
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterContextProvider");
  }
  return context;
};

export const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { notes } = useNoteContext();
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [filteredNotes, setFilteredNotes] = useState<NoteItem[]>([]);

  console.log(filteredNotes);
  const applyFilters = useCallback(async () => {
    try {
      const queryParams = [];

      if (titleFilter) {
        queryParams.push(`title=${encodeURIComponent(titleFilter)}`);
      }

      if (categoryFilter) {
        queryParams.push(`category=${encodeURIComponent(categoryFilter)}`);
      }

      const queryString = queryParams.join("&");
      const response = await fetch(`http://localhost:3000/notes?${queryString}`);
      const { notes } = await response.json();

      let filteredNotes = [];
      if (showArchived === false) {
        filteredNotes = notes.filter((note: NoteItem) => note.archived === false);
      } else {
        filteredNotes = notes.filter((note: NoteItem) => note.archived === true);
      }

      setFilteredNotes(filteredNotes);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  }, [titleFilter, categoryFilter, showArchived]);

  useEffect(() => {
    applyFilters();
  }, [notes, applyFilters]);

  return (
    <FilterContext.Provider
      value={{
        titleFilter,
        categoryFilter,
        showArchived,
        setTitleFilter,
        setCategoryFilter,
        setShowArchived,
        applyFilters,
        filteredNotes,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
