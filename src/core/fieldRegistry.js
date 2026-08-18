import TextField from "../fields/TextField.jsx";
import TextareaField from "../fields/TextareaField.jsx";
import SelectField from "../fields/SelectField.jsx";
import CheckboxField from "../fields/CheckboxField.jsx";
import RadioField from "../fields/RadioField.jsx";

/**
 * سجل الحقول (Field Registry)
 * ----------------------------
 * قاموس يربط "type" الموجود بالـ config مع المكوّن المسؤول عن رسمه.
 * بدل switch/if طويل، أي نوع حقل جديد بالمستقبل (date, file, rating...)
 * يُضاف بسطر واحد فقط، من أي مكان بالمشروع، عبر registerFieldType().
 */
export const FIELD_REGISTRY = {
  text: TextField,
  email: TextField,
  number: TextField,
  textarea: TextareaField,
  select: SelectField,
  checkbox: CheckboxField,
  radio: RadioField,
};

export function registerFieldType(typeName, component) {
  FIELD_REGISTRY[typeName] = component;
}

export function getFieldComponent(typeName) {
  return FIELD_REGISTRY[typeName];
}
