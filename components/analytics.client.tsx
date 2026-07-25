"use client";

import dynamic from "next/dynamic";

const OpenPanelComponent = dynamic(
  () => import("@openpanel/nextjs").then((m) => m.OpenPanelComponent),
  { ssr: false }
);

type AnalyticsClientProps = {
  clientId: string;
  clientSecret: string;
};

const AnalyticsClient = ({ clientId, clientSecret }: AnalyticsClientProps) => (
  <OpenPanelComponent
    clientId={clientId}
    clientSecret={clientSecret}
    trackScreenViews
  />
);

export { AnalyticsClient };
