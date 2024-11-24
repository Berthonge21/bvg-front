import { Facebook, Instagram, Linkedin } from '_assets/svg';

interface ISocialData {
  icon: JSX.Element;
  link: string;
  title: string;
}

export const SocialLinks: ISocialData[] = [
  {
    icon: <Facebook fill={'#FFF'} width={'22px'} height={'22px'} />,
    title: 'Facebook',
    link: 'https://www.facebook.com/profile.php?id=61561109684106&mibextid=LQQJ4d',
  },
  {
    icon: <Instagram fill={'#FFF'} width={'22px'} height={'22px'} />,
    title: 'Instagram',
    link: 'https://www.instagram.com/bvg_innovation?igsh=MTAwamt6emN6enJ1cg%3D%3D&utm_source=qr',
  },
  {
    icon: <Linkedin fill={'#FFF'} width={'22px'} height={'22px'} />,
    title: 'Linkedin',
    link: 'https://www.linkedin.com/in/bvg-innovation-',
  },
  // {
  //   icon: <TikTok fill={'#FFF'} width={'22px'} height={'22px'} />,
  //   title: 'TikTok',
  //   link: 'https://www.tiktok.com/@bvg_innovation?is_from_webapp=1&sender_device=pc',
  // },
];
