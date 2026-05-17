import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-[#080809] overflow-hidden flex items-center">
      {/* Background — dark gradient + subtle texture */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#080809]/98 via-[#080809]/60 to-transparent z-10" />
        {/* Hero car image */}
        <img
          src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1400&q=90"
          alt="Luxury Car"
          className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-110 opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-8 w-full pt-24 pb-16">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-[#C5B49E]" />
            <span className="text-[#C5B49E] text-[10px] font-medium tracking-[0.3em] uppercase">
              CURATED SELECTION · CERTIFIED EXCELLENCE
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6.5xl font-light text-[#FAFAFA] leading-[1.1] tracking-wide mb-6">
            Tìm chiếc xe <br />
            <span className="text-[#C5B49E] italic font-normal">Sang trọng</span> tiếp theo
          </h1>

          {/* Subtitle */}
          <p className="text-[#A1A1AA] text-sm font-light leading-relaxed mb-10 max-w-sm">
            Tuyển chọn khắt khe. Chứng nhận chất lượng cao. Những mẫu xe tinh hoa vượt trội được tinh chỉnh riêng dành cho phong cách sống của bạn.
          </p>

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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-[#C5B49E]" />
      </div>
    </section>
  );
};

export default HeroSection;
