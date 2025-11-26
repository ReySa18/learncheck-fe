import HintButton from "./HintButton";
import HintContent from "./HintContent";
import MultipleChoiceField from "./MultipleChoiceField";
import ClearButton from "./ClearButton"; 

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

  const isMultiple = question.correct_index.length > 1;

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
        {isMultiple && (
          <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded">
            Multiple Answer
          </span>
        )}
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
        multiple={isMultiple}
        onChange={(idx) => onAnswerChange(question.id, idx)}
        onClear={() => onClearAnswer(question.id)}
      />
    </div>
  );
}
