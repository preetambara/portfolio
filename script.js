/**
 * Preetam Bara Portfolio — script.js
 * Clean Vanilla JavaScript
 * Features: Typewriter, Navbar Glass Scroll, Mobile Nav, IntersectionObserver Reveals
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypewriter();
  initScrollReveals();
  initActiveNav();
});

/* ── 1. Navbar Glass Effect & Mobile Menu ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('nav-scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.classList.toggle('nav-open');
      document.body.classList.toggle('menu-active');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('nav-open');
        document.body.classList.remove('menu-active');
      });
    });
  }
}

/* ── 2. Typewriter Effect ── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    'Full-Stack Developer',
    'Systems Thinker',
    'C++ & Web Builder',
    'MCA @ MANIT Bhopal'
  ];

  let rIdx = 0;
  let cIdx = 0;
  let deleting = false;

  function type() {
    const current = roles[rIdx];
    el.textContent = deleting ? current.slice(0, cIdx--) : current.slice(0, cIdx++);

    if (!deleting && cIdx > current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }

    if (deleting && cIdx < 0) {
      deleting = false;
      rIdx = (rIdx + 1) % roles.length;
    }

    setTimeout(type, deleting ? 45 : 85);
  }

  // Respect prefers-reduced-motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    type();
  } else {
    el.textContent = roles[0];
  }
}

/* ── 3. Scroll Reveals (IntersectionObserver) ── */
function initScrollReveals() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }
}

/* ── 4. Active Navigation Link Tracker ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
}
