"use client";

import { useRef } from "react";

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
      >
        vfvdsv
      </div>
    </main>
  );
};

export default NewStory;
