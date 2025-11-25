import OptionItem from "./OptionItem";
import ClearButton from "./ClearButton";

export default function MultipleChoiceField({ options = [], value, onChange, onClear }) {
  return (
    <div className="space-y-3 mt-3">

      {options.map((opt, idx) => (
        <OptionItem
          key={idx}
          label={opt}
          isSelected={value === opt}
          onSelect={() => onChange(opt)}
        />
      ))}

      {value && (
        <ClearButton onClear={onClear} />
      )}
    </div>
  );
}
