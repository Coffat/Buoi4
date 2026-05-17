const QuantitySelector = ({ value, max, onChange, disabled }) => {
  const decrease = () => {
    if (value > 1) onChange(value - 1);
  };

  const increase = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-[#1e2430] bg-[#0f1218] rounded">
        <button
          onClick={decrease}
          disabled={value <= 1 || disabled}
          className="w-10 h-10 flex items-center justify-center text-[#8b95a5] hover:text-[#D4AF37] hover:bg-[#1a1f28] disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#8b95a5] disabled:cursor-not-allowed transition-colors text-lg"
        >
          −
        </button>
        <input
          type="text"
          value={value}
          readOnly
          className="w-12 h-10 text-center border-x border-[#1e2430] bg-transparent text-[#c8cdd6] text-sm font-medium outline-none"
        />
        <button
          onClick={increase}
          disabled={value >= max || disabled}
          className="w-10 h-10 flex items-center justify-center text-[#8b95a5] hover:text-[#D4AF37] hover:bg-[#1a1f28] disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#8b95a5] disabled:cursor-not-allowed transition-colors text-lg"
        >
          +
        </button>
      </div>
      <span className="text-[11px] text-[#4b5563]">(Tối đa: {max})</span>
    </div>
  );
};

export default QuantitySelector;
