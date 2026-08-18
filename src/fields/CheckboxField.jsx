export default function CheckboxField({ field, value, onChange }) {
  return (
    <label className="field-checkbox">
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(field.name, e.target.checked)}
      />
      <span>{field.checkboxLabel}</span>
    </label>
  );
}
