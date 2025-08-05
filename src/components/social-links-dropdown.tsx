"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { STATIC_DATA } from "@/data/resume-i18n";
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { LinkIcon } from "lucide-react";

export function SocialLinksDropdown() {
  const t = useTranslations();

  const socialLinks = Object.entries(STATIC_DATA.contact.social)
    .filter(([_, social]) => social.navbar);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-12 cursor-pointer"
        >
          <LinkIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="center" 
        className="min-w-[160px] border-border/50 backdrop-blur-sm rounded-xl"
        side="top"
        sideOffset={18}
        alignOffset={0}
        avoidCollisions={true}
        collisionPadding={8}
      >
        {socialLinks.map(([name, social]) => (
          <DropdownMenuItem key={name} asChild>
            <Link
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 cursor-pointer w-full"
            >
              <social.icon className="size-4" />
              <span>{name === 'email' ? t('social.sendEmail') : social.name}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}