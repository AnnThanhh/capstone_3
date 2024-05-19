import { Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function Header() {
  const { currentUser } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logOut());
  };
  return (
    <div className="flex h-[92px] items-center justify-between px-4 container mx-auto">
      <NavLink
        className="font-semibold no-underline text-black text-[30px]"
        to=""
      >
        CGV Shopee
      </NavLink>
      <div className="flex items-center gap-4">
        <NavLink
          className="font-medium cursor-pointer no-underline text-black text-[25px]"
          to=""
        >
          Trang Chủ
        </NavLink>
        <NavLink
          className="font-medium cursor-pointer no-underline text-black text-[25px]"
          to="/danh-sach-phim"
        >
          Danh Sách Phim
        </NavLink>
        <NavLink
          className="font-medium cursor-pointer no-underline text-black text-[25px]"
          to="/lien-he"
        >
          Liên Hệ
        </NavLink>
        <NavLink
          className="font-medium cursor-pointer no-underline text-black text-[25px]"
          to="/thanh-vien"
        >
          Tin tức
        </NavLink>
      </div>
      {currentUser ? (
        <>
          <span>{currentUser.taiKhoan}</span>
          <Button onClick={handleLogout} type="primary">
            Đăng xuất
          </Button>
        </>
      ) : (
        <div className="flex items-center gap-3">
          <Button size="large" onClick={() => navigate("/auth/register")}>
            Đăng ký
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={() => navigate("/auth/login")}
          >
            Đăng nhập
          </Button>
        </div>
      )}
    </div>
  );
}
