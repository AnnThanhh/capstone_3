import { useForm } from 'react-hook-form';
import { Row, Col, Input, Button, Typography, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../../apis/user';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

const schemaSignup = yup.object({
  taiKhoan: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .min(6, "Tài khoản ít nhất 6 ký tự")
    .max(8, "Tài khoản không vượt quá 8 ký tự"),
  matKhau: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Mật khẩu chưa chỉnh xác"
    ),
  email: yup.string().required("Vui lòng nhập thông tin"),
  hoTen: yup.string().required("Vui lòng nhập thông tin"),
  soDt: yup.string().required("Vui lòng nhập thông tin"),
});

export default function RegisterPage() {
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      hoTen: "",
    },
    resolver: yupResolver(schemaSignup),
    criteriaMode: "all",
  });

  const { mutate: handleRegister } = useMutation({
    mutationFn: (payload: any) => registerUser(payload),
    onSuccess: () => {
      message.success('Tạo tài khoản thành công!');
      reset();
      navigate('/auth/login');
    },
    onError: (error) => {
      message.error(`Đã có lỗi xảy ra: ${error.message}`);
    },
  });

  const onSubmit = (data: any) => {
    handleRegister(data);
  };
  
  return (
    <div className="w-[400px]">
      <div className="my-4 text-center">
        <Typography.Title level={3}>Tạo tài khoản</Typography.Title>
        <Typography className="mt-2 text-center">
          Bạn đã có tài khoản?{' '}
          <span className="text-blue-700 font-medium cursor-pointer" onClick={() => navigate('/auth/login')}>
            Đăng nhập
          </span>
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[48, 16]}>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Tài khoản</label>
            <Input
              {...register('taiKhoan')}
              type="text"
              size="large"
              className="mt-1"
              placeholder="Vui lòng nhập tài khoản..."
            />
            {errors.taiKhoan && (
              <small className="text-danger text-red-500">{errors.taiKhoan.message}</small>
            )}
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Mật khẩu</label>
            <Input.Password
              {...register('matKhau')}
              size="large"
              className="mt-1"
              placeholder="Vui lòng nhập mật khẩu..."
            />
            {errors.matKhau && (
              <small className="text-danger text-red-500">{errors.matKhau.message}</small>
            )}
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Họ tên</label>
            <Input
              {...register('hoTen')}
              type="text"
              size="large"
              className="mt-1"
              placeholder="Nguyễn Văn A"
            />
            {errors.hoTen && (
              <small className="text-danger text-red-500">{errors.hoTen.message}</small>
            )}
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Địa chỉ email</label>
            <Input
              {...register('email')}
              type="email"
              size="large"
              className="mt-1"
              placeholder="xyz@gmail.com"
            />
            {errors.email && (
              <small className="text-danger text-red-500">{errors.email.message}</small>
            )}
          </Col>
          <Col span={24}>
            <label className="text-xs text-[#6A7280]">*Số điện thoại</label>
            <Input
              {...register('soDt')}
              type="text"
              size="large"
              className="mt-1"
              placeholder="09888999**"
            />
            {errors.soDt && (
              <small className="text-danger text-red-500">{errors.soDt.message}</small>
            )}
          </Col>
          <Col span={24}>
            <Button type="primary" size="large" disabled={isSubmitting} block htmlType="submit">
              Tạo tài khoản
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}
