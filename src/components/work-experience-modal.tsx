"use client";

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface WorkExperienceModalProps {
  isVisible: boolean;
  position: { x: number; y: number };
  company: string;
  companyKey: string;
  logoUrl: string;
  onClose: () => void;
}

export function WorkExperienceModal({ 
  isVisible, 
  position, 
  company, 
  companyKey, 
  logoUrl,
  onClose 
}: WorkExperienceModalProps) {
  const t = useTranslations();
  
  // Get the tasks for this company
  const tasks = t.raw(`companies.${companyKey}.tasks`) as string[] || [];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }}
      className="fixed z-[9999] bg-background border border-border rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto pointer-events-none"
      style={{
        left: `${position.x + 10}px`,
        top: `${position.y - 100}px`
      }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image 
              src={logoUrl} 
              alt={`${company} logo`}
              width={24}
              height={24}
              className="w-6 h-6 rounded-sm object-contain"
            />
            <h3 className="font-semibold text-sm text-foreground">
              {company}
            </h3>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
            {t(`companies.${companyKey}.title`)}
          </span>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground">
            Key Responsibilities:
          </h4>
          {tasks.length > 0 ? (
            <ul className="space-y-1.5">
              {tasks.slice(0, 6).map((task, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.2
                  }}
                  className="text-xs flex items-start gap-2 text-muted-foreground"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{task}</span>
                </motion.li>
              ))}
              {tasks.length > 6 && (
                <li className="text-xs text-muted-foreground italic">
                  ... and {tasks.length - 6} more responsibilities
                </li>
              )}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground">No tasks available</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}