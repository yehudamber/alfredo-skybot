import Bot from "./lib/bot.js";
import getPostText from "./lib/getPostText.js";

const post = await Bot.run(getPostText, { dryRun: true });

console.log(
  `[${new Date().toISOString()}] Posted: ${JSON.stringify(post, null, 2)}`
);
