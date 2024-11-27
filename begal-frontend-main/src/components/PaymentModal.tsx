import { useState } from "react";

const PaymentModal = ({
  redirectUrl,
  closeModal,
}: {
  redirectUrl: string;
  closeModal: () => void;
}) => {
  return (
    <div className="fixed inset-0 h z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-transparent p-4 rounded-lg w-full max-w-[1000px] max-h-[1000px]">
        <div className="flex justify-end">
          <button onClick={closeModal} className="text-red-500">
            Close
          </button>
        </div>
        <iframe
          src={redirectUrl}
          className="w-full h-[1000px]"
          title="Midtrans Payment"
        ></iframe>
      </div>
    </div>
  );
};

export default PaymentModal;
