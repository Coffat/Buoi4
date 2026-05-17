import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchSimilarProducts } from '../../store/slices/productSlice';
import ProductCard from './ProductCard';

const SimilarProducts = ({ slug }) => {
  const dispatch = useAppDispatch();
  const { similar } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (slug) dispatch(fetchSimilarProducts(slug));
  }, [dispatch, slug]);

  if (!similar.length) return null;

  return (
    <section className="border-t border-[#1F2937] pt-16 pb-4">
      <div className="flex items-center gap-3 mb-10">
        <div className="section-rule" />
        <div>
          <p className="text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase mb-1">
            Cùng danh mục
          </p>
          <h2 className="text-2xl font-black text-white">Xe tương tự</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {similar.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
