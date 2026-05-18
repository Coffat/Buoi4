import { useEffect, useState } from 'react';
import { getProductsApi } from '../../util/api';
import PageHeader from '../ui/PageHeader.jsx';
import HomeProductCarousel from './HomeProductCarousel.jsx';

const ProductShowcaseSection = ({
  id,
  eyebrow,
  title,
  highlight,
  description,
  status,
  limit = 10,
  viewAllHref = '/products',
  viewAllLabel = 'Xem thêm',
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getProductsApi({ status, limit })
      .then((res) => {
        if (!cancelled) {
          setProducts(Array.isArray(res?.data) ? res.data : []);
        }
      })
      .catch(() => {
        if (!cancelled) setProducts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [status, limit]);

  if (!loading && products.length === 0) return null;

  return (
    <section id={id} className="luxury-section bg-[#080809] border-t border-[#18181A]">
      <div className="luxury-container">
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          description={description}
          actionLabel={viewAllLabel}
          actionHref={viewAllHref}
          className="mb-12"
        />

        <HomeProductCarousel products={products} loading={loading} />
      </div>
    </section>
  );
};

export const PromotionsSection = () => (
  <ProductShowcaseSection
    id="khuyen-mai"
    eyebrow="Ưu đãi"
    title="Khuyến mãi"
    highlight="đặc biệt"
    description="Những mẫu xe đang được giảm giá hấp dẫn tại showroom."
    status="promotion"
    limit={10}
    viewAllHref="/products?status=promotion"
  />
);

export const NewArrivalsSection = () => (
  <ProductShowcaseSection
    id="xe-moi-nhat"
    eyebrow="Mới về"
    title="Xe mới"
    highlight="vừa về showroom"
    description="Cập nhật những mẫu xe mới nhất vừa nhập kho."
    status="new"
    limit={10}
    viewAllHref="/products?status=new"
  />
);

export const FeaturedSection = () => (
  <ProductShowcaseSection
    id="xe-noi-bat"
    eyebrow="Tuyển chọn"
    title="Xe"
    highlight="nổi bật"
    description="Những mẫu xe flagship được AutoVIP đánh dấu nổi bật nhất."
    status="featured"
    limit={10}
    viewAllHref="/products?status=featured"
  />
);

export default ProductShowcaseSection;
