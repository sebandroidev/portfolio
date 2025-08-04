"use client";

import { LanguageToggle } from "@/components/language-toggle";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { STATIC_DATA } from "@/data/resume-i18n";
import { Link as I18nLink } from '@/i18n/routing';
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <I18nLink
                    href={item.href as any}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 cursor-pointer",
                      isActive && "bg-accent text-accent-foreground"
                    )}
                  >
                    <item.icon className="size-4" />
                  </I18nLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t(`nav.${item.label.toLowerCase()}`)}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          );
        })}
        <Separator orientation="vertical" className="h-full" />
        {Object.entries(STATIC_DATA.contact.social)
          .filter(([_, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 cursor-pointer"
                    )}
                  >
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name === 'email' ? t('social.sendEmail') : name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        <Separator orientation="vertical" className="h-full py-2" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('nav.theme')}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <LanguageToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('nav.language')}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        </Dock>
      </div>
    </>
  );
}
