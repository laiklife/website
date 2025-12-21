export const SITE = {
  name: "LaikLife",
  domain: "laiklife.fr",
  email: "hello@laiklife.fr",
  defaultLang: "fr",
  languages: ["fr", "en", "de"] as const,
  social: {
    instagram: "https://instagram.com/laiklife",
  },
};

export type Lang = (typeof SITE.languages)[number];