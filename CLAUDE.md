# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern portfolio website built with Next.js 14, featuring a clean design with blog functionality. The site is built using React, TypeScript, Tailwind CSS, and shadcn/ui components. It includes both light and dark themes with responsive design optimized for various devices.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

## Architecture Overview

### Core Structure
- **App Router**: Uses Next.js 14 app directory structure (`src/app/`)
- **Component Library**: Built on shadcn/ui and Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Content Management**: MDX-based blog system with gray-matter for frontmatter
- **Data Layer**: Static configuration in `src/data/resume.tsx`

### Key Directories
- `src/app/` - Next.js app router pages and layouts
- `src/components/` - Reusable UI components including shadcn/ui components
- `src/components/magicui/` - Custom animated UI components
- `src/data/` - Static configuration and blog utilities
- `src/lib/` - Utility functions and shared logic
- `content/` - MDX blog posts
- `public/` - Static assets (images, icons)

### Data Configuration
The entire portfolio content is driven by a single configuration file at `src/data/resume.tsx`. This includes:
- Personal information (name, description, location, contact)
- Work experience with company details and descriptions
- Education history
- Projects with links and technologies
- Hackathon participation
- Skills and social links

### Blog System
- MDX files in `content/` directory are processed using unified/remark/rehype
- Syntax highlighting with `rehype-pretty-code` using "min-light" and "min-dark" themes
- Static generation with `generateStaticParams` for optimal performance
- SEO optimization with proper metadata and structured data

### Theming & Styling
- CSS variables for theme tokens defined in `globals.css`
- Dark/light mode toggle using `next-themes`
- Custom color palette with semantic naming (primary, secondary, muted, etc.)
- Responsive design with mobile-first approach
- Typography using Inter font with proper font loading

### Component Architecture
- **shadcn/ui**: Base UI primitives (Button, Card, Badge, etc.)
- **magicui**: Custom animated components (BlurFade, Dock, etc.)
- **Custom Components**: Domain-specific components (ProjectCard, ResumeCard, etc.)
- All components use TypeScript with proper prop interfaces
- Consistent use of `cn()` utility for conditional classes

## Development Guidelines

### Making Content Changes
To update portfolio content, edit `src/data/resume.tsx`. This single file controls all personal information, work history, projects, and contact details displayed throughout the site.

### Adding Blog Posts
1. Create a new `.mdx` file in the `content/` directory
2. Include proper frontmatter with title, publishedAt, summary, and optional image
3. The blog system will automatically generate routes and metadata

### Component Development
- Follow existing patterns in `src/components/`
- Use TypeScript interfaces for all props
- Leverage existing design tokens from Tailwind config
- Maintain consistency with shadcn/ui patterns

### Styling Conventions
- Use Tailwind utility classes
- Leverage CSS variables for theme consistency
- Follow mobile-first responsive design patterns
- Use semantic color names (e.g., `text-muted-foreground`)

## Build and Deployment

The application is optimized for deployment on Vercel with:
- Static generation where possible
- Proper metadata for SEO
- Optimized images and fonts
- Tree-shaking and code splitting

## Key Dependencies

- **Next.js 14**: React framework with app router
- **TypeScript**: Type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components
- **Framer Motion**: Animation library for smooth interactions
- **next-themes**: Theme switching functionality
- **gray-matter**: Frontmatter parsing for MDX content
- **unified/remark/rehype**: Markdown processing pipeline