export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: 'RS Shonjoy',
  description:
    'An open source application built using the new router, server components and everything new in Next.js 13.',
  url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  ogImage: 'https://redolence.com/og.jpg',
  links: {
    twitter: 'https://twitter.com/rsshonjoydas',
    github: 'https://github.com/rsshonjoydas',
  },
};
