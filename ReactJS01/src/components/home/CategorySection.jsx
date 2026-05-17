import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchCategories } from '../../store/slices/categorySlice';

const CATEGORY_ICONS = [
  // Sedan
  <svg key="sedan" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
  </svg>,
  // SUV
  <svg key="suv" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-3 8.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-7.5h-2.5V9.5H19l1 4z"/>
  </svg>,
  // Electric
  <svg key="ev" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
  </svg>,
  // Sport
  <svg key="sport" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
  </svg>,
  // Truck
  <svg key="truck" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 3H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2V7l-4-4zm-1 1.5L18.5 8H16V4.5zm-8 11.5c0-.83.67-1.5 1.5-1.5S11 15.17 11 16s-.67 1.5-1.5 1.5S7 16.83 7 16zm10 0c0-.83.67-1.5 1.5-1.5S20 15.17 20 16s-.67 1.5-1.5 1.5S17 16.83 17 16z"/>
  </svg>,
  // Hatchback
  <svg key="hatch" className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21 6.5h-4l-3-4H4C2.9 2.5 2 3.4 2 4.5v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5.5l-3-3zm-6.5 0H8.5l2-3h4l3 4H14.5zm4 8c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-13 0C4.67 14.5 4 15.17 4 16s.67 1.5 1.5 1.5S7 16.83 7 16s-.67-1.5-1.5-1.5z"/>
  </svg>,
];

const CategorySection = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading || !list.length) return null;

  return (
    <section className="py-20 bg-[#111827] border-y border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="section-rule" />
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase">Danh mục</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Dòng xe <span className="text-[#D4AF37]">nổi bật</span>
            </h2>
          </div>
          <p className="text-[#6B7280] text-sm max-w-xs leading-relaxed">
            Đa dạng phân khúc xe từ phổ thông đến cao cấp, xe điện và xe thể thao
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#1F2937]">
          {list.map((cat, idx) => (
            <div
              key={cat.id}
              className="group bg-[#111827] p-6 flex flex-col items-center text-center hover:bg-[#1F2937] cursor-pointer transition-all duration-300 relative overflow-hidden"
            >
              {/* Gold accent line on hover */}
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Icon container */}
              <div className="w-16 h-16 flex items-center justify-center mb-4 text-[#6B7280] group-hover:text-[#D4AF37] transition-colors duration-300">
                {CATEGORY_ICONS[idx % CATEGORY_ICONS.length]}
              </div>

              {/* Category name */}
              <h3 className="text-sm font-bold text-[#9CA3AF] group-hover:text-white transition-colors mb-1 leading-snug">
                {cat.name}
              </h3>

              {/* Description */}
              {cat.description && (
                <p className="text-[11px] text-[#4B5563] group-hover:text-[#6B7280] transition-colors leading-relaxed mt-1 line-clamp-2">
                  {cat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
