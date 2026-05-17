import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchProducts } from '../../store/slices/productSlice';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

const HeroBanner = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts({ status: 'promotion', limit: 4 }));
  }, [dispatch]);

  if (loading || !list || !list.length) return null;

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0F14]" style={{ minHeight: '85vh' }}>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
        style={{ minHeight: '85vh' }}
      >
        {list.map((product, index) => {
          const discount = product.original_price
            ? Math.round(
                ((Number(product.original_price) - Number(product.price)) /
                  Number(product.original_price)) * 100
              )
            : 0;

          return (
            <SwiperSlide key={product.id}>
              <div className="relative w-full" style={{ minHeight: '85vh' }}>
                {/* Background image */}
                <img
                  src={product.primary_image || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80'}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14]/95 via-[#0B0F14]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14]/80 via-transparent to-transparent" />

                {/* Content */}
                <div
                  className="relative z-10 max-w-7xl mx-auto px-6 flex items-center"
                  style={{ minHeight: '85vh' }}
                >
                  <div className="max-w-2xl pt-8">
                    {/* Brand label */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-[1px] bg-[#D4AF37]" />
                      <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.35em] uppercase">
                        AutoVIP Premium
                      </span>
                    </div>

                    {/* Discount badge */}
                    {discount > 0 && (
                      <div className="inline-flex items-center gap-2 mb-5">
                        <span className="bg-[#EF4444] text-white text-[11px] font-bold px-3 py-1.5 tracking-widest uppercase">
                          Ưu đãi -{discount}%
                        </span>
                        <span className="text-[#9CA3AF] text-xs">Giá tốt nhất thị trường</span>
                      </div>
                    )}

                    {/* Car name */}
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-4">
                      {product.name}
                    </h1>

                    {/* Description */}
                    <p className="text-[#9CA3AF] text-base leading-relaxed mb-8 max-w-lg line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price block */}
                    <div className="flex items-baseline gap-4 mb-10">
                      <span className="text-3xl md:text-5xl font-black price-text">
                        {formatPrice(product.price)}
                      </span>
                      {product.original_price && Number(product.original_price) > Number(product.price) && (
                        <span className="text-lg text-[#6B7280] line-through font-light">
                          {formatPrice(product.original_price)}
                        </span>
                      )}
                    </div>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap items-center gap-6 mb-8 text-[#9CA3AF] text-xs">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#22C55E]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                        </svg>
                        <span>Bảo hành chính hãng</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/>
                        </svg>
                        <span>5 năm kinh nghiệm</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                        </svg>
                        <span>Lái thử miễn phí</span>
                      </div>
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/product/${product.slug}`}
                        className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0B0F14] font-bold px-8 py-3.5 hover:bg-[#F0D060] transition-all text-sm tracking-wide uppercase"
                      >
                        Xem chi tiết
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                      <a
                        href="tel:19001234"
                        className="inline-flex items-center gap-2 border border-[#374151] text-white px-8 py-3.5 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-sm tracking-wide uppercase"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        Nhận báo giá
                      </a>
                    </div>
                  </div>
                </div>

                {/* Slide counter */}
                <div className="absolute bottom-16 right-8 z-10 hidden md:block">
                  <div className="text-right">
                    <div className="text-[#D4AF37] font-black text-3xl leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="text-[#374151] text-xs mt-1">/ {String(list.length).padStart(2, '0')}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[#6B7280] text-[10px] tracking-[0.25em] uppercase">Cuộn xuống</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroBanner;
