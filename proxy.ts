import { type NextRequest, NextResponse } from "next/server";

const TRAILING_SLASH = /\/$/;
const MD_SUFFIX = /\.md$/;
const FILE_EXTENSION = /\.[a-z0-9]+$/i;

const PASSTHROUGH_PREFIXES = [
  "/_next",
  "/api",
  "/r/",
  "/md",
  "/assets",
  "/mcp",
];
const PASSTHROUGH_PATHS = new Set([
  "/llms.txt",
  "/llms-full.txt",
  "/skill.md",
  "/sitemap.xml",
  "/robots.txt",
  "/icons/llms.txt",
]);

const isPassthrough = (pathname: string) => {
  if (PASSTHROUGH_PATHS.has(pathname)) return true;
  return PASSTHROUGH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
};

const toMdRewrite = (pathname: string) => {
  const trimmed = pathname.replace(TRAILING_SLASH, "");
  if (trimmed === "" || trimmed === "/") return "/md";
  return `/md${trimmed}`;
};

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname.endsWith(".md") && !PASSTHROUGH_PATHS.has(pathname)) {
    const realPath = pathname.replace(MD_SUFFIX, "") || "/";
    const target = toMdRewrite(realPath);
    return NextResponse.rewrite(new URL(`${target}${search}`, req.url));
  }

  const accept = req.headers.get("accept") ?? "";
  if (!accept.includes("text/markdown")) {
    return NextResponse.next();
  }

  if (isPassthrough(pathname) || FILE_EXTENSION.test(pathname)) {
    return NextResponse.next();
  }

  const target = toMdRewrite(pathname);
  return NextResponse.rewrite(new URL(`${target}${search}`, req.url));
}

export const proxyConfig = {
  matcher: ["/((?!_next/).*)"],
};
