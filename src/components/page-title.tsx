interface PageTitleProps {
  title: string;
  subtitle: string;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <header>
      <h1 className='text-2xl font-bold text-neutral-900 dark:text-neutral-50'>
        {title}
      </h1>
      <span className='leading-7 text-muted-foreground'>{subtitle}</span>
    </header>
  );
}
