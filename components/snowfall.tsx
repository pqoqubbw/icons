'use client';

import { memo, useEffect, useState } from 'react';
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
    <div className="pointer-events-none fixed inset-0 z-50">
      <Snowfall
        snowflakeCount={90}
        changeFrequency={300}
        opacity={[0.3, 0.8]}
        wind={[-2, 5]}
      />
    </div>
  );
});

SnowfallComponent.displayName = 'SnowfallComponent';

export { SnowfallComponent };
