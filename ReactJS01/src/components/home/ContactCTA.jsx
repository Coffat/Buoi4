const CTA_IMAGE =
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&auto=format&fit=crop';

const ContactCTA = () => (
  <section id="dat-lich" className="bg-[#080809] border-t border-[#18181A]">
    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
      <div className="lg:col-span-7 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-14 space-y-5">
        <div>
          <span className="section-eyebrow block mb-2">Trải nghiệm đặc quyền</span>
          <h2 className="section-title-block font-display font-light">
            Sẵn sàng trải nghiệm đẳng cấp?
          </h2>
        </div>
        <p className="text-[#A1A1AA] text-[13px] font-light leading-relaxed max-w-md">
          Nhận báo giá cá nhân hóa hoặc đặt lịch lái thử dòng xe cao cấp tại hệ thống AutoVIP Motors trên toàn quốc.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <a href="tel:1900123456" className="luxury-btn-primary">
            Nhận báo giá
          </a>
          <a href="#dat-lich" className="luxury-btn-ghost">
            Đặt lịch lái thử
          </a>
        </div>
      </div>

      {/* Luxury Minimalist Image */}
      <div className="lg:col-span-5 relative bg-[#111112] border-t lg:border-t-0 lg:border-l border-[#18181A] overflow-hidden min-h-[300px] lg:min-h-0">
        <img
          src={CTA_IMAGE}
          alt="Trải nghiệm lái xe cao cấp"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-45 hover:opacity-60 transition-all duration-1000 ease-out scale-[1.02] hover:scale-100"
        />
        <div className="absolute inset-0 bg-[#080809]/20 pointer-events-none" />
      </div>
    </div>
    <span id="tai-chinh" className="sr-only" aria-hidden="true" />
  </section>
);

export default ContactCTA;
