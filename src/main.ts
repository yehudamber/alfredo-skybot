import Bot from "./lib/bot.js";
import { getConfig } from "./lib/config.js";
import getPostText from "./lib/getPostText.js";

export default async function main(env: Record<string, unknown>) {
  const config = getConfig(env);

  const post = await Bot.run(
    () => getPostText(config),
    {
      service: config.bskyService,
      account: config.bskyAccount,
      dryRun: config.dryRun,
    });

  console.log(
    `[${new Date().toISOString()}] Posted: ${JSON.stringify(post, null, 2)}`
  );
}
