import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductsHero from '../components/products/ProductsHero';
import ProductsControls from '../components/products/ProductsControls';
import HomeCarCard, { HomeCarCardSkeleton } from '../components/home/HomeCarCard';
import ProductsEmptyState from '../components/products/ProductsEmptyState';
import ProductFilterDrawer from '../components/products/ProductFilterDrawer';
import FilterSidebar from '../components/inventory/FilterSidebar';
import Pagination from '../components/inventory/Pagination';
import { fetchProducts } from '../store/slices/productSlice';

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

const ITEMS_PER_PAGE = 9;

const SORT_MAP = {
  'Mới nhất': { sort: 'created_at', order: 'desc' },
  'Giá: Thấp đến Cao': { sort: 'price', order: 'asc' },
  'Giá: Cao đến Thấp': { sort: 'price', order: 'desc' },
  'Số km: Ít đến Nhiều': { sort: 'mileage', order: 'asc' },
};

const mapBodyTypeToSlug = (type) => {
  const map = {
    SUV: 'suv',
    Sedan: 'sedan',
    'Bán tải': 'ban-tai',
    Điện: 'xe-dien',
  };
  return map[type] || '';
};

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    list,
    loading,
    total,
    totalPages: apiTotalPages,
    error,
  } = useSelector((state) => state.product);
  const products = list ?? [];

  const statusFromUrl = searchParams.get('status') || '';

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('Mới nhất');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const loadProducts = useCallback(() => {
    const params = { page, limit: ITEMS_PER_PAGE };

    if (searchQuery) params.search = searchQuery;
    const sortConfig = SORT_MAP[sort] || SORT_MAP['Mới nhất'];
    params.sort = sortConfig.sort;
    params.order = sortConfig.order;
    if (statusFromUrl) params.status = statusFromUrl;

    if (filters.brand !== 'Tất cả Thương hiệu') params.brand = filters.brand;
    if (filters.bodyType !== 'Tất cả Dòng xe') {
      const slug = mapBodyTypeToSlug(filters.bodyType);
      if (slug) params.category_slug = slug;
    }

    if (filters.priceMin !== 500) params.price_min = filters.priceMin * 1000000;
    if (filters.priceMax !== 10000) params.price_max = filters.priceMax * 1000000;

    if (filters.yearMin !== 'Từ năm') params.year_min = parseInt(filters.yearMin, 10);
    if (filters.yearMax !== 'Đến năm') params.year_max = parseInt(filters.yearMax, 10);

    const selectedFuels = filters.fuelTypes.filter((f) => f !== 'Tất cả Nhiên liệu');
    if (selectedFuels.length > 0) params.fuel_type = selectedFuels[0];

    if (filters.transmission !== 'Tất cả Hộp số') params.transmission = filters.transmission;
    if (filters.mileageMax !== 150000) params.mileage_max = filters.mileageMax;
    if (filters.location !== 'Tất cả Địa điểm') params.location = filters.location;

    dispatch(fetchProducts(params));
  }, [dispatch, page, filters, sort, searchQuery, statusFromUrl]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setPage(1);
  };

  const handleStatusChange = (status) => {
    const next = new URLSearchParams(searchParams);
    if (status) {
      next.set('status', status);
    } else {
      next.delete('status');
    }
    setSearchParams(next, { replace: true });
    setPage(1);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    setSearchInput('');
    setSearchQuery('');
    setPage(1);
    const next = new URLSearchParams(searchParams);
    next.delete('status');
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    setPage(1);
  }, [filters, sort, statusFromUrl]);

  useEffect(() => {
    loadProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loadProducts]);

  useEffect(() => {
    if (loading) return;
    if (total > 0 && page > (apiTotalPages || 1)) {
      setPage(apiTotalPages || 1);
    }
  }, [loading, total, page, apiTotalPages]);

  const gridClass =
    viewMode === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
      : 'flex flex-col gap-5';

  return (
    <div className="products-page">
      <ProductsHero total={total || 0} />

      <ProductsControls
        total={total}
        activeStatus={statusFromUrl}
        onStatusChange={handleStatusChange}
        searchInput={searchInput}
        onSearchInputChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        sort={sort}
        onSortChange={setSort}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenFilters={() => setMobileSidebarOpen(true)}
      />

      <div className="luxury-container products-body">
        <aside className="products-sidebar hidden lg:block">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
            totalResults={total || 0}
          />
        </aside>

        <div className="products-main">
          {loading ? (
            <div className={gridClass}>
              {Array.from({ length: 6 }, (_, i) => (
                <HomeCarCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className={gridClass}>
              {products.map((product) => (
                <HomeCarCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <ProductsEmptyState error={error} onReset={handleReset} />
          )}

          {!loading && products.length > 0 && (
            <Pagination page={page} totalPages={apiTotalPages || 1} onPage={setPage} />
          )}
        </div>
      </div>

      <ProductFilterDrawer
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
        totalResults={total || 0}
      />
    </div>
  );
};

export default ProductsPage;
