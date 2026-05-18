import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchCategories } from '../../store/slices/categorySlice';
import { getCategoryIconUrl } from '../../util/categoryIcons';

const ASSET = '/assets/thesvg';

const FALLBACK_CATS = [
  { id: 1, name: 'Sedan', slug: 'sedan', count: '150+' },
  { id: 2, name: 'SUV', slug: 'suv', count: '120+' },
  { id: 3, name: 'Bán tải', slug: 'ban-tai', count: '80+' },
  { id: 4, name: 'Xe điện', slug: 'xe-dien', count: '60+' },
];

const BRANDS = [
  { name: 'Mercedes-Benz', slug: 'mercedes-benz' },
  { name: 'BMW', slug: 'bmw' },
  { name: 'Audi', slug: 'audi' },
  { name: 'Porsche', slug: 'porsche' },
  { name: 'Toyota', slug: 'toyota' },
  { name: 'Honda', slug: 'honda' },
  { name: 'Ford', slug: 'ford' },
  { name: 'Hyundai', slug: 'hyundai' },
  { name: 'VinFast', slug: 'vinfast' },
  { name: 'Tesla', slug: 'tesla' },
];

const CategoryIcon = ({ category }) => (
  <img
    src={getCategoryIconUrl(category)}
    alt=""
    className="w-11 h-11 object-contain object-center opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
    loading="lazy"
  />
);

const BrandLogo = ({ slug, name }) => (
  <img
    src={`${ASSET}/brands/${slug}.svg`}
    alt={name}
    className="w-10 h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
    loading="lazy"
  />
);

import PageHeader from '../ui/PageHeader.jsx';

const CategoryBrandSection = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const cats = list.length ? list.slice(0, 4) : FALLBACK_CATS;

  return (
    <section id="thuong-hieu" className="luxury-section bg-[#080809] border-t border-[#18181A]">
      <div className="luxury-container">
        <PageHeader
          eyebrow="Khám phá sản phẩm"
          title="Tìm theo"
          highlight="dòng xe & thương hiệu"
          className="mb-12"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="subsection-heading mb-6">Dòng xe</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(loading ? FALLBACK_CATS : cats).map((cat) => {
                const countText = cat.count ? `${cat.count} xe` : '—';
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className="p-6 flex flex-col items-center text-center border border-[#18181A] bg-[#111112]/30 hover:border-[#C5B49E] transition-all duration-300 group min-h-[140px]"
                  >
                    <div className="w-full h-12 flex items-center justify-center mb-4 px-1">
                      <CategoryIcon category={cat} />
                    </div>
                    <span className="text-white font-medium text-[13px] tracking-wide mb-1">{cat.name}</span>
                    <span className="text-[#52525B] text-[11px] font-light">{countText}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="subsection-heading mb-6">Thương hiệu</h3>
            <div className="flex flex-wrap gap-4">
              {BRANDS.map((brand) => (
                <button
                  key={brand.slug}
                  type="button"
                  title={brand.name}
                  className="w-[100px] h-[100px] flex flex-col items-center justify-center gap-2 border border-[#18181A] bg-[#111112]/30 hover:border-[#C5B49E] transition-all duration-300 group p-3"
                >
                  <BrandLogo slug={brand.slug} name={brand.name} />
                  <span className="text-[#52525B] text-[10px] font-light tracking-wide group-hover:text-white transition-colors leading-tight text-center">
                    {brand.name}
                  </span>
                </button>
              ))}
              <button
                type="button"
                className="w-[100px] h-[100px] flex flex-col items-center justify-center gap-2 border border-[#18181A] bg-[#111112]/10 hover:border-[#C5B49E] transition-all duration-300 group p-3"
              >
                <svg className="w-5 h-5 text-[#C5B49E] group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-[#C5B49E] text-[10px] tracking-wider uppercase font-medium text-center leading-tight">
                  Tất cả
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBrandSection;
