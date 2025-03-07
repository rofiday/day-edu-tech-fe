import Modal from "react-modal";
import { useComponentStore } from "@/store/useComponentStore";
import { useTransactionStore } from "@/store/useTransactionStore";
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
Modal.setAppElement("#root");
const OrderModal = () => {
  const { isModalOpen } = useComponentStore();
  const { order } = useTransactionStore();

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center mb-5">
            <h3 className="text-2xl uppercase font-thin tracking-tighter">
              Detail Order
            </h3>
            <button
              className="text-4xl"
              onClick={() => useComponentStore.setState({ isModalOpen: false })}
            >
              &times;
            </button>
          </div>
          <div className="space-y-6">
            <div
              className="flex justify-between items-center mb-4"
              key={order.id}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Order ID: <span className="text-blue-600">{order.orderId}</span>
              </h3>
              <div className="flex items-center flex-col">
                <span
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-200 text-yellow-700"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {order?.data?.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-5 border border-gray-200 text-center"
              >
                {/* Order Details */}
                <div className="text-gray-700 space-y-2">
                  <img
                    src={
                      item.image
                        ? import.meta.env.VITE_API_URL + item.image
                        : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png"
                    }
                    alt="Product-Image"
                    width="300"
                    height="300"
                    className="rounded-sm object-cover mx-auto"
                    onError={(e) =>
                      (e.target.src =
                        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png")
                    }
                  />
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    <span className="text-green-600 font-semibold">
                      {item.name}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Total Price:</span>{" "}
                    <span className="text-green-600 font-semibold">
                      {item.price}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderModal;
