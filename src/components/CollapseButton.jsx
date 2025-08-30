import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme/useTheme';

export default function CollapseButton({ isOpen, toggle }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      style={{ boxShadow: "0px 0px 5px rgba(0,0,0,0.5)"}}
      onClick={toggle}
      className="text-[#0B1440] flex items-center justify-center rounded-full shadow  transition-transform hover:scale-105"
    >
      {isOpen ? <ArrowLeft color={ theme == 'dark'? 'white' : "#0B143F"} /> : <ArrowRight color={ theme == 'dark'? 'white' : "#0B143F"} />}
    </button>
  );
}
