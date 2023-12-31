"use client";
import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { NoteItem } from "@/app/types/NoteItem";
import DetailsIcon from "@/public/assets/icons/DetailsIcon";
import EditIcon from "@/public/assets/icons/EditIcon";
import EraseIcon from "@/public/assets/icons/EraseIcon EraseIcon";
import { useNoteContext } from "@/app/context/NoteContext";
import ConfirmationModal from "@/app/modal/confirmation-modal";
import UnarchiveButton from "../button/Unarchive-button";
import ArchiveButton from "../button/Archive-button";
import DeleteButton from "../button/Delete-button";
import SaveButton from "../button/Save-button";
import CancelButton from "../button/Cancel-button";

interface NoteComponentProps {
  notes: NoteItem;
}

const Notes = ({ notes }: NoteComponentProps) => {
  const parent = useRef(null);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editedTitle, setEditedTitle] = useState<string>(notes.title);
  const [editedContent, setEditedContent] = useState<string>(notes.content);
  const [editedCategory, setEditedCategory] = useState<string>(
    notes.category !== null ? notes.category : "Select a category"
  );

  const noteId = notes.ID;

  const { updateNote, archiveNote, deleteNote } = useNoteContext();

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedCategory(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSaveChanges = () => {
    const body = {
      title: editedTitle,
      content: editedContent,
      category: editedCategory,
    };
    updateNote(noteId, body);
    setEditMode(false);
  };

  const handleArchive = () => {
    if (archiveNote) {
      archiveNote(noteId, true);
    }
  };

  const handleUnarchive = () => {
    if (archiveNote) {
      archiveNote(noteId, false);
    }
  };

  const handleDeleteNote = () => {
    setShowConfirmation(!showConfirmation);
  };

  const confirmDelete = () => {
    if (deleteNote) {
      deleteNote(noteId);
      setShowConfirmation(false);
    }
  };

  const closeModal = () => {
    setShowConfirmation(false);
  };

  return (
    <div ref={parent}>
      <div className=" px-4 py-2 flex justify-between items-center  border rounded-2xl w-[360px] mx-auto md:w-[600px]">
        <strong
          className="dropdown-label cursor-pointer justify-between font-semibold tracking-wider flex items-center gap-2 w-full"
          onClick={reveal}
        >
          <span className="text-center flex cursor-pointer hover:animate-pulse">{notes.title}</span>
          <span className="text-sm opacity-60 italic font-thin tracking-widest pr-4">
            {notes.category}
          </span>
        </strong>
        <div className="flex items-center gap-6">
          <span
            onClick={reveal}
            className="cursor-pointer hover:scale-125 hover:brightness-200 transition duration-300 mt-1"
            title="Expand Note"
          >
            <DetailsIcon />
          </span>
          <span
            className="cursor-pointer hover:scale-125 hover:brightness-200 transition duration-300"
            onClick={toggleEditMode}
            title="Edit Note"
          >
            <EditIcon />
          </span>
          <span
            title="Delete Note"
            className="cursor-pointer hover:scale-125 brightness-200 hover:brightness-100 transition duration-300"
            onClick={handleDeleteNote}
          >
            <EraseIcon />
          </span>
        </div>
      </div>
      {show && (
        <div className="transition-opacity p-4  border border-white/20 mt-2 rounded-lg shadow-sm shadow-white/40">
          {editMode ? (
            <div className="animate-fadein text-black">
              <div className="mb-2  animate-fadein flex gap-2">
                <div>
                  <label htmlFor="titleInput" className=" text-white font-semibold">
                    Title:
                  </label>
                  <input
                    id="titleInput"
                    className=" border border-gray-300 p-2 rounded-lg w-full"
                    value={editedTitle}
                    onChange={(e) => handleTitleChange(e)}
                  />
                </div>
                <div>
                  <label htmlFor="categoryInput" className=" text-white font-semibold">
                    Category:
                  </label>
                  <select
                    id="categoryInput"
                    className=" border border-gray-300 p-2 rounded-lg w-full"
                    value={editedCategory}
                    onChange={(e: any) => handleCategoryChange(e)}
                  >
                    <option value="">Select a category</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Important">Important</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
              <div className="mb-2 animate-fadein">
                <label htmlFor="contentInput" className="text-lg  text-white font-semibold">
                  Content:
                </label>
                <textarea
                  id="contentInput"
                  className="dropdown-content pt-4 border border-gray-300 p-2 rounded-lg w-full animate-fadein"
                  value={editedContent}
                  onChange={(e) => handleContentChange(e)}
                ></textarea>
              </div>
              <div className="flex justify-between items-center">
                {" "}
                <SaveButton onClick={handleSaveChanges} color="blue" />
                <CancelButton onClick={toggleEditMode} color="red" />
              </div>
            </div>
          ) : (
            <>
              <div className="animate-fadein">
                <div className="flex justify-between">
                  {" "}
                  <span className="text-xl animate-fadein">{notes.title} </span>
                  {notes.category && (
                    <span className="text-sm opacity-80 italic font-thin tracking-widest">
                      Category: {notes.category}
                    </span>
                  )}
                  {notes.archived ? (
                    <span className=" animate-fadein transition duration-300 px-2 py-1 rounded-3xl bg-red-800">
                      archived
                    </span>
                  ) : (
                    <span className=" animate-fadein  transition duration-300 px-2 py-1 rounded-3xl bg-green-800">
                      active
                    </span>
                  )}
                </div>

                <p className="dropdown-content pt-4 animate-fadein">{notes.content}</p>
              </div>
              <div className="flex justify-between mt-4">
                <DeleteButton onClick={handleDeleteNote} color="red" />
                {notes.archived === false && (
                  <ArchiveButton onClick={handleArchive} color="purple" />
                )}
                {notes.archived === true && (
                  <UnarchiveButton onClick={handleUnarchive} color="green" />
                )}
              </div>
            </>
          )}
        </div>
      )}
      <ConfirmationModal show={showConfirmation} onClose={closeModal} onConfirm={confirmDelete} />
    </div>
  );
};

export default Notes;
