"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Plus, Image, MoreHorizontal, CodeIcon, Code } from "lucide-react";
import { Input } from "./ui/input";

const NewStory = () => {
  const handleContentEditableREF = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [openTools, setOpenTools] = useState<boolean>(false);

  const handleInsertDivider = () => {};
  const handleInsertCodeBlock = () => {};
  const handleInsertImageComp = () => {};
  const handleFileInputChange = () => {};

  return (
    <main
      id="container"
      className="max-w-[800px] mx-auto relative font-mono mt-8"
    >
      {/* <p className='absolute -top-[72px] opacity-30'>{saving ? "saving...":"saved"}</p> */}
      <div
        id="editable"
        ref={handleContentEditableREF}
        contentEditable
        suppressContentEditableWarning
        className="outline-none focus:outline-none editable max-w-[800px] prose"
        style={{ whiteSpace: "pre-line" }}
      >
        {/* { Storycontent ? (
                <div dangerouslySetInnerHTML={{__html:Storycontent}}></div>
        ):( */}
        <div>
          <h1
            className="font-medium"
            data-h1-placeholder="New Story Title"
          ></h1>
          <p data-p-placeholder="Write your story ..."></p>
        </div>
        {/* )} */}
      </div>
      {/* <div className={`z-10 ${buttonPosition.top === 0 ? "hidden" :""}`} style={{position:'absolute', top:buttonPosition.top, left:buttonPosition.left}}> */}
      <button
        onClick={() => setOpenTools(!openTools)}
        id="tooltip"
        className="border-[1px] border-neutral-500 p-1 rounded-full inline-block"
      >
        <Plus
          className={`duration-300 ease-linear ${openTools ? "rotate-90" : ""}`}
        />
      </button>
      <div
        id="tool"
        className={`flex items-center space-x-4 absolute top-0 left-14  ${
          openTools ? "visible" : "invisible"
        }`}
      >
        <span
          onClick={handleInsertImageComp}
          className={`border-[1.5px] border-green-500 rounded-full block p-[6px] ${
            openTools ? "scale-100 visible" : "scale-0 invisible"
          } ease-linear duration-100 bg-white cursor-pointer`}
        >
          <Image size={20} className="opacity-60 text-green-800 " />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileInputChange}
          />
        </span>
        <span
          onClick={handleInsertDivider}
          className={`border-[1.5px] border-green-500 rounded-full block p-[6px] ${
            openTools ? "scale-100 visible" : "scale-0 invisible"
          } ease-linear duration-100 delay-75 bg-white cursor-pointer`}
        >
          <MoreHorizontal size={20} className="opacity-60 text-green-800 " />
        </span>
        <span
          onClick={handleInsertCodeBlock}
          className={`border-[1.5px] border-green-500 rounded-full block p-[6px] ${
            openTools ? "scale-100 visible" : "scale-0 invisible"
          } ease-linear duration-100 delay-100 bg-white cursor-pointer`}
        >
          <Code size={20} className="opacity-60 text-green-800 " />
        </span>
      </div>
      {/* </div> */}
    </main>
  );
};

export default NewStory;
