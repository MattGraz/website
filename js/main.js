/* ═══════════════════════════════════════════════════
   Matt Graziano — Personal Website
   Vanilla JS — no dependencies
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Mobile Nav Toggle ───
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ─── Header scroll effect ───
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  function onScroll() {
    const scrollY = window.scrollY;
    header.classList.toggle('scrolled', scrollY > 20);
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── Active nav link on scroll ───
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-links .nav-link[href^="#"]');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkElements.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ─── Scroll-triggered fade-in animations ───
  const animatedElements = document.querySelectorAll(
    '.timeline-item, .education-card, .philosophy-card, .skill-category, ' +
    '.highlight-card, .gallery-item, .about-text, .about-highlights, ' +
    '.philosophy-extra, .interests-intro'
  );

  // Add the fade-in class to all animated elements
  animatedElements.forEach(el => el.classList.add('fade-in'));

  // Add stagger class to parent containers
  document.querySelectorAll('.timeline, .education-grid, .philosophy-grid, .skills-grid, .about-highlights, .gallery')
    .forEach(el => el.classList.add('stagger-children'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  animatedElements.forEach(el => observer.observe(el));

  // Initial calls
  onScroll();
  updateActiveNav();
})();
