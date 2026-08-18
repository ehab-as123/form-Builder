export default function TextareaField({ field, value, onChange, onBlur, hasError }) {
  return (
    <textarea
      className={`field-input field-textarea ${hasError ? "field-input--error" : ""}`}
      value={value ?? ""}
      placeholder={field.placeholder}
      rows={field.rows || 3}
      onChange={(e) => onChange(field.name, e.target.value)}
      onBlur={() => onBlur(field.name)}
    />
  );
}
