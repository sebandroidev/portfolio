# Sébastien NOGBEDJI - Portfolio

A modern, SEO-optimized portfolio website showcasing mobile development expertise and professional experience.

Built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components. Features comprehensive internationalization support and optimized performance.

## 🚀 Features

### Core Functionality
- **Multilingual Support**: Full internationalization with English and French locales
- **Responsive Design**: Mobile-first approach optimized for all devices
- **SEO Optimized**: Comprehensive meta tags, Open Graph, structured data, and sitemap
- **Performance Focused**: Optimized images, fonts, and Core Web Vitals
- **PWA Ready**: Web app manifest for mobile installation

### Content Sections
- **Professional Experience**: Interactive work history with hover modals
- **Projects Showcase**: Detailed project portfolio with technologies and links
- **Skills Matrix**: Categorized technical skills and expertise
- **Education Timeline**: Academic background with institution logos
- **GitHub Integration**: Live GitHub statistics and achievements
- **Contact Information**: Professional contact methods and social links

### Technical Excellence
- **Modern Stack**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui and custom MagicUI components
- **Animations**: Smooth Framer Motion animations and transitions
- **Security**: Comprehensive security headers and CSP policies
- **Build Optimization**: Efficient bundling and static generation

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui, Radix UI primitives
- **Animations**: Framer Motion, custom MagicUI components
- **Icons**: Lucide React, custom SVG icons

### Internationalization
- **Library**: next-intl
- **Locales**: English (en), French (fr), Portuguese (pt), German (de)
- **Routing**: Automatic locale detection and routing

### Performance & SEO
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Font Optimization**: Google Fonts with display swap
- **Meta Tags**: Comprehensive SEO metadata
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: XML sitemap with multilingual support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sebandroidev/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── magicui/          # Custom animated components
├── data/                 # Configuration and data
│   ├── resume-i18n.tsx   # Internationalized resume data
│   └── resume.tsx        # Legacy resume data
├── i18n/                 # Internationalization setup
├── lib/                  # Utility functions
└── messages/             # Translation files
    ├── en.json          # English translations
    └── fr.json          # French translations

public/                   # Static assets
├── favicon files        # Various favicon formats
├── company logos        # Work experience logos
├── project images       # Project screenshots
└── SEO files           # robots.txt, sitemap.xml
```

## 🎨 Customization

### Personal Information
Update your personal details in `src/data/resume-i18n.tsx`:
- Contact information
- Professional summary
- Work experience
- Education history
- Projects portfolio
- Skills and technologies

### Translations
Add or modify translations in `messages/`:
- `en.json` - English translations
- `fr.json` - French translations

### Styling
Customize the design:
- `tailwind.config.js` - Tailwind configuration
- `src/app/globals.css` - Global styles and CSS variables
- Component-level styling with Tailwind utilities

### Assets
Replace assets in `public/`:
- Update logos and project images
- Replace favicon files with your branding
- Add new company or project assets

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Other Platforms
The site works on any static hosting platform:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any provider supporting Next.js

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About

Created by **Sébastien NOGBEDJI** - Experienced Mobile Developer & Software Engineer specializing in Flutter, React Native, and innovative mobile applications.

- 🌐 Portfolio: [nssoftdev.nex-softwares.com](https://nssoftdev.nex-softwares.com)
- 💼 LinkedIn: [Sébastien NOGBEDJI](https://www.linkedin.com/in/sébastien-nogbedji-6169a4182)
- 🐙 GitHub: [@sebandroidev](https://github.com/sebandroidev)
- 📧 Email: nssoftdev@gmail.com

---

⭐ If you found this portfolio template helpful, please consider giving it a star!