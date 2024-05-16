import { PAGE_SIZE } from "../constants";
import {
  Banner,
  CurrentUser,
  DanhSachThongTinPhim,
  DataMovieListPagination,
  Movie,
} from "../types/movie.type";
import { ResponseApi } from "../types/util";
import api from "./apiUtil";

export const getBannerMovieApi = async () => {
  try {
    const response = await api.get<ResponseApi<Banner[]>>(
      "/QuanLyPhim/LayDanhSachBanner"
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getListMovieHome = async () => {
  try {
    const response = await api.get<ResponseApi<Movie[]>>(
      "/QuanLyPhim/LayDanhSachPhim"
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getMovieDetails = async (maPhim: number) => {
  try {
    const response = await api.get<ResponseApi<Movie>>(
      `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const loginUser = async (userLogin: {
  taiKhoan: string;
  matKhau: string;
}) => {
  try {
    const response = await api.post<ResponseApi<CurrentUser>>(
      "/QuanLyNguoiDung/DangNhap",
      userLogin
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const registerUser = async (userRegister: {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  matKhau: string;
  maNhom: string;
}) => {
  try {
    const response = await api.post("/QuanLyNguoiDung/DangKy", userRegister);
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const getListMovieSeat = async (maLichChieu: number) => {
  try {
    const response = await api.get<ResponseApi<DanhSachThongTinPhim>>(
      `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};

export const addMovieApi = async (payload: FormData) => {
  try {
    const response = await api.post("/QuanLyPhim/ThemPhimUploadHinh", payload);
    return response.data.content;
  } catch (error) {
    throw "Lỗi rồi";
  }
};

export const getListMovieApi = async (currentPage: number) => {
  try {
    const response = await api.get<ResponseApi<DataMovieListPagination>>(
      `/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${currentPage}&soPhanTuTrenTrang=${PAGE_SIZE}`
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};
