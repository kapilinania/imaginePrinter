/**
 * Theme One Interactive JavaScript
 * - Dark & Light Mode Theme Switcher (Persistent)
 * - Mobile Navigation Drawer
 * - Hero Showcase Slider
 * - Global Full-Screen Image Lightbox
 * - Portfolio Filtering
 */

// Global Lightbox Function
window.openLightbox = function(src) {
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightbox && lightboxImg) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeLightbox = function() {
  const lightbox = document.getElementById('imageLightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. DARK & LIGHT THEME ENGINE
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('imagine_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlRoot.setAttribute('data-theme', 'dark');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '<i class="fa-solid fa-sun" style="color:#ffb400"></i>';
        btn.setAttribute('title', 'Switch to Light Mode');
      });
    } else {
      htmlRoot.removeAttribute('data-theme');
      themeToggleBtns.forEach(btn => {
        btn.innerHTML = '<i class="fa-solid fa-moon" style="color:#ff5722"></i>';
        btn.setAttribute('title', 'Switch to Dark Mode');
      });
    }
    localStorage.setItem('imagine_theme', theme);
  }

  applyTheme(initialTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  });

  // 2. MOBILE DRAWER OPEN / CLOSE
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');

  function openDrawer() {
    if (drawer && drawerBackdrop) {
      drawer.classList.add('open');
      drawerBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawer && drawerBackdrop) {
      drawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  document.querySelectorAll('.drawer-category-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. HERO SLIDER SHOWCASE
  const heroSlides = document.querySelectorAll('.hero-slide-item');
  let currentSlideIndex = 0;
  let heroTimer = null;

  function showHeroSlide(index) {
    if (!heroSlides.length) return;
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    currentSlideIndex = index;
  }

  window.nextHeroSlide = function() {
    if (!heroSlides.length) return;
    const next = (currentSlideIndex + 1) % heroSlides.length;
    showHeroSlide(next);
  };

  window.prevHeroSlide = function() {
    if (!heroSlides.length) return;
    const prev = (currentSlideIndex - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(prev);
  };

  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');
  if (heroPrevBtn) heroPrevBtn.addEventListener('click', () => {
    clearInterval(heroTimer);
    window.prevHeroSlide();
    startHeroTimer();
  });
  if (heroNextBtn) heroNextBtn.addEventListener('click', () => {
    clearInterval(heroTimer);
    window.nextHeroSlide();
    startHeroTimer();
  });

  function startHeroTimer() {
    if (heroSlides.length > 1) {
      heroTimer = setInterval(window.nextHeroSlide, 5000);
    }
  }
  startHeroTimer();

  // 4. LIGHTBOX CLOSE EVENTS
  const lightbox = document.getElementById('imageLightbox');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightboxClose) {
    lightboxClose.addEventListener('click', window.closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) window.closeLightbox();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLightbox();
      closeDrawer();
    }
  });

  // 5. PORTFOLIO FILTERING
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
