import { OpenPanel, type TrackProperties } from "@openpanel/sdk";

let client: OpenPanel | null = null;

const getClient = () => {
  if (process.env.NODE_ENV !== "production") return null;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.SECRET_KEY;
  if (!(clientId && clientSecret)) return null;
  if (!client) {
    client = new OpenPanel({
      clientId,
      clientSecret,
      sdk: "lucide-animated-server",
    });
  }
  return client;
};

const trackServer = (name: string, properties?: TrackProperties) => {
  const op = getClient();
  if (!op) return;
  op.track(name, properties).catch(() => {
    /* swallow analytics errors */
  });
};

const SERVER_EVENT = {
  MARKDOWN_VIEW: "markdown-view",
  LLMS_VIEW: "llms-view",
  MCP_TOOL_CALL: "mcp-tool-call",
} as const;

export { SERVER_EVENT, trackServer };
