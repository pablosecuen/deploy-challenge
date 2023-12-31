// NotesContainer.tsx
import React, { useEffect, useState } from "react";

import { NoteItem } from "@/app/types/NoteItem";
import Navbar from "../nav";
import { useFilterContext } from "@/app/context/FilterContext";
import AddNote from "../button/Add-note";
import { useNoteContext } from "@/app/context/NoteContext";
import NoteCard from "../card/note-card";
import AddNoteModal from "@/app/modal/modal-addnote";
import { Toaster } from "sonner";

interface NotesContainerProps {
  notes: NoteItem[];
}

const NotesContainer: React.FC<NotesContainerProps> = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { notes, createNote } = useNoteContext();

  const {
    setTitleFilter,
    setCategoryFilter,
    setShowArchived,
    titleFilter,
    categoryFilter,
    showArchived,
    filteredNotes,
    applyFilters,
  } = useFilterContext();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setContent("");
    setCategory("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    } else if (name === "category") {
      setCategory(value);
    }
  };

  const handleSaveNote = async () => {
    const newNote: any = {
      title: title,
      content: content,
      category: category,
    };
    await createNote(newNote);
    setIsModalOpen(false);
    setTitle("");
    setContent("");
    setCategory("");
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleFilter, categoryFilter, showArchived]);

  return (
    <div className="max-w-2xl   md:w-full min-h-[50vh] md:border-2 md:px-10 md:pt-20 border-white/40 rounded-3xl overflow-y-hidden relative md:overflow-x-hidden">
      <Toaster />
      <Navbar
        handleTitleFilter={(value) => setTitleFilter(value)}
        handleCategoryFilter={(value) => setCategoryFilter(value)}
        handleToggle={(isChecked) => setShowArchived(isChecked)}
      />
      <NoteCard
        titleFilter={titleFilter}
        categoryFilter={categoryFilter}
        showArchived={showArchived}
        filteredNotes={filteredNotes}
      />
      <AddNote openModal={openModal} color="blue" />
      <AddNoteModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        title={title}
        content={content}
        category={category}
        handleChange={handleChange}
        handleSaveNote={handleSaveNote}
      />
    </div>
  );
};

export default NotesContainer;
