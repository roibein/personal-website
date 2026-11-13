import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Keep in sync with --paper in src/index.css (browser chrome colour).
const THEME_COLORS = { dark: "#09090f", light: "#e2e5eb" };

function readTheme() {
  const params = new URLSearchParams(window.location.search);
  const queryTheme = params.get("theme");
  if (queryTheme === "light" || queryTheme === "dark") return queryTheme;
  return document.documentElement.dataset.theme || "light";
}

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* private mode — the theme still applies for this visit */
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
  }, [theme]);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors duration-150 hover:text-ink ${className}`}
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
