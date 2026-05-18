const SORT_OPTIONS = ['Mới nhất', 'Giá: Thấp đến Cao', 'Giá: Cao đến Thấp', 'Số km: Ít đến Nhiều'];

const ProductsToolbar = ({
  total,
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenFilters,
}) => (
  <div className="products-toolbar">
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <p className="text-[#A1A1AA] text-[13px] font-light">
        Hiển thị{' '}
        <span className="text-white font-normal">{(total || 0).toLocaleString()}</span>{' '}
        sản phẩm
      </p>

      <button
        type="button"
        onClick={onOpenFilters}
        className="lg:hidden products-toolbar-btn"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h6M13 16h4" />
        </svg>
        Bộ lọc
      </button>
    </div>

    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
      <form onSubmit={onSearchSubmit} className="relative flex-1 sm:max-w-xs">
        <input
          type="search"
          placeholder="Tìm sản phẩm, dòng xe..."
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
          className="products-search-input"
        />
        <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525B] hover:text-[#C5B49E] transition-colors" aria-label="Tìm kiếm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      <div className="flex items-center gap-3 sm:ml-auto">
        <div className="flex items-center gap-2 flex-1 sm:flex-none">
          <span className="text-[#52525B] text-[10px] uppercase tracking-wider whitespace-nowrap">Sắp xếp</span>
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="products-select"
              aria-label="Sắp xếp sản phẩm"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#52525B] pointer-events-none" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="products-view-toggle" role="group" aria-label="Chế độ hiển thị">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={viewMode === 'grid' ? 'active' : ''}
            aria-label="Lưới"
            aria-pressed={viewMode === 'grid'}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zm-11 0h7v7H3z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={viewMode === 'list' ? 'active' : ''}
            aria-label="Danh sách"
            aria-pressed={viewMode === 'list'}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductsToolbar;
