import FilterSidebar from '../inventory/FilterSidebar';

const ProductFilterDrawer = ({ open, onClose, filters, onChange, onReset, totalResults }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-[#080809]/85 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Đóng bộ lọc"
      />
      <aside className="absolute left-0 top-0 bottom-0 w-[min(100vw-2rem,320px)] bg-[#080809] overflow-y-auto border-r border-[#18181A] shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#18181A] bg-[#111112] sticky top-0 z-10">
          <div>
            <span className="text-white font-medium text-sm tracking-wide block">Bộ lọc sản phẩm</span>
            <span className="text-[#52525B] text-[11px] font-light">Tinh chỉnh kết quả</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center border border-[#18181A] text-[#A1A1AA] hover:text-white hover:border-[#C5B49E] transition-colors"
            aria-label="Đóng"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5">
          <FilterSidebar
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            totalResults={totalResults}
          />
        </div>
      </aside>
    </div>
  );
};

export default ProductFilterDrawer;
