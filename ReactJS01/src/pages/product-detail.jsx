import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProductDetail, clearDetail } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import ImageGallery from '../components/product/ImageGallery';
import QuantitySelector from '../components/product/QuantitySelector';
import SimilarProducts from '../components/product/SimilarProducts';
import { notification } from 'antd';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

const formatNumber = (num) =>
  new Intl.NumberFormat('vi-VN').format(num);

/* ─── Skeleton loader ────────────────────────────────────────────── */
const LoadingSkeleton = () => (
  <div className="luxury-page min-h-screen">
    <div className="luxury-container py-10">
      <div className="animate-pulse">
        {/* Breadcrumb */}
        <div className="flex gap-2 mb-8">
          <div className="h-3 bg-[#1e2430] w-16 rounded" />
          <div className="h-3 bg-[#1e2430] w-4 rounded" />
          <div className="h-3 bg-[#1e2430] w-32 rounded" />
        </div>
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-[#0f1218] border border-[#1e2430] rounded" style={{ aspectRatio: '4/3' }} />
          <div className="space-y-5 pt-2">
            <div className="h-3 bg-[#1e2430] w-24 rounded" />
            <div className="h-8 bg-[#1e2430] w-4/5 rounded" />
            <div className="h-8 bg-[#1e2430] w-2/5 rounded" />
            <div className="h-px bg-[#1e2430] w-full" />
            <div className="space-y-2">
              <div className="h-3 bg-[#1e2430] w-full rounded" />
              <div className="h-3 bg-[#1e2430] w-4/5 rounded" />
            </div>
            <div className="h-12 bg-[#1e2430] w-full mt-4 rounded" />
            <div className="h-12 bg-[#1e2430] w-full rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { detail, detailLoading } = useAppSelector((state) => state.product);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetail(slug));
    return () => dispatch(clearDetail());
  }, [dispatch, slug]);

  useEffect(() => {
    setQuantity(1);
  }, [detail?.id]);

  const handleAddToCart = () => {
    if (!detail) return;
    dispatch(addToCart({ product: detail, quantity }));
    notification.success({
      message: 'Đã thêm vào giỏ hàng',
      description: `${detail.name} (x${quantity})`,
    });
  };

  if (detailLoading) return <LoadingSkeleton />;

  if (!detail) {
    return (
      <div className="luxury-page min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 border border-[#1e2430] rounded-full flex items-center justify-center mx-auto mb-6 text-[#4b5563] bg-[#0f1218]">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Sản phẩm không tồn tại</h2>
          <p className="text-[#8b95a5] text-sm mb-8">Sản phẩm có thể đã bị xóa hoặc đường link không hợp lệ.</p>
          <Link
            to="/inventory"
            className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0a0a0a] font-bold px-8 py-3 rounded hover:bg-[#F0D060] transition-colors text-[13px] tracking-wide uppercase"
          >
            Xem kho xe
          </Link>
        </div>
      </div>
    );
  }

  const discount = detail.original_price
    ? Math.round(
        ((Number(detail.original_price) - Number(detail.price)) /
          Number(detail.original_price)) * 100
      )
    : 0;

  const statusMap = {
    new: { label: 'MỚI VỀ', class: 'bg-[#22C55E] text-white' },
    best_seller: { label: 'BÁN CHẠY', class: 'bg-[#D4AF37] text-[#0B0F14]' },
    promotion: { label: 'KHUYẾN MÃI', class: 'bg-[#EF4444] text-white' },
  };

  return (
    <div className="luxury-page min-h-screen">
      <div className="luxury-container py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-[#8b95a5] mb-10">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Trang chủ</Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link to="/inventory" className="hover:text-[#D4AF37] transition-colors">Kho xe</Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {detail.category && (
            <>
              <span className="text-[#9CA3AF]">{detail.category.name}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
          <span className="text-[#D4AF37] truncate max-w-[200px]">{detail.name}</span>
        </nav>

        {/* Main product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Gallery */}
          <div>
            <ImageGallery images={detail.images} />
          </div>

          {/* Info panel */}
          <div className="flex flex-col">
            {/* Status badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {statusMap[detail.status] && (
                <span className={`${statusMap[detail.status].class} text-[10px] font-bold px-3 py-1 tracking-widest uppercase`}>
                  {statusMap[detail.status].label}
                </span>
              )}
              {detail.category && (
                <span className="border border-[#1e2430] bg-[#0f1218] text-[#8b95a5] text-[10px] font-semibold px-3 py-1 rounded tracking-widest uppercase">
                  {detail.category.name}
                </span>
              )}
            </div>

            {/* Car name */}
            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-6">
              {detail.name}
            </h1>

            {/* Price section */}
            <div className="bg-[#0f1218] border border-[#1e2430] rounded p-6 mb-8">
              <div className="flex flex-wrap items-baseline gap-4">
                <span className="text-3xl md:text-4xl font-black text-[#D4AF37]">
                  {formatPrice(detail.price)}
                </span>
                {detail.original_price && Number(detail.original_price) > Number(detail.price) && (
                  <div className="flex items-center gap-2">
                    <span className="text-base text-[#8b95a5] line-through font-medium">
                      {formatPrice(detail.original_price)}
                    </span>
                    <span className="bg-[#ef4444] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                      -{discount}%
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[#8b95a5] text-[13px] mt-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hỗ trợ vay trả góp — liên hệ để nhận báo giá tốt nhất
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { 
                  value: formatNumber(detail.stock), 
                  label: 'Còn trong kho', 
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  ) 
                },
                { 
                  value: formatNumber(detail.sold), 
                  label: 'Đã bàn giao', 
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                { 
                  value: formatNumber(detail.views), 
                  label: 'Lượt xem', 
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )
                },
              ].map(({ value, label, icon }) => (
                <div key={label} className="bg-[#0f1218] border border-[#1e2430] rounded p-4 text-center">
                  <div className="flex justify-center text-[#D4AF37] mb-2">{icon}</div>
                  <p className="text-xl font-bold text-white">{value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#8b95a5] mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Description preview */}
            {detail.description && (
              <p className="text-[#6B7280] text-sm leading-relaxed mb-6 line-clamp-3 border-l-2 border-[#D4AF37]/40 pl-4">
                {detail.description}
              </p>
            )}

            {/* Quantity selector */}
            <div className="mb-6">
              <label className="text-[11px] font-semibold tracking-[0.15em] text-[#8b95a5] uppercase mb-2 block">
                Số lượng
              </label>
              <QuantitySelector
                value={quantity}
                max={detail.stock}
                onChange={setQuantity}
                disabled={detail.stock === 0}
              />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={detail.stock === 0}
                className="w-full bg-[#D4AF37] text-[#0a0a0a] font-bold py-3.5 px-6 rounded hover:bg-[#c49b28] disabled:bg-[#1e2430] disabled:text-[#4b5563] disabled:cursor-not-allowed transition-colors text-[13px] tracking-widest uppercase flex items-center justify-center gap-2"
              >
                {detail.stock > 0 ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Thêm vào giỏ
                  </>
                ) : (
                  '⛔ Hết hàng'
                )}
              </button>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:19001234"
                  className="flex items-center justify-center gap-2 border border-[#1e2430] bg-[#0f1218] text-[#c8cdd6] rounded py-3 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors text-[13px] font-semibold tracking-wide"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Tư vấn
                </a>
                <button className="flex items-center justify-center gap-2 border border-[#1e2430] bg-[#0f1218] text-[#c8cdd6] rounded py-3 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors text-[13px] font-semibold tracking-wide">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Lái thử
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-[#1e2430] grid grid-cols-3 gap-3 text-center">
              {[
                { 
                  icon: (
                    <svg className="w-6 h-6 mx-auto text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ), 
                  label: 'Bảo hành\nchính hãng' 
                },
                { 
                  icon: (
                    <svg className="w-6 h-6 mx-auto text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ), 
                  label: 'Hỗ trợ\nvay vốn' 
                },
                { 
                  icon: (
                    <svg className="w-6 h-6 mx-auto text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  ), 
                  label: 'Đổi trả\n7 ngày' 
                },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col gap-2">
                  {icon}
                  <span className="text-[11px] text-[#8b95a5] leading-snug whitespace-pre-line font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[14px] font-bold text-white uppercase tracking-widest border-l-4 border-[#D4AF37] pl-3">
              Mô tả chi tiết
            </h2>
          </div>
          <div className="bg-[#0f1218] border border-[#1e2430] rounded p-8">
            <p className="text-[#8b95a5] text-[14px] leading-relaxed">
              {detail.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
            </p>
          </div>
        </div>

        {/* Similar products */}
        <SimilarProducts slug={slug} />
      </div>
    </div>
  );
};

export default ProductDetail;
