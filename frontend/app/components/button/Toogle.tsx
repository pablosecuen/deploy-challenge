import React, { ChangeEvent } from "react";

interface ToogleProps {
  handleToggle: (isChecked: boolean) => void;
}

const Toogle: React.FC<ToogleProps> = ({ handleToggle }) => {
  const onToggle = (e: ChangeEvent<HTMLInputElement>) => {
    handleToggle(e.target.checked);
  };

  return (
    <label className="relative animate-fadein flex gap-2 justify-evenly items-center cursor-pointer ">
      <input type="checkbox" value="" className="sr-only peer" onChange={onToggle} />
      <div className="w-11 h-6 scale-150 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="ms-3  font-medium text-gray-900 dark:text-gray-300">Archived</span>
    </label>
  );
};

export default Toogle;
