import React, { Children } from "react";
import { CustomDivProps } from "./@types";
import { useTheme } from "../../hooks/useTheme/useTheme";
import "./CustomComponents.styles.css";

// CustomDiv é um componente customizado
// É um clone autêntico da div isto significa que voce pode ser usado como se estivesse a usar uma div comum
// Porém com uma diferencazinha a propriedade backGroundColor nao pode ser alterada porque ele usa o hook useTheme para renderizar o background do tema actual
// prop <type> importante para que os backgrounds (destaque e fundo) sejam exibidos
// type é um ENUM que recebe 'foreground' ou 'background' indica se a div terá a cor de destaque ou de fundo do tema actual

const CustomDiv: React.FC<CustomDivProps> = ({
  type,
  className,
  children,
  ...props
}) => {
  const { theme, toggleTheme } = useTheme();
  const data = localStorage.getItem("INFRA_WATCH_THEME") || null;

  React.useEffect(() => {
    if (data) toggleTheme(data as "dark" | "light");
    console.log("HEY!!!!!!");
    console.log(data);
  }, []);
  return (
    <div
      {...props}
      className={
        className +
        " " +
        (theme == "dark"
          ? type == "background"
            ? "div-dark-mode-bg"
            : "div-dark-mode-fg"
          : type == "background"
          ? "div-light-mode-bg"
          : "div-light-mode-fg")
      }
    >
      {children}
    </div>
  );
};

export default CustomDiv;
