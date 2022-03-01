import React from "react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";

function App(): React.ReactElement {
  return (
    <div style={{ backgroundColor: "#F5F6F7" }} className="h-screen font-sans">
      <div className="h-10" />
      <SearchInput />
    </div>
  );
}

export default App;

function SearchInput() {
  return (
    <div className="w-4/6 mx-auto">
      <div className="flex flex-row items-center justify-between relative text-lg">
        <input
          type="text"
          className="placeholder:text-gray-400 focus:outline-none w-full h-20 bg-white rounded-3xl p-5 border-2 border-gray-200  focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
          placeholder="Comment or type '/' for comments"
        />
        <Actions />
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="text-gray-400 space-x-3 flex flex-row items-baseline content-center absolute right-5">
      <span>@</span>
      <span className="font-bold">B</span>
      <span className="italic font-serif">I</span>
      <span className="underline">U</span>
      <DotsHorizontalIcon className="h-6 w-6 self-center" />
    </div>
  );
}
