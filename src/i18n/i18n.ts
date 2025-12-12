import en from "./en.json";
import de from "./de.json";
import fr from "./fr.json";
import type { Lang } from "../data/site";

const dict = { en, de, fr } as const;

export function t(lang: Lang, key: keyof typeof en): string {
  const table = dict[lang] ?? dict.en;
  return (table as any)[key] ?? (dict.en as any)[key] ?? key;
}