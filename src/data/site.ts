export const SITE = {
  name: "Laiklife Photography",
  domain: "laiklife.fr",
  email: "hello@laiklife.fr", // <- ändern
  defaultLang: "fr",
  languages: ["fr", "en", "de"] as const,
  social: {
    instagram: "https://instagram.com/laiklife",
  },
};

export type Lang = (typeof SITE.languages)[number];