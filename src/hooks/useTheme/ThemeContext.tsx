import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: (theme?: Theme | undefined) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Garante que o valor inicial do tema seja consistente
  const getInitialTheme = (): Theme => {
    const stored = localStorage.getItem("INFRA_WATCH_THEME");
    if (stored === "light" || stored === "dark") return stored;
    localStorage.setItem("INFRA_WATCH_THEME", "dark");
    return "dark";
  };
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Sincroniza o estado do tema com o localStorage, inclusive para mudanças externas
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (
        e.key === "INFRA_WATCH_THEME" &&
        (e.newValue === "light" || e.newValue === "dark")
      ) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleTheme = (newTheme?: Theme) => {
    let next: Theme;
    if (newTheme === "light" || newTheme === "dark") {
      next = newTheme;
    } else {
      next = theme === "light" ? "dark" : "light";
    }
    localStorage.setItem("INFRA_WATCH_THEME", next);
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
