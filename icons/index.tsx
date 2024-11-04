import { ArchiveIcon } from '@/icons/archive';
import { ArrowLeftIcon } from '@/icons/arrow-left';
import { ArrowRightIcon } from '@/icons/arrow-right';
import { AtSignIcon } from '@/icons/at-sign';
import { BadgePercentIcon } from '@/icons/badge-percent';
import { BellIcon } from '@/icons/bell';
import { BoldIcon } from '@/icons/bold';
import { CalendarCogIcon } from '@/icons/calendar-cog';
import { ChartPieIcon } from '@/icons/chart-pie';
import { CircleDollarSignIcon } from '@/icons/circle-dollar-sign';
import { CopyIcon } from '@/icons/copy';
import { CursorClickIcon } from '@/icons/cursor-click';
import { DeleteIcon } from '@/icons/delete';
import { DownloadIcon } from '@/icons/download';
import { DownvoteIcon } from '@/icons/downvote';
import { EditIcon } from '@/icons/edit';
import { ExpandIcon } from '@/icons/expand';
import { FilePenLineIcon } from '@/icons/file-pen-line';
import { FileStackIcon } from '@/icons/file-stack';
import { FingerprintIcon } from '@/icons/fingerprint';
import { GitPullRequestIcon } from '@/icons/git-pull-request';
import { GridIcon } from '@/icons/grid';
import { HandCoinsIcon } from '@/icons/hand-coins';
import { HomeIcon } from '@/icons/home';
import { ItalicIcon } from '@/icons/italic';
import { LanguagesIcon } from '@/icons/languages';
import { LayersIcon } from '@/icons/layers';
import { LinkIcon } from '@/icons/link';
import { PartyPopperIcon } from '@/icons/party-popper';
import { PenToolIcon } from '@/icons/pen-tool';
import { RefreshIcon } from '@/icons/refresh';
import { RouteIcon } from '@/icons/route';
import { ScanTextIcon } from '@/icons/scan-text';
import { SettingsIcon } from '@/icons/settings';
import { SettingsGearIcon } from '@/icons/settings-gear';
import { SunIcon } from '@/icons/sun';
import { UnderlineIcon } from '@/icons/underline';
import { UndoIcon } from '@/icons/undo';
import { UnplugIcon } from '@/icons/unplug';
import { UpvoteIcon } from '@/icons/upvote';
import { UsersIcon } from '@/icons/users';
import { VolumeIcon } from '@/icons/volume';
import { AttachFileIcon } from '@/icons/attach-file';
import { GaugeIcon } from '@/icons/gauge';
import { MenuIcon } from '@/icons/menu';
import { ClockIcon } from '@/icons/clock';

const ICONS_MAP = {
  'home': HomeIcon,
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  'expand': ExpandIcon,
  'refresh': RefreshIcon,
  'undo': UndoIcon,
  'cursor-click': CursorClickIcon,
  'file-stack': FileStackIcon,
  'file-pen-line': FilePenLineIcon,
  'archive': ArchiveIcon,
  'download': DownloadIcon,
  'copy': CopyIcon,
  'edit': EditIcon,
  'delete': DeleteIcon,
  'bold': BoldIcon,
  'italic': ItalicIcon,
  'underline': UnderlineIcon,
  'scan-text': ScanTextIcon,
  'languages': LanguagesIcon,
  'at-sign': AtSignIcon,
  'bell': BellIcon,
  'users': UsersIcon,
  'upvote': UpvoteIcon,
  'downvote': DownvoteIcon,
  'circle-dollar-sign': CircleDollarSignIcon,
  'hand-coins': HandCoinsIcon,
  'badge-percent': BadgePercentIcon,
  'chart-pie': ChartPieIcon,
  'settings': SettingsIcon,
  'settings-gear': SettingsGearIcon,
  'calendar-cog': CalendarCogIcon,
  'pen-tool': PenToolIcon,
  'fingerprint': FingerprintIcon,
  'link': LinkIcon,
  'layers': LayersIcon,
  'grid': GridIcon,
  'route': RouteIcon,
  'git-pull-request': GitPullRequestIcon,
  'unplug': UnplugIcon,
  'volume': VolumeIcon,
  'sun': SunIcon,
  'party-popper': PartyPopperIcon,
  'attach-file': AttachFileIcon,
  'gauge': GaugeIcon,
  'menu': MenuIcon,
  'clock': ClockIcon,
} as const;

export { ICONS_MAP };
