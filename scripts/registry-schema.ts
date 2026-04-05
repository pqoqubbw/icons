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
  content?: string;
  path: string;
  target?: string;
  type: RegistryType;
}

export interface TailwindConfig {
  config?: Record<string, object>;
}

export interface CssVars {
  dark?: Record<string, string>;
  light?: Record<string, string>;
  theme?: Record<string, string>;
}

export interface Schema {
  $schema?: string;
  author?: string;
  categories?: string[];
  css?: Record<string, object>;
  cssVars?: CssVars;
  dependencies?: string[];
  description?: string;
  devDependencies?: string[];
  docs?: string;
  envVars?: Record<string, string>;
  files: RegistryFile[];
  meta?: Record<string, unknown>;
  name: string;
  registryDependencies?: string[];
  tailwind?: TailwindConfig;
  title?: string;
  type: RegistryType;
}
