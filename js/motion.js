/**
 * BOLD — Motion
 * Scroll reveals, number counters, header state and scroll progress.
 * Everything is skipped when the visitor prefers reduced motion.
 */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Elements that fade/slide in as they scroll into view
  const REVEAL_SELECTORS = [
    '.section-header',
    '.pillar-card', '.value-card', '.program-card', '.role-card', '.exec-role-card',
    '.team-placeholder-card', '.team-chase-featured', '.story-card', '.event-card',
    '.resource-card', '.metric-card', '.qr-card', '.branch-card', '.team-card',
    '.faq-item', '.about-grid > *', '.mission-statement', '.vision-box',
    '.form-card', '.donate-card', '.donate-info', '.newsletter-content',
    '.hero-featured-showcase', '.stories-header', '.footer-grid > *',
    'main .section img'
  ].join(',');

  // Grids whose children animate in one after another
  const STAGGER_PARENTS = [
    '.values-grid', '.hero-pillars-strip', '.programs-grid', '.roles-grid', '.exec-roles-grid',
    '.team-placeholder-grid', '.stories-grid', '.events-grid', '.resources-grid',
    '.impact-metrics-grid', '.qr-cards-grid', '.branches-grid', '.team-grid', '.faq-wrap',
    '.footer-grid'
  ];

  function initReveal() {
    const targets = Array.from(document.querySelectorAll(REVEAL_SELECTORS))
      // Skip anything inside the hero header (it has its own entrance) or already nested in a reveal
      .filter(el => !el.closest('.hero-header-center') && !el.closest('.modal-overlay'));

    const unique = targets.filter(el => !targets.some(other => other !== el && other.contains(el)));

    unique.forEach(el => {
      el.classList.add('reveal');
      const parent = el.parentElement;
      if (parent && STAGGER_PARENTS.some(sel => parent.matches(sel))) {
        const index = Array.prototype.indexOf.call(parent.children, el);
        el.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 80}ms`);
      }
    });

    if (!('IntersectionObserver' in window)) {
      unique.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    unique.forEach(el => observer.observe(el));
  }

  // Count "400+", "20+" etc. up from zero when they come into view
  function initCounters() {
    const numbers = Array.from(document.querySelectorAll('.metric-number'));
    if (!numbers.length || !('IntersectionObserver' in window)) return;

    const animate = el => {
      const match = el.textContent.trim().match(/^([^\d]*)([\d,]+)(.*)$/);
      if (!match) return;
      const [, prefix, digits, suffix] = match;
      const target = parseInt(digits.replace(/,/g, ''), 10);
      const duration = 1400;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${prefix}${Math.round(target * eased).toLocaleString()}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    numbers.forEach(el => observer.observe(el));
  }

  // Header gains a shadow once the page scrolls; thin progress bar tracks reading position
  function initScrollState() {
    const header = document.querySelector('.site-header');
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle('is-scrolled', y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initScrollState();
    if (reduceMotion) return;
    document.documentElement.classList.add('motion-ready');
    initReveal();
    initCounters();
  });
})();
