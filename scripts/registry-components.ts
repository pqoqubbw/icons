import path from 'path';
import type { Schema } from './registry-schema';

type ComponentDefinition = Partial<
  Pick<
    Schema,
    | 'dependencies'
    | 'devDependencies'
    | 'registryDependencies'
    | 'cssVars'
    | 'tailwind'
  >
> & {
  name: string;
  path: string;
};

export const components: ComponentDefinition[] = [
  {
    'name': 'activity',
    'path': path.join(__dirname, '../icons/activity.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'airplane',
    'path': path.join(__dirname, '../icons/airplane.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'alarm-clock',
    'path': path.join(__dirname, '../icons/alarm-clock.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'align-center',
    'path': path.join(__dirname, '../icons/align-center.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'align-horizontal',
    'path': path.join(__dirname, '../icons/align-horizontal.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'align-vertical',
    'path': path.join(__dirname, '../icons/align-vertical.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'angry',
    'path': path.join(__dirname, '../icons/angry.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'archive',
    'path': path.join(__dirname, '../icons/archive.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-down-0-1',
    'path': path.join(__dirname, '../icons/arrow-down-0-1.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-down-1-0',
    'path': path.join(__dirname, '../icons/arrow-down-1-0.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-down-a-z',
    'path': path.join(__dirname, '../icons/arrow-down-a-z.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-down-z-a',
    'path': path.join(__dirname, '../icons/arrow-down-z-a.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-left',
    'path': path.join(__dirname, '../icons/arrow-left.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-right',
    'path': path.join(__dirname, '../icons/arrow-right.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'at-sign',
    'path': path.join(__dirname, '../icons/at-sign.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'attach-file',
    'path': path.join(__dirname, '../icons/attach-file.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'audio-lines',
    'path': path.join(__dirname, '../icons/audio-lines.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'badge-alert',
    'path': path.join(__dirname, '../icons/badge-alert.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'badge-percent',
    'path': path.join(__dirname, '../icons/badge-percent.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'ban',
    'path': path.join(__dirname, '../icons/ban.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'banana',
    'path': path.join(__dirname, '../icons/banana.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'battery-full',
    'path': path.join(__dirname, '../icons/battery-full.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'bell',
    'path': path.join(__dirname, '../icons/bell.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'bluetooth-connected',
    'path': path.join(__dirname, '../icons/bluetooth-connected.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'bluetooth-off',
    'path': path.join(__dirname, '../icons/bluetooth-off.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'bluetooth-searching',
    'path': path.join(__dirname, '../icons/bluetooth-searching.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'bold',
    'path': path.join(__dirname, '../icons/bold.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'bone',
    'path': path.join(__dirname, '../icons/bone.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'book-text',
    'path': path.join(__dirname, '../icons/book-text.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'calendar-cog',
    'path': path.join(__dirname, '../icons/calendar-cog.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'cart',
    'path': path.join(__dirname, '../icons/cart.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'cctv',
    'path': path.join(__dirname, '../icons/cctv.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chart-bar-decreasing',
    'path': path.join(__dirname, '../icons/chart-bar-decreasing.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chart-bar-increasing',
    'path': path.join(__dirname, '../icons/chart-bar-increasing.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chart-column-decreasing',
    'path': path.join(__dirname, '../icons/chart-column-decreasing.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chart-column-increasing',
    'path': path.join(__dirname, '../icons/chart-column-increasing.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chart-pie',
    'path': path.join(__dirname, '../icons/chart-pie.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chart-scatter',
    'path': path.join(__dirname, '../icons/chart-scatter.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'check-check',
    'path': path.join(__dirname, '../icons/check-check.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'check',
    'path': path.join(__dirname, '../icons/check.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chevrons-down-up',
    'path': path.join(__dirname, '../icons/chevrons-down-up.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chevrons-left-right',
    'path': path.join(__dirname, '../icons/chevrons-left-right.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chevrons-right-left',
    'path': path.join(__dirname, '../icons/chevrons-right-left.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chevrons-up-down',
    'path': path.join(__dirname, '../icons/chevrons-up-down.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chrome',
    'path': path.join(__dirname, '../icons/chrome.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'circle-check',
    'path': path.join(__dirname, '../icons/circle-check.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'circle-chevron-down',
    'path': path.join(__dirname, '../icons/circle-chevron-down.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'circle-chevron-left',
    'path': path.join(__dirname, '../icons/circle-chevron-left.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'circle-chevron-right',
    'path': path.join(__dirname, '../icons/circle-chevron-right.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'circle-chevron-up',
    'path': path.join(__dirname, '../icons/circle-chevron-up.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'circle-dashed',
    'path': path.join(__dirname, '../icons/circle-dashed.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'circle-dollar-sign',
    'path': path.join(__dirname, '../icons/circle-dollar-sign.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'circle-help',
    'path': path.join(__dirname, '../icons/circle-help.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'clap',
    'path': path.join(__dirname, '../icons/clap.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'clock',
    'path': path.join(__dirname, '../icons/clock.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'coffee',
    'path': path.join(__dirname, '../icons/coffee.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'cog',
    'path': path.join(__dirname, '../icons/cog.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'compass',
    'path': path.join(__dirname, '../icons/compass.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'connect',
    'path': path.join(__dirname, '../icons/connect.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'copy',
    'path': path.join(__dirname, '../icons/copy.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'cpu',
    'path': path.join(__dirname, '../icons/cpu.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'cursor-click',
    'path': path.join(__dirname, '../icons/cursor-click.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'delete',
    'path': path.join(__dirname, '../icons/delete.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'download',
    'path': path.join(__dirname, '../icons/download.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'downvote',
    'path': path.join(__dirname, '../icons/downvote.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'drum',
    'path': path.join(__dirname, '../icons/drum.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'earth',
    'path': path.join(__dirname, '../icons/earth.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'expand',
    'path': path.join(__dirname, '../icons/expand.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'eye-off',
    'path': path.join(__dirname, '../icons/eye-off.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'figma',
    'path': path.join(__dirname, '../icons/figma.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'file-pen-line',
    'path': path.join(__dirname, '../icons/file-pen-line.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'file-stack',
    'path': path.join(__dirname, '../icons/file-stack.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'fingerprint',
    'path': path.join(__dirname, '../icons/fingerprint.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'fish-symbol',
    'path': path.join(__dirname, '../icons/fish-symbol.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'flame',
    'path': path.join(__dirname, '../icons/flame.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'flask',
    'path': path.join(__dirname, '../icons/flask.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'frame',
    'path': path.join(__dirname, '../icons/frame.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'gauge',
    'path': path.join(__dirname, '../icons/gauge.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'git-commit-horizontal',
    'path': path.join(__dirname, '../icons/git-commit-horizontal.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'git-commit-vertical',
    'path': path.join(__dirname, '../icons/git-commit-vertical.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'git-pull-request',
    'path': path.join(__dirname, '../icons/git-pull-request.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'github',
    'path': path.join(__dirname, '../icons/github.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'grip',
    'path': path.join(__dirname, '../icons/grip.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'hand-coins',
    'path': path.join(__dirname, '../icons/hand-coins.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'home',
    'path': path.join(__dirname, '../icons/home.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'id-card',
    'path': path.join(__dirname, '../icons/id-card.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'italic',
    'path': path.join(__dirname, '../icons/italic.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'keyboard',
    'path': path.join(__dirname, '../icons/keyboard.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'languages',
    'path': path.join(__dirname, '../icons/languages.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'layers',
    'path': path.join(__dirname, '../icons/layers.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'layout-panel-top',
    'path': path.join(__dirname, '../icons/layout-panel-top.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'link',
    'path': path.join(__dirname, '../icons/link.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'loader-pinwheel',
    'path': path.join(__dirname, '../icons/loader-pinwheel.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'logout',
    'path': path.join(__dirname, '../icons/logout.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'map-pin-check-inside',
    'path': path.join(__dirname, '../icons/map-pin-check-inside.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'map-pin-check',
    'path': path.join(__dirname, '../icons/map-pin-check.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'map-pin-house',
    'path': path.join(__dirname, '../icons/map-pin-house.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'map-pin-minus-inside',
    'path': path.join(__dirname, '../icons/map-pin-minus-inside.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'map-pin-minus',
    'path': path.join(__dirname, '../icons/map-pin-minus.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'map-pin-off',
    'path': path.join(__dirname, '../icons/map-pin-off.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'map-pin-plus-inside',
    'path': path.join(__dirname, '../icons/map-pin-plus-inside.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'map-pin-plus',
    'path': path.join(__dirname, '../icons/map-pin-plus.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'map-pin-x-inside',
    'path': path.join(__dirname, '../icons/map-pin-x-inside.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'map-pin',
    'path': path.join(__dirname, '../icons/map-pin.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'menu',
    'path': path.join(__dirname, '../icons/menu.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'message-circle-more',
    'path': path.join(__dirname, '../icons/message-circle-more.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'message-circle',
    'path': path.join(__dirname, '../icons/message-circle.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'party-popper',
    'path': path.join(__dirname, '../icons/party-popper.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'pause',
    'path': path.join(__dirname, '../icons/pause.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'pen-tool',
    'path': path.join(__dirname, '../icons/pen-tool.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'play',
    'path': path.join(__dirname, '../icons/play.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'rabbit',
    'path': path.join(__dirname, '../icons/rabbit.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'refresh',
    'path': path.join(__dirname, '../icons/refresh.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'rocket',
    'path': path.join(__dirname, '../icons/rocket.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'rocking-chair',
    'path': path.join(__dirname, '../icons/rocking-chair.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'roller-coaster',
    'path': path.join(__dirname, '../icons/roller-coaster.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'route',
    'path': path.join(__dirname, '../icons/route.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'scan-text',
    'path': path.join(__dirname, '../icons/scan-text.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'search',
    'path': path.join(__dirname, '../icons/search.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'settings-gear',
    'path': path.join(__dirname, '../icons/settings-gear.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'settings',
    'path': path.join(__dirname, '../icons/settings.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'shield-check',
    'path': path.join(__dirname, '../icons/shield-check.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'ship',
    'path': path.join(__dirname, '../icons/ship.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'shower-head',
    'path': path.join(__dirname, '../icons/shower-head.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'sparkles',
    'path': path.join(__dirname, '../icons/sparkles.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'square-pen',
    'path': path.join(__dirname, '../icons/square-pen.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'square-stack',
    'path': path.join(__dirname, '../icons/square-stack.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'stethoscope',
    'path': path.join(__dirname, '../icons/stethoscope.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'sun',
    'path': path.join(__dirname, '../icons/sun.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'syringe',
    'path': path.join(__dirname, '../icons/syringe.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'telescope',
    'path': path.join(__dirname, '../icons/telescope.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'terminal',
    'path': path.join(__dirname, '../icons/terminal.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'timer',
    'path': path.join(__dirname, '../icons/timer.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'train-track',
    'path': path.join(__dirname, '../icons/train-track.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'trending-down',
    'path': path.join(__dirname, '../icons/trending-down.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'trending-up-down',
    'path': path.join(__dirname, '../icons/trending-up-down.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'trending-up',
    'path': path.join(__dirname, '../icons/trending-up.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'underline',
    'path': path.join(__dirname, '../icons/underline.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'undo',
    'path': path.join(__dirname, '../icons/undo.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'upvote',
    'path': path.join(__dirname, '../icons/upvote.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'user',
    'path': path.join(__dirname, '../icons/user.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'users',
    'path': path.join(__dirname, '../icons/users.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'volume',
    'path': path.join(__dirname, '../icons/volume.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'waypoints',
    'path': path.join(__dirname, '../icons/waypoints.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'webhook',
    'path': path.join(__dirname, '../icons/webhook.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'wifi',
    'path': path.join(__dirname, '../icons/wifi.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'wind',
    'path': path.join(__dirname, '../icons/wind.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'x',
    'path': path.join(__dirname, '../icons/x.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'workflow',
    'path': path.join(__dirname, '../icons/workflow.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'youtube',
    'path': path.join(__dirname, '../icons/youtube.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'dribbble',
    'path': path.join(__dirname, '../icons/dribbble.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'discord',
    'path': path.join(__dirname, '../icons/discord.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'instagram',
    'path': path.join(__dirname, '../icons/instagram.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'linkedin',
    'path': path.join(__dirname, '../icons/linkedin.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'twitch',
    'path': path.join(__dirname, '../icons/twitch.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'facebook',
    'path': path.join(__dirname, '../icons/facebook.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'moon',
    'path': path.join(__dirname, '../icons/moon.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'vibrate',
    'path': path.join(__dirname, '../icons/vibrate.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'smartphone-charging',
    'path': path.join(__dirname, '../icons/smartphone-charging.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'cast',
    'path': path.join(__dirname, '../icons/cast.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'clipboard-check',
    'path': path.join(__dirname, '../icons/clipboard-check.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'upload',
    'path': path.join(__dirname, '../icons/upload.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'cloud-sun',
    'path': path.join(__dirname, '../icons/cloud-sun.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'sun-dim',
    'path': path.join(__dirname, '../icons/sun-dim.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'sun-medium',
    'path': path.join(__dirname, '../icons/sun-medium.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'sun-moon',
    'path': path.join(__dirname, '../icons/sun-moon.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'sunset',
    'path': path.join(__dirname, '../icons/sunset.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'twitter',
    'path': path.join(__dirname, '../icons/twitter.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'message-circle-dashed',
    'path': path.join(__dirname, '../icons/message-circle-dashed.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'message-square-dashed',
    'path': path.join(__dirname, '../icons/message-square-dashed.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'message-square-more',
    'path': path.join(__dirname, '../icons/message-square-more.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'message-square',
    'path': path.join(__dirname, '../icons/message-square.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'a-arrow-down',
    'path': path.join(__dirname, '../icons/a-arrow-down.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'a-arrow-up',
    'path': path.join(__dirname, '../icons/a-arrow-up.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-down',
    'path': path.join(__dirname, '../icons/arrow-down.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-up',
    'path': path.join(__dirname, '../icons/arrow-up.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'chart-spline',
    'path': path.join(__dirname, '../icons/chart-spline.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'calendar-days',
    'path': path.join(__dirname, '../icons/calendar-days.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'file-cog',
    'path': path.join(__dirname, '../icons/file-cog.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-big-down',
    'path': path.join(__dirname, '../icons/arrow-big-down.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-big-left',
    'path': path.join(__dirname, '../icons/arrow-big-left.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-big-right',
    'path': path.join(__dirname, '../icons/arrow-big-right.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'arrow-big-up',
    'path': path.join(__dirname, '../icons/arrow-big-up.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'apple',
    'path': path.join(__dirname, '../icons/apple.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'cherry',
    'path': path.join(__dirname, '../icons/cherry.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'citrus',
    'path': path.join(__dirname, '../icons/citrus.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'grape',
    'path': path.join(__dirname, '../icons/grape.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
  {
    'name': 'vegan',
    'path': path.join(__dirname, '../icons/vegan.tsx'),
    'registryDependencies': [],
    'dependencies': ['motion'],
  },
];
