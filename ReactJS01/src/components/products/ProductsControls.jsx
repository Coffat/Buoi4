const STATUS_TABS = [
  { value: '', label: 'Tất cả' },
  { value: 'promotion', label: 'Khuyến mãi' },
  { value: 'new', label: 'Mới nhất' },
  { value: 'best_seller', label: 'Bán chạy' },
  { value: 'featured', label: 'Nổi bật' },
];

const SORT_OPTIONS = ['Mới nhất', 'Giá: Thấp đến Cao', 'Giá: Cao đến Thấp', 'Số km: Ít đến Nhiều'];

const ProductsControls = ({
  total,
  activeStatus,
  onStatusChange,
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenFilters,
}) => (
  <div className="products-controls">
    <div className="luxury-container products-controls-inner">
      <div className="products-controls-top">
        <div className="products-status-tabs" role="tablist" aria-label="Lọc theo loại sản phẩm">
          {STATUS_TABS.map((tab) => {
            const isActive = activeStatus === tab.value;
            return (
              <button
                key={tab.value || 'all'}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onStatusChange(tab.value)}
                className={`products-status-tab ${isActive ? 'products-status-tab--active' : ''}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <p className="products-controls-count">
          <span className="products-controls-count-value">{(total || 0).toLocaleString()}</span> sản phẩm
        </p>
      </div>

      <div className="products-controls-bottom">
        <form onSubmit={onSearchSubmit} className="products-search-wrap">
          <svg className="products-search-icon" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Tìm theo tên xe, thương hiệu..."
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            className="products-search-input"
            aria-label="Tìm kiếm sản phẩm"
          />
        </form>

        <div className="products-controls-actions">
          <button type="button" onClick={onOpenFilters} className="products-filter-mobile-btn lg:hidden">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h6M13 16h4" />
            </svg>
            Lọc
          </button>

          <div className="products-sort-wrap">
            <label htmlFor="products-sort" className="products-sort-label">Sắp xếp</label>
            <div className="relative">
              <select
                id="products-sort"
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
                className="products-select"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <svg className="products-select-chevron" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" aria-hidden="true">
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
  </div>
);

export default ProductsControls;
