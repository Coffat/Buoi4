// Hero banner for the Inventory page
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=90&auto=format&fit=crop';

const InventoryHero = () => (
  <section className="relative overflow-hidden bg-[#080809] border-b border-[#18181A]" style={{ height: '240px' }}>
    {/* BG image - Grayscale and low opacity for high-fashion minimal aesthetic */}
    <img
      src={HERO_IMAGE}
      alt="Luxury Inventory"
      className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-115 opacity-35"
    />
    
    {/* Dark minimalist overlays */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#080809] via-[#080809]/75 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-transparent" />

    {/* Content */}
    <div className="relative z-10 luxury-container flex items-center h-full pt-16">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-light tracking-wide mb-2.5">
          <span className="text-white">Bộ Sưu Tập</span>{' '}
          <span className="text-[#C5B49E]">Đặc Tuyển</span>
        </h1>
        <p className="text-zinc-400 font-light text-[13px] tracking-wide leading-relaxed max-w-lg">
          Tuyển chọn những kiệt tác cơ khí thượng lưu xuất sắc nhất.
          <br />
          Tối giản trong thiết kế. Độc bản trong trải nghiệm.
        </p>
      </div>
    </div>
  </section>
);

export default InventoryHero;
