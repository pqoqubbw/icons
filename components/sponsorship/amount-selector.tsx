"use client";

import { useEffect, useRef, useState } from "react";
import type { SUPPORT_LIST } from "@/app/sponsorship/page";

import { Radio, RadioGroup } from "@/components/ui/radio";
import { cn } from "@/lib/utils";
import { Stamp } from "./stamp";

const DESIGN_WIDTH = 1040;
const DESIGN_HEIGHT = 460;

type AmountSelectorProps = {
  amounts: typeof SUPPORT_LIST;
};

const AmountSelector = ({ amounts }: AmountSelectorProps) => {
  const [selectedAmount, setSelectedAmount] = useState(
    amounts[0].price.toString()
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const width = container.offsetWidth;
      setScale(width / DESIGN_WIDTH);
    };

    updateScale();

    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isLastItemOdd = amounts.length % 2 !== 0;
  const buyLink = amounts.find(
    (amount) => amount.price.toString() === selectedAmount
  )?.link;

  return (
    <div className="mx-auto mt-8 flex w-full max-w-[1016px] flex-col items-center gap-6 px-4">
      <RadioGroup
        aria-label="Select donation amount"
        className="grid w-full grid-cols-2 gap-1 min-[610px]:flex min-[610px]:flex-row min-[610px]:justify-center"
        onValueChange={(value) => setSelectedAmount(value as string)}
        value={selectedAmount}
      >
        {amounts.map((amount, index) => {
          const isLastItem = index === amounts.length - 1;
          const shouldSpanFull = isLastItem && isLastItemOdd;

          return (
            <label
              className={cn(
                "group relative flex w-full cursor-pointer items-center justify-center data-checked:bg-primary data-unchecked:bg-white hover:data-unchecked:bg-neutral-50/80 dark:data-unchecked:bg-black dark:hover:data-unchecked:bg-neutral-950/60",
                "h-[60px] min-[786px]:h-[84px]",
                "supports-[corner-shape:squircle]:corner-squircle",
                shouldSpanFull && "max-[610px]:col-span-2",
                "max-[610px]:odd:rounded-l-[20px] max-[610px]:odd:supports-[corner-shape:squircle]:rounded-l-[20px]",
                "max-[610px]:even:rounded-r-[20px] max-[610px]:even:supports-[corner-shape:squircle]:rounded-r-[20px]",
                shouldSpanFull &&
                  "max-[610px]:rounded-r-[20px] max-[610px]:supports-[corner-shape:squircle]:rounded-r-[20px]",
                "min-[610px]:first:rounded-l-[20px] min-[610px]:first:supports-[corner-shape:squircle]:rounded-l-[30px]",
                "min-[610px]:last:rounded-r-[20px] min-[610px]:last:supports-[corner-shape:squircle]:rounded-r-[30px]",
                "has-focus-visible:outline-2 has-focus-visible:outline-primary has-focus-visible:outline-offset-2"
              )}
              data-checked={
                selectedAmount === amount.price.toString() ? "" : undefined
              }
              data-unchecked={
                selectedAmount !== amount.price.toString() ? "" : undefined
              }
              htmlFor={amount.price.toString()}
              key={amount.price}
            >
              <Radio.Root
                aria-label={formatCurrency(amount.price)}
                className="peer absolute inset-0 opacity-0"
                value={amount.price.toString()}
              >
                <Radio.Indicator />
              </Radio.Root>
              <span className="pointer-events-none font-sans text-[#0A0A0A] text-[24px] group-data-checked:text-white min-[786px]:text-[30px] dark:text-white">
                {formatCurrency(amount.price)}
              </span>
            </label>
          );
        })}
      </RadioGroup>

      <div
        className={cn(
          "supports-[corner-shape:squircle]:corner-squircle relative w-full rounded-[40px] bg-white supports-[corner-shape:squircle]:rounded-[60px] dark:bg-black",
          "max-[610px]:hidden",
          "transition-opacity duration-100",
          scale === 0 ? "opacity-0" : "opacity-100"
        )}
        ref={containerRef}
        style={{
          height: scale === 0 ? DESIGN_HEIGHT : DESIGN_HEIGHT * scale,
        }}
      >
        <div
          className="origin-top-left"
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          <div className="flex items-center justify-between px-[70px] pt-[38px]">
            <p className="font-sans text-[#525252] text-[42px] dark:text-[#D4D4D4]">
              Chill Guy Certificate
            </p>
            <p className="font-sans text-[#737373] text-[24px] dark:text-[#D4D4D4]">
              Supporter
            </p>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none relative mt-[38px] w-full select-none"
          >
            <svg
              className="w-full"
              height="2px"
              preserveAspectRatio="none"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                className="text-background"
                stroke="currentColor"
                strokeDasharray="14 14"
                strokeWidth="2"
                x1="0"
                x2="100%"
                y1="50%"
                y2="50%"
              />
            </svg>
            <div className="absolute top-1/2 left-0 size-[100px] -translate-y-1/2 overflow-hidden">
              <div className="size-full -translate-x-1/2 rounded-full bg-background" />
            </div>
            <div className="absolute top-1/2 right-0 size-[100px] -translate-y-1/2 overflow-hidden">
              <div className="size-full translate-x-1/2 rounded-full bg-background" />
            </div>
          </div>
          <div className="mt-[38px] flex w-full items-center gap-[60px] px-[70px]">
            <div className="supports-[corner-shape:squircle]:corner-squircle h-[242px] w-[220px] overflow-hidden rounded-[20px] border border-[#DBD8D8] supports-[corner-shape:squircle]:rounded-[40px] dark:border-neutral-900">
              <svg
                className="scale-105"
                fill="none"
                height="242"
                viewBox="0 0 220 242"
                width="220"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_143_5174)">
                  <path
                    clipRule="evenodd"
                    d="M387.445 310.024C392.203 352.113 365.537 391.74 340.112 425.638C317.539 455.734 279.093 466.745 251.066 491.851C218.362 521.145 205.465 582.328 161.659 585.487C117.56 588.667 97.3329 526.999 58.585 505.731C23.546 486.498 -31.3131 501.235 -52.9846 467.669C-74.8857 433.747 -39.8347 389.355 -42.5564 349.077C-45.1892 310.113 -76.4582 275.144 -68.5785 236.891C-60.2811 196.611 -29.9371 164.636 1.02023 137.532C34.1658 108.511 71.7354 81.9862 115.372 75.834C159.818 69.5677 207.436 78.4201 244.877 103.151C280.668 126.793 291.176 172.726 315.509 208.034C339.526 242.883 382.691 267.978 387.445 310.024Z"
                    fill="#F2F2F2"
                    fillRule="evenodd"
                    opacity="0.7"
                  />
                  <path
                    d="M233.483 147.193H192.798V226.768H50.9526L54.8667 147.193H17.9702L115.891 53.459L233.483 147.193Z"
                    fill="#EE4822"
                  />
                  <circle cx="91.0027" cy="155.021" fill="white" r="18.3677" />
                  <circle cx="140.3" cy="155.021" fill="white" r="18.3677" />
                  <circle
                    cx="92.6623"
                    cy="157.391"
                    fill="#09090B"
                    r="5.33255"
                  />
                  <circle
                    cx="136.743"
                    cy="157.391"
                    fill="#09090B"
                    r="5.33255"
                  />
                  <path
                    d="M117.653 35.7343C116.161 32.7765 114.169 30.8566 113.209 29.9355C112.93 29.6696 112.762 29.5074 112.658 29.3712C112.029 28.5474 111.899 27.821 111.769 27.114C111.698 26.7313 111.627 26.3291 111.471 25.875C111.276 25.3107 110.868 24.1302 109.798 23.3843C109.324 23.0665 108.332 22.5541 107.106 22.7746C105.594 23.073 104.816 24.5908 103.843 26.5107C102.773 28.6318 101.553 31.0382 98.8876 32.5041C97.8043 33.1009 96.8768 33.3278 96.0335 33.49C96.0335 33.49 90.4034 34.6057 88.4899 34.9883C88.2824 35.0273 88.1461 34.7938 88.2759 34.6251C88.5353 34.2943 88.7883 33.957 89.0542 33.6327C92.0704 29.9355 93.1471 25.2783 92.0055 20.8741C89.9688 12.9867 81.4198 8.35546 72.9551 10.5414C70.873 11.0797 68.8947 12.0202 67.1693 13.3045C65.4699 14.5629 64.0169 16.152 62.9337 17.9682C61.2473 20.7962 60.3392 24.461 60.9489 27.8015C60.9878 28.0285 60.9035 28.2555 60.7154 28.3917C59.9824 28.9171 59.2106 30.0263 58.5619 30.396C57.0571 31.2522 55.4874 30.182 53.8918 30.7852C53.3469 30.9863 52.8929 31.4209 52.7177 31.9722C52.2507 33.4381 53.6907 34.7289 54.8518 35.3776C56.6096 36.357 59.3792 36.8889 62.4213 36.5905C62.577 36.5775 62.6872 36.7332 62.6159 36.8694C62.1424 37.8424 61.8764 38.9321 61.844 39.4574C61.7727 40.7353 62.5186 41.812 63.8548 41.8444C64.5683 41.8639 65.2558 41.5979 65.8915 41.2866C66.9034 40.7872 68.0774 39.8077 69.0568 38.5299C69.193 38.3548 69.4266 38.2899 69.6341 38.3807C70.1011 38.5818 71.8524 39.1721 72.8708 39.5094C73.1303 39.5937 73.1368 39.9504 72.8903 40.0607C72.1573 40.372 71.606 40.5991 71.366 40.7288C69.699 41.598 67.766 42.7525 66.0212 44.7308C64.4515 46.5211 63.2515 48.7329 62.6483 50.9578C61.6559 54.6874 62.1878 57.5868 62.8105 59.3575C64.9315 65.3898 71.0157 67.6341 72.8319 68.179C73.4416 68.3606 74.0902 68.3736 74.7064 68.2114L110.654 58.9165C111.867 58.6051 112.976 58.1057 113.949 57.4441C114.234 57.2495 114.416 57.1003 114.572 56.9706C118.074 53.9933 119.313 50.0561 119.683 48.4994C119.696 48.441 121.097 42.2141 117.646 35.7732V35.7343H117.653Z"
                    fill="#FDC700"
                  />
                  <path
                    d="M117.653 35.7343C116.161 32.7765 114.169 30.8566 113.209 29.9355C112.93 29.6696 112.762 29.5074 112.658 29.3712C112.029 28.5474 111.899 27.821 111.769 27.114C111.698 26.7313 111.627 26.3291 111.471 25.875C111.276 25.3107 110.868 24.1302 109.798 23.3843C109.324 23.0665 108.332 22.5541 107.106 22.7746C105.594 23.073 104.816 24.5908 103.843 26.5107C102.773 28.6318 101.553 31.0382 98.8876 32.5041C97.8043 33.1009 96.8768 33.3278 96.0335 33.49C96.0335 33.49 90.4034 34.6057 88.4899 34.9883C88.2824 35.0273 88.1461 34.7938 88.2759 34.6251C88.5353 34.2943 88.7883 33.957 89.0542 33.6327C92.0704 29.9355 93.1471 25.2783 92.0055 20.8741C89.9688 12.9867 81.4198 8.35546 72.9551 10.5414C70.873 11.0797 68.8947 12.0202 67.1693 13.3045C65.4699 14.5629 64.0169 16.152 62.9337 17.9682C61.2473 20.7962 60.3392 24.461 60.9489 27.8015C60.9878 28.0285 60.9035 28.2555 60.7154 28.3917C59.9824 28.9171 59.2106 30.0263 58.5619 30.396C57.0571 31.2522 55.4874 30.182 53.8918 30.7852C53.3469 30.9863 52.8929 31.4209 52.7177 31.9722C52.2507 33.4381 53.6907 34.7289 54.8518 35.3776C56.6096 36.357 59.3792 36.8889 62.4213 36.5905C62.577 36.5775 62.6872 36.7332 62.6159 36.8694C62.1424 37.8424 61.8764 38.9321 61.844 39.4574C61.7727 40.7353 62.5186 41.812 63.8548 41.8444C64.5683 41.8639 65.2558 41.5979 65.8915 41.2866C66.9034 40.7872 68.0774 39.8077 69.0568 38.5299C69.193 38.3548 69.4266 38.2899 69.6341 38.3807C70.1011 38.5818 71.8524 39.1721 72.8708 39.5094C73.1303 39.5937 73.1368 39.9504 72.8903 40.0607C72.1573 40.372 71.606 40.5991 71.366 40.7288C69.699 41.598 67.766 42.7525 66.0212 44.7308C64.4515 46.5211 63.2515 48.7329 62.6483 50.9578C61.6559 54.6874 62.1878 57.5868 62.8105 59.3575C64.9315 65.3898 71.0157 67.6341 72.8319 68.179C73.4416 68.3606 74.0902 68.3736 74.7064 68.2114L110.654 58.9165C111.867 58.6051 112.976 58.1057 113.949 57.4441C114.234 57.2495 114.416 57.1003 114.572 56.9706C118.074 53.9933 119.313 50.0561 119.683 48.4994C119.696 48.441 121.097 42.2141 117.646 35.7732V35.7343H117.653Z"
                    fill="#FDC700"
                  />
                  <path
                    d="M57.5 30.5C58.8723 30.3475 61 28 61 28C63.8333 31.3333 69.5 38.1 69.5 38.5C69.5 38.9 67.1667 40.8333 66 41.5C65.3333 41.8333 64 42.5 62.5 41.5C61.4475 40.7984 61.5 39 62.5 37C57.5 38 53 35 52.5 33.5C52.5 31.5 53.0528 31.2236 53.5 31C54.5 30.5 56 30.6667 57.5 30.5Z"
                    fill="#E7000B"
                  />
                  <path
                    d="M66.7994 19.8228C64.9508 19.7839 63.5173 21.9308 63.4524 24.8237C63.3876 27.7166 64.7303 29.9285 66.5724 29.9674C66.7994 29.9674 67.0264 29.9414 67.2405 29.8831C67.9345 29.6885 68.5637 29.1566 69.0437 28.3458C69.582 27.4377 69.8934 26.2378 69.9193 24.9729C69.9842 22.08 68.6415 19.8682 66.7994 19.8292V19.8228Z"
                    fill="white"
                  />
                  <path
                    d="M66.7477 21.6517C65.7552 21.6258 64.9834 23.0009 64.951 24.8495C64.9121 26.6981 65.632 28.1121 66.6244 28.1381C66.7477 28.1381 66.8644 28.1251 66.9812 28.0862C67.3574 27.963 67.6882 27.6192 67.9477 27.1003C68.2331 26.5165 68.4017 25.7511 68.4211 24.9403C68.4601 23.0917 67.7401 21.6777 66.7477 21.6517Z"
                    fill="black"
                  />
                  <path
                    d="M91.1039 89.4934C91.1039 77.0266 80.9981 66.9209 68.5314 66.9209C56.0646 66.9209 45.9589 77.0266 45.9589 89.4934C45.9589 96.8164 49.4486 103.322 54.8517 107.448C51.4464 109.329 48.988 112.701 48.3459 116.691C47.0681 116.269 45.6995 116.029 44.279 116.029C37.1375 116.029 31.3452 121.821 31.3452 128.963C31.3452 136.104 37.1375 141.897 44.279 141.897C50.7134 141.897 56.0322 137.194 57.0311 131.045C58.3089 131.467 59.6776 131.706 61.0981 131.706C68.2395 131.706 74.0318 125.914 74.0318 118.773C74.0318 116.204 73.2729 113.817 71.9821 111.806C82.8143 110.146 91.1104 100.786 91.1104 89.4934H91.1039Z"
                    fill="#B8E6FE"
                  />
                  <path
                    d="M42.0736 110.983C44.7525 110.983 46.9189 108.81 46.9189 106.137C46.9189 103.465 44.746 101.292 42.0736 101.292C39.4012 101.292 37.2283 103.465 37.2283 106.137C37.2283 108.81 39.4012 110.983 42.0736 110.983Z"
                    fill="#B8E6FE"
                  />
                  <path
                    d="M3.28509 167.303C7.38683 167.303 10.712 163.978 10.712 159.876C10.712 155.774 7.38683 152.449 3.28509 152.449C-0.816657 152.449 -4.14178 155.774 -4.14178 159.876C-4.14178 163.978 -0.816657 167.303 3.28509 167.303Z"
                    fill="#B8E6FE"
                  />
                  <path
                    d="M223.334 196.855C219.105 196.855 215.155 198.023 211.769 200.04C209.603 196.057 206.262 192.801 202.221 190.725C203.869 188.553 204.861 185.854 204.861 182.916C204.861 175.774 199.069 169.982 191.927 169.982C184.786 169.982 178.994 175.774 178.994 182.916C178.994 185.854 179.986 188.553 181.634 190.725C175.465 193.891 170.951 199.813 169.705 206.863H64.9897C65.2297 205.287 65.353 203.679 65.353 202.038C65.353 184.291 50.9662 169.904 33.2196 169.904C17.2308 169.904 3.97919 181.58 1.50789 196.868C1.36519 196.868 1.22896 196.855 1.08626 196.855C-11.3805 196.855 -21.4862 206.961 -21.4862 219.428C-21.4862 231.894 -11.3805 242 1.08626 242H223.341C235.808 242 245.913 231.894 245.913 219.428C245.913 206.961 235.808 196.855 223.341 196.855H223.334Z"
                    fill="#B8E6FE"
                  />
                  <path
                    d="M223.334 196.855C219.105 196.855 215.155 198.023 211.769 200.04C209.603 196.057 206.262 192.801 202.221 190.725C203.869 188.553 204.861 185.854 204.861 182.916C204.861 175.774 199.069 169.982 191.927 169.982C184.786 169.982 178.994 175.774 178.994 182.916C178.994 185.854 179.986 188.553 181.633 190.725C175.465 193.891 170.951 199.813 169.705 206.863H64.9896C65.2296 205.287 65.3528 203.679 65.3528 202.038C65.3528 184.291 50.9661 169.904 33.2195 169.904C17.2306 169.904 3.97906 181.58 1.50777 196.868C1.36507 196.868 1.22884 196.855 1.08614 196.855C-11.3806 196.855 -21.4863 206.961 -21.4863 219.428C-21.4863 231.894 -11.3806 242 1.08614 242H223.341C235.807 242 245.913 231.894 245.913 219.428C245.913 206.961 235.807 196.855 223.341 196.855H223.334Z"
                    fill="#B8E6FE"
                    opacity="0.16"
                  />
                  <path
                    d="M209.707 172.149C212.383 172.149 214.552 169.979 214.552 167.303C214.552 164.627 212.383 162.458 209.707 162.458C207.031 162.458 204.861 164.627 204.861 167.303C204.861 169.979 207.031 172.149 209.707 172.149Z"
                    fill="#B8E6FE"
                  />
                  <path
                    d="M217.133 190.342C221.235 190.342 224.56 187.017 224.56 182.915C224.56 178.813 221.235 175.488 217.133 175.488C213.032 175.488 209.707 178.813 209.707 182.915C209.707 187.017 213.032 190.342 217.133 190.342Z"
                    fill="#B8E6FE"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_143_5174">
                    <rect fill="white" height="242" rx="30" width="220" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="flex flex-col gap-[18px]">
              <h3 className="font-sans text-[#0A0A0A] text-[42px] dark:text-white">
                <span className="tabular-nums">
                  {formatCurrency(Number(selectedAmount))}
                </span>{" "}
                Donation
              </h3>
              <p className="max-w-[345px] font-mono text-[#404040] text-[14px] dark:text-[#D4D4D4]">
                The icons will always be free and open-source, regardless of
                donations
              </p>
              <a
                className="mt-[16px] flex w-fit cursor-pointer items-center justify-center bg-primary px-[24px] py-[8px] font-sans text-[18px] text-white transition-colors duration-100 hover:bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-1"
                href={buyLink}
                rel="noopener noreferrer"
                tabIndex={0}
                target="_blank"
              >
                Sponsor
              </a>
            </div>
            <Stamp className="absolute -right-[56px] -bottom-[48px] size-[230px]" />
          </div>
        </div>
      </div>

      <a
        className="supports-[corner-shape:squircle]:corner-squircle hidden w-full cursor-pointer items-center justify-center rounded-[12px] bg-primary px-[24px] py-[8px] font-sans text-[18px] text-white transition-colors duration-100 hover:bg-[color-mix(in_oklab,var(--color-primary),black_10%)] focus-visible:outline-1 focus-visible:outline-primary focus-visible:outline-offset-1 supports-[corner-shape:squircle]:rounded-[20px] max-[610px]:flex"
        href={buyLink}
        rel="noopener noreferrer"
        tabIndex={0}
        target="_blank"
      >
        Sponsor
      </a>
    </div>
  );
};

export { AmountSelector };
