"use client";

import { ProjectVideo } from "@/components/project-video";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, CodeIcon, ExternalLinkIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    title: string;
    description: string;
    technologies: string[];
    dates: string;
    active: boolean;
    status?: string;
    links: Array<{
      type: string;
      href: string;
      icon: React.ReactNode;
    }>;
    image?: string;
    video?: string;
    videoType?: 'youtube' | 'vimeo' | 'loom' | 'direct';
    poster?: string;
    href?: string;
  };
}

export function ProjectDialog({ open, onOpenChange, project }: ProjectDialogProps) {
  const primaryLink = project.links?.[0];
  const hasMedia = project.video || project.image;

  // Prevent body scroll and layout shift when dialog is open
  useEffect(() => {
    if (open) {
      // Calculate scrollbar width
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Store original values
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Apply scroll lock with padding compensation
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      
      return () => {
        // Restore original values
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [open]);

  return (
    <>
      {/* Manual dark overlay using portal */}
      {open && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
          onClick={() => onOpenChange(false)}
        />,
        document.body
      )}
      
      <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
        <DialogContent className="w-[95vw] max-w-4xl max-h-[96vh] overflow-hidden p-0 mx-auto z-[51]">
        <div className="flex flex-col h-full">
          {/* Media Section */}
          {hasMedia && (
            <div className="relative w-full h-[28rem] sm:h-[32rem] bg-muted">
              {project.video ? (
                <ProjectVideo
                  src={project.video}
                  title={project.title}
                  type={project.videoType}
                  poster={project.poster}
                  className="h-full rounded-none"
                  autoplay={true}
                  showControls={false}
                />
              ) : project.image ? (
                <div className="relative w-full h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              ) : null}
            </div>
          )}

          {/* Content Section */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Header */}
            <DialogHeader className="space-y-4 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold mb-2">
                    {project.title}
                  </DialogTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{project.dates}</span>
                    </div>
                    {project.active && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Active
                      </Badge>
                    )}
                    {project.status && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {project.status}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </DialogHeader>

            {/* Technologies */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <CodeIcon className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm uppercase tracking-wider">
                  Technologies
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs bg-muted/50 hover:bg-muted transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links */}
            {project.links && project.links.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-sm uppercase tracking-wider mb-3 text-muted-foreground">
                  Links
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.links.map((link, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-xs"
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1"
                      >
                        {link.icon}
                        {link.type}
                        <ExternalLinkIcon className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <Card className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">Interested in this project?</h4>
                  <p className="text-sm text-muted-foreground">
                    {primaryLink ? "Check out the live demo" : "Learn more about this project"}
                  </p>
                </div>
                {primaryLink && (
                  <Button
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <a
                      href={primaryLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <PlayIcon className="w-4 h-4" />
                      View {primaryLink.type}
                      <ExternalLinkIcon className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
