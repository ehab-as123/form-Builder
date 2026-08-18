import { getFieldComponent } from "../core/fieldRegistry.js";

export default function FormField({ field, value, onChange, onBlur, error, touched }) {
  const FieldComponent = getFieldComponent(field.type);

  if (!FieldComponent) {
    return (
      <p className="field-error">
        نوع حقل غير مدعوم: <code>{field.type}</code>
      </p>
    );
  }

  const showError = touched && error;

  return (
    <div className="form-field">
      {field.type !== "checkbox" && field.label && (
        <label className="form-field__label">
          {field.label}
          {field.validation?.required && <span className="form-field__required"> *</span>}
        </label>
      )}

      <FieldComponent
        field={field}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        hasError={showError}
      />

      {showError && <p className="field-error">{error}</p>}
      {field.helperText && !showError && (
        <p className="field-helper">{field.helperText}</p>
      )}
    </div>
  );
}
