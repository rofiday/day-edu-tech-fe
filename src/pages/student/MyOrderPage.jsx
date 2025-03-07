import Loading from "@/components/Loading";
import CancelOrderModal from "@/components/modals/CancelOrderModal";
import { useComponentStore } from "@/store/useComponentStore";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useEffect, useState } from "react";
const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
const snapUrl = import.meta.env.VITE_MIDTRANS_SNAP_URL;

const MyOrderPage = () => {
  const { getAllUserTransactions, transactions, totalRows, isLoading } =
    useTransactionStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  // State untuk menyimpan orderId yang dipilih

  useEffect(() => {
    const script = document.createElement("script");
    script.src = snapUrl;
    script.setAttribute("data-client-key", clientKey);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    useTransactionStore.setState({ offset: (currentPage - 1) * limit, limit });
    getAllUserTransactions();
  }, [currentPage, limit, getAllUserTransactions]);

  const totalPages = Math.ceil(totalRows / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    // Set orderId yang dipilih
    useComponentStore.setState({ isModalDeleteOpen: true });
  };

  const handleViewTransaction = async (token) => {
    try {
      if (token) {
        window.snap.pay(token, {
          onSuccess: (result) => {
            console.log(result);
          },
          onPending: (result) => {
            console.log(result);
          },
          onError: async () => {},
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto min-h-screen mt-20">
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h2>
        <div className="mb-4 flex justify-end">
          <label htmlFor="limit" className="mr-2 text-gray-600">
            Show:
          </label>
          <select
            className="border rounded p-1"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        {transactions.length === 0 ? (
          <p className="text-gray-600 text-center">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
              >
                <div className="flex flex-col text-center mb-5 md:flex-row md:items-center md:justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order ID:{" "}
                    <span className="text-blue-600">{transaction.orderId}</span>
                  </h3>
                  <div className="flex items-center flex-col">
                    <div className="flex items-center gap-2">
                      {transaction.status === "pending" && (
                        <span className="px-3 py-1 rounded-md text-sm font-medium bg-yellow-500 text-slate-900">
                          {transaction.status}
                        </span>
                      )}
                      {transaction.status === "paid" && (
                        <span className="px-3 py-1 rounded-md text-sm font-medium bg-green-600 text-slate-900">
                          {transaction.status}
                        </span>
                      )}
                      {transaction.status === "cancelled" && (
                        <span className="px-3 py-1 rounded-md text-sm font-medium bg-red-600 text-slate-900">
                          {transaction.status}
                        </span>
                      )}
                    </div>
                    <button
                      className="bg-blue-500 mt-2 py-1 px-2 rounded-md cursor-pointer text-white"
                      onClick={() => {
                        handleViewTransaction(transaction.token);
                      }}
                    >
                      view transaction
                    </button>
                  </div>
                </div>

                <div className="text-gray-700 space-y-2">
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {transaction.email}
                  </p>
                  <p>
                    <span className="font-medium">Total Price:</span>{" "}
                    <span className="text-green-600 font-semibold">
                      Rp {transaction.totalPrice.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Payment Status:</span>{" "}
                    {transaction.paymentStatus === "cancel" && (
                      <span className="px-3 py-1 rounded-md text-md font-medium text-red-600 ">
                        {transaction.paymentStatus}
                      </span>
                    )}
                    {transaction.paymentStatus === "pending" && (
                      <span className="px-3 py-1 rounded-md text-md font-medium text-yellow-500">
                        {transaction.paymentStatus}
                      </span>
                    )}
                    {transaction.paymentStatus === "settlement" && (
                      <span className="px-3 py-1 rounded-md text-md font-medium  text-green-600">
                        {transaction.paymentStatus}
                      </span>
                    )}
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-800 mb-2">
                    Items:
                  </h4>
                  <ul className="space-y-2">
                    {transaction.data.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center p-3 bg-gray-100 rounded-md"
                      >
                        <span>{item.name}</span>
                        <span className="font-medium">
                          {item.quantity}x Rp {item.price.toLocaleString()}
                        </span>
                      </li>
                    ))}
                    {transaction.status === "pending" && (
                      <div className="flex justify-end ">
                        <button
                          className="bg-red-500 py-1 px-2 rounded-md cursor-pointer text-white "
                          onClick={() => handleCancelOrder(transaction.orderId)}
                          // Teruskan orderId ke modal
                        >
                          cancel
                        </button>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-md ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-gray-800 border-gray-400 hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-not-allowed"
                  : "text-gray-800 border-gray-400 hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <CancelOrderModal orderId={selectedOrderId} />
      {/* Teruskan orderId ke modal */}
    </div>
  );
};

export default MyOrderPage;
