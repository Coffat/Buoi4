import { useState } from 'react';
import { Link } from 'react-router-dom';

const formatPriceDisplay = (price) =>
  new Intl.NumberFormat('vi-VN').format(price) + ' ₫';

const SpecItem = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 min-w-0">
    <span className="text-[#C5B49E] flex-shrink-0">{icon}</span>
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

export const HomeCarCardSkeleton = () => (
  <div className="luxury-card overflow-hidden animate-pulse border border-[#1C1C1F]">
    <div className="bg-[#111112] h-[200px]" />
    <div className="p-6 space-y-4">
      <div className="h-4 bg-[#111112] w-3/4" />
      <div className="h-[1px] bg-[#1C1C1F]" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-3 bg-[#111112] w-1/2" />
        <div className="h-3 bg-[#111112] w-1/2" />
      </div>
    </div>
  </div>
);

const HomeCarCard = ({ product }) => {
  const [liked, setLiked] = useState(false);

  const discount =
    product.original_price && Number(product.original_price) > Number(product.price)
      ? Math.round(
          ((Number(product.original_price) - Number(product.price)) /
            Number(product.original_price)) *
            100
        )
      : 0;

  const detailHref = `/product/${product.slug}`;

  return (
    <article className="car-card bg-[#111112] overflow-hidden group border border-[#1C1C1F] relative cursor-pointer">
      <Link
        to={detailHref}
        className="absolute inset-0 z-[1]"
        aria-label={`Xem chi tiết ${product.name}`}
      />
      <div className="car-image-glow relative bg-[#080809] aspect-[16/11] overflow-hidden">
        <img
          src={product.primary_image || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-4 right-4 w-8 h-8 bg-[#080809]/80 backdrop-blur-sm border border-[#1C1C1F] flex items-center justify-center hover:border-white transition-colors z-[2]"
          aria-label="Yêu thích"
        >
          <svg
            className={`w-4 h-4 transition-all duration-300 ${liked ? 'text-[#C5B49E] fill-[#C5B49E]' : 'text-[#FAFAFA] fill-none'}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        {discount > 0 && (
          <span className="absolute top-4 left-4 bg-[#ef4444] text-white text-[9px] font-bold tracking-widest px-2.5 py-1 uppercase z-10">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-2 mb-5">
          <h3 className="text-[14px] tracking-wide font-normal text-white group-hover:text-[#C5B49E] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <p className="text-[#C5B49E] font-medium text-[16px]">{formatPriceDisplay(product.price)}</p>
            {product.original_price && Number(product.original_price) > Number(product.price) && (
              <p className="text-[#52525B] text-[12px] line-through font-light">
                {formatPriceDisplay(product.original_price)}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-4 border-t border-b border-[#1C1C1F] mb-5">
          <SpecItem icon={icons.mileage} label={product.mileage ? `${product.mileage.toLocaleString()} km` : '12,000 km'} />
          <SpecItem icon={icons.fuel} label={product.fuel_type || 'Xăng'} />
          <SpecItem icon={icons.trans} label={product.transmission || 'Tự động'} />
          <SpecItem icon={icons.location} label={product.location || 'TP.HCM'} />
        </div>

        <span className="gold-link relative z-[2] pointer-events-none">
          Xem chi tiết
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </article>
  );
};

export default HomeCarCard;
