const STATUS_TABS = [
  { value: '', label: 'Tất cả' },
  { value: 'promotion', label: 'Khuyến mãi' },
  { value: 'new', label: 'Mới nhất' },
  { value: 'best_seller', label: 'Bán chạy' },
  { value: 'featured', label: 'Nổi bật' },
];

const ProductsStatusTabs = ({ activeStatus, onChange }) => (
  <div className="products-status-tabs" role="tablist" aria-label="Lọc theo loại sản phẩm">
    {STATUS_TABS.map((tab) => {
      const isActive = activeStatus === tab.value;
      return (
        <button
          key={tab.value || 'all'}
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={() => onChange(tab.value)}
          className={`products-status-tab ${isActive ? 'products-status-tab--active' : ''}`}
        >
          {tab.label}
        </button>
      );
    })}
  </div>
);

export default ProductsStatusTabs;
