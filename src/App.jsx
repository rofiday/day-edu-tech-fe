import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import toast, { Toaster } from "react-hot-toast";
import TopNavigationBar from "./components/TopNavigationBar";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";
import PublicRoute from "./components/PublicRoute";
import ProtectedAuth from "./components/ProtectedAuth";
import ProtectedRole from "./components/ProtectedRole";
import FormLogin from "./pages/auth/FormLogin";
import FormRegister from "./pages/auth/FormRegister";
import LandingPage from "./pages/LandingPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import LayoutBar from "./components/LayoutBar";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import Loading from "./components/Loading";
import ResetPassword from "./pages/auth/ResetPassword";
import AdminCourses from "./pages/admin/AdminCourses";
import LMS from "./pages/student/LMS";
import AdminSection from "./pages/admin/AdminSections";
import AdminCurriculum from "./pages/admin/AdminCurriculum";
import CourseDetail from "./pages/CourseDetail";
import CartPage from "./pages/CartPage";
import MyOrderPage from "./pages/student/MyOrderPage";
import ProfilePage from "./pages/student/ProfilePage";
import AdminTransaction from "./pages/admin/AdminTransaction";
import { useComponentStore } from "./store/useComponentStore";
import MyCoursesPage from "./pages/student/MyCoursesPage";

const App = () => {
  const { checkUserLogin, roleName, isAuthenticated, isLoading } =
    useAuthStore();
  const { message, error } = useComponentStore();

  useEffect(() => {
    checkUserLogin();
  }, [checkUserLogin, isAuthenticated, roleName]);

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
    useComponentStore.setState({ message: null, error: null });
  }, [message, error]);

  const routes = [
    { path: "*", element: <NotFound /> },
    { path: "/logout", element: <Logout /> },
    { path: "/", element: <LandingPage /> },
    { path: "/course-detail/:id", element: <CourseDetail /> },
    { path: "/cart", element: <CartPage /> },
    { path: "/orders", element: <MyOrderPage /> },
    { path: "/profile", element: <ProfilePage /> },

    {
      //tidak bisa akses ketika login
      element: <PublicRoute />,
      children: [
        { path: "/login", element: <FormLogin /> },
        { path: "/register", element: <FormRegister /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/reset-password", element: <ResetPassword /> },
      ],
    },
    {
      path: "/",
      element: <ProtectedAuth />,
      children: [
        {
          element: <ProtectedRole />,
          target: "Admin",
          children: [
            {
              element: <LayoutBar />,
              children: [
                { path: "/admin", element: <AdminDashboard /> },
                { path: "/admin/users", element: <AdminUsers /> },
                {
                  path: "/admin/courses",
                  element: <AdminCourses />,
                },
                { path: "/admin/sections", element: <AdminSection /> },
                {
                  path: "/admin/curriculum",
                  element: <AdminCurriculum />,
                },
                { path: "/admin/transactions", element: <AdminTransaction /> },
              ],
            },
          ],
        },
        {
          element: <ProtectedRole />,
          target: "Mentor",
          children: [
            {
              element: <LayoutBar />,
              children: [{ path: "/mentor", element: <p>Halaman Mentor</p> }],
            },
          ],
        },
        {
          element: <ProtectedRole />,
          target: "Student",
          children: [
            { path: "/my-courses", element: <MyCoursesPage /> },
            {
              path: "/lms/:id",
              element: <LMS />,
            },
          ],
        },
      ],
    },
  ];

  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      if (!route.target || (route.target && route.target === roleName)) {
        return (
          <Route key={index} path={route.path} element={route.element}>
            {route.children && renderRoutes(route.children)}
          </Route>
        );
      }
      return null;
    });
  };

  const publicRoutes = ["/login", "/register", "/forget-password"];
  if (isLoading) return <Loading />;
  return (
    <div>
      {!isAuthenticated && !publicRoutes.includes(location.pathname) && (
        <TopNavigationBar />
      )}
      {isAuthenticated && <TopNavigationBar />}
      <Routes>{renderRoutes(routes)}</Routes>
      <Toaster position="top-center" duration={2000} />
    </div>
  );
};

export default App;
