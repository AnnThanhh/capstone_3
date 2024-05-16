export type Banner = {
  maBanner: number;
  maPhim: number;
  hinhAnh: string;
};

export interface DataMovieListPagination {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: Movie[];
}

export interface Movie {
  heThongRapChieu: HeThongRapChieu[];
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: Date;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface HeThongRapChieu {
  cumRapChieu: CumRapChieu[];
  maHeThongRap: string;
  tenHeThongRap: string;
  logo: string;
}

export interface CumRapChieu {
  lichChieuPhim: LichChieuPhim[];
  maCumRap: string;
  tenCumRap: string;
  hinhAnh: string;
  diaChi: string;
}

export interface LichChieuPhim {
  maLichChieu: string;
  maRap: string;
  tenRap: string;
  ngayChieuGioChieu: Date;
  giaVe: number;
  thoiLuong: number;
}

export type CurrentUser = {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
  accessToken: string;
};

export interface DanhSachThongTinPhim {
  thongTinPhim: ThongTinPhim;
  danhSachGhe: DanhSachGhe[];
}

export interface DanhSachGhe {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: LoaiGhe;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: null | string;
}

export enum LoaiGhe {
  Thuong = "Thuong",
  Vip = "Vip",
}

export interface ThongTinPhim {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
}
