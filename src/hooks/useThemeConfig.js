import { useEffect, useState, useMemo } from "react";
import { mapTheme, mapFontSize, mapFontFamily } from "../utils/themeMapping";

export default function useThemeConfig(preferencesJson) {
  const [themeConfig, setThemeConfig] = useState({
    layoutWidth: "800px",
    fontFamily: "font-sans",
    fontSize: "text-base",
    theme: "light",
  });

  //Decode JSON hanya jika preferencesJson berubah
  const preferences = useMemo(() => {
    if (typeof preferencesJson === "string") {
      try {
        return JSON.parse(preferencesJson);
      } catch {
        return {};
      }
    }
    return preferencesJson || {};
  }, [preferencesJson]);

  useEffect(() => {
    if (!preferences) return;

    setThemeConfig({
      layoutWidth: mapLayoutWidth(preferences.layoutWidth),
      fontFamily: mapFontFamily(preferences.fontStyle),
      fontSize: mapFontSize(preferences.fontSize),
      theme: mapTheme(preferences.theme),
    });
  }, [preferences]);

  useEffect(() => {
    applyTheme(themeConfig);
  }, [themeConfig]);

  return themeConfig;
}

function mapLayoutWidth(code) {
  const layoutMap = {
    fullWidth: "100%",
    medium: "700px",
    mediumWidth: "700px",
    narrow: "600px",
  };
  return layoutMap[code] || "800px";
}

function applyTheme(theme) {
  const root = document.documentElement;

  root.classList.remove("dark", "light");

  if (theme.theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.add("light");
  }
}
