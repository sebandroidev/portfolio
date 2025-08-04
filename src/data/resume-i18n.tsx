import { Icons } from "@/components/icons";
import { FolderIcon, HomeIcon } from "lucide-react";
import { useTranslations } from 'next-intl';

// Helper function to get the appropriate icon based on link type
const getProjectLinkIcon = (linkType: string) => {
  const lowerType = linkType.toLowerCase();
  if (lowerType.includes('ios') || lowerType.includes('apple')) {
    return <Icons.apple className="size-3" />;
  }
  if (lowerType.includes('android')) {
    return <Icons.android className="size-3" />;
  }
  return <Icons.globe className="size-3" />;
};

// Static data that doesn't need translation
export const STATIC_DATA = {
  name: "Sébastien NOGBEDJI",
  initials: "SN",
  url: "https://nssoftdev.nex-softwares.com",
  locationLink: "https://www.google.com/maps/place/Lomé,+Togo",
  avatarUrl: "/cartoon-avatar.png",
  skills: {
    languages: ["Dart", "Kotlin", "Java", "HTML", "CSS", "JavaScript", "Swift"],
    frameworks: ["Flutter", "SwiftUI", "ReactJS", "TailwindCSS", "NextJS", "Jetpack Compose"],
    databases: ["SQLite", "Hive", "Firebase", "Appwrite", "Supabase", "GraphQL", "MongoDB"],
    apis: ["Google Maps", "Mapbox", "Sockets.io"],
    stateManagement: ["Provider", "Riverpod", "GetX", "BloC", "MobX"],
    devops: ["Git", "GitHub Actions", "Gitlab", "Fastlane", "Shorebird", "Code Push", "Firebase App Distribution"],
    tools: ["VSCode", "Android Studio", "XCode", "Sketch", "Adobe XD", "Figma", "Trello", "Jira", "Loom", "Canva", "Prisma"]
  },
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "nssoftdev@gmail.com",
    tel: "+22890150096",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/sebandroidev",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sébastien-nogbedji-6169a4182",
        icon: Icons.linkedin,
        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/devbyseb/",
        icon: Icons.instagram,
        navbar: true,
      },
      Twitter: {
        name: "Twitter",
        url: "https://twitter.com/devbyseb",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:nssoftdev@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
};

// Hook to get translated resume data
export function useResumeData() {
  const t = useTranslations();
  
  return {
    ...STATIC_DATA,
    location: "Lomé, TOGO",
    description: t('profile.description'),
    summary: t('profile.summary'),
    contact: {
      ...STATIC_DATA.contact,
      social: {
        ...STATIC_DATA.contact.social,
        email: {
          ...STATIC_DATA.contact.social.email,
          name: t('social.sendEmail'),
        },
      },
    },
    work: [
      {
        company: "WiiCode",
        companyKey: "wiicode",
        href: "#",
        badges: ["Current"],
        location: "Remote",
        title: t('companies.wiicode.title'),
        logoUrl: "/wiicode.png",
        start: "December 2024",
        end: null,
        description: t('companies.wiicode.description'),
      },
      {
        company: "BKG Speed",
        companyKey: "bkgspeed",
        badges: [],
        href: "#",
        location: "Senegal",
        title: t('companies.bkgspeed.title'),
        logoUrl: "/bkg-speed.png",
        start: "April 2024",
        end: "November 2024",
        description: t('companies.bkgspeed.description'),
      },
      {
        company: "Click Africa",
        companyKey: "clickafrica",
        href: "#",
        badges: [],
        location: "Remote",
        title: t('companies.clickafrica.title'),
        logoUrl: "/klic.png",
        start: "April 2023",
        end: "January 2024",
        description: t('companies.clickafrica.description'),
      },
      {
        company: "LEOTECH",
        companyKey: "leotech",
        href: "#",
        badges: [],
        location: "Lomé, TOGO",
        title: t('companies.leotech.title'),
        logoUrl: "/leotech.png",
        start: "February 2021",
        end: "December 2022",
        description: t('companies.leotech.description'),
      },
      {
        company: "Plus A Votre Service",
        companyKey: "plusservice",
        href: "#",
        badges: [],
        location: "Lomé, TOGO",
        title: t('companies.plusservice.title'),
        logoUrl: "/pavs.png",
        start: "August 2020",
        end: "January 2021",
        description: t('companies.plusservice.description'),
      },
    ],
    education: [
      {
        school: "World Education Services",
        href: "#",
        degree: t('education.wes.degree'),
        logoUrl: "/wes.png",
        start: "2025",
        end: "2025",
      },
      {
        school: "African Institute of Technology Studies",
        href: "#",
        degree: t('education.aits.degree'),
        logoUrl: "/iaec.png",
        start: "2017",
        end: "2020",
      },
      {
        school: "High School",
        href: "#",
        degree: t('education.highschool.degree'),
        logoUrl: "/ndt.png",
        start: "2014",
        end: "2017",
      },
    ],
    projects: [
      {
        title: "Trendz: Events & Fun",
        href: "#",
        dates: "December 2023 - Present",
        active: true,
        description: t('projectsData.trendz.description'),
        technologies: [
          "Flutter",
          "Dart",
          "Firebase",
          "REST API",
          "Firebase Authentication",
          "Hive",
          "Shorebird",
          "WireDash",
          "CodeMagic",
        ],
        links: [
          {
            type: t('projectsData.trendz.linkTypes.ios'),
            href: "#",
            icon: getProjectLinkIcon(t('projectsData.trendz.linkTypes.ios')),
          },
          {
            type: t('projectsData.trendz.linkTypes.android'),
            href: "#",
            icon: getProjectLinkIcon(t('projectsData.trendz.linkTypes.android')),
          },
        ],
        image: "/trendz-app.png",
        video: "",
      },
      {
        title: "Molory",
        href: "#",
        dates: "December 2022 - Present",
        active: true,
        description: t('projectsData.molory.description'),
        technologies: [
          "Flutter",
          "Dart",
          "Firebase",
          "REST API",
          "Firebase Authentication",
          "Hive",
          "Shorebird",
          "WireDash",
          "CodeMagic",
        ],
        links: [
          {
            type: t('projectsData.molory.linkTypes.ios'),
            href: "#",
            icon: getProjectLinkIcon(t('projectsData.molory.linkTypes.ios')),
          },
          {
            type: t('projectsData.molory.linkTypes.android'),
            href: "#",
            icon: getProjectLinkIcon(t('projectsData.molory.linkTypes.android')),
          },
        ],
        image: "/molory-app.png",
        video: "",
      },
      {
        title: "TheCyrele Mobile Application",
        href: "#",
        dates: "December 2024 - Current",
        active: true,
        description: t('projectsData.thecyrele.description'),
        technologies: [
          "Flutter",
          "Dart",
          "Firebase",
          "REST API",
          "Test Driven Development",
        ],
        links: [
          {
            type: t('projectsData.thecyrele.linkTypes.app'),
            href: "#",
            icon: getProjectLinkIcon(t('projectsData.thecyrele.linkTypes.app')),
          },
        ],
        image: "/thecyrele-app.png",
        video: "",
      },
      {
        title: "KLIC: On-Demand Service App",
        href: "#",
        dates: "April 2023 - January 2024",
        active: false,
        description: t('projectsData.klic.description'),
        technologies: [
          "Flutter",
          "Dart",
          "Google Maps",
          "Firebase",
          "REST API",
          "Firebase Authentication",
        ],
        links: [
          {
            type: t('projectsData.klic.linkTypes.app'),
            href: "#",
            icon: getProjectLinkIcon(t('projectsData.klic.linkTypes.app')),
          },
        ],
        image: "/klic-app.png",
        video: "",
      },
      {
        title: "PAVS Account Manager",
        href: "#",
        dates: "August 2020 - January 2021",
        active: false,
        description: t('projectsData.pavs.description'),
        technologies: [
          "Flutter",
          "Dart",
          "Socket.io",
          "API Integration",
        ],
        links: [
          {
            type: t('projectsData.pavs.linkTypes.app'),
            href: "#",
            icon: getProjectLinkIcon(t('projectsData.pavs.linkTypes.app')),
          },
        ],
        image: "/pavs.png",
        video: "",
      },
      {
        title: "Catalogue PAVS",
        href: "#",
        dates: "August 2020 - January 2021",
        active: false,
        description: t('projectsData.cataloguePavsApp.description'),
        technologies: [
          "Android",
          "Java",
          "Firebase",
          "Google Authentication",
        ],
        links: [
          {
            type: t('projectsData.cataloguePavsApp.linkTypes.app'),
            href: "#",
            icon: getProjectLinkIcon(t('projectsData.cataloguePavsApp.linkTypes.app')),
          },
        ],
        image: "/catalogue-pavs.png",
        video: "",
      },
    ],
    hackathons: [],
  };
}