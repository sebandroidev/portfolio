"use client";

import { Icons } from "@/components/icons";
import { LanguageToggle } from "@/components/language-toggle";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { NavbarTooltip } from "@/components/navbar-tooltip";
import { SocialLinksDropdown } from "@/components/social-links-dropdown";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { STATIC_DATA } from "@/data/resume-i18n";
import { Link as I18nLink } from '@/i18n/routing';
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { createPortal } from "react-dom";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  
  // Tooltip state management
  const [tooltipState, setTooltipState] = React.useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    content: ''
  });
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Tooltip handlers
  const handleTooltipMouseEnter = (e: React.MouseEvent, content: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + rect.width / 2, // Center horizontally
      y: rect.top // Top of the button
    };
    
    setTooltipState({
      isVisible: true,
      position,
      content
    });
  };

  const handleTooltipMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setTooltipState(prev => ({ ...prev, isVisible: false }));
    }, 100);
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Download resume function for navbar button
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/NOGBEDJI SEBASTIEN - Resume.pdf';
    link.download = 'NOGBEDJI SEBASTIEN - Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <>
      {/* Full-screen gradient overlay starting from screen bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-24 w-full bg-gradient-to-t from-background to-transparent pointer-events-none z-20"></div>
      
      {/* Dock container */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mb-4 flex origin-bottom h-full max-h-14 dock-container">
        <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] isolate">
        {STATIC_DATA.navbar.map((item) => {
          // Remove locale prefix to get the base path for comparison
          const basePath = pathname.replace(/^\/[a-z]{2}/, '') || '/';
          const isActive = basePath === item.href || 
                          (item.href === '/projects' && basePath.startsWith('/projects'));
          
          return (
            <DockIcon key={item.href}>
              <I18nLink
                href={item.href as any}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12 cursor-pointer",
                  isActive && "bg-accent text-accent-foreground"
                )}
                onMouseEnter={(e) => handleTooltipMouseEnter(e, t(`nav.${item.label.toLowerCase()}`))}
                onMouseLeave={handleTooltipMouseLeave}
              >
                <item.icon className="size-4" />
              </I18nLink>
            </DockIcon>
          );
        })}
        
        {/* Download Resume Button */}
        <DockIcon>
          <button
            onClick={downloadResume}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-12 cursor-pointer"
            )}
            onMouseEnter={(e) => handleTooltipMouseEnter(e, t('nav.downloadResume'))}
            onMouseLeave={handleTooltipMouseLeave}
          >
            <Icons.download className="size-4" />
          </button>
        </DockIcon>
        <Separator orientation="vertical" className="h-full" />
        
        {/* Desktop: Individual social icons */}
        <div className="hidden sm:contents">
          {Object.entries(STATIC_DATA.contact.social)
            .filter(([_, social]) => social.navbar)
            .map(([name, social]) => (
              <DockIcon key={name}>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 cursor-pointer"
                  )}
                  onMouseEnter={(e) => handleTooltipMouseEnter(e, name === 'email' ? t('social.sendEmail') : name)}
                  onMouseLeave={handleTooltipMouseLeave}
                >
                  <social.icon className="size-4" />
                </Link>
              </DockIcon>
            ))}
        </div>
        
        {/* Mobile: Social links dropdown */}
        <div className="sm:hidden">
          <DockIcon>
            <div
              onMouseEnter={(e) => handleTooltipMouseEnter(e, t('nav.socialLinks'))}
              onMouseLeave={handleTooltipMouseLeave}
            >
              <SocialLinksDropdown />
            </div>
          </DockIcon>
        </div>
        
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <div
            onMouseEnter={(e) => handleTooltipMouseEnter(e, t('nav.theme'))}
            onMouseLeave={handleTooltipMouseLeave}
          >
            <ModeToggle />
          </div>
        </DockIcon>
        <DockIcon>
          <div
            onMouseEnter={(e) => handleTooltipMouseEnter(e, t('nav.language'))}
            onMouseLeave={handleTooltipMouseLeave}
          >
            <LanguageToggle />
          </div>
        </DockIcon>
        </Dock>
      </div>
      
      {/* Custom tooltip portal */}
      {tooltipState.isVisible && typeof window !== 'undefined' && createPortal(
        <NavbarTooltip
          isVisible={tooltipState.isVisible}
          position={tooltipState.position}
          content={tooltipState.content}
        />,
        document.body
      )}
    </>
  );
}
