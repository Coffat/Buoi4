import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Kho xe', href: '#xe-noi-bat' },
  { label: 'Thương hiệu', href: '#thuong-hieu' },
  { label: 'Tài chính', href: '#tai-chinh' },
  { label: 'Giới thiệu', href: '#gioi-thieu' },
  { label: 'Đặt lịch lái thử', href: '#dat-lich' },
];

const CUSTOMER_CARE = [
  'Câu hỏi thường gặp',
  'Chính sách bảo hành',
  'Chính sách đổi trả',
  'Hỗ trợ sau bán',
  'Bảo dưỡng định kỳ',
];

const RESOURCES = [
  'Máy tính vay vốn',
  'Định giá xe cũ',
  'So sánh mẫu xe',
  'Hướng dẫn mua xe',
  'Tin tức & sự kiện',
];

const SOCIALS = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'linkedin', label: 'LinkedIn' },
];

const SocialIcon = ({ id }) => {
  if (id === 'facebook') {
    return (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    );
  }
  if (id === 'instagram') {
    return (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    );
  }
  if (id === 'youtube') {
    return (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    );
  }
  return (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#05070a] border-t border-[#1e2430]">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-[#D4AF37] flex items-center justify-center text-black font-black text-lg rounded-sm">
                V
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-white font-bold text-[15px]">AUTOVIP</span>
                <span className="text-[#9CA3AF] text-[9px] tracking-[0.2em] uppercase">MOTORS</span>
              </div>
            </Link>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
              Hệ thống phân phối xe ô tô cao cấp hàng đầu. Cam kết sản phẩm chính hãng,
              giá minh bạch và dịch vụ chuyên nghiệp.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ id, label }) => (
                <a
                  key={id}
                  href="#"
                  className="w-9 h-9 border border-[#2a2a2a] flex items-center justify-center text-[#6B7280] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all rounded-sm"
                  aria-label={label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <SocialIcon id={id} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-5">
              Liên kết nhanh
            </h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-[#D4AF37] transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Customer care */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-5">
              Chăm sóc khách hàng
            </h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              {CUSTOMER_CARE.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Resources */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-5">
              Tài nguyên
            </h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              {RESOURCES.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[#D4AF37] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Contact */}
          <div id="lien-he">
            <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase mb-5">
              Liên hệ
            </h4>
            <ul className="space-y-4 text-sm text-[#6B7280]">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a href="tel:190012345678" className="hover:text-[#D4AF37] transition-colors text-[#9CA3AF]">
                  1900 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href="mailto:info@autovip.vn" className="hover:text-[#D4AF37] transition-colors">
                  info@autovip.vn
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 6v6l4 2" />
                </svg>
                <div>
                  <p className="text-[#9CA3AF] text-xs">Thứ 2 – Thứ 7: 8:00 – 18:00</p>
                  <p className="text-[#9CA3AF] text-xs">Chủ nhật: 9:00 – 17:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#1e2430]">
        <div className="max-w-[1280px] mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#4B5563]">
            © {year} AutoVIP Motors. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-[11px] text-[#6B7280] flex items-center gap-1">
            Thiết kế cho người đam mê.
            <span className="text-[#D4AF37] font-bold">V</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
