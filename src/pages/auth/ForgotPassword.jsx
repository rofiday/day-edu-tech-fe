import { useAuthStore } from "@/store/useAuthStore";
import bgForm from "../../assets/images/bg-login.jpg";
import logo from "../../assets/images/dayedutech.png";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { forgotPassword, message, error } = useAuthStore();

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
    useAuthStore.setState({ message: null, error: null });
  }, [message, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${bgForm})` }}
    >
      <div className="flex justify-center items-center bg-white rounded-lg">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex justify-center">
            <img
              src={logo}
              alt="day-edu-tech"
              className="w-[500px] h-[20px] object-contain"
            />
          </div>
          <h2 className="text-sm font-semibold text-center text-slate-700 mb-4">
            Forgot your password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
