import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { useResumeData } from "@/data/resume-i18n";
import { useTranslations } from 'next-intl';

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsPage() {
  const t = useTranslations();
  const DATA = useResumeData();

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="projects-hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
            yOffset={8}
            text={t('sections.projects')}
          />
          <BlurFadeText
            className="max-w-[600px] md:text-xl text-muted-foreground"
            delay={BLUR_FADE_DELAY * 2}
            text={t('projects.description')}
          />
        </div>
      </section>

      <section id="all-projects">
        <div className="space-y-12 w-full">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 3 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}