import {
  FaSignOutAlt,
  FaSignInAlt,
  FaUser,
  FaConfluence,
  FaChalkboardTeacher,
  FaShoppingCart,
} from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import logo from "../assets/images/dayedutech.png";
import { useState, useEffect, useRef } from "react";
import { useCourseStore } from "@/store/useCourseStore";

const TopNavigationBar = () => {
  const navigate = useNavigate();
  const { carts, getAllCourseFromCart } = useCourseStore();
  const { logout, isAuthenticated, username, roleName } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      getAllCourseFromCart();
    }
  }, [getAllCourseFromCart, isAuthenticated]);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-md bg-white px-6 py-3 flex justify-between items-center">
      <Link to="/">
        <img src={logo} alt="" className="w-[150px]" />
      </Link>

      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div className="flex items-center gap-5">
          {roleName === "Student" && !location.pathname.startsWith("/lms") && (
            <div className="relative">
              <FaShoppingCart
                className="text-2xl"
                onClick={() => navigate("/cart")}
              />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {carts.length}
              </span>
            </div>
          )}
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={handleClick}
          >
            <FaUser /> {username}
          </button>
        </div>
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <FaUser className="mr-2" /> Profile
                  </button>
                  {roleName === "Admin" && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <FaConfluence className="mr-2" /> Admin
                    </button>
                  )}
                  {roleName === "Student" && (
                    <>
                      <button
                        onClick={() => navigate("/my-courses")}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <FaChalkboardTeacher className="mr-2" /> My Courses
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => navigate("/orders")}
                      >
                        <BsCashCoin className="mr-2" /> My Orders
                      </button>
                    </>
                  )}
                  <button
                    onClick={async () => {
                      await logout();
                      navigate("/logout");
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <FaSignInAlt className="mr-2" /> Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNavigationBar;
