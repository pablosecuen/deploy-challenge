//eslint-disable
// Modal.tsx
import React, { useEffect, useRef } from "react";
import SaveButton from "../components/button/Save-button";
import CancelButton from "../components/button/Cancel-button";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  title: string;
  category?: string;
  content: string;
  handleChange: any;
  handleSaveNote: () => void;
}
const categories: string[] = ["Personal", "Work", "Important", "Others"];
const AddNoteModal: React.FC<ModalProps> = ({
  isModalOpen,
  closeModal,
  title,
  content,
  category,
  handleChange,
  handleSaveNote,
}) => {
  return (
    <>
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-filter backdrop-blur-md bg-transparent"
            onClick={closeModal}
          ></div>
          <div className="fixed right-1/2 translate-x-1/2 top-1/2 z-50 -translate-y-1/2 w-80 md:w-96 h-auto text-white backdrop-blur-2xl bg-white/10 flex flex-col justify-center gap-4 p-4 rounded-2xl animate-fadein">
            <span className="text-center font-bold uppercase tracking-widest">
              Add your new note
            </span>
            <div className="flex flex-col">
              <label htmlFor="title">Title: {title}</label>
              <input
                id="title"
                type="text"
                name="title"
                value={title}
                className="text-black pl-2"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <select
                id="category"
                name="category"
                value={category}
                className="bg-transparent border  text-white/80 pl-2 h-10"
                onChange={handleChange}
              >
                <option value="" className="bg-black border rounded-full text-white/80 pl-2">
                  Choose a category...
                </option>
                <option
                  className="bg-black border rounded-full text-white/80 pl-2"
                  value={category}
                >
                  Remove category
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
            </div>

            <div className="flex flex-col">
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={handleChange}
                className="pl-2 text-black"
              ></textarea>
            </div>
            <div className="flex w-full justify-evenly">
              <SaveButton onClick={handleSaveNote} color="blue" />

              <CancelButton onClick={closeModal} color="red" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddNoteModal;
