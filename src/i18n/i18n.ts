import en from "./en.json";
import de from "./de.json";
import fr from "./fr.json";
import type { Lang } from "../data/site";

const dict: Record<Lang, Record<string, string>> = { fr, en, de };

export function t(lang: Lang, key: string): string {
  return dict[lang]?.[key] ?? dict.fr?.[key] ?? key;
}