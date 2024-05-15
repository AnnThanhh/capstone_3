import { useForm } from 'react-hook-form';
import { Row, Col, Input, Button, Typography, message } from 'antd';
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { registerUser } from '../../../apis/movie';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  taiKhoan: yup.string().required("Vui lòng nhập tài khoản"),
  matKhau: yup.string().required("Vui lòng nhập mật khẩu"),
  hoTen: yup.string().required("Vui lòng nhập Họ Tên"),
  email: yup.string().required("Vui lòng nhập email"),
  soDt: yup.string().required("Vui lòng nhập số điện thoại"),
});

const queryClient = new QueryClient();

export default function RegisterPage() {
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: { taiKhoan: "", matKhau: "", hoTen: "",email: "",soDt: ""  },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const {mutate: handleRegister, isPending} = useMutation({
    mutationFn: (formValues: FormData) => registerUser(formValues),
    onSuccess: () => {
      message.success('Tạo tài khoản thành công!');
      reset(); 
      navigate("/auth/login")
    },
    onError: (error) => {
      message.error(`Đã có lỗi xảy ra: ${error.message}`);
    }
  });

  const onSubmit = (formValues: any) => {
    const formData = new FormData();
    formData.append("taiKhoan", formValues.taiKhoan);
    formData.append("matKhau", formValues.matKhau);
    formData.append("hoTen", formValues.hoTen);
    formData.append("moTa", formValues.moTa);
    formData.append("email", formValues.email);
    formData.append("soDt", formValues.soDt);
    handleRegister(formData);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-[400px]">
        <div className="my-4 text-center">
          <Typography className="font-bold text-3xl">Tạo tài khoản</Typography>
          <Typography className="mt-2 text-center">
            Bạn đã có tài khoản?{' '}
            <span className="text-blue-700 font-medium cursor-pointer">
              Đăng nhập
            </span>
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[48, 16]}>
            <Col span={24}>
              <label className="text-xs text-[#6A7280]">*Tài khoản</label>
              <Input
                {...register('taiKhoan', { required: true })}
                type="text"
                size="large"
                className="mt-1"
                placeholder="Vui lòng nhập tài khoản..."
              />
              {formState.errors.taiKhoan?.message && (
            <small className="text-danger">
              {formState.errors.taiKhoan?.message as any}
            </small>
          )}
            </Col>
            <Col span={24}>
              <label className="text-xs text-[#6A7280]">*Mật khẩu</label>
              <Input.Password
                {...register('matKhau', { required: true })}
                size="large"
                className="mt-1"
                placeholder="Vui lòng nhập mật khẩu..."
              />
              {formState.errors.matKhau?.message && (
            <small className="text-danger">
              {formState.errors.matKhau?.message as any}
            </small>
          )}
            </Col>
            <Col span={24}>
              <label className="text-xs text-[#6A7280]">*Họ tên</label>
              <Input
                {...register('hoTen', { required: true })}
                type="text"
                size="large"
                className="mt-1"
                placeholder="Nguyễn Văn A"
              />
              {formState.errors.hoTen?.message && (
            <small className="text-danger">
              {formState.errors.hoTen?.message as any}
            </small>
          )}
            </Col>
            <Col span={24}>
              <label className="text-xs text-[#6A7280]">*Địa chỉ email</label>
              <Input
                {...register('email', { required: true })}
                type="email"
                size="large"
                className="mt-1"
                placeholder="xyz@gmail.com"
              />
              {formState.errors.email?.message && (
            <small className="text-danger">
              {formState.errors.email?.message as any}
            </small>
          )}
            </Col>
            <Col span={24}>
              <label className="text-xs text-[#6A7280]">*Số điện thoại</label>
              <Input
                {...register('soDt', { required: true })}
                type="text"
                size="large"
                className="mt-1"
                placeholder="09888999**"
              />
              {formState.errors.soDt?.message && (
            <small className="text-danger">
              {formState.errors.soDt?.message as any}
            </small>
          )}
            </Col>
            <Col span={24}>
              <Button type="primary" size="large" disabled={isPending} block htmlType="submit">
                Tạo tài khoản
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </QueryClientProvider>
  );
}
