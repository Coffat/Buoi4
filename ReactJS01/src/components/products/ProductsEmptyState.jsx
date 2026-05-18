const ProductsEmptyState = ({ error, onReset }) => (
  <div className="products-empty">
    <div className="products-empty-icon" aria-hidden="true">
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    </div>
    <h3 className="text-white font-display text-lg font-light mb-2">
      {error ? 'Không tải được danh sách sản phẩm' : 'Không tìm thấy sản phẩm phù hợp'}
    </h3>
    <p className="text-[#A1A1AA] text-sm font-light mb-6 max-w-sm mx-auto">
      {error || 'Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để xem thêm lựa chọn.'}
    </p>
    <button type="button" onClick={onReset} className="luxury-btn-primary">
      Xóa bộ lọc
    </button>
  </div>
);

export default ProductsEmptyState;
