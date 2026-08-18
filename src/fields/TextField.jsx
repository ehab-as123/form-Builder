export default function TextField({ field, value, onChange, onBlur, hasError }) {
  const inputType =
    field.type === "number" ? "number" : field.type === "email" ? "email" : "text";

  return (
    <input
      type={inputType}
      className={`field-input ${hasError ? "field-input--error" : ""}`}
      value={value ?? ""}
      placeholder={field.placeholder}
      onChange={(e) => onChange(field.name, e.target.value)}
      onBlur={() => onBlur(field.name)}
    />
  );
}
