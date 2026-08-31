import getTerm from "./getTerm.js";

export default async function getPostText() {
  // Add U+200F RIGHT-TO-LEFT MARK to make Latin-script terms render correctly
  return {text: `\u{200F}${await getTerm()} ברוטב אלפרדו`, langs: ["he"]};
}
