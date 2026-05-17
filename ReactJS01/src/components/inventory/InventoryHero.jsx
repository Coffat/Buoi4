// Hero banner for the Inventory page
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=90&auto=format&fit=crop';

const InventoryHero = () => (
  <section className="relative overflow-hidden bg-[#05070a]" style={{ height: '220px' }}>
    {/* BG image */}
    <img
      src={HERO_IMAGE}
      alt="Luxury Inventory"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
    {/* Gradient overlay — dark left, fades to reveal car right */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#05070a]/95 via-[#05070a]/70 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#05070a]/80 via-transparent to-transparent" />

    {/* Content */}
    <div className="relative z-10 luxury-container flex items-center h-full pt-20">
      <div>
        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-2">
          <span className="text-white">Kho xe</span>{' '}
          <span className="text-[#D4AF37]">Sang trọng</span>
        </h1>
        <p className="text-[#8b95a5] text-[14px] leading-relaxed max-w-md">
          Khám phá bộ sưu tập xe tuyển chọn xuất sắc nhất của chúng tôi.
          <br />
          Từng chiếc xe. Được chứng nhận. Từng chi tiết. Hoàn hảo.
        </p>
      </div>
    </div>
  </section>
);

export default InventoryHero;
