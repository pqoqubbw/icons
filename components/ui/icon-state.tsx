"use client";

import { CheckIcon, LoaderIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const DEFAULT_LOADING_DELAY = 150;

type IconStatus = "idle" | "loading" | "done" | "error";

type IconStateProps = {
  children: React.ReactNode;
  status?: IconStatus;
  loadingDelay?: number;
};

const IconState = ({ children, status = "idle" }: IconStateProps) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      const timeout = setTimeout(
        () => setShowLoading(true),
        DEFAULT_LOADING_DELAY
      );
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setShowLoading(false), 0);

    return () => clearTimeout(timeout);
  }, [status]);

  const renderIcon = () => {
    if (status === "loading" && showLoading) {
      return <LoaderIcon aria-hidden="true" className="animate-spin" />;
    }

    if (status === "done") {
      return <CheckIcon aria-hidden="true" className="text-green-600" />;
    }

    if (status === "error") {
      return <XIcon aria-hidden="true" className="text-red-500" />;
    }

    return children;
  };

  const key = status === "loading" && !showLoading ? "idle" : status;

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.span
        animate="animate"
        className="flex items-center justify-center [&>svg]:size-4 [&>svg]:shrink-0"
        exit="exit"
        initial="initial"
        key={key}
        transition={{
          duration: 0.1,
          ease: "easeOut",
        }}
        variants={{
          initial: { opacity: 0, scale: 0.6, filter: "blur(3px)" },
          animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
          exit: { opacity: 0, scale: 0.6, filter: "blur(3px)" },
        }}
      >
        {renderIcon()}
      </motion.span>
    </AnimatePresence>
  );
};

export { IconState };
export type { IconStatus, IconStateProps };
