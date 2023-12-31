import React from "react";

interface CancelButtonButton {
  onClick: () => void;
  color: 'red' | 'blue' | 'green' | 'purple';
}

function CancelButton({ onClick, color }: CancelButtonButton) {
  const buttonColor = `bg-${color}-800  hover:to-${color}-600 border-${color}-500`;
  return (
    <button className={` ${buttonColor} custom-button`} onClick={onClick}>
      Cancel
    </button>
  );
}

export default CancelButton;
