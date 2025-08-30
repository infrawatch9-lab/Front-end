import React, { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: (theme?: Theme | undefined ) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const data = localStorage.getItem("INFRA_WATCH_THEME") || null;
  if (!data)
    localStorage.setItem("INFRA_WATCH_THEME", 'dark');
  const [theme, setTheme] = useState<Theme>(data as 'dark' || 'light');

  const toggleTheme = (theme?: Theme | undefined) => {
  if (typeof theme == 'undefined')
  {
    setTheme((prev) => {
      localStorage.setItem("INFRA_WATCH_THEME", prev === "light" ? "dark" : "light");
      return (prev === "light" ? "dark" : "light")
    })
  }
  else
  {
    localStorage.setItem("INFRA_WATCH_THEME", theme);
    setTheme(theme);
  }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
