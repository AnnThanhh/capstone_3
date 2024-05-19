import api from "./apiUtil";

export const registerUser = async (payload: {
  taiKhoan: string;
  matKhau: string;
}) => {
  try {
    const response = await api.post("/QuanLyNguoiDung/DangNhap", payload);
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const loginUser = async (payload: {
  taiKhoan: string;
  matKhau: string;
}) => {
  try {
    const response = await api.post("/QuanLyNguoiDung/DangNhap", payload);
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};
