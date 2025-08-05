"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { WorkExperienceModal } from "@/components/work-experience-modal";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";

interface WorkExperienceCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  companyKey: string; // For looking up tasks in translations
}

export const WorkExperienceCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  companyKey,
}: WorkExperienceCardProps) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.right + 20, // Position further to the right
      y: rect.top + rect.height / 2 // Center vertically
    };
    console.log('Mouse enter:', { position, companyKey, title });
    setMousePosition(position);
    setIsModalVisible(true);
  };

  const handleMouseLeave = () => {
    console.log('Mouse leave:', { companyKey, title });
    // Add a small delay before hiding to prevent flickering
    timeoutRef.current = setTimeout(() => {
      setIsModalVisible(false);
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Always prevent default for work experience cards
  };

  return (
    <>
      <div
        className="block cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
      >
        <Card className="flex transition-all duration-200 hover:bg-accent/50 hover:px-2 hover:py-1 hover:-mx-2 hover:-my-1">
          <div className="flex-none">
            <Avatar className="border size-12 m-auto bg-background">
              <AvatarImage
                src={logoUrl}
                alt={altText}
                className="object-contain"
              />
              <AvatarFallback>{altText[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow ml-4 items-center flex-col group">
            <CardHeader>
              <div className="flex items-center justify-between gap-x-2 text-base">
                <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
                  {title}
                  {badges && (
                    <span className="inline-flex gap-x-1 ml-2">
                      {badges.map((badge, index) => (
                        <Badge
                          variant="secondary"
                          className="align-middle text-xs"
                          key={index}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </span>
                  )}
                  <ChevronRightIcon className="size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                </h3>
                <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                  {period}
                </div>
              </div>
              {subtitle && <div className="font-sans text-xs text-muted-foreground">{subtitle}</div>}
              {description && (
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {description}
                </div>
              )}
            </CardHeader>
          </div>
        </Card>
      </div>

      {/* Professional work experience modal */}
      {isModalVisible && typeof window !== 'undefined' && createPortal(
        <WorkExperienceModal
          isVisible={isModalVisible}
          position={mousePosition}
          company={title}
          companyKey={companyKey}
          logoUrl={logoUrl}
          onClose={() => setIsModalVisible(false)}
        />,
        document.body
      )}
    </>
  );
};