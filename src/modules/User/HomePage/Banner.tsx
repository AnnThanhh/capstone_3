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
      <Carousel autoplay arrows infinite={false} className="w-full">
        {data.map((item) => {
          return (
            <div key={item.maPhim} className="w-full h-[600px]">
              <img
                src={item.hinhAnh}
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
