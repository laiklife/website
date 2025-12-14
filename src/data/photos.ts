export type Photo = {
  src: string;          // path in /public
  alt: string;
  tags: string[];
};

export const TAGS = [
  "nature",
  "city",
  "portrait",
  "black & white",
  "architecture",
  "street",
  "travel",
  "night"
];

export const PHOTOS: Photo[] = [
  { src: "/photos/sample1.jpeg", alt: "Sample 1", tags: ["nature"] },
  { src: "/photos/sample2.jpeg", alt: "Sample 2", tags: ["city", "architecture"] },
  { src: "/photos/sample3.jpeg", alt: "Sample 3", tags: ["portrait"] },
  { src: "/photos/sample4.jpeg", alt: "Sample 4", tags: ["black & white", "street"] }
];
