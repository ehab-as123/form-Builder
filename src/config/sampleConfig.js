/**
 * هذا هو المثال المطلوب بالتاسك بالضبط:
 * فورم كامل مُعرَّف بمصفوفة config واحدة فقط.
 * جرّب تضيف حقل جديد هنا وشوفه يظهر تلقائياً بدون أي تعديل ثاني بالكود.
 */
export const sampleConfig = [
  {
    name: "fullName",
    type: "text",
    label: "الاسم الكامل",
    placeholder: "اكتب اسمك...",
    validation: { required: true, minLength: { value: 3 } },
  },
  {
    name: "email",
    type: "email",
    label: "البريد الإلكتروني",
    placeholder: "example@mail.com",
    validation: {
      required: true,
      pattern: {
        value: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "بريد إلكتروني غير صحيح",
      },
    },
  },
  {
    name: "country",
    type: "select",
    label: "الدولة",
    placeholder: "اختر دولتك",
    options: [
      { label: "الأردن", value: "jo" },
      { label: "السعودية", value: "sa" },
      { label: "الإمارات", value: "ae" },
    ],
    validation: { required: true },
  },
  {
    name: "bio",
    type: "textarea",
    label: "نبذة عنك",
    placeholder: "اكتب نبذة قصيرة...",
    helperText: "150 حرف كحد أقصى",
    validation: { maxLength: { value: 150 } },
  },
  {
    name: "experience",
    type: "radio",
    label: "مستوى الخبرة",
    options: [
      { label: "مبتدئ", value: "junior" },
      { label: "متوسط", value: "mid" },
      { label: "متقدم", value: "senior" },
    ],
    validation: { required: true },
  },
  {
    name: "agree",
    type: "checkbox",
    checkboxLabel: "أوافق على الشروط والأحكام",
    validation: { required: { message: "لازم توافق للمتابعة" } },
  },
];
