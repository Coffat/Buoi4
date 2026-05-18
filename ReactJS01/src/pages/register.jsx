import { Form, notification } from 'antd';
import { registerApi } from '../util/api.js';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import AuthFormField from '../components/auth/AuthFormField.jsx';

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, email, password } = values;
    try {
      await registerApi(name, email, password);
      notification.success({
        message: 'Đăng ký thành công',
        description: 'Tài khoản đã được tạo. Hãy đăng nhập để tiếp tục.',
      });
      navigate('/login');
    } catch (err) {
      notification.error({
        message: 'Đăng ký thất bại',
        description: err?.message ?? 'Đã có lỗi xảy ra, vui lòng thử lại.',
      });
    }
  };

  return (
    <AuthLayout
      title="Tạo tài khoản"
      subtitle="Đăng ký để nhận ưu đãi độc quyền, lưu xe yêu thích và theo dõi lịch lái thử."
      badge="Gia nhập AutoVIP"
      footer={
        <p className="text-[#A1A1AA] text-sm font-light">
          Đã có tài khoản?{' '}
          <Link to="/login" className="auth-link">
            Đăng nhập
          </Link>
        </p>
      }
    >
      <Form name="register" onFinish={onFinish} autoComplete="off" layout="vertical" className="auth-form">
        <AuthFormField
          label="Họ và tên"
          name="name"
          placeholder="Nguyễn Văn A"
          rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
        />
        <AuthFormField
          label="Email"
          name="email"
          placeholder="your@email.com"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        />
        <AuthFormField
          label="Mật khẩu"
          name="password"
          type="password"
          placeholder="••••••••"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Tối thiểu 6 ký tự' },
          ]}
        />
        <AuthFormField
          label="Xác nhận mật khẩu"
          name="confirm"
          type="password"
          placeholder="••••••••"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Hai mật khẩu không khớp'));
              },
            }),
          ]}
        />
        <Form.Item className="mb-0 mt-2">
          <button type="submit" className="luxury-btn-primary auth-submit-btn">
            Tạo tài khoản
          </button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default RegisterPage;
