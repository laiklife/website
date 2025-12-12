export function enhanceViewTransitions() {
  // Progressive enhancement: only works in browsers supporting it
  // We use it by intercepting internal links.
  if (!("startViewTransition" in document)) return;

  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement)?.closest?.("a");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (!isInternal) return;

    // let normal navigation happen but wrap it
    e.preventDefault();
    (document as any).startViewTransition(() => {
      window.location.href = href;
    });
  });
}