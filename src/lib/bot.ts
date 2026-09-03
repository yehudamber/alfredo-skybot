import type {
  AppBskyFeedPost,
  AtpAgentLoginOpts,
  AtpAgentOptions,
} from "@atproto/api";
import { AtpAgent, RichText } from "@atproto/api";

export type Post = Partial<AppBskyFeedPost.Record>
  & Omit<AppBskyFeedPost.Record, "createdAt">;

interface BotOptions {
  service: string | URL;
  account: AtpAgentLoginOpts;
  dryRun: boolean;
}

export default class Bot {
  #agent;

  constructor(service: AtpAgentOptions["service"]) {
    this.#agent = new AtpAgent({ service });
  }

  login(loginOpts: AtpAgentLoginOpts) {
    return this.#agent.login(loginOpts);
  }

  async post(
    text:
      | string
      | Post,
  ) {
    if (typeof text === "string") {
      const richText = new RichText({ text });
      await richText.detectFacets(this.#agent);
      const record = {
        text: richText.text,
        facets: richText.facets,
      };
      return this.#agent.post(record);
    } else {
      return this.#agent.post(text);
    }
  }

  static async run(
    getPost: () => Promise<Post>,
    botOptions: BotOptions,
  ) {
    const { service, account, dryRun } = botOptions;

    const bot = new Bot(service);
    await bot.login(account);
    const post = await getPost();
    if (!dryRun) {
      await bot.post(post);
    } else {
      console.log(post.text);
    }
    return post;
  }
}
