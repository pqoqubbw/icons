import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
  container?: Element | null;
};

const Portal = ({ children, container }: PortalProps) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return null;
  }

  return createPortal(children, container ?? document.body);
};

export { Portal };
