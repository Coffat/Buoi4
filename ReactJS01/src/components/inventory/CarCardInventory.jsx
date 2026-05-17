import { useState } from 'react';
import { Link } from 'react-router-dom';

const formatVND = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

const BADGE_STYLES = {
  certified: { label: 'Chứng nhận', bg: '#22C55E', color: '#fff' },
  new:       { label: 'Xe mới về', bg: '#D4AF37', color: '#0a0a0a' },
  value:     { label: 'Giá tốt nhất', bg: '#3B82F6', color: '#fff' },
};

const SpecItem = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 min-w-0">
    <span className="text-[#D4AF37] flex-shrink-0">{icon}</span>
    <span className="text-[#8b95a5] text-[11px] truncate">{label}</span>
  </div>
);

const icons = {
  mileage: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  fuel: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 7l1.5-3h15L21 7M3 7v13h18V7" />
    </svg>
  ),
  trans: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  location: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  ),
};

const BADGE_TYPES = ['certified', 'new', 'value', null];

const CarCardInventory = ({ product, index = 0 }) => {
  const [liked, setLiked] = useState(false);
  const badgeKey = BADGE_TYPES[index % 4];
  const badge = badgeKey ? BADGE_STYLES[badgeKey] : null;

  return (
    <article className="car-card luxury-card overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="relative bg-[#0a0c10] aspect-[16/11] overflow-hidden flex-shrink-0">
        <img
          src={
            product.primary_image ||
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80'
          }
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-500"
        />

        {/* Badge */}
        {badge && (
          <span
            className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-10"
            style={{ backgroundColor: badge.bg, color: badge.color }}
          >
            {badge.label}
          </span>
        )}

        {/* Heart */}
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#05070a]/60 backdrop-blur-sm border border-[#2a3040] flex items-center justify-center hover:border-[#D4AF37] transition-colors z-10"
          aria-label="Yêu thích"
        >
          <svg
            className={`w-4 h-4 transition-colors ${liked ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-white fill-none'}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[13px] font-semibold text-white leading-snug mb-1.5 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
          {product.name}
        </h3>

        <p className="text-[#D4AF37] font-bold text-[18px] mb-3">
          {formatVND(product.price)}
        </p>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 py-3 border-t border-b border-[#1e2430] mb-3">
          <SpecItem icon={icons.mileage} label={product.mileage || '15.000 km'} />
          <SpecItem icon={icons.fuel} label={product.fuel_type || 'Xăng'} />
          <SpecItem icon={icons.trans} label={product.transmission || 'Tự động'} />
          <SpecItem icon={icons.location} label={product.location || 'Hà Nội'} />
        </div>

        <Link
          to={`/product/${product.slug}`}
          className="gold-link mt-auto text-[12px]"
        >
          Xem chi tiết
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default CarCardInventory;
