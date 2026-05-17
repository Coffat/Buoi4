import { useState } from 'react';

const BRANDS = ['Tất cả Thương hiệu', 'Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Lexus', 'Toyota'];
const BODY_TYPES = ['Tất cả Dòng xe', 'SUV', 'Sedan', 'Coupe', 'Bán tải', 'Crossover', 'Điện'];
const FUEL_TYPES = ['Tất cả Nhiên liệu', 'Xăng', 'Dầu', 'Hybrid', 'Plug-in Hybrid', 'Điện'];
const TRANSMISSIONS = ['Tất cả Hộp số', 'Tự động', 'Số sàn', 'CVT'];
const LOCATIONS = ['Tất cả Địa điểm', 'Hà Nội', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'TP.HCM'];

const SectionLabel = ({ children }) => (
  <h3 className="text-[10px] text-zinc-400 uppercase tracking-[0.18em] font-semibold mb-2.5">
    {children}
  </h3>
);

const SelectInput = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#080809] border border-[#1D1D20] text-zinc-300 text-[13px] px-3.5 py-2.5 pr-8 rounded-none appearance-none focus:border-[#C5B49E] focus:outline-none cursor-pointer transition-colors font-light"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#111112] text-zinc-300">{o}</option>
      ))}
    </select>
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none"
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

const RangeSlider = ({ min, max, valueMin, valueMax, onChangeMin, onChangeMax, formatLabel }) => (
  <div className="space-y-3">
    <div className="relative h-1 bg-[#1B1B1D] rounded-none">
      <div
        className="absolute h-full bg-[#C5B49E] rounded-none"
        style={{
          left: `${((valueMin - min) / (max - min)) * 100}%`,
          right: `${100 - ((valueMax - min) / (max - min)) * 100}%`,
        }}
      />
      <input
        type="range" min={min} max={max} value={valueMin}
        onChange={(e) => onChangeMin(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      />
    </div>
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-[#080809] border border-[#1D1D20] rounded-none px-2 py-1.5 text-center">
        <span className="text-zinc-300 text-[11px] font-mono">{formatLabel(valueMin)}</span>
      </div>
      <span className="text-zinc-600 text-xs">—</span>
      <div className="flex-1 bg-[#080809] border border-[#1D1D20] rounded-none px-2 py-1.5 text-center">
        <span className="text-zinc-300 text-[11px] font-mono">{formatLabel(valueMax)}</span>
      </div>
    </div>
  </div>
);

const CheckboxItem = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group">
    <div
      className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center transition-colors rounded-none ${
        checked ? 'bg-[#C5B49E] border-[#C5B49E]' : 'border-zinc-800 group-hover:border-zinc-600 bg-transparent'
      }`}
      onClick={() => onChange(!checked)}
    >
      {checked && (
        <svg className="w-2.5 h-2.5 text-[#080809]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <span className={`text-[13px] font-light transition-colors ${checked ? 'text-[#C5B49E]' : 'text-zinc-400 group-hover:text-white'}`}>
      {label}
    </span>
  </label>
);

const FilterSidebar = ({ filters, onChange, onReset, totalResults }) => {
  const { brand, bodyType, priceMin, priceMax, yearMin, yearMax, fuelTypes, transmission, mileageMax, location } = filters;

  const toggleFuel = (fuel) => {
    const updated = fuelTypes.includes(fuel)
      ? fuelTypes.filter((f) => f !== fuel)
      : [...fuelTypes, fuel];
    onChange({ ...filters, fuelTypes: updated });
  };

  return (
    <aside className="w-full lg:w-[240px] flex-shrink-0">
      <div className="luxury-card p-5 space-y-6 sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#1D1D20]">
          <h2 className="text-white uppercase tracking-wider font-medium text-[12px] font-sans">Bộ lọc</h2>
          <button
            type="button"
            onClick={onReset}
            className="text-[10px] text-[#C5B49E] hover:text-white tracking-wider uppercase transition-colors font-medium cursor-pointer"
          >
            Xóa lọc
          </button>
        </div>

        {/* Brand */}
        <div>
          <SectionLabel>Thương hiệu</SectionLabel>
          <SelectInput
            value={brand}
            onChange={(v) => onChange({ ...filters, brand: v })}
            options={BRANDS}
          />
        </div>

        {/* Body Type */}
        <div>
          <SectionLabel>Dòng xe</SectionLabel>
          <SelectInput
            value={bodyType}
            onChange={(v) => onChange({ ...filters, bodyType: v })}
            options={BODY_TYPES}
          />
        </div>

        {/* Price Range */}
        <div>
          <SectionLabel>Khoảng giá</SectionLabel>
          <RangeSlider
            min={500}
            max={10000}
            valueMin={priceMin}
            valueMax={priceMax}
            onChangeMin={(v) => onChange({ ...filters, priceMin: Math.min(v, priceMax - 100) })}
            onChangeMax={(v) => onChange({ ...filters, priceMax: Math.max(v, priceMin + 100) })}
            formatLabel={(v) => v >= 10000 ? '10 Tỷ+' : v >= 1000 ? `${(v / 1000).toFixed(1)} Tỷ` : `${v} Tr`}
          />
        </div>

        {/* Year */}
        <div>
          <SectionLabel>Năm sản xuất</SectionLabel>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <select
                value={yearMin}
                onChange={(e) => onChange({ ...filters, yearMin: e.target.value })}
                className="w-full bg-[#080809] border border-[#1D1D20] text-zinc-300 text-[12px] px-2.5 py-2 pr-6 rounded-none appearance-none focus:border-[#C5B49E] focus:outline-none cursor-pointer font-light"
              >
                {['Từ năm', '2018', '2019', '2020', '2021', '2022', '2023', '2024'].map((y) => (
                  <option key={y} value={y} className="bg-[#111112] text-zinc-300">{y}</option>
                ))}
              </select>
              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex-1 relative">
              <select
                value={yearMax}
                onChange={(e) => onChange({ ...filters, yearMax: e.target.value })}
                className="w-full bg-[#080809] border border-[#1D1D20] text-zinc-300 text-[12px] px-2.5 py-2 pr-6 rounded-none appearance-none focus:border-[#C5B49E] focus:outline-none cursor-pointer font-light"
              >
                {['Đến năm', '2018', '2019', '2020', '2021', '2022', '2023', '2024'].map((y) => (
                  <option key={y} value={y} className="bg-[#111112] text-zinc-300">{y}</option>
                ))}
              </select>
              <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500 pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <SectionLabel>Nhiên liệu</SectionLabel>
          <div className="space-y-2">
            {FUEL_TYPES.map((fuel) => (
              <CheckboxItem
                key={fuel}
                label={fuel}
                checked={fuelTypes.includes(fuel)}
                onChange={() => toggleFuel(fuel)}
              />
            ))}
          </div>
        </div>

        {/* Transmission */}
        <div>
          <SectionLabel>Hộp số</SectionLabel>
          <SelectInput
            value={transmission}
            onChange={(v) => onChange({ ...filters, transmission: v })}
            options={TRANSMISSIONS}
          />
        </div>

        {/* Mileage */}
        <div>
          <SectionLabel>Số km đã đi</SectionLabel>
          <div className="relative h-1 bg-[#1B1B1D] rounded-none mb-3">
            <div
              className="absolute h-full bg-[#C5B49E] rounded-none left-0"
              style={{ width: `${(mileageMax / 150000) * 100}%` }}
            />
            <input
              type="range" min={0} max={150000} step={5000} value={mileageMax}
              onChange={(e) => onChange({ ...filters, mileageMax: Number(e.target.value) })}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300 text-[11px] bg-[#080809] border border-[#1D1D20] px-2 py-1 rounded-none font-mono">0 km</span>
            <span className="text-zinc-300 text-[11px] bg-[#080809] border border-[#1D1D20] px-2 py-1 rounded-none font-mono">
              {mileageMax >= 150000 ? '150.000+ km' : `${mileageMax.toLocaleString()} km`}
            </span>
          </div>
        </div>

        {/* Location */}
        <div>
          <SectionLabel>Địa điểm</SectionLabel>
          <SelectInput
            value={location}
            onChange={(v) => onChange({ ...filters, location: v })}
            options={LOCATIONS}
          />
        </div>

        {/* CTA */}
        <button
          type="button"
          className="w-full luxury-btn-primary py-3"
        >
          Hiển thị {totalResults} kết quả
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
