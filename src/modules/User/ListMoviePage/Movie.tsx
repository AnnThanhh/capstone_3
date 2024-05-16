import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getListMovieHome } from "../../../apis/movie";
import { Button, Card, Col, Row } from "antd";

export default function MovieComponent() {
  const navigate = useNavigate();
  const { isLoading, data = [] } = useQuery({
    queryKey: ["listMovie"],
    queryFn: getListMovieHome,
  });

  if (isLoading) return <p>Loading</p>;
  return (
    <div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-5 gap-8">
    {data.map((item) => (
      <div key={item.maPhim} className="col-span-1">
        <Card
          hoverable
          style={{ width: 240 }}
          className="marginBottom"
          cover={<img alt="" src={item.hinhAnh} />}
        >
          <h3 className="py-2">{item.tenPhim}</h3>
          <Button
            type="primary"
            onClick={() => navigate(`/chi-tiet/${item.maPhim}`)}
          >
            Chi tiết
          </Button>
        </Card>
      </div>
    ))}
  </div>
</div>

  );
}
