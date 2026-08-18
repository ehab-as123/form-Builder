import { useCallback, useState } from "react";
import { validateField } from "../core/validators.js";

/**
 * useFormBuilder
 * ---------------
 * يفصل "المنطق" (state + validation) عن "العرض" (JSX).
 * يستقبل مصفوفة config ويرجّع كل شي محتاجه الفورم للشغل.
 */
export function useFormBuilder(config) {
  const buildInitialValues = () => {
    const initial = {};
    config.forEach((field) => {
      initial[field.name] = field.defaultValue ?? (field.type === "checkbox" ? false : "");
    });
    return initial;
  };

  const [values, setValues] = useState(buildInitialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback(
    (name, value) => {
      setValues((prev) => {
        const next = { ...prev, [name]: value };
        const field = config.find((f) => f.name === name);
        const error = validateField(value, field?.validation, next);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        return next;
      });
    },
    [config]
  );

  const handleBlur = useCallback((name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const validateAll = useCallback(() => {
    const newErrors = {};
    const newTouched = {};
    config.forEach((field) => {
      newTouched[field.name] = true;
      newErrors[field.name] = validateField(values[field.name], field.validation, values);
    });
    setErrors(newErrors);
    setTouched(newTouched);
    return Object.values(newErrors).every((err) => !err);
  }, [config, values]);

  const reset = useCallback(() => {
    setValues(buildInitialValues());
    setErrors({});
    setTouched({});
  }, [config]); // eslint-disable-line react-hooks/exhaustive-deps

  return { values, errors, touched, handleChange, handleBlur, validateAll, reset };
}
