export function initReveal() {
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        (e.target as HTMLElement).classList.add("is-visible");
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}