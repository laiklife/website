import { SITE, type Lang } from "../data/site";

export function getLangPaths() {
  return SITE.languages.map((lang) => ({ params: { lang } }));
}

export function isLang(x: string): x is Lang {
  return (SITE.languages as readonly string[]).includes(x);
}