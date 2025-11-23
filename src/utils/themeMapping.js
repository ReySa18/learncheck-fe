export const mapTheme = (theme) => {
  switch (theme) {
    case "light":
      return "light";
    case "dark":
      return "dark";
    default:
      return "light";
  }
};

export const mapFontSize = (size) => {
  const scale = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl",
  };
  return scale[size] || scale["medium"];
};

export const mapFontFamily = (font) => {
  const mapping = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  };
  return mapping[font] || mapping["sans"];
};
