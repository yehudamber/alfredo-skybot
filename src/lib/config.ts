import packageJson from "../../package.json" with { type: "json" }
import { versions } from "node:process";
import { z } from "zod";
import type { AtpAgentLoginOpts } from "@atproto/api";

const envSchema = z.object({
  DRY_RUN: z.boolean().default(true),

  BSKY_HANDLE: z.string().min(1),
  BSKY_PASSWORD: z.string().min(1),
  BSKY_SERVICE: z.string().min(1).default("https://bsky.social"),

  USER_AGENT_URL: z.string().min(1),
});

export interface Config {
  dryRun: boolean;
  bskyAccount: AtpAgentLoginOpts;
  bskyService: string;
  userAgent: string;
}

export function getConfig(env: Record<string, unknown>): Config {
  const parsed = envSchema.parse(env);

  return {
    dryRun: parsed.DRY_RUN,
    bskyAccount: {
      identifier: parsed.BSKY_HANDLE,
      password: parsed.BSKY_PASSWORD,
    },
    bskyService: parsed.BSKY_SERVICE,
    userAgent: `AlfredoSkybot/${packageJson.version} (${parsed.USER_AGENT_URL}) `
      + `Node/${versions.node}`,
  };
}
