import { ReactNode } from "react";

const Modal = ({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <>
      {" "}
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <div className="relative bg-slate-800 w-[350px] h-[250px] p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="text-center">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
