/* ============================================================
   Divya Kadav Portfolio — main.js
   ============================================================ */

// ---- NAV scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Language ribbon on hero ----
const glyphs = [
  { text: '言語',   lang: 'Japanese — Language' },
  { text: 'Sprache', lang: 'German — Language' },
  { text: 'भाषा',   lang: 'Hindi — Language' },
  { text: '语言',   lang: 'Mandarin — Language' },
  { text: 'भाषा',   lang: 'Marathi — Language' },
  { text: '翻訳',   lang: 'Japanese — Translation' },
  { text: 'Übersetzung', lang: 'German — Translation' },
  { text: 'अनुवाद', lang: 'Hindi — Translation' },
  { text: 'Language', lang: 'English' },
  { text: '文字',   lang: 'Japanese — Writing' },
];

const ribbon = document.getElementById('langRibbon');
glyphs.forEach((g, i) => {
  const span = document.createElement('span');
  span.className = 'lang-glyph';
  span.textContent = g.text;
  span.title = g.lang;
  span.style.animationDelay = `${i * 0.12}s`;
  ribbon.appendChild(span);
});

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ---- Language bar animation ----
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-fill').forEach(fill => {
        // width is already set inline; trigger the CSS transition
        const targetWidth = fill.style.width;
        fill.style.width = '0';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { fill.style.width = targetWidth; });
        });
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const aboutLangs = document.querySelector('.about-langs');
if (aboutLangs) barObserver.observe(aboutLangs);

// ---- Certification filter ----
const filterBtns = document.querySelectorAll('.cert-filter');
const certItems  = document.querySelectorAll('.cert-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    certItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.opacity = a.getAttribute('href') === `#${entry.target.id}` ? '1' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
