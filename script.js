/* ═══════════════════════════════════════════
   WAHEEB HONEY — Vanilla JS
   Loader, Navbar, Mobile Menu, Scroll Reveal
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ── */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 600);
  });
  // fallback in case 'load' already fired
  setTimeout(() => loader.classList.add('hidden'), 2200);

  /* ── NAVBAR SCROLL STATE ── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ── MOBILE MENU TOGGLE ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mob-link, .mob-cta').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  /* ── SMOOTH SCROLL FOR ALL ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── SCROLL REVEAL OBSERVER ──
     Strategy:
     1. Only switch on the CSS "hidden" pre-state (html.js-ready) if
        IntersectionObserver actually exists. Older/unusual browsers
        without it simply keep the always-visible CSS default.
     2. Even when supported, add a hard safety-net timer per element
        that force-reveals it if the observer hasn't fired yet
        (covers edge cases: zero-height containers, observer bugs,
        tab backgrounded on load, etc).
     3. Hero elements are revealed immediately on load regardless,
        since they're above the fold and shouldn't wait on scroll. */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js-ready');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => {
      revealObserver.observe(el);
      // Safety net: force-reveal after 4s no matter what, in case
      // this element never intersects (e.g. shorter pages, odd layouts).
      setTimeout(() => el.classList.add('revealed'), 4000);
    });
  }
  // If IntersectionObserver isn't supported, elements are already
  // visible by default per the CSS fallback — nothing more to do.

  /* ── HERO ENTRANCE: staggered reveal on load ── */
  const heroReveals = document.querySelectorAll('#hero .reveal, #hero .hero-image');
  heroReveals.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.15 + 0.3}s`;
    // Trigger immediately since hero is above the fold
    setTimeout(() => el.classList.add('revealed'), 300 + i * 150);
  });

});
