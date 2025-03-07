import logo from "@/assets/images/dayedutech.png";
import bgForm from "@/assets/images/bg-login.jpg";
import bgRegis from "@/assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "@/services/provider.google.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormLogin = () => {
  const { loginWithGoogle, login, token, isLoading, message, error } =
    useAuthStore();
  const navigate = useNavigate();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginAuthGoogle = async () => {
    try {
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      await loginWithGoogle({ idToken });
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
    useAuthStore.setState({ message: null, error: null });
  }, [message, error]);

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token) {
      const { username, roleName } = jwtDecode(token);
      useAuthStore.setState({ isAuthenticated: true });
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("username", username);
      localStorage.setItem("roleName", roleName);
      navigate("/");
    }
  }, [navigate, token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(dataLogin);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

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
            Sign in to your account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
                value={dataLogin.email}
                onChange={(e) =>
                  setDataLogin({ ...dataLogin, email: e.target.value })
                }
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                  value={dataLogin.password}
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-5 text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <input
                  type="checkbox"
                  className="mr-2 text-gray-700"
                  name="remember"
                />
                <label htmlFor="remember" className="text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-indigo-600 text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Sign in
            </button>
          </form>
          <h3 className="text-sm my-4 text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register Now
            </Link>
          </h3>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">Or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="flex gap-4">
            <button
              className="flex-1 flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100 transition"
              onClick={loginAuthGoogle}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google
            </button>
          </div>
        </div>
        <img
          src={bgRegis}
          alt="bg-register"
          className="w-[40rem] h-[32rem] rounded-md object-center object-cover hidden lg:block"
        />
      </div>
    </div>
  );
};

export default FormLogin;
