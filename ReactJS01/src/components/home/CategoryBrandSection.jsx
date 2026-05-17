import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchCategories } from '../../store/slices/categorySlice';

// --- Accurate car-type SVG icons ---
const CAT_ICONS = {
  suv: (
    // SUV: tall, boxy body, high roof, visible wheels
    <svg className="w-10 h-10" viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="12" width="56" height="13" rx="2" />
      <path d="M10 12 L14 4 L50 4 L54 12" />
      <circle cx="16" cy="25" r="5" />
      <circle cx="48" cy="25" r="5" />
      <line x1="21" y1="25" x2="43" y2="25" />
      <line x1="4" y1="18" x2="60" y2="18" />
    </svg>
  ),
  sedan: (
    // Sedan: classic notchback profile
    <svg className="w-10 h-10" viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22 L4 17 L10 17 L18 8 L46 8 L56 17 L60 17 L60 22 Z" />
      <circle cx="16" cy="22" r="5" />
      <circle cx="48" cy="22" r="5" />
      <line x1="21" y1="22" x2="43" y2="22" />
      <path d="M18 8 L20 17 M46 8 L44 17" />
    </svg>
  ),
  coupe: (
    // Coupe: sloped fastback roofline
    <svg className="w-10 h-10" viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22 L4 18 L12 18 L22 6 L52 10 L58 18 L60 18 L60 22 Z" />
      <circle cx="16" cy="22" r="5" />
      <circle cx="48" cy="22" r="5" />
      <line x1="21" y1="22" x2="43" y2="22" />
    </svg>
  ),
  ev: (
    // EV: lightning bolt + sleek sedan outline
    <svg className="w-10 h-10" viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22 L4 17 L10 17 L18 8 L46 8 L56 17 L60 17 L60 22 Z" />
      <circle cx="16" cy="22" r="5" />
      <circle cx="48" cy="22" r="5" />
      <line x1="21" y1="22" x2="43" y2="22" />
      {/* Lightning bolt */}
      <path d="M34 9 L30 15 L33 15 L29 22" strokeWidth="2" stroke="#D4AF37" />
    </svg>
  ),
};

const FALLBACK_CATS = [
  { id: 1, name: 'SUV', count: '120+', key: 'suv' },
  { id: 2, name: 'Sedan', count: '150+', key: 'sedan' },
  { id: 3, name: 'Coupe', count: '80+', key: 'coupe' },
  { id: 4, name: 'Xe điện', count: '60+', key: 'ev' },
];

// Car brand logos as inline SVG — always renders, no CDN dependency
const BRANDS = [
  {
    name: 'Mercedes-Benz',
    // Three-pointed star in circle
    logo: (
      <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none">
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
        {/* 3-pointed star */}
        <path d="M50 10 L54 44 L84 60 L52 54 L50 90 L48 54 L16 60 L46 44 Z" fill="currentColor" opacity="0.85" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'BMW',
    // BMW roundel: 4 quadrants blue/white alternating
    logo: (
      <svg viewBox="0 0 100 100" className="w-10 h-10" fill="none">
        <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="38" fill="none" />
        {/* BMW 4 quadrants */}
        <path d="M50 12 A38 38 0 0 1 88 50 L50 50 Z" fill="currentColor" opacity="0.9" />
        <path d="M50 88 A38 38 0 0 1 12 50 L50 50 Z" fill="currentColor" opacity="0.9" />
        <path d="M12 50 A38 38 0 0 1 50 12 L50 50 Z" fill="currentColor" opacity="0.2" />
        <path d="M88 50 A38 38 0 0 1 50 88 L50 50 Z" fill="currentColor" opacity="0.2" />
        <circle cx="50" cy="50" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Audi',
    // Four interlocking rings
    logo: (
      <svg viewBox="0 0 120 40" className="w-14 h-8" fill="none">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="45" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="70" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="95" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    name: 'Porsche',
    // Stylized "P" crest
    logo: (
      <svg viewBox="0 0 80 100" className="w-8 h-10" fill="none">
        <rect x="5" y="5" width="70" height="90" rx="4" stroke="currentColor" strokeWidth="2" />
        <text x="40" y="52" textAnchor="middle" fill="currentColor" fontSize="38" fontWeight="bold" fontFamily="serif" dominantBaseline="middle">P</text>
        <line x1="5" y1="60" x2="75" y2="60" stroke="currentColor" strokeWidth="1.5" />
        <text x="40" y="78" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="600" fontFamily="sans-serif" letterSpacing="2">PORSCHE</text>
      </svg>
    ),
  },
  {
    name: 'Land Rover',
    // Land Rover oval badge
    logo: (
      <svg viewBox="0 0 110 50" className="w-14 h-8" fill="none">
        <ellipse cx="55" cy="25" rx="51" ry="21" stroke="currentColor" strokeWidth="2" />
        <text x="55" y="20" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="700" fontFamily="sans-serif" letterSpacing="1.5" dominantBaseline="middle">LAND</text>
        <text x="55" y="32" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="700" fontFamily="sans-serif" letterSpacing="1.5" dominantBaseline="middle">ROVER</text>
      </svg>
    ),
  },
];

const CategoryBrandSection = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const cats = list.length ? list.slice(0, 4) : FALLBACK_CATS;

  return (
    <section id="thuong-hieu" className="luxury-section bg-[#05070a] border-t border-[#1e2430]">
      <div className="luxury-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* --- Browse by Category --- */}
          <div>
            <h2 className="subsection-heading">Tìm theo dòng xe</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(loading ? FALLBACK_CATS : cats).map((cat, idx) => {
                const iconKey = ['suv', 'sedan', 'coupe', 'ev'][idx % 4];
                const countText = cat.count ? `${cat.count} xe` : '—';
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className="luxury-card group p-4 flex flex-col items-center text-center hover:border-[#D4AF37]/45 transition-all duration-200"
                  >
                    <div className="w-14 h-14 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-3 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/5 transition-all">
                      {CAT_ICONS[iconKey]}
                    </div>
                    <span className="text-white font-semibold text-[13px] mb-0.5">{cat.name}</span>
                    <span className="text-[#6b7280] text-[11px]">{countText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- Browse by Brand --- */}
          <div>
            <h2 className="subsection-heading">Tìm theo thương hiệu</h2>
            <div className="flex flex-wrap gap-3">
              {BRANDS.map((brand) => (
                <button
                  key={brand.name}
                  type="button"
                  title={brand.name}
                  className="luxury-card w-[88px] h-[88px] flex flex-col items-center justify-center gap-1.5 hover:border-[#D4AF37]/60 hover:bg-white/5 transition-all group p-2"
                >
                  <div className="text-white/70 group-hover:text-[#D4AF37] transition-colors flex items-center justify-center">
                    {brand.logo}
                  </div>
                  <span className="text-white/50 text-[9px] font-medium tracking-wide group-hover:text-[#D4AF37]/70 transition-colors leading-tight text-center">
                    {brand.name}
                  </span>
                </button>
              ))}
              <button
                type="button"
                className="luxury-card w-[88px] h-[88px] flex flex-col items-center justify-center border-[#D4AF37]/35 bg-[#14180f] hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all"
              >
                <svg className="w-5 h-5 text-[#D4AF37] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-[#D4AF37] text-[10px] font-semibold text-center leading-tight px-1">
                  Xem tất cả
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBrandSection;


