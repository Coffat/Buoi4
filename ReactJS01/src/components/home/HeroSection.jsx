import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-[#0d0d0d] overflow-hidden flex items-center">
      {/* Background — dark gradient + subtle texture */}
      <div className="absolute inset-0">
        {/* Radial glow behind car */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent z-10" />
        {/* Ambient light glow */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        {/* Hero car image */}
        <img
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=90"
          alt="Luxury Car"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-6 w-full pt-24 pb-16">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <p className="text-[#D4AF37] text-xs font-semibold tracking-[0.35em] uppercase mb-6">
            Curated Selection · Certified Excellence
          </p>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.05] mb-4">
            Tìm chiếc xe
            <br />
            <span className="text-[#D4AF37]">Sang trọng</span>{' '}
            <span className="text-white">tiếp theo</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#9CA3AF] text-base leading-relaxed mb-10 max-w-sm">
            Tuyển chọn khắt khe. Chứng nhận chất lượng.<br />
            Những chiếc xe xuất sắc, dành riêng cho bạn.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#xe-moi"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c49b28] text-black font-bold px-8 py-3.5 transition-all text-sm tracking-wide uppercase"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-7 7m7-7l-7-7" />
              </svg>
              Xem kho xe
            </a>
            <a
              href="#dat-lich"
              className="inline-flex items-center gap-2 border border-[#4a4a4a] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] px-8 py-3.5 transition-all text-sm tracking-wide uppercase font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Đặt lịch lái thử
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
