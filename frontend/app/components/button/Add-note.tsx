import React from "react";

interface AddNoteButton {
  openModal: () => void;
  color: "red" | "blue" | "green" | "purple";
}

function AddNote({ openModal, color }: AddNoteButton) {
  const buttonColor = `bg-${color}-800  hover:to-${color}-600 border-${color}-500`;
  return (
    <div className="w-full flex justify-center py-10">
      <button className={` ${buttonColor} custom-button`} onClick={openModal}>
        Add Note
      </button>
    </div>
  );
}

export default AddNote;
