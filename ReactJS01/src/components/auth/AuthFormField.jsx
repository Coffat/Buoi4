import { Form, Input } from 'antd';

const FIELD_ICONS = {
  name: (
    <svg className="w-4 h-4 text-[#52525B]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  email: (
    <svg className="w-4 h-4 text-[#52525B]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  password: (
    <svg className="w-4 h-4 text-[#52525B]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
};

const resolveIcon = (name, type) => {
  if (name === 'name') return FIELD_ICONS.name;
  if (name === 'email') return FIELD_ICONS.email;
  if (type === 'password' || name === 'newPassword' || name === 'confirm') return FIELD_ICONS.password;
  return FIELD_ICONS.email;
};

const AuthFormField = ({
  label,
  name,
  rules,
  type = 'text',
  placeholder,
  disabled = false,
  hidden = false,
  dependencies,
}) => {
  const InputComponent = type === 'password' ? Input.Password : Input;
  const icon = resolveIcon(name, type);

  return (
    <Form.Item
      label={hidden ? null : label}
      name={name}
      rules={rules}
      hidden={hidden}
      dependencies={dependencies}
      className={hidden ? '!mb-0 auth-form-item-hidden' : 'auth-form-item'}
    >
      <InputComponent
        placeholder={placeholder}
        size="large"
        disabled={disabled}
        prefix={icon}
        autoComplete={type === 'password' ? 'current-password' : name === 'email' ? 'email' : 'off'}
      />
    </Form.Item>
  );
};

export default AuthFormField;
