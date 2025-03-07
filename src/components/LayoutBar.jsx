import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const LayoutBar = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutBar;
