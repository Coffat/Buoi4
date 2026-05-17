import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductsApi } from '../../util/api';
import ProductCard from '../product/ProductCard';

/* ─── Skeleton loader for cards ──────────────────────────────────── */
const CardSkeleton = () => (
  <div className="bg-[#111827] border border-[#1F2937] overflow-hidden animate-pulse">
    <div className="bg-[#1F2937]" style={{ aspectRatio: '16/10' }} />
    <div className="p-4 space-y-3">
      <div className="h-2 bg-[#1F2937] w-1/4" />
      <div className="h-4 bg-[#1F2937] w-3/4" />
      <div className="h-3 bg-[#1F2937] w-1/2" />
      <div className="h-5 bg-[#1F2937] w-2/5 mt-2" />
    </div>
  </div>
);

const ProductSection = ({ id, title, highlight, label, status, limit = 4 }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProductsApi({ status, limit })
      .then((res) => {
        if (!cancelled) setProducts(res.products || []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [status, limit]);

  if (!loading && !products.length) return null;

  return (
    <section id={id} className="py-20 bg-[#0B0F14]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="section-rule" />
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase">
                {label}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              {highlight ? (
                <>
                  {title}{' '}
                  <span className="text-[#D4AF37]">{highlight}</span>
                </>
              ) : (
                title
              )}
            </h2>
          </div>
          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#9CA3AF] border border-[#374151] px-5 py-2.5 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all self-end"
          >
            Xem tất cả
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {loading
            ? [1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {/* Mobile "Xem tất cả" */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#9CA3AF] border border-[#374151] px-6 py-3 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
          >
            Xem tất cả
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

const NewArrivals = () => (
  <ProductSection
    id="xe-moi"
    title="Xe mới"
    highlight="vừa về"
    label="Ra mắt gần đây"
    status="new"
  />
);

const BestSellers = () => (
  <ProductSection
    id="ban-chay"
    title="Xe"
    highlight="bán chạy nhất"
    label="Lựa chọn hàng đầu"
    status="best_seller"
  />
);

const Promotions = () => (
  <ProductSection
    id="khuyen-mai"
    title="Ưu đãi"
    highlight="đặc biệt"
    label="Khuyến mãi tháng này"
    status="promotion"
  />
);

export default NewArrivals;
export { BestSellers, Promotions };
