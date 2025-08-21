import React from "react";
import { createPortal } from "react-dom";

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <p className="mb-6 text-gray-700">{message}</p>
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmModal;
