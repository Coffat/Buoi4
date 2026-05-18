import FormField from '../ui/FormField.jsx';

const ProfileForm = ({
  email,
  name,
  onNameChange,
  newPassword,
  onNewPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  submitting,
  onSubmit,
}) => (
  <div>
    <h3 className="text-lg font-medium tracking-wide text-[#C5B49E] uppercase mb-6">
      Hồ sơ cá nhân
    </h3>

    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
      <FormField
        id="email"
        label="Địa chỉ email (không thể thay đổi)"
        type="email"
        value={email}
        disabled
      />

      <FormField
        id="fullName"
        label="Họ và tên"
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Nhập họ và tên..."
      />

      <div className="border-t border-[#18181A] pt-6">
        <h4 className="text-xs font-semibold tracking-widest text-[#C5B49E] uppercase mb-4">
          Thay đổi mật khẩu (tùy chọn)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="newPassword"
            label="Mật khẩu mới"
            type="password"
            value={newPassword}
            onChange={onNewPasswordChange}
            placeholder="Mật khẩu mới..."
          />
          <FormField
            id="confirmPassword"
            label="Xác nhận mật khẩu mới"
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            placeholder="Xác nhận mật khẩu..."
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="luxury-btn-primary w-full md:w-auto px-8 py-3.5 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <svg className="animate-spin h-4 w-4 text-[#080809]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Đang cập nhật...
            </>
          ) : (
            'Lưu thay đổi'
          )}
        </button>
      </div>
    </form>
  </div>
);

export default ProfileForm;
