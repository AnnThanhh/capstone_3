import { getBannerMovieApi } from "../../../apis/movie";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "antd";

export default function Banner() {
  const { isLoading, data = [] } = useQuery({
    queryKey: ["banner"],
    queryFn: getBannerMovieApi,
  });

  if (isLoading) return <p>Loading</p>;

  return (
    <div>
      <Carousel autoplay arrows infinite={false}>
        {data.map((item) => {
          return (
            <div key={item.maPhim}>
              <img
                src={item.hinhAnh}
                className="w-full h-[600px] object-contain"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
