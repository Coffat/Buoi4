import { Link } from 'react-router-dom';

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN').format(price) + '₫';

const FUEL_ICONS = {
  xăng: '⛽',
  diesel: '🛢',
  điện: '⚡',
  hybrid: '🔋',
};

const ProductCard = ({ product }) => {
  const discount =
    product.original_price && Number(product.original_price) > Number(product.price)
      ? Math.round(
          ((Number(product.original_price) - Number(product.price)) /
            Number(product.original_price)) * 100
        )
      : 0;

  const badge = (() => {
    switch (product.status) {
      case 'new': return { text: 'Mới về', color: 'bg-[#22C55E] text-white' };
      case 'promotion': return discount > 0 ? { text: `-${discount}%`, color: 'bg-[#EF4444] text-white' } : null;
      case 'best_seller': return { text: 'Bán chạy', color: 'bg-[#D4AF37] text-[#0B0F14]' };
      default: return null;
    }
  })();

  return (
    <Link
      to={`/product/${product.slug}`}
      className="car-card group flex flex-col bg-[#111827] border border-[#1F2937] hover:border-[#D4AF37]/40 overflow-hidden"
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-[#0B0F14]" style={{ aspectRatio: '16/10' }}>
        <img
          src={product.primary_image || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Dark gradient bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        {badge && (
          <span className={`absolute top-3 left-3 ${badge.color} text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase`}>
            {badge.text}
          </span>
        )}
        {product.stock <= 3 && product.stock > 0 && (
          <span className="absolute top-3 right-3 bg-[#F59E0B] text-[#0B0F14] text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase">
            Sắp hết
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-[#0B0F14]/70 flex items-center justify-center">
            <span className="text-[#6B7280] text-xs font-semibold tracking-widest uppercase border border-[#374151] px-4 py-2">
              Hết hàng
            </span>
          </div>
        )}

        {/* Quick action on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-center gap-2 bg-[#D4AF37] text-[#0B0F14] py-2 text-xs font-bold tracking-widest uppercase">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Xem chi tiết
          </div>
        </div>
      </div>

      {/* Info area */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category tag */}
        {product.category && (
          <span className="text-[10px] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase mb-2">
            {product.category.name}
          </span>
        )}

        {/* Car name */}
        <h3 className="text-sm font-bold text-[#F9FAFB] mb-3 leading-snug min-h-[2.5rem] group-hover:text-[#D4AF37] transition-colors">
          {product.name}
        </h3>

        {/* Specs row */}
        <div className="flex items-center gap-3 mb-4 text-[11px] text-[#6B7280] border-t border-[#1F2937] pt-3">
          {product.fuel_type && (
            <span className="flex items-center gap-1">
              <span>{FUEL_ICONS[product.fuel_type?.toLowerCase()] || '⛽'}</span>
              {product.fuel_type}
            </span>
          )}
          {product.sold > 0 && (
            <span className="flex items-center gap-1 ml-auto">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              Đã bán {product.sold}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-base font-black price-text">
            {formatPrice(product.price)}
          </span>
          {product.original_price && Number(product.original_price) > Number(product.price) && (
            <span className="text-xs text-[#6B7280] line-through font-light">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
