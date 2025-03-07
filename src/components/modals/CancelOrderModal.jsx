import Modal from "react-modal";
import { useComponentStore } from "@/store/useComponentStore";
import { useTransactionStore } from "@/store/useTransactionStore";
import toast from "react-hot-toast";

const CancelOrderModal = ({ orderId }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "80%",
      maxWidth: "600px",
      maxHeight: "80vh",
      overflowY: "auto",
      zIndex: 1000,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  const { isModalDeleteOpen } = useComponentStore();
  const { cancelTransaction, getAllUserTransactions } = useTransactionStore();

  const handleCancelOrder = async () => {
    try {
      await cancelTransaction(orderId); // Batalkan transaksi
      toast.success("Order cancelled successfully");
      useComponentStore.setState({ isModalDeleteOpen: false }); // Tutup modal
      getAllUserTransactions(); // Perbarui daftar transaksi
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to cancel order");
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalDeleteOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="w-full flex flex-col">
          <div className="flex flex-row justify-between items-center mb-5">
            <h3 className="text-2xl uppercase font-thin tracking-tighter">
              Delete
            </h3>
            <button
              onClick={() =>
                useComponentStore.setState({ isModalDeleteOpen: false })
              }
              className="text-4xl"
            >
              &times;
            </button>
          </div>
          <h1 className="text-center font-bold text-2xl">
            Are you sure you want to delete ?
          </h1>
          <div className="flex justify-center items-center gap-5 my-10">
            <button
              className="bg-red-500 px-2 py-1 text-white text-md"
              onClick={() =>
                useComponentStore.setState({ isModalDeleteOpen: false })
              }
            >
              No
            </button>
            <button
              className="bg-green-500 py-1 px-2 cursor-pointer text-white"
              onClick={handleCancelOrder} // Panggil handleCancelOrder
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CancelOrderModal;
