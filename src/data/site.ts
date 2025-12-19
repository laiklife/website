export const SITE = {
  name: "Laiklife Photography",
  domain: "laiklife.fr",
  email: "hello@laiklife.fr", // <- ändern
  defaultLang: "fr",
  languages: ["fr", "en", "de"] as const,
  social: {
    instagram: "", // optional
    linkedin: "",
  },
};

export type Lang = (typeof SITE.languages)[number];