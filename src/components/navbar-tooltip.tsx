"use client";

import { motion } from "framer-motion";

interface NavbarTooltipProps {
  isVisible: boolean;
  position: { x: number; y: number };
  content: string;
}

export function NavbarTooltip({ 
  isVisible, 
  position, 
  content 
}: NavbarTooltipProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6, y: 20 }}
      transition={{
        type: "spring",
        damping: 15,
        stiffness: 500,
        mass: 0.8
      }}
      className="fixed z-[9999] bg-background border border-border rounded-md shadow-xl px-3 py-2 pointer-events-none backdrop-blur-sm"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 50}px`, // Position above the button
        transform: 'translateX(-50%)' // Center horizontally
      }}
    >
      <div className="text-sm font-medium text-foreground whitespace-nowrap">
        {content}
      </div>
      {/* Arrow pointing down */}
      <div 
        className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"
      />
      <div 
        className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-background"
        style={{ marginTop: '-1px' }}
      />
    </motion.div>
  );
}