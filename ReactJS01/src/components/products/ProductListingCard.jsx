import { useState } from 'react';
import { Link } from 'react-router-dom';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

const STATUS_BADGES = {
  new: { label: 'Mới về', className: 'bg-[#FAFAFA] text-[#080809]' },
  promotion: { label: 'Khuyến mãi', className: 'bg-[#C5B49E] text-[#080809]' },
  best_seller: { label: 'Bán chạy', className: 'bg-[#18181A] text-[#FAFAFA] border border-[#C5B49E]/40' },
  featured: { label: 'Nổi bật', className: 'bg-[#C5B49E] text-[#080809]' },
};

const SpecItem = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 min-w-0">
    <span className="text-[#C5B49E] shrink-0">{icon}</span>
    <span className="text-[#A1A1AA] text-[11px] font-light truncate">{label}</span>
  </div>
);

const icons = {
  mileage: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  fuel: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 7l1.5-3h15L21 7M3 7v13h18V7" />
    </svg>
  ),
  trans: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  location: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

export const ProductListingCardSkeleton = ({ listMode = false }) => (
  <div className={`products-card-skeleton animate-pulse border border-[#18181A] bg-[#111112]/40 overflow-hidden ${listMode ? 'flex flex-row' : ''}`}>
    <div className={`bg-[#111112] ${listMode ? 'w-full sm:w-[280px] aspect-[16/11] sm:min-h-[180px]' : 'aspect-[16/11]'}`} />
    <div className="p-5 space-y-3 flex-1">
      <div className="h-4 bg-[#18181A] w-3/4" />
      <div className="h-5 bg-[#18181A] w-1/2" />
      <div className="grid grid-cols-2 gap-2 py-4 border-t border-b border-[#18181A]">
        {[1, 2, 3, 4].map((i) => <div key={i} className="h-3 bg-[#18181A]" />)}
      </div>
    </div>
  </div>
);

const ProductListingCard = ({ product, listMode = false }) => {
  const [liked, setLiked] = useState(false);
  const statusBadge = STATUS_BADGES[product.status];
  const discount =
    product.original_price && Number(product.original_price) > Number(product.price)
      ? Math.round(
          ((Number(product.original_price) - Number(product.price)) /
            Number(product.original_price)) *
            100
        )
      : 0;

  return (
    <article
      className={`products-card group border border-[#18181A] bg-[#111112]/60 overflow-hidden hover:border-[#C5B49E]/50 transition-colors duration-300 ${
        listMode ? 'flex flex-row' : 'flex flex-col'
      }`}
    >
      <div
        className={`relative bg-[#080809] overflow-hidden shrink-0 ${
          listMode ? 'w-full sm:w-[300px] aspect-[16/11] sm:aspect-auto sm:min-h-[190px]' : 'aspect-[16/11]'
        }`}
      >
        <img
          src={product.primary_image || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080809]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {statusBadge && (
          <span className={`absolute top-3 left-3 text-[9px] font-semibold px-2 py-1 uppercase tracking-wider z-10 ${statusBadge.className}`}>
            {statusBadge.label}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-12 bg-[#EF4444] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wider z-10">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 bg-[#080809]/85 backdrop-blur-sm border border-[#18181A] flex items-center justify-center hover:border-[#C5B49E] transition-colors z-10"
          aria-label="Yêu thích"
        >
          <svg
            className={`w-4 h-4 transition-colors ${liked ? 'text-[#C5B49E] fill-[#C5B49E]' : 'text-white fill-none'}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className={`p-5 flex flex-col flex-1 ${listMode ? 'justify-center' : ''}`}>
        {product.brand && (
          <p className="text-[#52525B] text-[10px] font-medium uppercase tracking-[0.2em] mb-1.5">{product.brand}</p>
        )}
        <h3 className="text-[15px] font-normal tracking-wide text-white leading-snug mb-2 group-hover:text-[#C5B49E] transition-colors line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-4">
          <p className="text-[#C5B49E] font-medium text-[17px]">{formatPrice(product.price)}</p>
          {product.original_price && Number(product.original_price) > Number(product.price) && (
            <p className="text-[#52525B] text-[12px] line-through font-light">{formatPrice(product.original_price)}</p>
          )}
        </div>

        <div className={`grid grid-cols-2 gap-x-4 gap-y-3 py-4 border-t border-[#18181A] mb-4 ${listMode ? 'max-w-md' : ''}`}>
          <SpecItem icon={icons.mileage} label={product.mileage ? `${Number(product.mileage).toLocaleString()} km` : '12.000 km'} />
          <SpecItem icon={icons.fuel} label={product.fuel_type || 'Xăng'} />
          <SpecItem icon={icons.trans} label={product.transmission || 'Tự động'} />
          <SpecItem icon={icons.location} label={product.location || 'TP.HCM'} />
        </div>

        <Link to={`/product/${product.slug}`} className="gold-link mt-auto text-[11px]">
          Xem chi tiết
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ProductListingCard;
