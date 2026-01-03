export type RegistryType =
  | "registry:block"
  | "registry:component"
  | "registry:lib"
  | "registry:hook"
  | "registry:ui"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:theme"
  | "registry:item";

export interface RegistryFile {
  path: string;
  content?: string;
  type: RegistryType;
  target?: string;
}

export interface TailwindConfig {
  config?: Record<string, object>;
}

export interface CssVars {
  theme?: Record<string, string>;
  light?: Record<string, string>;
  dark?: Record<string, string>;
}

export interface Schema {
  $schema?: string;
  name: string;
  type: RegistryType;
  title?: string;
  description?: string;
  author?: string;
  registryDependencies?: string[];
  dependencies?: string[];
  devDependencies?: string[];
  files: RegistryFile[];
  tailwind?: TailwindConfig;
  cssVars?: CssVars;
  css?: Record<string, object>;
  envVars?: Record<string, string>;
  docs?: string;
  categories?: string[];
  meta?: Record<string, unknown>;
}
