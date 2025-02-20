import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Inicio',
      href: getPermalink('/'),
    },
    {
      text: 'Nosotros',
      href: getPermalink('/nosotros'),
    },
    {
      text: 'Servicios',
      href: getPermalink('/servicios'),
    },
    {
      text: 'Contacto',
      href: getPermalink('/contacto'),
    }
  ],
  actions: [
    { href: 'https://github.com/onwidget/astrowind', target: '_blank', icon: 'tabler:brand-whatsapp', variant: 'icon'},
  ],
};

export const footerData = {
  links: [
    {
      title: 'Inicio',
      href: getPermalink('/'),
    },
    {
      title: 'Nosotros',
      href: getPermalink('/nosotros'),
    },
    {
      title: 'Servicios',
      href: getPermalink('/servicios'),
    },
    {
      title: 'Contacto',
      href: getPermalink('/contacto'),
    }
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
  ],
  footNote: `
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm" src="https://onwidget.com/favicon/favicon-32x32.png" alt="onWidget logo" loading="lazy"></img>
    Made by <a class="text-blue-600 underline dark:text-muted" href="https://onwidget.com/"> onWidget</a> · All rights reserved.
  `,
};
