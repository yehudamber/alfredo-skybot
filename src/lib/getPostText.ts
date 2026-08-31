import getTerm from "./getTerm.js";

export default async function getPostText() {
  // Add U+200F RIGHT-TO-LEFT MARK at the start, and wrap the term between
  // U+2068 FIRST STRONG ISOLATE and U+2069 POP DIRECTIONAL ISOLATE to ensure proper rendering
  return {text: `\u{200F}\u{2068}${await getTerm()}\u{2069} ברוטב אלפרדו`, langs: ["he"]};
}
