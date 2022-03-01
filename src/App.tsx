import React from "react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";

function App(): React.ReactElement {
  return (
    <div style={{ backgroundColor: "#F5F6F7" }} className="h-screen font-sans">
      <div className="h-10" />
      <div className="w-4/6 mx-auto">
        <div className="rounded-3xl border-2 border-gray-200 h-20 bg-white flex flex-row items-center justify-between p-5">
          <p className="text-gray-400">Comment or type '/' for comments</p>
          <div className="text-gray-400 space-x-2 flex flex-row items-center content-center">
            <span>@</span>
            <span className="font-bold">B</span>
            <span className="italic font-serif">I</span>
            <span className="underline">U</span>
            <DotsHorizontalIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
