import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'fr', 'pt', 'de'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Automatic locale detection
  localeDetection: true,

  // Pathnames configuration
  pathnames: {
    '/': '/',
    '/projects': '/projects',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]'
  }
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);