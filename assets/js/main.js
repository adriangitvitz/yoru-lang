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
  const toggles = document.querySelectorAll(
    ".menu-toggle[aria-controls], .docs-menu-toggle[aria-controls]"
  );
  if (!toggles.length) return;

  toggles.forEach((btn) => {
    const targetId = btn.getAttribute("aria-controls");
    const target = document.getElementById(targetId);
    if (!target) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = target.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("click", (e) => {
    toggles.forEach((btn) => {
      const targetId = btn.getAttribute("aria-controls");
      const target = document.getElementById(targetId);
      if (!target || !target.classList.contains("is-open")) return;
      if (target.contains(e.target) || btn.contains(e.target)) return;
      target.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  const primaryNav = document.getElementById("primary-nav");
  if (primaryNav) {
    primaryNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        primaryNav.classList.remove("is-open");
        document
          .querySelectorAll('.menu-toggle[aria-controls="primary-nav"]')
          .forEach((b) => b.setAttribute("aria-expanded", "false"));
      });
    });
  }

  const docsToc = document.getElementById("docs-toc");
  if (docsToc) {
    docsToc.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 959px)").matches) {
          docsToc.classList.remove("is-open");
          document
            .querySelectorAll('.docs-menu-toggle[aria-controls="docs-toc"]')
            .forEach((b) => b.setAttribute("aria-expanded", "false"));
        }
      });
    });
  }

  const mq = window.matchMedia("(min-width: 800px)");
  const handleMq = () => {
    if (mq.matches && primaryNav) {
      primaryNav.classList.remove("is-open");
      document
        .querySelectorAll('.menu-toggle[aria-controls="primary-nav"]')
        .forEach((b) => b.setAttribute("aria-expanded", "false"));
    }
  };
  if (mq.addEventListener) mq.addEventListener("change", handleMq);
  else mq.addListener(handleMq);
})();

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
