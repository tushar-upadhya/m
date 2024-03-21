"use client";

import { useRef } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const NewStory = () => {
  const handleContentEditableREF = useRef<HTMLDivElement | null>(null);

  return (
    <main
      id="container"
      className="max-w-[800px] mx-auto relative font-mono mt-5"
    >
      <div
        id="editable"
        ref={handleContentEditableREF}
        contentEditable
        suppressContentEditableWarning
        className="outline-none focus:outline-none editable max-w-[800px]"
      ></div>
      <div className="z-10">
        <Button
          id="tooltip"
          className="border-[1px] border-neutral-500 p-1 rounded-full inline-block"
        >
          <Plus />
        </Button>
      </div>
    </main>
  );
};

export default NewStory;
