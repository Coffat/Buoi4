import { Form, notification } from 'antd';
import { forgotPasswordApi } from '../util/api.js';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import AuthFormField from '../components/auth/AuthFormField.jsx';
import AuthAlert from '../components/auth/AuthAlert.jsx';

const ForgotPasswordPage = () => {
  const onFinish = async (values) => {
    const { email } = values;
    try {
      const data = await forgotPasswordApi(email);
      notification.info({
        message: 'Quên mật khẩu',
        description: data?.message || 'Yêu cầu đã được ghi nhận',
      });
    } catch (err) {
      notification.error({
        message: 'Quên mật khẩu',
        description: err?.message || 'Không thể xử lý yêu cầu',
      });
    }
  };

  return (
    <AuthLayout
      title="Quên mật khẩu"
      subtitle="Nhập email đã đăng ký — chúng tôi sẽ gửi liên kết để bạn đặt lại mật khẩu an toàn."
      badge="Khôi phục tài khoản"
      footer={
        <Link to="/login" className="auth-link text-sm">
          Quay lại đăng nhập
        </Link>
      }
    >
      <AuthAlert variant="info">
        Trong môi trường phát triển, kiểm tra terminal của server để lấy liên kết đặt lại mật khẩu.
      </AuthAlert>
      <Form name="forgot" onFinish={onFinish} autoComplete="off" layout="vertical" className="auth-form">
        <AuthFormField
          label="Email"
          name="email"
          placeholder="your@email.com"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        />
        <Form.Item className="mb-0">
          <button type="submit" className="luxury-btn-primary auth-submit-btn">
            Gửi yêu cầu
          </button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
