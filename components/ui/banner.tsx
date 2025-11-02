'use client';

import type { HTMLAttributes } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @defaultValue 'normal'
   */
  variant?: 'rainbow' | 'normal';
  /**
   * @defaultValue true
   */
  changeLayout?: boolean;
  /**
   * Banner message
   */
  message?: string;
  /**
   * @defaultValue '3rem'
   */
  height?: string;
}

export function Banner({
  id,
  variant = 'normal',
  changeLayout = true,
  message,
  height,
  ...props
}: BannerProps): React.ReactElement {
  const [open, setOpen] = useState(true);
  const globalKey = id ? `banner-${id}` : undefined;

  useEffect(() => {
    if (globalKey) setOpen(localStorage.getItem(globalKey) !== 'true');
  }, [globalKey]);

  const onClick = useCallback(() => {
    setOpen(false);
    if (globalKey) localStorage.setItem(globalKey, 'true');
  }, [globalKey]);

  return (
    <div
      id={id}
      {...props}
      style={{ height: open ? height : '0' }}
      className={cn(
        'bg-secondary relative z-40 flex flex-row items-center justify-center px-4 text-center font-mono text-sm font-medium transition-all duration-300',
        variant === 'rainbow' && 'bg-background',
        !open && 'hidden',
        props.className
      )}
    >
      {changeLayout && open ? (
        <style>{`
        :root:not(.${globalKey ?? 'banner-never'}) { --banner-height: ${height}; }
        `}</style>
      ) : null}
      {globalKey ? (
        <style>{`.${globalKey} #${id} { display: none; }`}</style>
      ) : null}
      {id ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `if (localStorage.getItem('${globalKey}') === 'true') document.documentElement.classList.add('${globalKey}');`,
          }}
        />
      ) : null}

      {variant === 'rainbow' ? <RainbowLayer /> : null}
      {message || props.children}
      {id ? (
        <button
          type="button"
          aria-label="Close Banner"
          onClick={onClick}
          className={cn(
            buttonVariants({
              variant: 'ghost',
              className:
                'text-muted-foreground absolute end-2 top-1/2 -translate-y-1/2',
              size: 'icon',
            })
          )}
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

const RainbowLayer = () => {
  return (
    <>
      <div className="rainbow-banner-gradient-1 absolute inset-0 z-[-1]" />
      <div className="rainbow-banner-gradient-2 absolute inset-0 z-[-1]" />
    </>
  );
};
