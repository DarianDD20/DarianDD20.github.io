// ============================================
// BOOT SEQUENCE (hero terminal log)
// ============================================
(function bootSequence() {
  const el = document.getElementById('bootLog');
  if (!el) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    '> initializing_portfolio...',
    '> loading_projects [4]',
    '> linking ml_pipelines, cv_systems, game_engine',
    '> ready'
  ];

  if (prefersReduced) {
    el.textContent = lines.join('\n');
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let buffer = '';

  function typeNext() {
    if (lineIndex >= lines.length) return;

    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      buffer += currentLine[charIndex];
      charIndex++;
      el.textContent = buffer;
      setTimeout(typeNext, 14 + Math.random() * 18);
    } else {
      buffer += '\n';
      lineIndex++;
      charIndex = 0;
      if (lineIndex < lines.length) {
        setTimeout(typeNext, 160);
      } else {
        // mark last line as ok
        el.innerHTML = lines
          .map((l, i) => i === lines.length - 1 ? `<span class="ok">${l}</span>` : l)
          .join('\n');
      }
    }
  }

  setTimeout(typeNext, 300);
})();

// ============================================
// PROJECT ACCORDION
// ============================================
(function projectAccordion() {
  const procs = document.querySelectorAll('.proc');

  procs.forEach((proc) => {
    const head = proc.querySelector('.proc-head');
    const body = proc.querySelector('.proc-body');
    const inner = proc.querySelector('.proc-body-inner');

    head.addEventListener('click', () => {
      const isOpen = proc.getAttribute('data-open') === 'true';

      if (isOpen) {
        proc.setAttribute('data-open', 'false');
        head.setAttribute('aria-expanded', 'false');
        body.style.height = '0px';
      } else {
        proc.setAttribute('data-open', 'true');
        head.setAttribute('aria-expanded', 'true');
        body.style.height = inner.scrollHeight + 'px';
      }
    });
  });

  // Recalculate open panel heights on resize (text reflow changes height)
  window.addEventListener('resize', () => {
    procs.forEach((proc) => {
      if (proc.getAttribute('data-open') === 'true') {
        const body = proc.querySelector('.proc-body');
        const inner = proc.querySelector('.proc-body-inner');
        body.style.height = inner.scrollHeight + 'px';
      }
    });
  });
})();

// ============================================
// MOBILE NAV TOGGLE
// ============================================
(function mobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('mobileNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// ============================================
// SCROLL-SPY for left rail nav
// ============================================
(function scrollSpy() {
  const sections = document.querySelectorAll('main .section, main .hero');
  const navLinks = document.querySelectorAll('.tree a');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.target === id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
})();

// ============================================
// FOOTER YEAR
// ============================================
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
