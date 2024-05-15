import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../../apis/movie";
import { Button, Card, Col, Row, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const { TabPane } = Tabs;

export default function DetailMovie() {
  const navigate = useNavigate();

  const [maPhim, setMaPhim] = useState();

  const { isLoading, data } = useQuery({
    queryKey: ["movie-detail", maPhim],
    queryFn: () => getMovieDetails(maPhim),
  });

  if (isLoading) return <p>Loading</p>;

  const date = new Date(data?.ngayKhoiChieu || "");
  const cinemaSystems = data?.heThongRapChieu || [];

  return (
    <div className="container">
      <Row gutter={16} justify="center" className="my-5">
        <Col xs={24} sm={12} md={8} lg={6}>
          <img
            src={data?.hinhAnh}
            className="w-100 rounded"
            style={{ objectFit: "cover" }}
            height={400}
            alt={data?.tenPhim}
          />
        </Col>
        <Col xs={24} sm={12} md={16} lg={18}>
          <div className="d-flex flex-column justify-content-between">
            <div>
              <h4 className="font-weight-bold">Tên phim: {data?.tenPhim}</h4>
              <p>Mô tả: {data?.moTa}</p>
              <p>Đánh giá: {data?.danhGia}</p>
              <p>Ngày khởi chiếu: {dayjs(date).format("DD/MM/YYYY")}</p>
            </div>
            <div style={{ width: 200 }}>
              <Button type="primary">Xem trailer</Button>
            </div>
          </div>
        </Col>
      </Row>

      <Tabs defaultActiveKey="BHDStar">
        {cinemaSystems.map((system) => (
          <TabPane
            key={system.maHeThongRap}
            tab={<img src={system.logo} style={{ width: 120, height: 120 }} />}
          >
            {system.cumRapChieu.map((item) => (
              <div key={item.maCumRap}>
                <h4>{item.tenCumRap}</h4>
                <Row gutter={16}>
                  {item.lichChieuPhim.map((lichChieu, index) => (
                    <Col key={index} span={6}>
                      <Button
                        type="primary"
                        onClick={() =>
                          navigate(`/booking/${lichChieu.maLichChieu}`)
                        }
                      >
                        {dayjs(lichChieu.ngayChieuGioChieu).format(
                          "DD/MM HH:mm"
                        )}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}
