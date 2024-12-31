'use client';

import { useEffect, useState, memo } from 'react';
import Snowfall from 'react-snowfall';

const SNOWFALL_DELAY = 1500;

const SnowfallComponent = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, SNOWFALL_DELAY);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Snowfall
        snowflakeCount={150}
        changeFrequency={400}
        opacity={[0.3, 0.8]}
        wind={[-2, 5]}
      />
    </div>
  );
});

SnowfallComponent.displayName = 'SnowfallComponent';

export { SnowfallComponent };
