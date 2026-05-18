import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import HomeCarCard, { HomeCarCardSkeleton } from './HomeCarCard.jsx';
import 'swiper/css';
import 'swiper/css/navigation';

const SWIPER_BREAKPOINTS = {
  0: { slidesPerView: 1, spaceBetween: 16 },
  768: { slidesPerView: 2, spaceBetween: 20 },
  1024: { slidesPerView: 3, spaceBetween: 24 },
};

const HomeProductCarousel = ({ products = [], loading = false }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (loading) {
    return (
      <div className="home-product-carousel flex items-center gap-6">
        <button type="button" className="carousel-nav-btn opacity-25 cursor-not-allowed" disabled aria-hidden="true">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-w-0">
          {Array.from({ length: 3 }, (_, i) => (
            <HomeCarCardSkeleton key={i} />
          ))}
        </div>
        <button type="button" className="carousel-nav-btn opacity-25 cursor-not-allowed" disabled aria-hidden="true">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="home-product-carousel flex items-center gap-6">
      <button
        ref={prevRef}
        type="button"
        className="carousel-nav-btn home-product-carousel__nav"
        aria-label="Xe trước"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={16}
        watchOverflow
        breakpoints={SWIPER_BREAKPOINTS}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="flex-1 min-w-0 home-product-carousel__swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="!h-auto">
            <HomeCarCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        ref={nextRef}
        type="button"
        className="carousel-nav-btn home-product-carousel__nav"
        aria-label="Xe sau"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HomeProductCarousel;
