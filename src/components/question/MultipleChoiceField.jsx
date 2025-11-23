import OptionItem from "./OptionItem";
import ClearButton from "./ClearButton";

export default function MultipleChoiceField({ options = [], value, onChange }) {
  return (
    <div className="space-y-3 mt-3">

      {/* OPTIONS */}
      {options.map((opt, idx) => (
        <OptionItem
          key={idx}
          label={opt}
          isSelected={value === opt}
          onSelect={() => onChange(opt)}
        />
      ))}

      {/* CLEAR BUTTON (only if selected) */}
      {value && <ClearButton onClear={() => onChange(null)} />}
    </div>
  );
}
