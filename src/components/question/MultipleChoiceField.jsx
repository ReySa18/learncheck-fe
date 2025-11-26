import OptionItem from "./OptionItem";
import ClearButton from "./ClearButton";

export default function MultipleChoiceField({ 
  options = [], 
  value, 
  onChange, 
  onClear,
  multiple = false 
}) {

  const selectedIndexes = Array.isArray(value)
    ? value
    : typeof value === "number"
    ? [value]
    : [];

  return (
    <div className="space-y-3 mt-3">

      {options.map((opt, idx) => {
        const isSelected = selectedIndexes.includes(idx);

        return (
          <OptionItem
            key={idx}
            label={opt}
            isSelected={isSelected}
            multiple={multiple}
            onSelect={() => onChange(idx)}
          />
        );
      })}

      {(selectedIndexes.length > 0) && (
        <ClearButton onClear={onClear} />
      )}
    </div>
  );
}
