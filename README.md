# Dynamic Form Builder

فورم بيلدر ديناميكي مبني بـ React، يولّد الفورم بالكامل من مصفوفة `config` واحدة.

## طريقة التشغيل

```bash
npm install
npm run dev
```

بعدها افتح الرابط اللي بيظهر بالتيرمينال (عادة `http://localhost:5173`).

## هيكل المشروع

```
src/
├── core/
│   ├── fieldRegistry.js   # سجل أنواع الحقول (extensible architecture)
│   └── validators.js      # نظام التحقق (validation rules)
├── fields/
│   ├── TextField.jsx      # حقل نصي (text/email/number)
│   ├── TextareaField.jsx  # حقل نص متعدد الأسطر
│   ├── SelectField.jsx    # قائمة منسدلة
│   ├── CheckboxField.jsx  # مربع اختيار
│   ├── RadioField.jsx     # اختيار من متعدد
│   └── fields.css         # تنسيقات مشتركة للحقول
├── hooks/
│   └── useFormBuilder.js  # الحالة والمنطق (values/errors/touched)
├── components/
│   ├── FormField.jsx      # يعرض label + الحقل + رسالة الخطأ
│   ├── FormBuilder.jsx    # المكوّن الرئيسي
│   └── FormBuilder.css
├── config/
│   └── sampleConfig.js    # مثال config جاهز
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## كيف تضيف نوع حقل جديد

1. أنشئ مكوّن جديد بمجلد `src/fields/` (مثلاً `DateField.jsx`) بنفس شكل باقي الحقول:
   يستقبل `field`, `value`, `onChange`, `onBlur`, `hasError`.
2. سجّله بـ `src/core/fieldRegistry.js`:
   ```js
   import DateField from "../fields/DateField.jsx";
   FIELD_REGISTRY.date = DateField;
   ```
3. استخدمه مباشرة بأي config: `{ name: "birthDate", type: "date", ... }`

بدون ما تلمس أي كود ثاني بالمشروع.

## كيف تضيف قاعدة تحقق جديدة

بملف `src/core/validators.js`، ضيف مفتاح جديد بـ `VALIDATORS`:

```js
VALIDATORS.isAdult = (value, rule) => {
  return Number(value) < 18 ? "يجب أن يكون العمر 18 أو أكثر" : null;
};
```

واستخدمها بالـ config: `validation: { isAdult: true }`
