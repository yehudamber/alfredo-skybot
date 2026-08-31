import test from "node:test";
import assert from "node:assert/strict";

import getPostText from "../lib/getPostText.js";

test("getPostText returns a Hebrew term with the Alfredo suffix", async () => {
  const { text } = await getPostText();

  assert.match(text, /ברוטב אלפרדו$/);
});
