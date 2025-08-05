"use client";

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import React from 'react';

interface DownloadResumeButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  showText?: boolean;
}

export const DownloadResumeButton = React.forwardRef<
  HTMLButtonElement,
  DownloadResumeButtonProps
>(({ 
  className, 
  size = "icon", 
  variant = "ghost",
  showText = false,
  ...props
}, ref) => {
  const t = useTranslations();

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/NOGBEDJI SEBASTIEN - Resume.pdf';
    link.download = 'NOGBEDJI SEBASTIEN - Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      ref={ref}
      onClick={downloadResume}
      variant={variant}
      size={size}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      <Icons.download className={showText ? "size-4 mr-2" : "size-4"} />
      {showText && (
        <span>
          {t('nav.downloadResume')}
        </span>
      )}
    </Button>
  );
});

DownloadResumeButton.displayName = "DownloadResumeButton";