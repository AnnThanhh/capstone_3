import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getListMovieSeat } from "../../../apis/movie";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

export default function BookingMovie() {
  const { maLichChieu } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["dat-ve", { maLichChieu }],
    queryFn: () => getListMovieSeat(Number(maLichChieu)),
  });

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSeatSelection = (seat) => {
    const index = selectedSeats.findIndex((selectedSeat) => selectedSeat.maGhe === seat.maGhe);
    if (index === -1) {
      setSelectedSeats([...selectedSeats, seat]);
      setTotalPrice(totalPrice + seat.giaVe);
    } else {
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(index, 1);
      setSelectedSeats(updatedSeats);
      setTotalPrice(totalPrice - seat.giaVe);
    }
  };

  const renderListSeats = () => {
    if (isLoading) return <p><Spin size="large" /></p>;

    const seatsPerRow = 10;
    const rows = Math.ceil(data?.danhSachGhe.length / seatsPerRow);

    return Array.from({ length: rows }).map((_, rowIndex) => {
      const rowSeats = data?.danhSachGhe.slice(
        rowIndex * seatsPerRow,
        (rowIndex + 1) * seatsPerRow
      );
      return (
        <div
          key={rowIndex}
          className="flex items-center justify-center space-x-4 mb-4"
        >
          {rowSeats.map((seat) => (
            <button
              key={seat.maGhe}
              className={`ghe ${
                seat.daDat
                  ? "bg-red-500"
                  : selectedSeats.find(selectedSeat => selectedSeat.maGhe === seat.maGhe)
                  ? "bg-yellow-500 selected"
                  : "bg-green-500"
              } px-3 py-2 rounded-lg`}
              disabled={seat.daDat}
              onClick={() => handleSeatSelection(seat)}
            ></button>
          ))}
        </div>
      );
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex justify-center items-center"
      style={{ backgroundImage: `url('${data?.thongTinPhim.hinhAnh}')` }}
    >
      <div className=" bg-opacity-70 flex flex-row">
        <div className="flex flex-col items-start justify-center w-1/3 p-4">
          <h2 className="text-orange mb-4">
            Vui lòng điền thông tin phía dưới
          </h2>
          <form className="mb-4">
            <div className="flex items-center mb-4">
              <div className="text-white mr-4">
                <label htmlFor="exampleInputName">Tên *</label>
                <input
                  type="text"
                  className="form-control border border-white rounded-md p-2 ml-2"
                  id="exampleInputName"
                  aria-describedby="nameHelp"
                />
              </div>
              <div className="text-white">
                <label htmlFor="exampleInputNumber">Số lượng ghế đã chọn</label>
                <input
                  type="text"
                  className="form-control border border-white rounded-md p-2 ml-2"
                  id="exampleInputNumber"
                  value={selectedSeats.length}
                  readOnly
                />
              </div>
            </div>
          </form>
          <div className="text-white mb-4">
            <h3 className="text-xl mb-2">Selected Seats</h3>
            <table className="table-auto border-collapse border border-white">
              <thead>
                <tr>
                  <th className="border border-white px-4 py-2">Seat Number</th>
                  <th className="border border-white px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedSeats.map((seat, index) => (
                  <tr key={index}>
                    <td className="border border-white px-4 py-2">
                      {seat.maGhe}
                    </td>
                    <td className="border border-white px-4 py-2">
                      {seat.giaVe}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="mt-4">Total Price: {totalPrice} đ</h3>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-2/3 p-4">
          <h1 className="text-white text-[45px] mb-4">Screen</h1>
          <div className="m-3 flex items-center">
            <button className="gheDangChon bg-yellow-500 px-3 py-2 rounded-lg m-1"></button>
            <span className="text-white text-xl mx-2">Selected Seat</span>
            <button className="gheDuocChon bg-red-500 px-3 py-2 rounded-lg m-1"></button>
            <span className="text-white text-xl mx-2">Reserved Seat</span>
            <button className="ghe bg-green-500 px-3 py-2 rounded-lg m-1"></button>
            <span className="text-white text-xl mx-2">Empty Seat</span>
          </div>
          {renderListSeats()}
        </div>
      </div>
    </div>
  );
}
