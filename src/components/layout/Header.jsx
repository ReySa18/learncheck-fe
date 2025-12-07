export default function Header() {
  return (
    <div
      className="
        w-full 
        mb-8 
        py-6
        px-4
        text-center
        rounded-2xl
        shadow

        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-gray-100
      "
    >
      <h1 className="text-3xl font-extrabold tracking-tight">
        Learncheck!
      </h1>

      <p className="mt-1 text-base text-gray-600 dark:text-gray-300">
        Formative Assessment Powered with AI
      </p>
    </div>
  );
}
