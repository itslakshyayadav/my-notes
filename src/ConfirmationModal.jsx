import { useState } from "react";
import { HiExclamationCircle } from "react-icons/hi2";
import BaseModal from "./BaseModal";

function ConfirmationModal({ children, modalText, onProceed }) {
  const [isOpen, setIsOpen] = useState(false);

  // variant danger, info

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div onClick={openModal}>{children} </div>
      {isOpen && (
        <BaseModal>
          <div className="px-4   sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <HiExclamationCircle className="h-6 w-6 text-red-600 flex"></HiExclamationCircle>
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {modalText ? modalText : "Are you sure to proceed"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-4 py-3 sm:flex sm:flex-row sm:px-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-3 py-1 bg-slate-300 hover:bg-slate-400 rounded-md text-black"
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white"
                type="button"
                onClick={(event) => {
                  onProceed(event);
                  closeModal();
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </BaseModal>
      )}
    </>
  );
}
export default ConfirmationModal;
