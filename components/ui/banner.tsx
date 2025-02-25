'use client';

import { type HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

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
        'relative z-40 flex flex-row font-mono items-center justify-center bg-secondary px-4 text-center text-sm font-medium transition-all duration-300',
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
                'absolute end-2 top-1/2 -translate-y-1/2 text-muted-foreground',
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
      <div className="absolute inset-0 z-[-1] rainbow-banner-gradient-1" />
      <div className="absolute inset-0 z-[-1] rainbow-banner-gradient-2" />
    </>
  );
};
