import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Input, Row, Typography, Spin } from "antd";
import { loginUser } from "../../../apis/movie";

const schema = yup.object({
  taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
  matKhau: yup.string().required("Vui lòng nhập mật khẩu"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<any>({
    defaultValues: { taiKhoan: "", matKhau: "" },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const { mutate: handleLogin, isPending } = useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data));
      if (data.maLoaiNguoiDung === "QuanTri") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      await handleLogin(formData);
    } catch (error) {
      // Xử lý lỗi từ server
      console.error("Đăng nhập thất bại:", error);
      // Hiển thị thông báo lỗi từ giao diện
    }
  };

  return (
    <div className="w-[400px] mx-auto">
      <div className="my-4 text-center">
        <Typography className="font-bold text-3xl">Đăng nhập</Typography>
        <Typography className="mt-2">Hi, Chào mừng bạn quay lại 👋</Typography>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 16]}>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Tài khoản</label>
            <Input
              type="text"
              size="large"
              className="mt-1"
              placeholder="Vui lòng nhập tài khoản..."
              {...register("taiKhoan")}
            />
            {formState.errors.taiKhoan && (
              <small className="text-danger">{formState.errors.taiKhoan.message}</small>
            )}
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Mật khẩu</label>
            <Input.Password
              size="large"
              className="mt-1"
              placeholder="Vui lòng nhập mật khẩu..."
              {...register("matKhau")}
            />
            {formState.errors.matKhau && (
              <small className="text-danger">{formState.errors.matKhau.message}</small>
            )}
          </Col>

          <Col span={24}>
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              disabled={isPending}
              loading={isPending}
            >
              {isPending ? <Spin /> : "Đăng nhập"}
            </Button>
          </Col>
        </Row>
      </Form>

      <Typography className="mt-8 text-center">
        Chưa có tài khoản?{" "}
        <span
          className="text-blue-700 font-medium cursor-pointer"
          onClick={() => navigate("/auth/register")}
        >
          Tạo tài khoản
        </span>
      </Typography>
    </div>
  );
}
