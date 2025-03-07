import logo from "@/assets/images/dayedutech.png";
import bgForm from "@/assets/images/bg-login.jpg";
import bgRegist from "@/assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, message, error } = useAuthStore();
  const [dataRegister, setDataRegister] = useState({
    username: "",
    fullname: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
    useAuthStore.setState({ message: null, error: null });
  }, [message, error]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (
        dataRegister.username === "" ||
        dataRegister.fullname === "" ||
        dataRegister.phoneNumber === "" ||
        dataRegister.email === "" ||
        dataRegister.password === ""
      ) {
        toast.error("please fill the form");
        return;
      }
      await register({
        username: dataRegister.username,
        fullname: dataRegister.fullname,
        phoneNumber: dataRegister.phoneNumber,
        email: dataRegister.email,
        password: dataRegister.password,
      });
      navigate("/login");
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${bgForm})` }}
    >
      <div className="flex  bg-white rounded-md">
        <div>
          <img
            src={bgRegist}
            alt=""
            className="w-[40rem] h-[40rem] rounded-md object-center object-cover  hidden lg:block"
          />
        </div>
        <div className="bg-white p-8 rounded-sm shadow-lg w-full max-w-md h-[40rem]">
          <img
            src={logo}
            alt="Logo"
            className="w-[500px] h-[20px] object-contain mx-auto"
          />
          <h3 className="text-center text-sm">Signin to your account</h3>
          <form onSubmit={handleRegister}>
            <div className="my-2">
              <label className="block text-sm font-medium " htmlFor="username">
                Username:
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full px-3 py-2 border rounded-lg"
                required
                value={dataRegister.username}
                onChange={(e) =>
                  setDataRegister({ ...dataRegister, username: e.target.value })
                }
              />
            </div>
            <div className="my-2">
              <label className="block text-sm font-medium " htmlFor="fullname">
                Fullname:
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Enter your fullname"
                className="w-full px-3 py-2 border rounded-lg"
                required
                value={dataRegister.fullname}
                onChange={(e) =>
                  setDataRegister({ ...dataRegister, fullname: e.target.value })
                }
              />
            </div>
            <div className="my-2">
              <label
                className="block text-sm font-medium "
                htmlFor="phoneNumber"
              >
                PhoneNumber:
              </label>
              <input
                type="text"
                id="phoneNumber"
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border rounded-lg"
                required
                value={dataRegister.phoneNumber}
                onChange={(e) =>
                  setDataRegister({
                    ...dataRegister,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-2">
              <div>
                <label htmlFor="email">Email: </label>
              </div>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg"
                required
                value={dataRegister.email}
                onChange={(e) =>
                  setDataRegister({ ...dataRegister, email: e.target.value })
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
                  value={dataRegister.password}
                  onChange={(e) =>
                    setDataRegister({
                      ...dataRegister,
                      password: e.target.value,
                    })
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
                  value={dataRegister.confirmPassword}
                  onChange={(e) =>
                    setDataRegister({
                      ...dataRegister,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
            >
              Register
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-sm">Already have an account? </span>
            <Link to="/Login" className="text-sm text-blue-600 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRegister;
