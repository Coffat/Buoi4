import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getProductsApi } from '../../util/api';
import { AuthContext } from '../context/auth.context.jsx';

const formatPriceDisplay = (price, useUsd = false) => {
  if (useUsd) {
    const usd = Math.round(Number(price) / 25000);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd);
  }
  return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
};

const SpecItem = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 min-w-0">
    <span className="text-[#C5B49E] flex-shrink-0">{icon}</span>
    <span className="text-[#A1A1AA] text-[11px] font-light truncate">{label}</span>
  </div>
);

const icons = {
  mileage: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  fuel: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 7l1.5-3h15L21 7M3 7v13h18V7" />
    </svg>
  ),
  trans: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  location: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const CarCardSkeleton = () => (
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

const CarCard = ({ product, priceAsUsd = false }) => {
  const [liked, setLiked] = useState(false);

  const discount = product.original_price && Number(product.original_price) > Number(product.price)
    ? Math.round(((Number(product.original_price) - Number(product.price)) / Number(product.original_price)) * 100)
    : 0;

  return (
    <article className="car-card bg-[#111112] overflow-hidden group border border-[#1C1C1F]">
      <div className="car-image-glow relative bg-[#080809] aspect-[16/11] overflow-hidden">
        <img
          src={product.primary_image || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          className="absolute top-4 right-4 w-8 h-8 bg-[#080809]/80 backdrop-blur-sm border border-[#1C1C1F] flex items-center justify-center hover:border-white transition-colors z-10"
          aria-label="Yêu thích"
        >
          <svg
            className={`w-4 h-4 transition-all duration-300 ${liked ? 'text-[#C5B49E] fill-[#C5B49E]' : 'text-[#FAFAFA] fill-none'}`}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
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
            <p className="text-[#C5B49E] font-medium text-[16px]">
              {formatPriceDisplay(product.price, priceAsUsd)}
            </p>
            {product.original_price && Number(product.original_price) > Number(product.price) && (
              <p className="text-[#52525B] text-[12px] line-through font-light">
                {formatPriceDisplay(product.original_price, priceAsUsd)}
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

        <Link to={`/product/${product.slug}`} className="gold-link">
          Xem chi tiết
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

const DEMO_CARS = {
  promotion: [
    {
      id: 'p1',
      name: 'BMW 530i M Sport',
      price: 2500000000,
      original_price: 2800000000,
      slug: 'bmw-530i-m-sport',
      mileage: 22000,
      fuel_type: 'Xăng',
      transmission: 'Tự động',
      location: 'Đà Nẵng',
      primary_image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    },
    {
      id: 'p2',
      name: 'Hyundai Santa Fe 2024',
      price: 1250000000,
      original_price: 1400000000,
      slug: 'hyundai-santa-fe-2024',
      mileage: 14000,
      fuel_type: 'Dầu',
      transmission: 'Tự động',
      location: 'Hải Phòng',
      primary_image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
    }
  ],
  new: [
    {
      id: 'n1',
      name: 'Honda CR-V 2024',
      price: 1350000000,
      slug: 'honda-cr-v-2024',
      mileage: 12000,
      fuel_type: 'Xăng',
      transmission: 'Tự động',
      location: 'TP.HCM',
      primary_image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    },
    {
      id: 'n2',
      name: 'Mercedes-Benz GLC 300',
      price: 2700000000,
      slug: 'mercedes-benz-glc-300',
      mileage: 18000,
      fuel_type: 'Xăng',
      transmission: 'Tự động',
      location: 'TP.HCM',
      primary_image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d9?w=800',
    }
  ],
  best_seller: [
    {
      id: 'b1',
      name: 'Toyota Camry 2024',
      price: 1200000000,
      original_price: 1350000000,
      slug: 'toyota-camry-2024',
      mileage: 15000,
      fuel_type: 'Xăng',
      transmission: 'Tự động',
      location: 'Hà Nội',
      primary_image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    },
    {
      id: 'b2',
      name: 'Ford Ranger Wildtrak',
      price: 950000000,
      original_price: 1050000000,
      slug: 'ford-ranger-wildtrak',
      mileage: 25000,
      fuel_type: 'Dầu',
      transmission: 'Tự động',
      location: 'Hà Nội',
      primary_image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    }
  ]
};

const FeaturedCars = () => {
  const { auth } = useContext(AuthContext);
  const [promotions, setPromotions] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [activeTab, setActiveTab] = useState('promotion'); // 'promotion' | 'new' | 'best_seller'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    
    Promise.all([
      getProductsApi({ status: 'promotion', limit: 3 }),
      getProductsApi({ status: 'new', limit: 3 }),
      getProductsApi({ status: 'best_seller', limit: 3 })
    ])
      .then(([promoRes, newRes, bestRes]) => {
        if (!cancelled) {
          setPromotions(promoRes?.products || []);
          setNewArrivals(newRes?.products || []);
          setBestSellers(bestRes?.products || []);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const getActiveList = () => {
    if (activeTab === 'promotion') {
      return promotions.length > 0 ? promotions : DEMO_CARS.promotion;
    }
    if (activeTab === 'new') {
      return newArrivals.length > 0 ? newArrivals : DEMO_CARS.new;
    }
    return bestSellers.length > 0 ? bestSellers : DEMO_CARS.best_seller;
  };

  const displayList = getActiveList();
  const isDemo = promotions.length === 0 && newArrivals.length === 0 && bestSellers.length === 0;

  const tabs = [
    { key: 'promotion', label: 'Khuyến Mãi' },
    { key: 'new', label: 'Mới Nhất' },
    { key: 'best_seller', label: 'Bán Chạy Nhất' }
  ];

  return (
    <section id="xe-noi-bat" className="luxury-section bg-[#080809] border-t border-[#18181A]">
      <div className="luxury-container">
        
        {/* ── Member VIP Greeting Banner ── */}
        {auth.isAuthenticated && (
          <div className="mb-14 p-6 border border-[#C5B49E]/30 bg-[#111112] text-left animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[9px] tracking-[0.25em] text-[#C5B49E] uppercase font-bold">ƯU ĐÃI THÀNH VIÊN VIP THÀNH CÔNG</span>
                <h3 className="text-base font-medium text-white tracking-wide">Chào mừng trở lại, {auth.user.name || auth.user.email}!</h3>
                <p className="text-[#A1A1AA] text-xs font-light leading-relaxed">
                  Tài khoản thành viên hạng <strong className="text-white font-medium">{auth.user.role || 'Thành viên'}</strong> của bạn đang được áp dụng chiết khấu đặc quyền <strong className="text-[#C5B49E] font-medium">5%</strong> trên toàn hệ thống showroom.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-[#C5B49E] border border-[#C5B49E]/40 px-3.5 py-1.5 bg-[#C5B49E]/5 uppercase tracking-widest whitespace-nowrap">
                  VIP MEMBER ACTIVE
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── Section Header & Tabs ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.25em] text-[#C5B49E] uppercase font-semibold">TINH HOA TUYỂN CHỌN</span>
            <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-[#18181A] pb-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`text-[12px] uppercase tracking-[0.2em] font-medium pb-2 border-b-2 transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? 'text-white border-[#C5B49E]'
                      : 'text-[#52525B] border-transparent hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <Link to="/inventory" className="gold-link self-start lg:self-end">
            Xem tất cả kho xe
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Product Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [1, 2, 3].map((i) => <CarCardSkeleton key={i} />)
            : displayList.map((p) => (
                <CarCard key={p.id} product={p} priceAsUsd={isDemo} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
