import { useState } from 'react';

const BRANDS = ['Tất cả Thương hiệu', 'Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Land Rover', 'Lexus', 'Toyota'];
const BODY_TYPES = ['Tất cả Dòng xe', 'SUV', 'Sedan', 'Coupe', 'Bán tải', 'Crossover', 'Điện'];
const FUEL_TYPES = ['Tất cả Nhiên liệu', 'Xăng', 'Dầu', 'Hybrid', 'Plug-in Hybrid', 'Điện'];
const TRANSMISSIONS = ['Tất cả Hộp số', 'Tự động', 'Số sàn', 'CVT'];
const LOCATIONS = ['Tất cả Địa điểm', 'Hà Nội', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'TP.HCM'];

const SectionLabel = ({ children }) => (
  <h3 className="text-[11px] text-[#6b7280] uppercase tracking-[0.2em] font-semibold mb-2">
    {children}
  </h3>
);

const SelectInput = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#0f1218] border border-[#1e2430] text-[#c8cdd6] text-[13px] px-3 py-2.5 pr-8 rounded appearance-none focus:border-[#D4AF37]/50 focus:outline-none cursor-pointer transition-colors"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
    <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563] pointer-events-none"
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  </div>
);

const RangeSlider = ({ min, max, valueMin, valueMax, onChangeMin, onChangeMax, formatLabel }) => (
  <div className="space-y-3">
    <div className="relative h-1.5 bg-[#1e2430] rounded-full">
      <div
        className="absolute h-full bg-[#D4AF37] rounded-full"
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
      <div className="flex-1 bg-[#0f1218] border border-[#1e2430] rounded px-2 py-1.5 text-center">
        <span className="text-[#c8cdd6] text-[11px]">{formatLabel(valueMin)}</span>
      </div>
      <span className="text-[#4b5563] text-xs">—</span>
      <div className="flex-1 bg-[#0f1218] border border-[#1e2430] rounded px-2 py-1.5 text-center">
        <span className="text-[#c8cdd6] text-[11px]">{formatLabel(valueMax)}</span>
      </div>
    </div>
  </div>
);

const CheckboxItem = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group">
    <div
      className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors ${
        checked ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-[#374151] group-hover:border-[#D4AF37]/50'
      }`}
      onClick={() => onChange(!checked)}
    >
      {checked && (
        <svg className="w-2.5 h-2.5 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <span className={`text-[13px] transition-colors ${checked ? 'text-[#D4AF37]' : 'text-[#8b95a5] group-hover:text-white'}`}>
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
    <aside className="w-full lg:w-[220px] flex-shrink-0">
      <div className="luxury-card p-5 space-y-5 sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1e2430]">
          <h2 className="text-white font-semibold text-[14px]">Bộ lọc tìm kiếm</h2>
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-[#D4AF37] hover:text-[#F0D060] transition-colors font-medium"
          >
            Xóa bộ lọc
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
                className="w-full bg-[#0f1218] border border-[#1e2430] text-[#c8cdd6] text-[12px] px-2 py-2 pr-6 rounded appearance-none focus:border-[#D4AF37]/50 focus:outline-none cursor-pointer"
              >
                {['Từ năm', '2018', '2019', '2020', '2021', '2022', '2023', '2024'].map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
              <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#4b5563] pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex-1 relative">
              <select
                value={yearMax}
                onChange={(e) => onChange({ ...filters, yearMax: e.target.value })}
                className="w-full bg-[#0f1218] border border-[#1e2430] text-[#c8cdd6] text-[12px] px-2 py-2 pr-6 rounded appearance-none focus:border-[#D4AF37]/50 focus:outline-none cursor-pointer"
              >
                {['Đến năm', '2018', '2019', '2020', '2021', '2022', '2023', '2024'].map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
              <svg className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#4b5563] pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
          <div className="relative h-1.5 bg-[#1e2430] rounded-full mb-3">
            <div
              className="absolute h-full bg-[#D4AF37] rounded-full left-0"
              style={{ width: `${(mileageMax / 150000) * 100}%` }}
            />
            <input
              type="range" min={0} max={150000} step={5000} value={mileageMax}
              onChange={(e) => onChange({ ...filters, mileageMax: Number(e.target.value) })}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#c8cdd6] text-[11px] bg-[#0f1218] border border-[#1e2430] px-2 py-1 rounded">0 km</span>
            <span className="text-[#c8cdd6] text-[11px] bg-[#0f1218] border border-[#1e2430] px-2 py-1 rounded">
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
          className="w-full bg-[#D4AF37] hover:bg-[#c49b28] text-[#0a0a0a] font-bold text-[13px] py-3 rounded transition-colors"
        >
          Hiển thị {totalResults} kết quả
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
