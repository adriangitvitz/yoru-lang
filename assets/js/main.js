document.querySelectorAll(".code-window").forEach((win) => {
  const tabs  = win.querySelectorAll(".code-tab");
  const panes = win.querySelectorAll(".code-pane");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.target;
      tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
      panes.forEach((p) =>
        p.classList.toggle("is-active", p.id === target)
      );
    });
  });
});

(function () {
  const links = document.querySelectorAll(".toc-sidebar a[href^='#']");
  if (!links.length) return;
  const map = new Map();
  links.forEach((a) => {
    const id = a.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (target) map.set(target, a);
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          const link = map.get(e.target);
          if (link) link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
  );
  map.forEach((_link, section) => io.observe(section));
})();
