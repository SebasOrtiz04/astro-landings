import { dataFacundo } from "./utils/utils";


export const headerData = {
  links: [
    {text: 'Inicio', href: '/',},
    {text: 'Nosotros', href: '/#nosotros',},
    {text: 'Servicios', href: '/#servicios',},
    {text: 'Contácto', href: '/#contact',},
  ],
  actions: [{ href: dataFacundo.whats, target: '_blank', icon: 'tabler:brand-whatsapp', variant: 'icon'},],
};

export const footerData = {
  links:[
  // {
    //   title: 'Company',
    //   links: [
    //     { text: 'About', href: '#' },
    //     { text: 'Blog', href: '#' },
    //     { text: 'Careers', href: '#' },
    //     { text: 'Press', href: '#' },
    //     { text: 'Inclusion', href: '#' },
    //     { text: 'Social Impact', href: '#' },
    //     { text: 'Shop', href: '#' },
    //   ],
    // },
  ],
  secondaryLinks: [
    // { text: 'Terms', href: getPermalink('/terms') },
    // { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    // { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    // { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
    Hecho por Mistli basado en un plantilla MIT de onWidget · All rights reserved.
  `,
};
