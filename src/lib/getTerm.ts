// Alfredo Skybot - Alfredo Bot for Bluesky
// Copyright (C) 2026 Yehuda Bernáth

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { userAgent } from "./config.js";

type WikiPage = {
  title?: string;
  pageprops?: {
    disambiguation?: string;
  };
};

export default async function getTerm(): Promise<string> {
  const url = new URL("https://he.wikipedia.org/w/api.php");
  url.search = new URLSearchParams({
    action: "query",
    generator: "random",
    grnnamespace: "0",
    grnlimit: "20",
    prop: "pageprops",
    format: "json",
    origin: "*",
  }).toString();

  console.log(`Fetching from ${url.toString()} with user-agent "${userAgent}"`)

  const response = await fetch(url, {
    headers: {
      "User-Agent": userAgent
    },
  });
  if (!response.ok) {
    throw new Error(`Wikipedia request failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as {
    query?: {
      pages?: Record<string, WikiPage>;
    };
  };

  const pages = Object.values(data.query?.pages ?? {});
  const eligible = pages.filter((page) => page.title && page.pageprops?.disambiguation === undefined);

  console.log(`Fetched pages: ${JSON.stringify(pages, null, 2)}`)
  console.log(`Deemed eligible: ${JSON.stringify(eligible, null, 2)}`)

  if (eligible.length === 0) {
    throw new Error("No non-disambiguation page titles were returned by Wikipedia");
  }

  return eligible[Math.floor(Math.random() * eligible.length)].title!;
}
