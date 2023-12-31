import React from "react";

interface DeleteButtonButton {
  onClick: () => void;
  color: 'red' | 'blue' | 'green' | 'purple';
}

function DeleteButton({ onClick, color }: DeleteButtonButton) {
  const buttonColor = `bg-${color}-800  hover:to-${color}-600 border-${color}-500`;
  return (
    <button className={` ${buttonColor} custom-button`} onClick={onClick}>
      Delete
    </button>
  );
}

export default DeleteButton;
