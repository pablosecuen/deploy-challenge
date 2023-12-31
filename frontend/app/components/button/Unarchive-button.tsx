import React from "react";
interface UnArchiveButtonProps {
  onClick: () => void;
  color: "red" | "blue" | "green" | "purple";
}

const UnarchiveButton = ({ onClick, color }: UnArchiveButtonProps) => {
  const buttonColor = `bg-${color}-800  hover:to-${color}-600 border-${color}-500`;
  return (
    <button className={` ${buttonColor} custom-button bg-a`} onClick={onClick}>
      Unarchive
    </button>
  );
};

export default UnarchiveButton;
