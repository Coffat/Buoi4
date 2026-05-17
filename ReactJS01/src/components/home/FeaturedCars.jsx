import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductsApi } from '../../util/api';

const formatPriceDisplay = (price, useUsd = false) => {
  if (useUsd) {
    const usd = Math.round(Number(price) / 25000);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd);
  }
  return new Intl.NumberFormat('vi-VN').format(price) + '₫';
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  fuel: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7l1.5-3h15L21 7M3 7v13h18V7" />
    </svg>
  ),
  trans: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  location: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  ),
};

const CarCardSkeleton = () => (
  <div className="luxury-card overflow-hidden animate-pulse">
    <div className="bg-[#1a1f28] h-[200px]" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-[#1a1f28] w-3/4 rounded" />
      <div className="h-px bg-[#1e2430]" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-3 bg-[#1a1f28] rounded" />
        <div className="h-3 bg-[#1a1f28] rounded" />
      </div>
    </div>
  </div>
);

const CarCard = ({ product, priceAsUsd = false }) => {
  const [liked, setLiked] = useState(false);

  return (
    <article className="car-card luxury-card overflow-hidden group">
      <div className="car-image-glow relative bg-[#0a0c10] aspect-[16/11] overflow-hidden">
        <img
          src={product.primary_image || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
        />
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#05070a]/60 backdrop-blur-sm border border-[#2a3040] flex items-center justify-center hover:border-[#D4AF37] transition-colors z-10"
          aria-label="Yêu thích"
        >
          <svg
            className={`w-4 h-4 ${liked ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-white fill-none'}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-[14px] font-semibold text-white leading-snug group-hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <p className="text-[#D4AF37] font-bold text-[17px] whitespace-nowrap flex-shrink-0">
            {formatPriceDisplay(product.price, priceAsUsd)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2 py-3 border-t border-b border-[#1e2430] mb-4">
          <SpecItem icon={icons.mileage} label={product.mileage || '12k km'} />
          <SpecItem icon={icons.fuel} label={product.fuel_type || 'Xăng'} />
          <SpecItem icon={icons.trans} label={product.transmission || 'Tự động'} />
          <SpecItem icon={icons.location} label={product.location || 'TP.HCM'} />
        </div>

        <Link to={`/product/${product.slug}`} className="gold-link">
          Xem chi tiết
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

const DEMO_CARS = [
  {
    id: 1,
    name: '2023 Range Rover Sport HSE',
    price: 2248750000,
    slug: 'range-rover-sport-hse',
    mileage: '18k km',
    fuel_type: 'Xăng',
    transmission: 'Tự động',
    location: 'TP.HCM',
    primary_image: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=700&q=80',
  },
  {
    id: 2,
    name: '2022 Porsche 911 Carrera S',
    price: 3248750000,
    slug: 'porsche-911-carrera-s',
    mileage: '8k km',
    fuel_type: 'Xăng',
    transmission: 'Tự động',
    location: 'Hà Nội',
    primary_image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80',
  },
  {
    id: 3,
    name: '2023 Mercedes-Benz S 580',
    price: 4248750000,
    slug: 'mercedes-benz-s580',
    mileage: '5k km',
    fuel_type: 'Xăng',
    transmission: 'Tự động',
    location: 'TP.HCM',
    primary_image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=700&q=80',
  },
];

const FeaturedCars = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProductsApi({ limit: 6 })
      .then((res) => { if (!cancelled) setProducts(res?.products || []); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const useDemo = products.length === 0;
  const displayProducts = useDemo ? DEMO_CARS : products.slice(0, 3);

  return (
    <section id="xe-noi-bat" className="luxury-section pt-8 pb-16 bg-[#05070a]">
      <div className="luxury-container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-heading">Xe nổi bật</h2>
          <Link to="/inventory" className="gold-link">
            Xem tất cả kho xe
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3].map((i) => <CarCardSkeleton key={i} />)
            : displayProducts.map((p) => (
              <CarCard key={p.id} product={p} priceAsUsd={useDemo} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
