// ========== THEME (DARK/LIGHT MODE) ==========
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon();
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon();
}
function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.innerHTML = isDark
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  });
}

// ========== RTL TOGGLE ==========
function toggleRTL() {
  const isRTL = document.dir === 'rtl';
  document.dir = isRTL ? 'ltr' : 'rtl';
  localStorage.setItem('dir', document.dir);
  updateRTLIcon();
}
function initRTL() {
  const saved = localStorage.getItem('dir');
  if (saved) document.dir = saved;
  updateRTLIcon();
}
function updateRTLIcon() {
  const isRTL = document.dir === 'rtl';
  document.querySelectorAll('.rtl-toggle').forEach(btn => {
    btn.title = isRTL ? 'Switch to LTR' : 'Switch to RTL';
  });
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.toggle('open');
}

// ========== SCROLL EFFECTS ==========
function initScrollEffects() {
  const header = document.querySelector('.header');
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (header) {
      header.style.boxShadow = window.scrollY > 50 ? '0 4px 20px var(--shadow)' : 'none';
    }
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ========== PASSWORD VISIBILITY ==========
function initPasswordToggles() {
  document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.previousElementSibling;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      toggle.innerHTML = isPassword
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    });
  });
}

// ========== FRAGRANCE QUIZ ==========
let quizStep = 0;
const quizAnswers = {};
function initQuiz() {
  const steps = document.querySelectorAll('.quiz-step');
  if (!steps.length) return;
  showQuizStep(0);
}
function showQuizStep(index) {
  const steps = document.querySelectorAll('.quiz-step');
  const bars = document.querySelectorAll('.quiz-progress-bar');
  steps.forEach((s, i) => {
    s.classList.toggle('active', i === index);
  });
  bars.forEach((b, i) => {
    b.classList.toggle('active', i === index);
    b.classList.toggle('completed', i < index);
  });
  quizStep = index;
}
function selectQuizOption(stepIndex, value, el) {
  quizAnswers[stepIndex] = value;
  const options = el.parentElement.querySelectorAll('.quiz-option');
  options.forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
}
function nextQuizStep() {
  const steps = document.querySelectorAll('.quiz-step');
  if (quizStep < steps.length - 1) {
    showQuizStep(quizStep + 1);
  }
}
function prevQuizStep() {
  if (quizStep > 0) showQuizStep(quizStep - 1);
}
function showQuizResult() {
  const resultDiv = document.getElementById('quiz-result');
  if (!resultDiv) return;
  const scent = quizAnswers[1] || 'floral';
  const recommendations = {
    floral: { name: 'Garden Bloom', desc: 'A delicate blend of rose, jasmine, and peony that fills your space with romantic elegance.', price: '$38' },
    woody: { name: 'Cedar & Sage', desc: 'Rich cedarwood meets fresh sage for a grounding, earthy ambiance.', price: '$42' },
    citrus: { name: 'Sunrise Zest', desc: 'Bright bergamot and lemon verbena create an energizing atmosphere.', price: '$36' },
    fresh: { name: 'Ocean Breeze', desc: 'Clean sea salt and eucalyptus for a refreshing, spa-like experience.', price: '$40' }
  };
  const rec = recommendations[scent] || recommendations.floral;
  resultDiv.innerHTML = `
    <div class="text-center" style="animation: fadeInUp 0.5s ease">
      <div style="width:80px;height:80px;border-radius:50%;background:rgba(var(--primary-rgb),0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 24px">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1 3 2 6 2 9a6 6 0 1 1-12 0c0-3 1-6 2-9z"/></svg>
      </div>
      <h3 style="margin-bottom:8px">Your Perfect Match</h3>
      <h2 style="color:var(--primary);margin-bottom:16px">${rec.name}</h2>
      <p style="max-width:400px;margin:0 auto 16px">${rec.desc}</p>
      <p class="card-price" style="margin-bottom:24px">${rec.price}</p>
      <a href="collections.html" class="btn btn-primary">Shop This Candle</a>
    </div>`;
  showQuizStep(document.querySelectorAll('.quiz-step').length - 1);
}

// ========== CART ==========
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
function updateCartCount() {
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = cart.length;
    el.style.display = cart.length > 0 ? 'flex' : 'none';
  });
}
function addToCart(name, price) {
  cart.push({ name, price, id: Date.now() });
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${name} added to cart!`);
}

// ========== TOAST ==========
function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:30px;left:50%;transform:translateX(-50%);
    background:var(--secondary);color:#fff;padding:12px 24px;
    border-radius:var(--radius-full);font-size:0.9rem;z-index:9999;
    animation:fadeInUp 0.3s ease;box-shadow:0 4px 20px rgba(0,0,0,0.2);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2500);
}

// ========== SIDEBAR TOGGLE (Dashboard) ==========
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// ========== NAV DROPDOWN CLOSE ON LINK CLICK ==========
function initNavLinks() {
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.querySelector('.nav');
      if (nav && nav.classList.contains('open')) nav.classList.remove('open');
    });
  });
}

// ========== SMOOTH SCROLL ==========
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initScrollEffects();
  initScrollAnimations();
  initPasswordToggles();
  initQuiz();
  updateCartCount();
  initNavLinks();
});
