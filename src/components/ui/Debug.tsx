import { useState } from "react";

const Debug = () => {
  const className = `
        h-1 border-none 
        bg-blue-500
        sm:bg-green-400 
        md:bg-purple-500 
        lg:bg-red-500 
        xl:bg-red-900 
    `;

  const [display, setDisplay] = useState(true);

  return (
    <div
      className={`${className} ${display ? "block" : "hidden"}`}
      onClick={() => setDisplay(!display)}
    >
      <></>
    </div>
  );
};

export default Debug;
