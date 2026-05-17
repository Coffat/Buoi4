import { useState } from 'react';

const BRANDS = ['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Lexus', 'Toyota', 'Volvo'];
const MODELS = ['Sedan', 'SUV / CUV', 'Coupe', 'Xe điện', 'Pickup', 'Crossover'];
const PRICES = [
  { label: 'Mọi giá', value: '' },
  { label: 'Dưới 500 triệu', value: '0-500' },
  { label: '500tr – 1 tỷ', value: '500-1000' },
  { label: '1 – 2 tỷ', value: '1000-2000' },
  { label: '2 – 5 tỷ', value: '2000-5000' },
  { label: 'Trên 5 tỷ', value: '5000+' },
];
const YEARS = ['2024', '2023', '2022', '2021', '2020', '2019', '2018'];

const FilterField = ({ label, children, isLast = false }) => (
  <div
    className={`flex-1 min-w-0 flex flex-col justify-center px-5 py-3.5 ${
      isLast ? '' : 'border-r border-[#1e2430]'
    }`}
  >
    <label className="text-[10px] text-[#D4AF37] uppercase tracking-[0.18em] font-semibold mb-1.5">
      {label}
    </label>
    <div className="relative">
      {children}
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c6578] pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

const SearchBar = ({ overlay = false }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    document.getElementById('xe-noi-bat')?.scrollIntoView({ behavior: 'smooth' });
  };

  const selectClass =
    'w-full bg-transparent text-[#e8eaed] text-[13px] py-1 outline-none appearance-none cursor-pointer pr-6';

  if (!overlay) {
    return (
      <div id="hero-search" className="bg-[#0f1218] border-y border-[#1e2430]">
        <div className="luxury-container">
          <form onSubmit={handleSearch}>
            <SearchFields
              brand={brand}
              setBrand={setBrand}
              model={model}
              setModel={setModel}
              price={price}
              setPrice={setPrice}
              year={year}
              setYear={setYear}
              selectClass={selectClass}
            />
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      id="hero-search"
      className="luxury-card shadow-[0_12px_48px_rgba(0,0,0,0.55)] overflow-hidden"
    >
      <form onSubmit={handleSearch}>
        <SearchFields
          brand={brand}
          setBrand={setBrand}
          model={model}
          setModel={setModel}
          price={price}
          setPrice={setPrice}
          year={year}
          setYear={setYear}
          selectClass={selectClass}
        />
      </form>
    </div>
  );
};

const SearchFields = ({
  brand,
  setBrand,
  model,
  setModel,
  price,
  setPrice,
  year,
  setYear,
  selectClass,
}) => (
  <div className="flex flex-col lg:flex-row lg:items-stretch">
    <FilterField label="Thương hiệu">
      <select value={brand} onChange={(e) => setBrand(e.target.value)} className={selectClass}>
        <option value="">Chọn thương hiệu</option>
        {BRANDS.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
    </FilterField>

    <FilterField label="Dòng xe">
      <select value={model} onChange={(e) => setModel(e.target.value)} className={selectClass}>
        <option value="">Chọn dòng xe</option>
        {MODELS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </FilterField>

    <FilterField label="Khoảng giá">
      <select value={price} onChange={(e) => setPrice(e.target.value)} className={selectClass}>
        {PRICES.map((p) => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>
    </FilterField>

    <FilterField label="Năm sản xuất" isLast>
      <select value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
        <option value="">Mọi năm</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </FilterField>

    <div className="flex items-stretch lg:flex-shrink-0 border-t lg:border-t-0 border-[#1e2430]">
      <button
        type="submit"
        className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#c49b28] text-[#0a0a0a] font-semibold px-8 py-4 lg:py-0 lg:min-w-[200px] transition-colors text-[13px] whitespace-nowrap"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Tìm kiếm kho xe
      </button>
    </div>
  </div>
);

export default SearchBar;
