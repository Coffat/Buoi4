import SearchBar from './SearchBar';

// Luxury black sports car hero image (reliable Unsplash CDN)
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&q=90&auto=format&fit=crop';

const HeroWithSearch = () => {
  return (
    <section className="relative bg-[#080809]">
      {/* Hero visual */}
      <div className="relative min-h-[min(88vh,820px)] overflow-hidden">
        {/* Background image */}
        <img
          src={HERO_IMAGE}
          alt="Xe sang trọng"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-75"
        />
        {/* Left-to-right gradient: dark on left (text readable), fades right (car visible) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080809]/98 via-[#080809]/60 to-transparent" />
        {/* Bottom gradient for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-[#080809]/20" />

        {/* Content — full row: text left, car visible right */}
        <div className="relative z-10 luxury-container flex items-center min-h-[min(88vh,820px)] pt-24 pb-36">
          <div className="max-w-[620px]">
            {/* Eyebrow label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-[1px] bg-[#C5B49E]" />
              <span className="text-[#C5B49E] text-[10px] font-medium tracking-[0.3em] uppercase">
                AUTOVIP PREMIUM
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] font-light text-[#FAFAFA] leading-[1.1] tracking-wide mb-6">
              Tìm chiếc xe <br />
              <span className="text-[#C5B49E] italic font-normal">Sang trọng</span> tiếp theo
            </h1>

            {/* Subtitle */}
            <p className="text-[#A1A1AA] text-[14px] font-light leading-relaxed mb-8 max-w-md">
              Tuyển chọn khắt khe. Chứng nhận chất lượng cao. Những mẫu xe tinh hoa vượt trội được tinh chỉnh riêng dành cho phong cách sống của bạn.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mb-10 text-[#A1A1AA] text-[11px] font-light">
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#C5B49E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Bảo hành chính hãng</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#C5B49E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Tiêu chuẩn 5 sao</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#C5B49E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Đăng ký lái thử dễ dàng</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a href="#xe-noi-bat" className="luxury-btn-primary">
                Xem kho xe
              </a>
              <a href="#dat-lich" className="luxury-btn-ghost">
                Đặt lịch lái thử
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
          <span className="text-[#52525B] text-[9px] tracking-[0.3em] uppercase">Cuộn xuống</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#C5B49E] to-transparent" />
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
