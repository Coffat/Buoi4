const FormField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  hint,
}) => (
  <div>
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="form-input"
    />
    {hint && <p className="text-[#52525B] text-[11px] mt-1.5 font-light">{hint}</p>}
  </div>
);

export default FormField;
