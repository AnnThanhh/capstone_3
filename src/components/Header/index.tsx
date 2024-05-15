import { Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex h-[92px] items-center justify-between px-4 container mx-auto">
      <NavLink className="font-semibold no-underline text-black text-[30px]" to="">
        CGV Shopee
      </NavLink>
      <div className="flex items-center gap-4">
        <NavLink className="font-medium cursor-pointer no-underline text-black text-[25px]" to="">
          Trang Chủ
        </NavLink>
        <NavLink className="font-medium cursor-pointer no-underline text-black text-[25px]" to="/danh-sach-phim">
          Danh Sách Phim
        </NavLink>
        <NavLink className="font-medium cursor-pointer no-underline text-black text-[25px]" to="/lien-he">
          Liên Hệ
        </NavLink>
        <NavLink className="font-medium cursor-pointer no-underline text-black text-[25px]" to="/thanh-vien">
          Tin tức
        </NavLink>
      </div>
      <div className="flex items-center gap-3">
        <Button size="large">Đăng ký</Button>
        <Button
          size="large"
          type="primary"
          onClick={() => navigate("/auth/login")}
        >
          Đăng nhập
        </Button>
      </div>
    </div>
  );
}
