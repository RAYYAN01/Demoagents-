/* ===== STICKY HEADER ===== */
const header = document.getElementById('mainHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ===== HERO CAROUSEL ===== */
const track     = document.getElementById('heroTrack');
const dots      = document.querySelectorAll('.dot');
const prevBtn   = document.getElementById('heroPrev');
const nextBtn   = document.getElementById('heroNext');
const slides    = document.querySelectorAll('.hero-slide');
let current     = 0;
let autoTimer;

function goTo(n) {
  current = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

function startAuto() {
  stopAuto();
  autoTimer = setInterval(next, 5000);
}
function stopAuto() { clearInterval(autoTimer); }

nextBtn.addEventListener('click', () => { next(); startAuto(); });
prevBtn.addEventListener('click', () => { prev(); startAuto(); });
dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.slide); startAuto(); }));

/* Touch swipe */
let touchX = 0;
track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); startAuto(); }
}, { passive: true });

startAuto();

/* ===== MOBILE NAV ===== */
const hamburger     = document.getElementById('hamburger');
const mainNav       = document.getElementById('mainNav');
const mobileOverlay = document.getElementById('mobileOverlay');

function openNav() {
  mainNav.classList.add('open');
  mobileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  mainNav.classList.remove('open');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
  document.querySelectorAll('.nav-item.open').forEach(el => el.classList.remove('open'));
}

hamburger.addEventListener('click', () => mainNav.classList.contains('open') ? closeNav() : openNav());
mobileOverlay.addEventListener('click', closeNav);

/* Mobile mega toggle */
document.querySelectorAll('.nav-item.has-mega .nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      const item = this.closest('.nav-item');
      item.classList.toggle('open');
    }
  });
});

/* ===== SEARCH ===== */
const searchToggle = document.getElementById('searchToggle');
const searchBarWrap = document.getElementById('searchBarWrap');
const searchClose  = document.getElementById('searchClose');
const searchInput  = document.getElementById('searchInput');

searchToggle.addEventListener('click', () => {
  searchBarWrap.classList.toggle('open');
  if (searchBarWrap.classList.contains('open')) searchInput.focus();
});
searchClose.addEventListener('click', () => searchBarWrap.classList.remove('open'));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') searchBarWrap.classList.remove('open');
});

/* ===== UTILITY TABS ===== */
document.querySelectorAll('.util-tab').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.util-tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* Add reveal class to key sections dynamically */
document.querySelectorAll(
  '.cat-card, .feat-card, .strip-item, .trust-item, .edit-card, .aud-content'
).forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 4 === 1) el.classList.add('reveal-delay-1');
  if (i % 4 === 2) el.classList.add('reveal-delay-2');
  if (i % 4 === 3) el.classList.add('reveal-delay-3');
  observer.observe(el);
});

/* ===== FEAT IMAGE FALLBACK ===== */
document.querySelectorAll('.feat-img img').forEach(img => {
  img.addEventListener('load', function() {
    const placeholder = this.nextElementSibling;
    if (placeholder) placeholder.style.display = 'none';
  });
  img.addEventListener('error', function() {
    this.style.display = 'none';
    const placeholder = this.nextElementSibling;
    if (placeholder) placeholder.style.opacity = '0.25';
  });
});
