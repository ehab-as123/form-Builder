import FormBuilder from "./components/FormBuilder.jsx";
import { sampleConfig } from "./config/sampleConfig.js";
import "./fields/fields.css";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="app__inner">
        <div className="app__header">
          <h1 className="app__title">Form Builder ديناميكي</h1>
          <p className="app__subtitle">
            الفورم بالكامل يتولّد من مصفوفة config واحدة فقط 👇
          </p>
        </div>

        <FormBuilder
          config={sampleConfig}
          title="نموذج التسجيل"
          submitLabel="تسجيل"
          onSubmit={(data) => console.log("submitted:", data)}
        />
      </div>
    </div>
  );
}
