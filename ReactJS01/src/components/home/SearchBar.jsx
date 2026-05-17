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
    className={`flex-1 min-w-0 flex flex-col justify-center px-6 py-4 ${
      isLast ? '' : 'border-r border-[#1C1C1F]'
    }`}
  >
    <label className="text-[9px] text-[#C5B49E] uppercase tracking-[0.15em] font-semibold mb-1.5">
      {label}
    </label>
    <div className="relative">
      {children}
      <svg
        className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#52525B] pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
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
    'w-full bg-transparent text-[#FAFAFA] text-[12px] py-1 outline-none appearance-none cursor-pointer pr-6 font-light';

  if (!overlay) {
    return (
      <div id="hero-search" className="bg-[#111112] border-y border-[#18181A]">
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
      className="luxury-card shadow-none border border-[#1C1C1F] overflow-hidden"
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
  <div className="flex flex-col lg:flex-row lg:items-stretch bg-[#111112]">
    <FilterField label="Thương hiệu">
      <select value={brand} onChange={(e) => setBrand(e.target.value)} className={selectClass}>
        <option value="" className="bg-[#111112] text-[#A1A1AA]">Chọn thương hiệu</option>
        {BRANDS.map((b) => (
          <option key={b} value={b} className="bg-[#111112] text-[#FAFAFA]">{b}</option>
        ))}
      </select>
    </FilterField>

    <FilterField label="Dòng xe">
      <select value={model} onChange={(e) => setModel(e.target.value)} className={selectClass}>
        <option value="" className="bg-[#111112] text-[#A1A1AA]">Chọn dòng xe</option>
        {MODELS.map((m) => (
          <option key={m} value={m} className="bg-[#111112] text-[#FAFAFA]">{m}</option>
        ))}
      </select>
    </FilterField>

    <FilterField label="Khoảng giá">
      <select value={price} onChange={(e) => setPrice(e.target.value)} className={selectClass}>
        {PRICES.map((p) => (
          <option key={p.value} value={p.value} className="bg-[#111112] text-[#FAFAFA]">{p.label}</option>
        ))}
      </select>
    </FilterField>

    <FilterField label="Năm sản xuất" isLast>
      <select value={year} onChange={(e) => setYear(e.target.value)} className={selectClass}>
        <option value="" className="bg-[#111112] text-[#A1A1AA]">Mọi năm</option>
        {YEARS.map((y) => (
          <option key={y} value={y} className="bg-[#111112] text-[#FAFAFA]">{y}</option>
        ))}
      </select>
    </FilterField>

    <div className="flex items-stretch lg:flex-shrink-0 border-t lg:border-t-0 border-[#1C1C1F]">
      <button
        type="submit"
        className="w-full lg:w-auto flex items-center justify-center gap-2 bg-[#FAFAFA] hover:bg-transparent hover:text-[#FAFAFA] border border-[#FAFAFA] text-[#080809] font-medium px-8 py-4 lg:py-0 lg:min-w-[180px] transition-all duration-300 text-[11px] tracking-[0.15em] uppercase whitespace-nowrap"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        TÌM KIẾM
      </button>
    </div>
  </div>
);

export default SearchBar;
