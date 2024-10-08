import React, { ReactNode } from "react";

interface CustomModalProps {
  children: ReactNode;
  onClose: () => void;
  isOpen: () => void;
}

function CustomModal({ children, onClose, isOpen }: CustomModalProps) {
  return (
    <div
      className={`fixed inset-0 bg-black/40 z-50 flex justify-center items-center transition-opacity duration-300}`}
      onClick={onClose}
    >
      {children}
    </div>
  );
}

export default CustomModal;
