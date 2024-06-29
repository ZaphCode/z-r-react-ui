import { FC } from "react";
import CloseIcon from "./icons/CloseIcon";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  closeFn: () => void;
  side: "left" | "right";
}

const SidePanel: FC<Props> = ({ children, closeFn, isOpen, side }) => {
  return (
    <div
      className={`
        fixed z-10 inset-0 flex ${
          side === "left" ? "justify-start" : "justify-end"
        }
        items-center transition-all duration-500 ${
          isOpen ? "bg-black/20 visible" : "bg-transparent invisible"
        }
      `}
    >
      <div
        className={`
          bg-white max-h-full overflow-y-auto shadow p-6 transition-transform duration-500 h-full
          ${
            isOpen
              ? "translate-x-0"
              : side === "left"
              ? "-translate-x-full"
              : "translate-x-full"
          }
        `}
      >
        <button
          onClick={closeFn}
          className={`
            absolute top-2 ${side === "left" ? "right-2" : "left-2"} p-1 
            rounded-full text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600
          `}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default SidePanel;
