import React from "react";

const Skeleton = () => {
  return (
    <div role="status" className="max-w-xl animate-pulse">
      <div className="px-4 py-5 bg-gray-200 rounded-2xl dark:bg-gray-700 animate-pulse w-full mb-2.5"></div>
      <div className="px-4 py-5 bg-gray-200 rounded-2xl dark:bg-gray-700 animate-pulse w-full mb-2.5"></div>
      <div className="px-4 py-5 bg-gray-200 rounded-2xl dark:bg-gray-700 animate-pulse w-full mb-2.5"></div>
      <div className="px-4 py-5 bg-gray-200 rounded-2xl dark:bg-gray-700 animate-pulse w-full mb-2.5"></div>
      <div className="px-4 py-5 bg-gray-200 rounded-2xl dark:bg-gray-700 animate-pulse w-full mb-2.5"></div>
      <div className="px-4 py-5 bg-gray-200 rounded-2xl dark:bg-gray-700 animate-pulse w-full mb-2.5"></div>
    </div>
  );
};

export default Skeleton;
