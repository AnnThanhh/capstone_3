import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faInvision } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap justify-around">
        <div className="w-full lg:w-1/4 md:w-1/2 mb-4 px-4">
          <h2 className=" font-semibold text-black">Thông Tin Liên Hệ</h2>
          <div className="mt-4 text-black text-[20px]">
            <p>
              Địa chỉ: 123 Đường 123 Phường 123 Quận 123, Thành phố Hồ Chí Minh.
            </p>
            <p>
              Điện thoại:
              <a
                className="text-black no-underline"
                href="tel:+1(21) 234 4567"
              >
                {" "}
                +1(21) 234 4567
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                className="text-black no-underline hover:text-black"
                href="mailto:info@example.com"
              >
                info@example.com
              </a>
            </p>
            <p>
              Hỗ trợ:{" "}
              <a
                className="text-black no-underline hover:text-black"
                href="mailto:info@support.com"
              >
                info@support.com
              </a>
            </p>
          </div>
          <div className="flex mt-4 space-x-4 text-black text-[30px]">
            <a href="#" className="text-black no-underline">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="text-black no-underline">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="text-black no-underline">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="text-black no-underline">
              <FontAwesomeIcon icon={faInvision} />
            </a>
          </div>
        </div>
        <div className="w-full lg:w-1/4 md:w-1/2 mb-4 px-4">
          <h2 className="font-semibold text-black">Danh Mục</h2>
          <ul className="mt-4 text-black text-[20px] list-none">
            <li className="mb-2">
              <a className="text-black no-underline" href="#">
                Trang Chủ
              </a>
            </li>
            <li className="mb-2">
              <a className="text-black no-underline" href="#">
                Liên Hệ
              </a>
            </li>
            <li className="mb-2">
              <a className="text-black no-underline" href="#">
                Tin tức
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
