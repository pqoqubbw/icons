'use client';

import { useEffect, useState } from 'react';

type Browser = 'chrome' | 'safari' | 'firefox' | 'edge' | 'opera' | 'other';

type BrowserInfo = {
  browser: Browser;
  version?: string;
  isChrome: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  isOpera: boolean;
};

const useBrowser = (): BrowserInfo => {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({
    browser: 'other',
    isChrome: false,
    isSafari: false,
    isFirefox: false,
    isEdge: false,
    isOpera: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userAgent = navigator.userAgent.toLowerCase();
    let detectedBrowser: Browser = 'other';
    let version: string | undefined;

    if (userAgent.includes('edg/')) {
      detectedBrowser = 'edge';
      version = userAgent.match(/edg\/([\d.]+)/)?.[1];
    } else if (userAgent.includes('opr/') || userAgent.includes('opera')) {
      detectedBrowser = 'opera';
      version = userAgent.match(/(?:opr|opera)\/([\d.]+)/)?.[1];
    } else if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
      detectedBrowser = 'chrome';
      version = userAgent.match(/chrome\/([\d.]+)/)?.[1];
    } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      detectedBrowser = 'safari';
      version = userAgent.match(/version\/([\d.]+)/)?.[1];
    } else if (userAgent.includes('firefox')) {
      detectedBrowser = 'firefox';
      version = userAgent.match(/firefox\/([\d.]+)/)?.[1];
    }

    setBrowserInfo({
      browser: detectedBrowser,
      version,
      isChrome: detectedBrowser === 'chrome',
      isSafari: detectedBrowser === 'safari',
      isFirefox: detectedBrowser === 'firefox',
      isEdge: detectedBrowser === 'edge',
      isOpera: detectedBrowser === 'opera',
    });
  }, []);

  return browserInfo;
};

export { useBrowser };
