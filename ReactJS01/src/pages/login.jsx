import { useContext } from 'react';
import { Form, notification } from 'antd';
import { loginApi } from '../util/api.js';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context.jsx';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import AuthFormField from '../components/auth/AuthFormField.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      const data = await loginApi(email, password);
      localStorage.setItem('access_token', data.access_token);
      notification.success({
        message: 'Đăng nhập thành công',
        description: `Chào mừng trở lại, ${data?.user?.name || data?.user?.email}!`,
      });
      setAuth({
        isAuthenticated: true,
        user: {
          email: data?.user?.email ?? '',
          name: data?.user?.name ?? '',
          role: data?.user?.role ?? 'User',
        },
      });
      navigate('/');
    } catch (err) {
      notification.error({
        message: 'Đăng nhập thất bại',
        description: err?.message ?? 'Email hoặc mật khẩu không đúng',
      });
    }
  };

  return (
    <AuthLayout
      title="Đăng nhập"
      subtitle="Chào mừng bạn quay trở lại — truy cập kho xe và ưu đãi dành riêng cho thành viên."
      badge="Chào mừng trở lại"
      footer={
        <p className="text-[#A1A1AA] text-sm font-light">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="auth-link">
            Đăng ký ngay
          </Link>
        </p>
      }
    >
      <Form name="login" onFinish={onFinish} autoComplete="off" layout="vertical" className="auth-form">
        <AuthFormField
          label="Email"
          name="email"
          placeholder="your@email.com"
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        />
        <AuthFormField
          label="Mật khẩu"
          name="password"
          type="password"
          placeholder="••••••••"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        />
        <div className="flex items-center justify-end -mt-1 mb-1">
          <Link to="/forgot-password" className="text-xs text-[#71717A] hover:text-[#C5B49E] transition-colors">
            Quên mật khẩu?
          </Link>
        </div>
        <Form.Item className="mb-0">
          <button type="submit" className="luxury-btn-primary auth-submit-btn">
            Đăng nhập
          </button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default LoginPage;
