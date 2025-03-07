import { useCourseStore } from "@/store/useCourseStore";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
const snapUrl = import.meta.env.VITE_MIDTRANS_SNAP_URL;
import { useSearchParams } from "react-router-dom";
const CartPage = () => {
  const { carts, deleteCourseFromCart, message, error, updateUserCart } =
    useCourseStore();
  const {
    token,
    createSnapTransaction,
    deleteSnapTransaction,
    checkSnapTransaction,
    deleteCartIfCheckout,
  } = useTransactionStore();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  useEffect(() => {
    if (orderId) {
      console.log("orderId", orderId);
      checkSnapTransaction(orderId);
    }
  }, [orderId, checkSnapTransaction]);
  useEffect(() => {
    updateUserCart();
  }, [updateUserCart]);
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
    if (token) {
      window.snap.pay(token, {
        onSuccess: async (result) => {
          console.log(result);
          useCourseStore.setState({ carts: [] });
        },
        onPending: async (result) => {
          console.log(result);
          useCourseStore.setState({ carts: [] });
        },
        onError: async () => {},

        onClose: async () => {
          await deleteSnapTransaction();
          useTransactionStore.setState({ token: null });
        },
      });
    }
  }, [token, deleteCartIfCheckout, deleteSnapTransaction]);
  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
    useCourseStore.setState({ message: null, error: null });
  }, [message, error]);
  const handleDelete = async (id) => {
    try {
      await deleteCourseFromCart(id);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCheckout = async () => {
    try {
      await createSnapTransaction();
    } catch (error) {
      console.error(error.message);
    }
  };

  const totalPrice = carts.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen mt-20">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Cart</h2>
      {carts.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {carts.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4"
            >
              <img
                src={import.meta.env.VITE_API_URL + item.urlImage}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-blue-600 font-bold">
                  Rp {item.price.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                <FaTrash size={20} />
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-bold text-gray-800">
              Total: Rp {totalPrice.toLocaleString()}
            </h3>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
