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
    <footer className="bg-[#080809] border-t border-[#18181A]">
      <div className="max-w-[1280px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <span className="font-display text-white text-base tracking-[0.2em] font-light">
                AUTOVIP <span className="text-[#C5B49E]">MOTORS</span>
              </span>
            </Link>
            <p className="text-[#A1A1AA] text-xs leading-relaxed mb-6 font-light">
              Hệ thống phân phối xe ô tô cao cấp hàng đầu. Cam kết sản phẩm chính hãng,
              giá minh bạch và dịch vụ chuyên nghiệp.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ id, label }) => (
                <a
                  key={id}
                  href="#"
                  className="w-8 h-8 border border-[#1c1c1f] flex items-center justify-center text-[#A1A1AA] hover:border-[#FAFAFA] hover:text-[#FAFAFA] transition-all"
                  aria-label={label}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <SocialIcon id={id} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <h4 className="text-[10px] font-medium tracking-[0.18em] text-[#C5B49E] uppercase mb-5">
              Liên kết nhanh
            </h4>
            <ul className="space-y-3 text-xs text-[#A1A1AA] font-light">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Customer care */}
          <div>
            <h4 className="text-[10px] font-medium tracking-[0.18em] text-[#C5B49E] uppercase mb-5">
              Chăm sóc khách hàng
            </h4>
            <ul className="space-y-3 text-xs text-[#A1A1AA] font-light">
              {CUSTOMER_CARE.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Resources */}
          <div>
            <h4 className="text-[10px] font-medium tracking-[0.18em] text-[#C5B49E] uppercase mb-5">
              Tài nguyên
            </h4>
            <ul className="space-y-3 text-xs text-[#A1A1AA] font-light">
              {RESOURCES.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Contact */}
          <div id="lien-he">
            <h4 className="text-[10px] font-medium tracking-[0.18em] text-[#C5B49E] uppercase mb-5">
              Liên hệ
            </h4>
            <ul className="space-y-4 text-xs text-[#A1A1AA] font-light">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-[#C5B49E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#C5B49E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:190012345678" className="hover:text-white transition-colors">
                  1900 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#C5B49E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@autovip.vn" className="hover:text-white transition-colors">
                  info@autovip.vn
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 text-[#C5B49E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-[#A1A1AA] text-xs">Thứ 2 – Thứ 7: 8:00 – 18:00</p>
                  <p className="text-[#A1A1AA] text-xs">Chủ nhật: 9:00 – 17:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#18181A]">
        <div className="max-w-[1280px] mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#52525B] font-light">
            © {year} AutoVIP Motors. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-[11px] text-[#52525B] flex items-center gap-1 font-light tracking-widest">
            DESIGNED FOR ENTHUSIASTS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
