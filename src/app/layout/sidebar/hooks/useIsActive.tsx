import { usePathname } from 'next/navigation';
import { subItems } from '../types';

const useIsActive = () => {
  const pathname = usePathname();

  const isActiveLink = (link: string): boolean => {
    return pathname === link || pathname?.startsWith(`${link}/`);
  };

  const itHasActiveChildLink = (links?: subItems): boolean => {
    if (!links) return false;
    const hasExactChildMatch = links?.some(link => pathname === link?.path);
    if (hasExactChildMatch) return true;
    return links?.some(link => {
      return pathname?.includes(`${link?.path}/`);
    });
  };

  return { isActiveLink, itHasActiveChildLink, pathname };
};

export default useIsActive;
