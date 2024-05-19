import { Navigate, Outlet, useRoutes } from "react-router-dom";
import HomePage from "../modules/User/HomePage";
import UserLayout from "../layouts/UserLayout";
import NotFound from "../modules/NotFound";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../modules/Auth/LoginPage";
import RegisterPage from "../modules/Auth/RegisterPage";
import AdminLayout from "../layouts/AdminLayout";
import UserManagement from "../modules/Admin/UserManagement";
import MovieManagement from "../modules/Admin/MovieManagement";
import CinemaManagement from "../modules/Admin/CinemaManagement";
import AccountSettings from "../modules/Admin/AccountSettings";
import MovieComponent from "../modules/User/ListMoviePage/Movie";
import DetailMovie from "../modules/User/MovieDetails";
import BookingMovie from "../modules/User/MovieDetails/booking";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to={"/auth/login"} />;
};

const RejectedRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return currentUser === null ? <Outlet /> : <Navigate to={"/"} />;
};

const ProtectedAdminRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user);

  return currentUser && currentUser?.maLoaiNguoiDung === "QuanTri" ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/login"} />
  );
};

const useRouteElement = () => {
  const element = useRoutes([
    {
      path: "",
      element: <UserLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/chi-tiet/:maPhim",
          element: <DetailMovie />,
        },
        {
          path: "/danh-sach-phim",
          element: <MovieComponent />,
        },
        {
          path: "/datve/:maLichChieu",
          element: <BookingMovie />,
        },
      ],
    },
    {
      path: "/auth",
      element: <RejectedRoute />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "/auth/login",
              element: <LoginPage />,
            },
            {
              path: "/auth/register",
              element: <RegisterPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/user",
          element: <UserManagement />,
        },
        {
          path: "/admin/movie",
          element: <MovieManagement />,
        },
        {
          path: "/admin/cinema",
          element: <CinemaManagement />,
        },
        {
          path: "/admin/account-settings",
          element: <AccountSettings />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return element;
};
export default useRouteElement;
