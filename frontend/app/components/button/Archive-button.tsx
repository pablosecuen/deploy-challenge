import React from "react";
interface ArchiveButtonProps {
  onClick: () => void;
  color: "red" | "blue" | "green" | "purple";
}

const ArchiveButton = ({ onClick, color }: ArchiveButtonProps) => {
  const buttonColor = `bg-${color}-800  hover:to-${color}-600 border-${color}-500`;
  return (
    <button className={` ${buttonColor} custom-button`} onClick={onClick}>
      Archive
    </button>
  );
};

export default ArchiveButton;
