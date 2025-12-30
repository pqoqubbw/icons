import { OpenPanelComponent } from '@openpanel/nextjs';

enum ANALYTIC_EVENT {
  HEADER_GITHUB = 'header-github',
  ICON_COPY = 'icon-copy',
  ICON_COPY_TERMINAL = 'icon-copy-terminal',
  ICON_OPEN_IN_V0 = 'icon-open-in-v0',
  COMMENT_ANIMATION_DEV_LINK = 'comment-link-click',
  COMMENT_BUTTON_CLICK = 'comment-button-click',
}

const Analytics = () => {
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <OpenPanelComponent
      clientId={process.env.CLIENT_ID!}
      clientSecret={process.env.SECRET_KEY!}
      trackScreenViews
    />
  );
};

export { Analytics, ANALYTIC_EVENT };
