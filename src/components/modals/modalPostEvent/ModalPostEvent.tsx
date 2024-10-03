import React from "react";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const ModalPostEvent: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold">{message}</h2>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        ></button>
      </div>
    </div>
  );
};

export default ModalPostEvent;