import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InventoryHero from '../components/inventory/InventoryHero';
import FilterSidebar from '../components/inventory/FilterSidebar';
import CarCardInventory from '../components/inventory/CarCardInventory';
import ContactCTA from '../components/home/ContactCTA';
import { fetchProducts } from '../store/slices/productSlice';

// API provides all products data through Redux

const SORT_OPTIONS = ['Mới nhất', 'Giá: Thấp đến Cao', 'Giá: Cao đến Thấp', 'Số km: Ít đến Nhiều'];

const DEFAULT_FILTERS = {
  brand: 'Tất cả Thương hiệu',
  bodyType: 'Tất cả Dòng xe',
  priceMin: 500,
  priceMax: 10000,
  yearMin: 'Từ năm',
  yearMax: 'Đến năm',
  fuelTypes: ['Tất cả Nhiên liệu'],
  transmission: 'Tất cả Hộp số',
  mileageMax: 150000,
  location: 'Tất cả Địa điểm',
};

// ─── Pagination ──────────────────────────────────────────────────────────────
const Pagination = ({ page, totalPages, onPage }) => {
  const pages = [];
  const delta = 2;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
      pages.push(i);
    }
  }

  const rendered = [];
  let prev = null;
  for (const p of pages) {
    if (prev && p - prev > 1) rendered.push('...');
    rendered.push(p);
    prev = p;
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center border border-[#1e2430] text-[#8b95a5] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {rendered.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="text-[#4b5563] px-1 text-sm">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPage(p)}
            className={`w-8 h-8 text-[13px] font-medium border rounded transition-colors ${
              p === page
                ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0a0a0a]'
                : 'border-[#1e2430] text-[#8b95a5] hover:border-[#D4AF37] hover:text-[#D4AF37]'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-8 h-8 flex items-center justify-center border border-[#1e2430] text-[#8b95a5] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const InventoryPage = () => {
  const dispatch = useDispatch();
  const { list: products, loading, total, totalPages: apiTotalPages } = useSelector(state => state.product);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('Mới nhất');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const ITEMS_PER_PAGE = 8;

  const mapBodyTypeToSlug = (type) => {
    const map = {
      'SUV': 'suv',
      'Sedan': 'sedan',
      'Bán tải': 'ban-tai',
      'Điện': 'xe-dien',
    };
    return map[type] || '';
  };

  const loadProducts = useCallback(() => {
    const params = { page, limit: ITEMS_PER_PAGE };
    
    if (searchQuery) params.search = searchQuery;
    if (sort) params.sort = sort;
    
    if (filters.brand !== 'Tất cả Thương hiệu') params.brand = filters.brand;
    if (filters.bodyType !== 'Tất cả Dòng xe') {
      const slug = mapBodyTypeToSlug(filters.bodyType);
      if (slug) params.category_slug = slug;
    }
    
    if (filters.priceMin !== 500) params.priceMin = filters.priceMin * 1000000;
    if (filters.priceMax !== 10000) params.priceMax = filters.priceMax * 1000000;
    
    if (filters.yearMin !== 'Từ năm') params.yearMin = parseInt(filters.yearMin);
    if (filters.yearMax !== 'Đến năm') params.yearMax = parseInt(filters.yearMax);
    
    // We'll just pass the first fuel type if they select any, since backend fuel_type is a single string for now.
    // Or we could ignore if multiple. Let's just pass the first one that is not "Tất cả"
    const selectedFuels = filters.fuelTypes.filter(f => f !== 'Tất cả Nhiên liệu');
    if (selectedFuels.length > 0) params.fuel_type = selectedFuels[0];
    
    if (filters.transmission !== 'Tất cả Hộp số') params.transmission = filters.transmission;
    if (filters.mileageMax !== 150000) params.mileageMax = filters.mileageMax;
    if (filters.location !== 'Tất cả Địa điểm') params.location = filters.location;

    dispatch(fetchProducts(params));
  }, [dispatch, page, filters, sort, searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPage(1);
  };

  // When filters or sort change, reset page to 1 (except when page itself changes)
  useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  useEffect(() => {
    loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loadProducts]);

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  // Skeleton loader
  const SkeletonCard = () => (
    <div className="luxury-card overflow-hidden animate-pulse">
      <div className="bg-[#1a1f28] aspect-[16/11]" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#1a1f28] w-3/4 rounded" />
        <div className="h-5 bg-[#1a1f28] w-1/2 rounded" />
        <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-[#1e2430]">
          {[1,2,3,4].map((i) => <div key={i} className="h-3 bg-[#1a1f28] rounded" />)}
        </div>
        <div className="h-3 bg-[#1a1f28] w-1/3 rounded" />
      </div>
    </div>
  );

  return (
    <div className="luxury-page min-h-screen">
      {/* Hero */}
      <InventoryHero />

      {/* Main layout */}
      <div className="luxury-container py-8">
        <div className="flex gap-6 items-start">
          {/* ── Sidebar (desktop) ── */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onReset={handleReset}
              totalResults={total || 0}
            />
          </div>

          {/* ── Content area ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 bg-[#0f1218] border border-[#1e2430] px-4 py-3 rounded">
              <div className="flex items-center justify-between w-full md:w-auto">
                <span className="text-[#8b95a5] text-[13px]">
                  <span className="text-white font-semibold">{(total || 0).toLocaleString()}</span> xe được tìm thấy
                </span>
                
                {/* Mobile filter toggle */}
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 border border-[#1e2430] text-[#8b95a5] hover:border-[#D4AF37] hover:text-[#D4AF37] px-3 py-1.5 rounded text-[12px] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h6M13 16h4" />
                  </svg>
                  Bộ lọc
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Tìm kiếm dòng xe..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full bg-[#1a1f28] border border-[#1e2430] text-[#c8cdd6] text-[13px] pl-10 pr-4 py-2 rounded focus:border-[#D4AF37]/50 focus:outline-none transition-colors placeholder-[#4b5563]"
                  />
                  <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4b5563] hover:text-[#D4AF37] transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>

              <div className="flex items-center gap-3 ml-auto flex-wrap">
                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-[#6b7280] text-[12px]">Sắp xếp:</span>
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="bg-[#0f1218] border border-[#1e2430] text-[#c8cdd6] text-[12px] px-3 py-1.5 pr-7 rounded appearance-none focus:border-[#D4AF37]/50 focus:outline-none cursor-pointer"
                    >
                      {SORT_OPTIONS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4b5563] pointer-events-none"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* View mode */}
                <div className="flex border border-[#1e2430] rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-[#D4AF37] text-[#0a0a0a]' : 'text-[#8b95a5] hover:text-white'}`}
                    aria-label="Grid view"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h7v7H3zm11 0h7v7h-7zm0 11h7v7h-7zm-11 0h7v7H3z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-[#D4AF37] text-[#0a0a0a]' : 'text-[#8b95a5] hover:text-white'}`}
                    aria-label="List view"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>

                </div>
              </div>
            </div>

            {/* Car grid */}
            {loading ? (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1'}`}>
                {[1,2,3,4,5,6,7,8].map((i) => <SkeletonCard key={i} />)}
              </div>
            ) : products.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'
                    : 'flex flex-col gap-4'
                }
              >
                {products.map((product, idx) => (
                  <CarCardInventory
                    key={product.id}
                    product={product}
                    index={idx}
                    listMode={viewMode === 'list'}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#0f1218] border border-[#1e2430] rounded-lg p-10 text-center">
                <svg className="w-12 h-12 text-[#4b5563] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-white text-lg font-semibold mb-2">Không tìm thấy xe nào</h3>
                <p className="text-[#8b95a5] text-[14px]">Thử thay đổi bộ lọc tìm kiếm để xem thêm nhiều lựa chọn.</p>
                <button 
                  onClick={handleReset}
                  className="mt-6 px-6 py-2.5 bg-[#1e2430] text-white text-sm font-medium rounded hover:bg-[#2a3040] transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {!loading && products.length > 0 && (
              <Pagination page={page} totalPages={apiTotalPages || 1} onPage={setPage} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-[#05070a]/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#05070a] overflow-y-auto border-r border-[#1e2430]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1e2430]">
              <span className="text-white font-semibold text-sm">Bộ lọc</span>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="text-[#8b95a5] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={handleReset}
                totalResults={total || 0}
              />
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <ContactCTA />
    </div>
  );
};

export default InventoryPage;
