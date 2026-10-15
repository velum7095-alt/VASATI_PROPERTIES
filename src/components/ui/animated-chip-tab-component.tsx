'use client';

import { motion } from "framer-motion";
import { useState } from "react";

const defaultTabs = ["Home", "Search", "About", "FAQ"];

interface ChipProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
}

export interface ChipTabsProps {
  tabs?: string[];
  selected?: string;
  onSelect?: (tab: string) => void;
  className?: string;
}

const ChipTabs = ({
  tabs = defaultTabs,
  selected: controlledSelected,
  onSelect,
  className = "",
}: ChipTabsProps = {}) => {
  const [internalSelected, setInternalSelected] = useState(tabs[0]);
  const isControlled = controlledSelected !== undefined;
  const currentSelected = isControlled ? controlledSelected : internalSelected;

  const handleSelect = (tab: string) => {
    if (!isControlled) {
      setInternalSelected(tab);
    }
    onSelect?.(tab);
  };

  return (
    <div className={`px-4 py-2 bg-background flex items-center flex-wrap gap-2 text-foreground ${className}`}>
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={currentSelected === tab}
          setSelected={handleSelect}
          key={tab}
        />
      ))}
    </div>
  );
};

const Chip = ({
  text,
  selected,
  setSelected,
}: ChipProps) => {
  return (
    <button
      type="button"
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-white"
          : "text-foreground hover:text-slate-200 hover:bg-slate-700"
      } text-sm transition-colors px-2.5 py-1 rounded-md relative cursor-pointer`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
        />
      )}
    </button>
  );
};

export default ChipTabs;
export { ChipTabs, Chip };
