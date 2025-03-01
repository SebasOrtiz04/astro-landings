import { getPermalink } from './utils/permalinks';
import { whatsappUrl } from './utils/utils';

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
    { href: whatsappUrl, target: '_blank', icon: 'tabler:brand-whatsapp', variant: 'icon'},
  ],
};

export const footerData = {
  links: [
    {
      title: 'Menú',
      links:[
        { text: 'Inicio', href: getPermalink('/') },
        { text: 'Nosotros', href: getPermalink('/nosotros') },
        { text: 'Servicios', href: getPermalink('/servicios') },
        { text: 'Contacto', href: getPermalink('/contacto') },
      ]
    },
  ],
  secondaryLinks: [
    { text: 'Términos', href: getPermalink('/terms') },
    { text: 'Política de Privacidad', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'youtube', icon: 'tabler:brand-youtube-filled', iconLabel:'You Tube',iconClass:'text-lg text-red-600', href: 'https://www.youtube.com/@danielaltamirano-l1e' },
  ],
  footNote: `
  <div class="flex flex-col md:flex-row gap-2 items-baseline text-sm mr-4 dark:text-muted">
    Hecho con ❤️ por 
    <a class="text-blue-secondary underline dark:text-muted" target='_blanck' href="https://sebas.mistli.com.mx/"> Sebas Ortiz</a> 
    basado en la plantilla astrowind MIT de 
    <a class="text-blue-secondary flex items-baseline gap-2 underline dark:text-muted" target='_blanck' href="https://onwidget.com/"> 
    <img class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover rounded-sm" src="https://onwidget.com/favicon/favicon-32x32.png" alt="onWidget logo" loading="lazy"></img>
    onWidget</a> .
  </div>
  `,
};
