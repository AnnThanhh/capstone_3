import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { loginUser } from "../../../apis/user";
import { useAppDispatch } from "../../../redux/hooks";
import { setCurrentUser } from "../../../redux/slices/user.slice";

const schema = yup.object({
  taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
  matKhau: yup.string().required("Vui lòng nhập mật khẩu"),
});

interface FormValues {
  taiKhoan: string;
  matKhau: string;
}

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (payload: FormValues) => loginUser(payload),
    onSuccess: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setCurrentUser(user));
      if (user.maLoaiNguoiDung === "QuanTri") {
        navigate("/admin/user");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      console.log("onError", error);
    },
  });

  const onSubmit = (formValues: FormValues) => {
    handleLogin(formValues);
  };

  return (
    <div className="w-[400px] mx-auto">
      <div className="my-4 text-center">
        <Typography.Title level={3}>Đăng nhập</Typography.Title>
        <Typography>Hi, Chào mừng bạn quay lại 👋</Typography>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[48, 16]}>
          <Col span={24}>
            <Form.Item 
              label="*Tài khoản" 
              help={errors.taiKhoan?.message} 
              validateStatus={errors.taiKhoan ? "error" : ""}
            >
              <Input
                type="text"
                size="large"
                placeholder="Vui lòng nhập tài khoản..."
                {...register("taiKhoan")}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item 
              label="*Mật khẩu" 
              help={errors.matKhau?.message} 
              validateStatus={errors.matKhau ? "error" : ""}
            >
              <Input.Password
                size="large"
                placeholder="Vui lòng nhập mật khẩu..."
                {...register("matKhau")}
              />
            </Form.Item>
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
              Đăng nhập
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
