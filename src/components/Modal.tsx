import { FC } from "react";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  closeFn: () => void;
}

const Modal: FC<Props> = ({ children, closeFn, isOpen }) => {
  return (
    <div
      onClick={closeFn}
      className={`
            fixed inset-0 flex justify-center items-center transition-colors
            ${isOpen ? "visible bg-black/10" : "invisible"}
          `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
              bg-white rounded-xl shadow p-6 transition-all
              ${isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}
      >
        <button
          onClick={closeFn}
          className={`
					      absolute top-2 right-2 p-1 rounded-lg text-gray-400 
                bg-white hover:bg-gray-50 hover:text-gray-600
              `}
        >
          x {/* Or whatever icon */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
