const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
  });
}

const dockLinks = [...document.querySelectorAll('.mobile-dock__link[href^="#"]')];
const dockSections = dockLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActiveDockLink = (id) => {
  dockLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });
};

dockLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('href').slice(1);
    setActiveDockLink(targetId);
  });
});

if ('IntersectionObserver' in window && dockSections.length) {
  const dockObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) {
        setActiveDockLink(visibleEntry.target.id);
      }
    },
    {rootMargin: '-35% 0px -50% 0px', threshold: [0.1, 0.35, 0.6]}
  );

  dockSections.forEach((section) => dockObserver.observe(section));
}
