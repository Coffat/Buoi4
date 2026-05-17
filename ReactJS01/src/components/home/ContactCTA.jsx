const CTA_IMAGE =
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1600&q=80&auto=format&fit=crop';

const ContactCTA = () => (
  <section id="dat-lich" className="relative min-h-[360px] overflow-hidden border-t border-[#1e2430]">
    <img
      src={CTA_IMAGE}
      alt="Trải nghiệm lái xe cao cấp"
      className="absolute inset-0 w-full h-full object-cover object-right"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/85 to-[#05070a]/25" />

    <div className="relative z-10 luxury-container flex items-center min-h-[360px] py-16">
      <div className="max-w-md">
        <h2 className="font-display text-3xl md:text-[2.25rem] font-bold text-white leading-tight mb-3">
          Sẵn sàng trải nghiệm <span className="text-[#D4AF37]">đẳng cấp?</span>
        </h2>
        <p className="text-[#a8b0bc] text-[14px] leading-relaxed mb-8">
          Nhận báo giá cá nhân hóa hoặc đặt lịch lái thử ngay hôm nay.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="tel:190012345678" className="luxury-btn-primary">
            Nhận báo giá
          </a>
          <a href="#dat-lich" className="luxury-btn-ghost">
            Đặt lịch lái thử
          </a>
        </div>
      </div>
    </div>

    <span id="tai-chinh" className="sr-only" aria-hidden="true" />
  </section>
);

export default ContactCTA;
