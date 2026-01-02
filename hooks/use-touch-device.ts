"use client";

import { useEffect, useState } from "react";

const useTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasTouchScreen =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-expect-error - legacy property
      navigator.msMaxTouchPoints > 0;

    setIsTouchDevice(hasTouchScreen);
  }, []);

  return isTouchDevice;
};

export { useTouchDevice };
