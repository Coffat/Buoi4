import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { fetchCategories } from '../../store/slices/categorySlice';
import { getCategoryIconUrl } from '../../util/categoryIcons';

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
            Đa dạng phân khúc xe từ phổ thông đến cao cấp, xe điện và bán tải
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#1F2937]">
          {list.map((cat) => (
            <div
              key={cat.id}
              className="group bg-[#111827] p-6 flex flex-col items-center text-center hover:bg-[#1F2937] cursor-pointer transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="w-full h-14 flex items-center justify-center mb-4 text-[#6B7280] group-hover:text-[#D4AF37] transition-colors duration-300">
                <img
                  src={getCategoryIconUrl(cat)}
                  alt=""
                  className="w-11 h-11 object-contain opacity-55 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  loading="lazy"
                />
              </div>

              <h3 className="text-sm font-bold text-[#9CA3AF] group-hover:text-white transition-colors mb-1 leading-snug">
                {cat.name}
              </h3>

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
