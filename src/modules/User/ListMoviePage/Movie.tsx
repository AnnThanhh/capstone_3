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
    <div className="container mx-auto py-8">
      <Row justify="center" gutter={16}>
        {data.map((item) => {
          return (
            <Col span={8} key={item.maPhim}>
              <Card
                hoverable
                style={{ width: 240 }}
                className="marginBottom"
                cover={<img alt="" src={item.hinhAnh} />}
              >
                <h4 className="py-2">{item.tenPhim}</h4>
                <Button
                  type="primary"
                  onClick={() => navigate(`/chi-tiet/${item.maPhim}`)}
                >
                  Chi tiết
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
