import React, { useState, ReactNode } from 'react';

interface AccordionSectionProps {
  title: string;
  children: ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-zinc-300  sm:mt-[30px] p-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer text-gray-800 sm:text-[30px] text-sm font-medium"
      >
        <span >{title}</span>
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && <div className="mt-3 text-sm sm:text-xl text-gray-700">{children}</div>}
    </div>
  );
};

export default AccordionSection;
