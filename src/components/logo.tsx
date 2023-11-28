'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

import LogoDark from '@/assets/logo-dark.svg';
import LogoLight from '@/assets/logo-light.svg';

export default function Logo() {
  const { resolvedTheme } = useTheme();

  const logo = resolvedTheme === 'dark' ? LogoDark : LogoLight;

  return <Image src={logo} priority alt='Hostfully' />;
}
