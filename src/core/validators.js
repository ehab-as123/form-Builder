/**
 * نظام التحقق (Validation System)
 * -------------------------------
 * كل قاعدة هي دالة بالشكل: (value, rule, allValues) => errorMessage | null
 * لإضافة قاعدة جديدة: ضيف مفتاح جديد بـ VALIDATORS وخلص —
 * بدون ما تلمس أي كود ثاني بالمشروع (extensible by design).
 */
export const VALIDATORS = {
  required: (value, rule) => {
    const isEmpty =
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);
    return isEmpty ? rule.message || "هذا الحقل مطلوب" : null;
  },

  minLength: (value, rule) => {
    if (!value) return null;
    return value.length < rule.value
      ? rule.message || `يجب ألا يقل عن ${rule.value} أحرف`
      : null;
  },

  maxLength: (value, rule) => {
    if (!value) return null;
    return value.length > rule.value
      ? rule.message || `يجب ألا يزيد عن ${rule.value} أحرف`
      : null;
  },

  pattern: (value, rule) => {
    if (!value) return null;
    const regex = new RegExp(rule.value);
    return !regex.test(value) ? rule.message || "الصيغة غير صحيحة" : null;
  },

  min: (value, rule) => {
    if (value === "" || value === undefined) return null;
    return Number(value) < rule.value
      ? rule.message || `يجب ألا يقل عن ${rule.value}`
      : null;
  },

  max: (value, rule) => {
    if (value === "" || value === undefined) return null;
    return Number(value) > rule.value
      ? rule.message || `يجب ألا يزيد عن ${rule.value}`
      : null;
  },

  // قاعدة مفتوحة لأي منطق خاص يكتبه المطوّر بنفسه
  custom: (value, rule, allValues) => rule.validate(value, allValues) || null,
};

/**
 * تشغّل كل قواعد حقل واحد وترجع أول رسالة خطأ تصادفها
 */
export function validateField(value, validationRules = {}, allValues = {}) {
  for (const ruleName of Object.keys(validationRules)) {
    const validatorFn = VALIDATORS[ruleName];
    if (!validatorFn) continue;

    const ruleConfig =
      typeof validationRules[ruleName] === "object"
        ? validationRules[ruleName]
        : { value: validationRules[ruleName] };

    const error = validatorFn(value, ruleConfig, allValues);
    if (error) return error;
  }
  return null;
}

/**
 * تسمح بتسجيل قاعدة تحقق جديدة من أي مكان بالمشروع
 */
export function registerValidator(name, validatorFn) {
  VALIDATORS[name] = validatorFn;
}
