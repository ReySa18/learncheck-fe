import { useEffect, useState } from "react";
import useThemeConfig from "../../hooks/useThemeConfig";

export default function MainCardContainer({
  children,
  className = "",
  preferences,
}) {
  // === THEME CONFIG (dipindahkan dari AppContainer) ===
  const theme = useThemeConfig(preferences);

  // === CEK APAKAH DI IFRAME ===
  const [isInIframe, setIsInIframe] = useState(false);

  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch {
      setIsInIframe(true);
    }
  }, []);

  // === AUTO RESIZE IFRAME ===
  useEffect(() => {
    if (!isInIframe) return;

    const updateHeight = () => {
      const height = document.body.scrollHeight;
      window.parent.postMessage({ learncheck_height: height }, "*");
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(document.body);

    return () => observer.disconnect();
  }, [isInIframe]);

  return (
    <div
      className={`
        bg-white
        dark:bg-gray-900
        rounded-xl
        shadow-lg
        p-6
        border
        border-gray-200
        dark:border-gray-700
        
        ${theme.fontFamily}
        ${theme.fontSize}

        w-full
        ${className}
      `}
      style={{
        maxWidth: theme.layoutWidth ?? "800px",
        margin: "0 auto", // tetap center, tanpa gap luar
      }}
    >
      {children}
    </div>
  );
}
