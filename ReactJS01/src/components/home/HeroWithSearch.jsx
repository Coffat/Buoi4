import SearchBar from './SearchBar';

// Luxury black sports car hero image (reliable Unsplash CDN)
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&q=90&auto=format&fit=crop';

const HeroWithSearch = () => {
  return (
    <section className="relative bg-[#05070a]">
      {/* Hero visual */}
      <div className="relative min-h-[min(88vh,820px)] overflow-hidden">
        {/* Background image */}
        <img
          src={HERO_IMAGE}
          alt="Xe sang trọng"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Left-to-right gradient: dark on left (text readable), fades right (car visible) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070a]/95 via-[#05070a]/65 to-transparent" />
        {/* Bottom gradient for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-[#05070a]/30" />
        {/* Subtle gold glow accent */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/4 rounded-full blur-3xl pointer-events-none" />

        {/* Content — full row: text left, car visible right */}
        <div className="relative z-10 luxury-container flex items-center min-h-[min(88vh,820px)] pt-24 pb-36">
          <div className="max-w-[560px]">
            {/* Eyebrow label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.35em] uppercase">
                AutoVIP Premium
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] font-black text-white leading-[1.05] tracking-tight mb-5">
              Tìm chiếc xe{' '}
              <span className="text-[#D4AF37]">Sang trọng</span>
              <br />
              tiếp theo
            </h1>

            {/* Subtitle */}
            <p className="text-[#a8b0bc] text-[15px] leading-relaxed mb-4 max-w-md">
              Tuyển chọn khắt khe. Chứng nhận chất lượng.
              <br />
              Những chiếc xe xuất sắc, dành riêng cho bạn.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-5 mb-9 text-[#9CA3AF] text-xs">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#22C55E]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                <span>Bảo hành chính hãng</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" />
                </svg>
                <span>5 năm kinh nghiệm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                </svg>
                <span>Lái thử miễn phí</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <a href="#xe-noi-bat" className="luxury-btn-primary">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-7 7m7-7l-7-7" />
                </svg>
                Xem kho xe
              </a>
              <a href="#dat-lich" className="luxury-btn-ghost">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Đặt lịch lái thử
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
          <span className="text-[#6B7280] text-[10px] tracking-[0.25em] uppercase">Cuộn xuống</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
        </div>
      </div>

      {/* Search bar — overlaps hero / featured boundary */}
      <div className="relative z-20 luxury-container -mt-10 mb-2">
        <SearchBar overlay />
      </div>
    </section>
  );
};

export default HeroWithSearch;
