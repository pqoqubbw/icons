'use client';

import { useState } from 'react';
import Image from 'next/image';

import { SUPPORT_LIST } from '@/app/sponsorship/page';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { cn } from '@/lib/utils';
import { Stamp } from './stamp';

type AmountSelectorProps = {
  amounts: typeof SUPPORT_LIST;
};

const AmountSelector = ({ amounts }: AmountSelectorProps) => {
  const [selectedAmount, setSelectedAmount] = useState(
    amounts[0].price.toString()
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isLastItemOdd = amounts.length % 2 !== 0;

  return (
    <div className="mx-auto mt-8 flex w-full max-w-[1016px] flex-col items-center gap-6 px-4 max-[610px]:flex-col-reverse">
      <RadioGroup
        className="grid w-full grid-cols-2 gap-1 min-[610px]:flex min-[610px]:flex-row min-[610px]:justify-center"
        value={selectedAmount}
        onValueChange={(value) => setSelectedAmount(value as string)}
        aria-label="Select donation amount"
      >
        {amounts.map((amount, index) => {
          const isLastItem = index === amounts.length - 1;
          const shouldSpanFull = isLastItem && isLastItemOdd;

          return (
            <label
              key={amount.price}
              className={cn(
                'group data-checked:bg-primary relative flex w-full cursor-pointer items-center justify-center data-unchecked:bg-white hover:data-unchecked:bg-neutral-50/80 dark:data-unchecked:bg-black dark:hover:data-unchecked:bg-neutral-950/60',
                'h-[60px] min-[786px]:h-[84px]',
                'supports-[corner-shape:squircle]:corner-squircle',
                shouldSpanFull && 'max-[610px]:col-span-2',
                'max-[610px]:odd:rounded-l-[20px] max-[610px]:odd:supports-[corner-shape:squircle]:rounded-l-[20px]',
                'max-[610px]:even:rounded-r-[20px] max-[610px]:even:supports-[corner-shape:squircle]:rounded-r-[20px]',
                shouldSpanFull &&
                  'max-[610px]:rounded-r-[20px] max-[610px]:supports-[corner-shape:squircle]:rounded-r-[20px]',
                'min-[610px]:first:rounded-l-[20px] min-[610px]:first:supports-[corner-shape:squircle]:rounded-l-[30px]',
                'min-[610px]:last:rounded-r-[20px] min-[610px]:last:supports-[corner-shape:squircle]:rounded-r-[30px]',
                'has-focus-visible:outline-primary has-focus-visible:outline-2 has-focus-visible:outline-offset-2'
              )}
              data-checked={
                selectedAmount === amount.price.toString() ? '' : undefined
              }
              data-unchecked={
                selectedAmount !== amount.price.toString() ? '' : undefined
              }
            >
              <Radio.Root
                value={amount.price.toString()}
                className="peer absolute inset-0 opacity-0"
                aria-label={formatCurrency(amount.price)}
              >
                <Radio.Indicator />
              </Radio.Root>
              <span className="pointer-events-none font-sans text-[24px] text-[#0A0A0A] group-data-checked:text-white min-[786px]:text-[30px] dark:text-white">
                {formatCurrency(amount.price)}
              </span>
            </label>
          );
        })}
      </RadioGroup>
      <div className="@container w-full">
        <div
          className={cn(
            'supports-[corner-shape:squircle]:corner-squircle relative w-full rounded-[1.97cqw] bg-white supports-[corner-shape:squircle]:rounded-[6.89cqw] dark:bg-black',
            'aspect-1016/442'
          )}
        >
          <div className="flex items-center justify-between px-[6.89cqw] pt-[3.94cqw]">
            <p className="font-sans text-[4.13cqw] text-[#525252]">
              Chill Guy Certificate
            </p>
            <p className="font-sans text-[2.36cqw] text-[#737373]">Supporter</p>
          </div>
          <div
            className="pointer-events-none relative mt-[3.94cqw] w-full select-none"
            aria-hidden="true"
          >
            <svg
              className="w-full"
              width="100%"
              height="0.5cqw"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="currentColor"
                strokeWidth="0.49cqw"
                strokeDasharray="1.38cqw 1.38cqw"
                className="text-background"
              />
            </svg>
            <div className="absolute top-1/2 left-0 size-[8.37cqw] -translate-y-1/2 overflow-hidden">
              <div className="bg-background size-full -translate-x-1/2 rounded-full" />
            </div>
            <div className="absolute top-1/2 right-0 size-[8.37cqw] -translate-y-1/2 overflow-hidden">
              <div className="bg-background size-full translate-x-1/2 rounded-full" />
            </div>
          </div>
          <div className="mt-[2.95cqw] flex w-full items-center gap-[5.91cqw] px-[6.89cqw]">
            <div className="supports-[corner-shape:squircle]:corner-squircle h-[23.82cqw] w-[21.65cqw] border border-[#DBD8D8] supports-[corner-shape:squircle]:rounded-[4.92cqw]"></div>
            <div className="flex flex-col gap-[0.39cqw]">
              <h3 className="font-sans text-[5cqw] text-[#0A0A0A]">
                <span className="tabular-nums">
                  {formatCurrency(Number(selectedAmount))}
                </span>{' '}
                Donation
              </h3>
              <p className="max-w-[45cqw] font-mono text-[2cqw] text-[#404040]">
                The icons will always be free and open-source, regardless of
                donations
              </p>
              <a
                href={
                  amounts.find(
                    (amount) => amount.price.toString() === selectedAmount
                  )?.link
                }
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary mt-[2cqw] flex w-fit cursor-pointer items-center justify-center px-[1.5cqw] py-[1.6cqw] font-sans text-[3cqw]/[3cqw] text-white transition-colors duration-50 hover:bg-[color-mix(in_oklab,var(--color-primary),black_10%)]"
              >
                Sponsor
              </a>
            </div>
            <Stamp className="absolute -right-[5.51cqw] -bottom-[4.72cqw] h-[23.13cqw] w-[23.23cqw]" />
            {/* <Image
              src="/assets/cow-boi-stamp.svg"
              alt="Cow Boi Stamp"
              width={230}
              height={230}
              className="absolute -right-[5.51cqw] -bottom-[4.72cqw] h-[23.13cqw] w-[23.23cqw]"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AmountSelector };
