import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaChalkboardTeacher,
  FaCashRegister,
  FaUser,
  FaWeightHanging,
  FaChartBar,
  FaBook,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Menutup sidebar setelah navigasi
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-44 z-50  text-black p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-50 text-blue-800 font-bold transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-xl font-bold text-center py-4 border-b border-gray-700">
          Dashboard
        </h2>
        <ul className="mt-4 ">
          <li
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-white cursor-pointer ${
              location.pathname === "/admin" ? "bg-blue-700 text-white" : ""
            }`}
            onClick={() => handleNavigation("/admin")}
          >
            <FaChalkboardTeacher className="mr-2" /> Dashboard
          </li>
          <li
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-white cursor-pointer ${
              location.pathname === "/admin/users"
                ? "bg-blue-700 text-white"
                : ""
            }`}
            onClick={() => handleNavigation("/admin/users")}
          >
            <FaUser className="mr-2" /> Users
          </li>
          <li
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-white cursor-pointer ${
              location.pathname === "/admin/courses"
                ? "bg-blue-700 text-white"
                : ""
            }`}
            onClick={() => handleNavigation("/admin/courses")}
          >
            <FaBook className="mr-2" />
            Courses
          </li>
          <li
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-white cursor-pointer ${
              location.pathname === "/admin/sections"
                ? "bg-blue-700 text-white"
                : ""
            }`}
            onClick={() => handleNavigation("admin/sections")}
          >
            <FaWeightHanging className="mr-2" />
            Section
          </li>
          <li
            className={` flex items-center p-4 hover:bg-gray-700 hover:text-white cursor-pointer ${
              location.pathname === "/admin/curriculum"
                ? "bg-blue-700 text-white"
                : ""
            }`}
            onClick={() => handleNavigation("/admin/curriculum")}
          >
            <FaChartBar className="mr-2" />
            Curriculum
          </li>
          <li
            className={`flex items-center p-4 hover:bg-gray-700 hover:text-white cursor-pointer ${
              location.pathname === "/admin/transactions"
                ? "bg-blue-700 text-white"
                : ""
            }`}
            onClick={() => handleNavigation("/admin/transactions")}
          >
            <FaCashRegister className="mr-2" /> Transaction
          </li>
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
