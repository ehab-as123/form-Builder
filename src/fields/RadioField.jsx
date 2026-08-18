export default function RadioField({ field, value, onChange }) {
  return (
    <div className="field-radio-group">
      {field.options.map((opt) => (
        <label key={opt.value} className="field-radio">
          <input
            type="radio"
            name={field.name}
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
