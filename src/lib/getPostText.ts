import getTerm from "./getTerm.js";

export default async function getPostText() {
  return {text: `${await getTerm()} ברוטב אלפרדו`, langs: ["he"]};
}
