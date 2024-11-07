import React from 'react';

const Modal = ({ message, onCancel, onConfirm, actions }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <p>{message}</p>
        <div className="mt-4 flex justify-between">
          {actions.map((action, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
