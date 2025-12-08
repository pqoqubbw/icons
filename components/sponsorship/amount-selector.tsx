'use client';

import { useState } from 'react';

import { SUPPORT_LIST } from '@/app/sponsorship/page';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { cn } from '@/lib/utils';

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

  return (
    <div className="mx-auto mt-8 flex w-full flex-col items-center min-[786px]:mt-16">
      <RadioGroup
        className="flex w-full max-w-[1016px] flex-col items-center justify-center gap-1 px-4 min-[610px]:flex-row"
        value={selectedAmount}
        onValueChange={(value) => setSelectedAmount(value as string)}
        aria-label="Select donation amount"
      >
        {amounts.map((amount) => (
          <label
            key={amount.price}
            className={cn(
              'group data-checked:bg-primary relative flex w-full cursor-pointer items-center justify-center data-unchecked:bg-white dark:data-unchecked:bg-black',
              'h-[60px] min-[786px]:h-[84px]',
              'supports-[corner-shape:squircle]:corner-squircle max-[610px]:rounded-l-[20px] max-[610px]:supports-[corner-shape:squircle]:rounded-[20px] min-[610px]:first:rounded-l-[20px] min-[610px]:first:supports-[corner-shape:squircle]:rounded-l-[30px]',
              'supports-[corner-shape:squircle]:corner-squircle max-[610px]:rounded-r-[20px] max-[610px]:supports-[corner-shape:squircle]:rounded-[20px] min-[610px]:last:rounded-r-[20px] min-[610px]:last:supports-[corner-shape:squircle]:rounded-r-[30px]',
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
        ))}
      </RadioGroup>
    </div>
  );
};

export { AmountSelector };
