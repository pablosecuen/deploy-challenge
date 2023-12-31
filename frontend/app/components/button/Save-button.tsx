import React from "react";

interface SaveButtonProps {
  onClick: () => void;
  color: 'red' | 'blue' | 'green' | 'purple';
}

function SaveButton({ onClick, color }: SaveButtonProps) {
  const buttonColor = `bg-${color}-800  hover:to-${color}-600 border-${color}-500`;
  return (
    <button className={` ${buttonColor} custom-button`} onClick={onClick}>
      Save
    </button>
  );
}

export default SaveButton;
