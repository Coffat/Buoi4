import { Link } from 'react-router-dom';

const AUTH_HERO =
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85&auto=format&fit=crop';

const TRUST_ITEMS = [
  'Xe chứng nhận chất lượng',
  'Giá minh bạch, không phí ẩn',
  'Hỗ trợ tài chính linh hoạt',
];

const AuthLogo = ({ light = false }) => (
  <Link to="/" className="inline-flex items-center gap-3 group">
    <div className="w-11 h-11 bg-[#C5B49E] flex items-center justify-center shrink-0">
      <svg className="w-5 h-5 text-[#080809]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
      </svg>
    </div>
    <div className="flex flex-col leading-none text-left">
      <span className={`text-lg font-black tracking-[0.12em] uppercase ${light ? 'text-white' : 'text-white'}`}>
        AutoVIP
      </span>
      <span className="text-[9px] tracking-[0.3em] text-[#C5B49E] font-semibold uppercase">
        Premium Showroom
      </span>
    </div>
  </Link>
);

const AuthLayout = ({ title, subtitle, children, footer, badge = 'Thành viên AutoVIP' }) => (
  <div className="auth-shell">
    {/* Brand panel */}
    <aside className="auth-brand-panel" aria-hidden="true">
      <img src={AUTH_HERO} alt="" className="auth-brand-image" />
      <div className="auth-brand-overlay" />
      <div className="auth-brand-content">
        <AuthLogo light />
        <div className="mt-auto space-y-6">
          <div>
            <span className="auth-brand-eyebrow">{badge}</span>
            <h2 className="auth-brand-title">
              Trải nghiệm
              <br />
              <span className="text-[#C5B49E] italic font-normal">đẳng cấp</span>
            </h2>
            <p className="auth-brand-desc">
              Kho xe cao cấp, dịch vụ tư vấn chuyên nghiệp và quy trình minh bạch từ showroom đến giao xe.
            </p>
          </div>
          <ul className="auth-trust-list">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="auth-trust-item">
                <svg className="w-4 h-4 text-[#C5B49E] shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>

    {/* Form panel */}
    <div className="auth-form-panel">
      <div className="auth-form-inner">
        <div className="lg:hidden mb-8">
          <AuthLogo />
        </div>

        <header className="auth-form-header">
          <span className="section-eyebrow">{badge}</span>
          <h1 className="auth-form-title">{title}</h1>
          {subtitle && <p className="auth-form-subtitle">{subtitle}</p>}
        </header>

        <div className="auth-card">{children}</div>

        {footer && <div className="auth-form-footer">{footer}</div>}

        <Link to="/" className="auth-back-link">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  </div>
);

export default AuthLayout;
