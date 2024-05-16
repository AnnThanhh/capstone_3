import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../../../apis/movie";
import { Button } from "antd";

export default function DetailMovie() {
  const navigate = useNavigate();
  const { maPhim } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["movie-detail", { maPhim }],
    queryFn: () => getMovieDetails(Number(maPhim)),
  });

  const [activeSystem, setActiveSystem] = useState("");

  useEffect(() => {
    if (data?.heThongRapChieu?.length) {
      setActiveSystem(data.heThongRapChieu[0].maHeThongRap);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

  const date = new Date(data?.ngayKhoiChieu || "");
  const cinemaSystems = data?.heThongRapChieu || [];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-center bg-white shadow-md rounded-lg p-6 mt-10">
        <div className="md:w-1/3">
          <img
            src={data?.hinhAnh}
            alt={data?.tenPhim}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">
            Tên phim: {data?.tenPhim}
          </h1>
          <p className="mt-4 text-gray-600">Mô tả: {data?.moTa}</p>
          <p className="mt-4 text-gray-600">Đánh giá: {data?.danhGia}</p>
          <div className="mt-4">
            <span className="font-semibold text-gray-700">
              Ngày khởi chiếu: {dayjs(date).format("DD/MM/YYYY")}
            </span>
            <div className="mt-2">
              <Button type="primary">Xem trailer</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around bg-white shadow-md rounded-lg p-6 mt-10">
        <div className="flex flex-col">
          {cinemaSystems.map((system) => (
            <button
              key={system.maHeThongRap}
              className={`rounded-full border-none p-2 m-2 ${
                activeSystem === system.maHeThongRap
                  ? "border-b-2 border-blue-500"
                  : ""
              }`}
              onClick={() => setActiveSystem(system.maHeThongRap)}
            >
              <img
                src={system.logo}
                alt={system.maHeThongRap}
                className="w-24 h-24"
              />
            </button>
          ))}
        </div>
        <div>
          {cinemaSystems.map(
            (system) =>
              system.maHeThongRap === activeSystem &&
              system.cumRapChieu.map((cumRap) => (
                <div key={cumRap.maCumRap} className="mt-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {cumRap.tenCumRap}
                  </h2>
                  <p className="mt-2 text-gray-600">{cumRap.diaChi}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {cumRap.lichChieuPhim.map((lichChieu) => (
                      <div
                        key={lichChieu.maLichChieu}
                        className="bg-white p-4 rounded-lg shadow-md"
                      >
                        <p className="text-gray-800">
                          {dayjs(lichChieu.ngayChieuGioChieu).format("HH:mm")}
                        </p>
                        <p className="text-gray-600">
                          Giá vé: {lichChieu.giaVe.toLocaleString()} VND
                        </p>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                          onClick={() =>
                            navigate(`/datve/${lichChieu.maLichChieu}`)
                          }
                        >
                          Đặt vé
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
