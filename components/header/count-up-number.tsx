'use client';

import { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';

type Props = {
  number: number;
};

const CountUpNumber = ({ number }: Props) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const animation = animate(count, number, { duration: 2 });
    return animation.stop;
  }, [count, number]);

  return <motion.span>{rounded}</motion.span>;
};

export { CountUpNumber };
