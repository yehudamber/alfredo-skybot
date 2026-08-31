import getTerm from "./getTerm.js";

export default async function getPostText() {
  return `${await getTerm()} ברוטב אלפרדו`;
}
