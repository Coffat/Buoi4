import { Link } from 'react-router-dom';

const ProductsHero = ({ total = 0 }) => (
  <section className="products-page-header">
    <div className="luxury-container products-page-header-inner">
      <nav className="products-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <span className="products-breadcrumb-current">Sản phẩm</span>
      </nav>

      <div className="products-page-header-grid">
        <div className="products-page-header-copy">
          <div className="products-page-header-eyebrow">
            <span className="products-page-header-rule" aria-hidden="true" />
            <span>Danh mục AutoVIP</span>
          </div>
          <h1 className="products-page-title">
            Bộ sưu tập
            <span className="products-page-title-accent"> sản phẩm</span>
          </h1>
          <p className="products-page-desc">
            Xe sang được kiểm định chất lượng — lọc theo thương hiệu, dòng xe, mức giá và khu vực.
          </p>
        </div>

        <div className="products-page-stats" aria-label="Thống kê">
          <div className="products-page-stat">
            <span className="products-page-stat-value">{total.toLocaleString()}</span>
            <span className="products-page-stat-label">Sản phẩm</span>
          </div>
          <div className="products-page-stat">
            <span className="products-page-stat-value">100%</span>
            <span className="products-page-stat-label">Kiểm định</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProductsHero;
