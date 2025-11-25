import HintButton from "./HintButton";
import HintContent from "./HintContent";
import MultipleChoiceField from "./MultipleChoiceField";
import ClearButton from "./ClearButton"; // boleh hapus ini jika tidak dipakai

export default function QuestionCard({
  question,
  index,
  total,
  answer,
  onAnswerChange,
  onClearAnswer,
  showHint,
  onToggleHint,
}) {
  return (
    <div
      className="
        bg-white dark:bg-gray-800 
        text-gray-900 dark:text-gray-100
        border border-gray-200 dark:border-gray-700
        shadow p-5 rounded-2xl mb-6
      "
    >
      <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">
        Soal {index + 1} dari {total}
      </div>

      <div className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
        {question.text}
      </div>

      {question.hint && (
        <>
          <HintButton isOpen={showHint} onToggle={onToggleHint} />
          <HintContent hint={question.hint} isOpen={showHint} />
        </>
      )}

      <MultipleChoiceField
        options={question.options}
        value={answer}
        onChange={onAnswerChange}
        onClear={onClearAnswer}   
      />

    </div>
  );
}
