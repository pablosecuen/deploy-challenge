import React from "react";

interface SearchButtonProps {
  onClick: () => void;
  color: 'red' | 'blue' | 'green' | 'purple';
}

function SearchButton({ onClick, color }: SearchButtonProps) {
  const buttonColor = `bg-${color}-800  hover:to-${color}-600 border-${color}-500`;
  return (
    <button className={` ${buttonColor} custom-button`} onClick={onClick}>
      Search
    </button>
  );
}

export default SearchButton;
