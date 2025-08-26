import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function CollapseButton({ isOpen, toggle }) {
  return (
    <button
      style={{boxShadow: "0px 0px 5px rgba(0,0,0,0.5)"}}
      onClick={toggle}
      className="text-[#0B1440] w-8 h-8 flex items-center justify-center rounded-full shadow mx-auto transition-transform hover:scale-105"
    >
      {isOpen ? <ArrowLeft color='white' /> : <ArrowRight color='white' />}
    </button>
  );
}
