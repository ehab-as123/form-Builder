export default function SelectField({ field, value, onChange, onBlur, hasError }) {
  return (
    <select
      className={`field-input field-select ${hasError ? "field-input--error" : ""}`}
      value={value ?? ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      onBlur={() => onBlur(field.name)}
    >
      <option value="">{field.placeholder || "اختر..."}</option>
      {field.options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
