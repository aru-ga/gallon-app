import { useEffect } from "react";

const PaymentModal = ({
  redirectUrl,
  closeModal,
}: {
  redirectUrl: string;
  closeModal: () => void;
}) => {
  useEffect(() => {
    const handlePaymentStatus = (event: MessageEvent) => {
      if (event.origin.includes("midtrans")) {
        const { status_code, transaction_status } = event.data || {};

        if (status_code === "200" && transaction_status === "settlement") {
          console.log("Payment Success:", event.data);
          closeModal(); // Close the modal on successful payment
        } else if (transaction_status === "pending") {
          console.log("Payment Pending:", event.data);
        } else if (
          transaction_status === "cancel" ||
          transaction_status === "deny"
        ) {
          console.warn("Payment Cancelled or Denied:", event.data);
          closeModal(); // Optionally close the modal on cancel/deny
        }
      }
    };

    window.addEventListener("message", handlePaymentStatus);

    return () => {
      window.removeEventListener("message", handlePaymentStatus);
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
          sandbox="allow-scripts allow-same-origin allow-forms"
        ></iframe>
      </div>
    </div>
  );
};

export default PaymentModal;
