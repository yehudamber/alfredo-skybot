import { createRequire } from "node:module";
import { env, version as nodeVersion } from "node:process";
import { z } from "zod";
import type { AtpAgentLoginOpts } from "@atproto/api";

const require = createRequire(import.meta.url);
const packageJson = require("../../package.json") as { version: string };

const envSchema = z.object({
  BSKY_HANDLE: z.string().min(1),
  BSKY_PASSWORD: z.string().min(1),
  BSKY_SERVICE: z.string().min(1).default("https://bsky.social"),

  USER_AGENT_URL: z.string().min(1),
});

const parsed = envSchema.parse(env);

export const bskyAccount: AtpAgentLoginOpts = {
  identifier: parsed.BSKY_HANDLE,
  password: parsed.BSKY_PASSWORD,
};

export const bskyService = parsed.BSKY_SERVICE;

export const userAgent =
  `AlfredoSkybot/${packageJson.version} (${parsed.USER_AGENT_URL}) Node/${nodeVersion}`;
