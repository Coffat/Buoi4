import { Form, notification } from 'antd';
import { resetPasswordApi } from '../util/api.js';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import AuthFormField from '../components/auth/AuthFormField.jsx';
import AuthAlert from '../components/auth/AuthAlert.jsx';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { emailFromUrl, tokenFromUrl } = useMemo(
    () => ({
      emailFromUrl: searchParams.get('email') || '',
      tokenFromUrl: searchParams.get('token') || '',
    }),
    [searchParams]
  );

  const missingQuery = !emailFromUrl || !tokenFromUrl;

  const onFinish = async (values) => {
    const email = values.email;
    const token = values.token;
    const { newPassword } = values;
    try {
      const data = await resetPasswordApi(email, token, newPassword);
      notification.success({
        message: 'Đặt lại mật khẩu',
        description: data?.message || 'Thành công',
      });
      navigate('/login');
    } catch (err) {
      notification.error({
        message: 'Đặt lại mật khẩu',
        description: err?.message || 'Không thể đặt lại mật khẩu',
      });
    }
  };

  return (
    <AuthLayout
      title="Đặt lại mật khẩu"
      subtitle="Tạo mật khẩu mới mạnh hơn để bảo vệ tài khoản AutoVIP của bạn."
      badge="Bảo mật tài khoản"
      footer={
        <Link to="/login" className="auth-link text-sm">
          Quay lại đăng nhập
        </Link>
      }
    >
      {missingQuery && (
        <AuthAlert variant="error">
          Thiếu email hoặc token trong URL. Hãy dùng liên kết từ bước quên mật khẩu hoặc{' '}
          <Link to="/forgot-password">yêu cầu lại</Link>.
        </AuthAlert>
      )}
      <Form
        name="reset"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        className="auth-form"
        initialValues={{
          email: emailFromUrl,
          token: tokenFromUrl,
        }}
      >
        <AuthFormField
          label="Email"
          name="email"
          placeholder="your@email.com"
          disabled={!!emailFromUrl}
          rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
        />
        <AuthFormField name="token" hidden />
        <AuthFormField
          label="Mật khẩu mới"
          name="newPassword"
          type="password"
          placeholder="••••••••"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
            { min: 6, message: 'Tối thiểu 6 ký tự' },
          ]}
        />
        <AuthFormField
          label="Xác nhận mật khẩu"
          name="confirm"
          type="password"
          placeholder="••••••••"
          dependencies={['newPassword']}
          rules={[
            { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Hai mật khẩu không khớp'));
              },
            }),
          ]}
        />
        <Form.Item className="mb-0">
          <button type="submit" disabled={missingQuery} className="luxury-btn-primary auth-submit-btn disabled:opacity-40 disabled:cursor-not-allowed">
            Cập nhật mật khẩu
          </button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
