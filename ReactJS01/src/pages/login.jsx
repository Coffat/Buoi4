import { useContext } from 'react';
import { Form, Input, notification } from 'antd';
import { loginApi } from '../util/api.js';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await loginApi(email, password);
    if (res && res.EC === 0) {
      localStorage.setItem('access_token', res.access_token);
      notification.success({
        message: 'Đăng nhập thành công',
        description: `Chào mừng trở lại, ${res?.user?.name || res?.user?.email}!`,
      });
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email ?? '',
          name: res?.user?.name ?? '',
          role: res?.user?.role ?? 'User',
        },
      });
      navigate('/');
    } else {
      notification.error({
        message: 'Đăng nhập thất bại',
        description: res?.EM ?? 'Email hoặc mật khẩu không đúng',
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#0B0F14] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center justify-center gap-3 mb-8 group">
            <div className="w-10 h-10 bg-[#D4AF37] flex items-center justify-center">
              <svg className="w-5 h-5 text-[#0B0F14]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="text-lg font-black tracking-[0.12em] text-white uppercase">AutoVIP</span>
              <span className="text-[9px] tracking-[0.3em] text-[#D4AF37] font-semibold uppercase">Premium Showroom</span>
            </div>
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-[#1F2937]" />
            <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase">Đăng nhập</span>
            <div className="flex-1 h-px bg-[#1F2937]" />
          </div>
          <p className="text-[#6B7280] text-sm">Chào mừng bạn quay trở lại AutoVIP</p>
        </div>

        {/* Form card */}
        <div className="bg-[#111827] border border-[#1F2937] p-8">
          <Form
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className="space-y-2"
          >
            <Form.Item
              label={<span className="text-[#9CA3AF] text-xs font-semibold tracking-widest uppercase">Email</span>}
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
            >
              <Input
                placeholder="your@email.com"
                size="large"
                style={{
                  background: '#0B0F14',
                  borderColor: '#374151',
                  color: '#F9FAFB',
                  borderRadius: 0,
                  height: 48,
                }}
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-[#9CA3AF] text-xs font-semibold tracking-widest uppercase">Mật khẩu</span>}
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password
                placeholder="••••••••"
                size="large"
                style={{
                  background: '#0B0F14',
                  borderColor: '#374151',
                  color: '#F9FAFB',
                  borderRadius: 0,
                  height: 48,
                }}
              />
            </Form.Item>

            <div className="flex items-center justify-end pb-2">
              <Link to="/forgot-password" className="text-xs text-[#6B7280] hover:text-[#D4AF37] transition-colors">
                Quên mật khẩu?
              </Link>
            </div>

            <Form.Item>
              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-[#0B0F14] font-bold py-3.5 hover:bg-[#F0D060] transition-all text-sm tracking-widest uppercase mt-2"
              >
                Đăng nhập
              </button>
            </Form.Item>
          </Form>

          <div className="border-t border-[#1F2937] pt-6 text-center">
            <p className="text-[#6B7280] text-sm">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="text-[#D4AF37] font-semibold hover:text-[#F0D060] transition-colors">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-2 text-[#6B7280] text-xs hover:text-[#D4AF37] transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
