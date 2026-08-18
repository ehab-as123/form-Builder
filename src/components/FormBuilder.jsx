import { useState } from "react";
import { useFormBuilder } from "../hooks/useFormBuilder.js";
import FormField from "./FormField.jsx";
import "./FormBuilder.css";

/**
 * FormBuilder
 * ------------
 * المكون الرئيسي: يستقبل config فقط ويبني الفورم كله تلقائياً.
 * props:
 *  - config: مصفوفة تعريفات الحقول
 *  - title: عنوان الفورم (اختياري)
 *  - submitLabel: نص زر الإرسال (اختياري)
 *  - onSubmit(values): يُستدعى عند نجاح التحقق
 */
export default function FormBuilder({ config, title, submitLabel = "إرسال", onSubmit }) {
  const { values, errors, touched, handleChange, handleBlur, validateAll, reset } =
    useFormBuilder(config);
  const [submittedData, setSubmittedData] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = validateAll();
    if (isValid) {
      setSubmittedData(values);
      onSubmit?.(values);
    } else {
      setSubmittedData(null);
    }
  }

  function handleReset() {
    reset();
    setSubmittedData(null);
  }

  return (
    <div className="form-card">
      {title && <h2 className="form-card__title">{title}</h2>}

      <form onSubmit={handleSubmit} className="form-card__form" noValidate>
        {config.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors[field.name]}
            touched={touched[field.name]}
          />
        ))}

        <div className="form-card__actions">
          <button type="submit" className="btn btn--primary">
            {submitLabel}
          </button>
          <button type="button" className="btn btn--ghost" onClick={handleReset}>
            تفريغ
          </button>
        </div>
      </form>

      {submittedData && (
        <div className="form-card__result">
          <p className="form-card__result-title">تم الإرسال بنجاح ✅</p>
          <pre className="form-card__result-json" dir="ltr">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
