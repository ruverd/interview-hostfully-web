import Link from 'next/link';

import { CommandMenu } from '@/components/command-menu';
import Logo from '@/components/logo';

export function PageHeader() {
  return (
    <header className='sticky top-0 z-50 w-full h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container h-14 flex justify-between items-center'>
        <Link href='/'>
          <Logo />
        </Link>
        <CommandMenu />
      </div>
    </header>
  );
}
