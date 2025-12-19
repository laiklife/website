import { SITE, type Lang } from "../data/site";

export function getLangPaths() {
  // FR wird über Root-Seiten gelöst, nicht über /fr
  return SITE.languages
    .filter((l) => l !== "fr")
    .map((lang) => ({ params: { lang } }));
}

export function isLang(x: string): x is Lang {
  return (SITE.languages as readonly string[]).includes(x);
}

export function basePath(lang: Lang) {
  return lang === "fr" ? "" : `/${lang}`;
}

// ✅ Robust: Sprache aus der URL ableiten (statischer Build = URL ist Wahrheit)
export function langFromPathname(pathname: string): Lang {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLang(first) ? (first as Lang) : SITE.defaultLang;
}