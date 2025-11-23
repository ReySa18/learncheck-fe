export default function FeedbackItem({ label, value }) {
  return (
    <div className="mb-3">
      <div className="font-semibold text-gray-700">{label}</div>
      <div className="mt-1 bg-gray-50 p-3 rounded-lg border text-sm">
        {value}
      </div>
    </div>
  );
}
