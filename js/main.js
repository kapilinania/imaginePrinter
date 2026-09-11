/**
 * IMAGINE PRINTERS — Agency-Grade Interactive Script
 * Custom Animated Cursor, Infinite Text Flipper, 3D Card Tilt, Scroll Reveals & Ticker
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initInfiniteTextFlipper();
  initHeroInteractiveSlider();
  initScrollReveals();
  initMobileMenu();
  initStickyHeader();
  initServicesFilterAndSearch();
  initPortfolioLightbox();
  initContactForm();
  initCallbackModal();
});

/* --------------------------------------------------------------------------
   1. Custom Animated Brand Cursor (Desktop Only)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth trailing effect for cursor ring
  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursorRing);
  }
  requestAnimationFrame(animateCursorRing);

  // Hover scale on interactive elements
  const interactiveSelector = 'a, button, input, select, textarea, .portfolio-item, .service-card-item, .hero-tab-btn, .dock-btn, .hero-slider-nav-btn, .hero-dot, .hero-thumb-btn';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Infinite Rotating Words / Text Animation in Hero
   -------------------------------------------------------------------------- */
function initInfiniteTextFlipper() {
  const configs = [
    {
      id: 'heroRotatingText',
      phrases: [
        'Signage Mastery',
        'Luxury Gold Foil Cards',
        '3D LED Glow Signs',
        'Cold-Transfer UV DTF',
        'Tri-Fold Brochures',
        'Roll-Up Standees',
        'AI Video & Branding'
      ]
    },
    {
      id: 'servicesRotatingText',
      phrases: [
        'Signage & 3D Letters',
        'Acrylic Glow Signboards',
        'UV DTF Cold Stickers',
        'Luxury Visiting Cards',
        'Roll-Up Standees',
        'Corporate Brochures',
        'Sunboard & Vinyl Prints'
      ]
    },
    {
      id: 'portfolioRotatingText',
      phrases: [
        'Signage Showcase',
        '3D Acrylic Signboards',
        'Raised Foil Visiting Cards',
        'UV DTF 3D Decals',
        'Exhibition Standees',
        'Offset Catalog Archive'
      ]
    },
    {
      id: 'aboutRotatingText',
      phrases: [
        'Signage & Print Mastery',
        'Precision Factory Press',
        '3D Laser Acrylic Craft',
        'UV DTF Technology',
        'Since 2011 Excellence'
      ]
    },
    {
      id: 'contactRotatingText',
      phrases: [
        'Signage & Print Desk',
        'Factory Quotation Desk',
        'WhatsApp Prepress Desk',
        'Thane Atelier Team'
      ]
    }
  ];

  configs.forEach(({ id, phrases }) => {
    const el = document.getElementById(id);
    if (!el) return;

    let index = 0;
    setInterval(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';

      setTimeout(() => {
        index = (index + 1) % phrases.length;
        el.textContent = phrases[index];
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 260);
    }, 2600);
  });
}

/* --------------------------------------------------------------------------
   3. Hero Interactive Image Slider with Auto-Play & Touch Gestures
   -------------------------------------------------------------------------- */
function initHeroInteractiveSlider() {
  const container = document.getElementById('heroImageSlider');
  if (!container) return;

  const slides = container.querySelectorAll('.hero-slide');
  const dots = container.querySelectorAll('.hero-dot');
  const thumbs = document.querySelectorAll('.hero-thumb-btn');
  const thumbStrip = document.getElementById('heroThumbStrip');
  const prevBtn = document.getElementById('heroSlidePrev');
  const nextBtn = document.getElementById('heroSlideNext');
  const counterEl = document.getElementById('heroSlideCounter');
  const progressBar = document.getElementById('heroSliderProgress');
  
  if (!slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  const slideDuration = 4000; // 4s per slide
  let progress = 0;
  let isPaused = false;

  function updateSlide(newIndex) {
    if (newIndex < 0) newIndex = totalSlides - 1;
    if (newIndex >= totalSlides) newIndex = 0;

    currentIndex = newIndex;

    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update dots
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update segmented product buttons
    thumbs.forEach((thumb, idx) => {
      if (idx === currentIndex) {
        thumb.classList.add('active');
        if (thumbStrip && thumbStrip.scrollWidth > thumbStrip.clientWidth) {
          const scrollLeftTarget = thumb.offsetLeft - (thumbStrip.clientWidth / 2) + (thumb.clientWidth / 2);
          thumbStrip.scrollTo({ left: scrollLeftTarget, behavior: 'smooth' });
        }
      } else {
        thumb.classList.remove('active');
      }
    });

    // Update slide counter (01 / 06)
    if (counterEl) {
      counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
    }

    // Reset progress line
    progress = 0;
    if (progressBar) {
      progressBar.style.width = '0%';
    }
  }

  function nextSlide() {
    updateSlide(currentIndex + 1);
  }

  function prevSlide() {
    updateSlide(currentIndex - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) updateSlide(idx);
    });
  });

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.getAttribute('data-index'), 10);
      if (!isNaN(idx)) updateSlide(idx);
    });
  });

  // Pause on hover over slider or product bar
  container.addEventListener('mouseenter', () => { isPaused = true; });
  container.addEventListener('mouseleave', () => { isPaused = false; });

  if (thumbStrip) {
    thumbStrip.addEventListener('mouseenter', () => { isPaused = true; });
    thumbStrip.addEventListener('mouseleave', () => { isPaused = false; });
  }

  // Touch Swipe Gesture Support
  let touchStartX = 0;
  let touchEndX = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      nextSlide();
    } else if (touchEndX - touchStartX > 45) {
      prevSlide();
    }
  }, { passive: true });

  // Progress Bar & Auto-Cycle Loop (runs smoothly every 40ms)
  setInterval(() => {
    if (!isPaused) {
      progress += (40 / slideDuration) * 100;
      if (progressBar) {
        progressBar.style.width = `${Math.min(progress, 100)}%`;
      }
      if (progress >= 100) {
        nextSlide();
      }
    }
  }, 40);

  // Initialize first active slide
  updateSlide(0);
}

/* --------------------------------------------------------------------------
   5. Scroll Reveal Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
}

/* --------------------------------------------------------------------------
   6. Mobile Menu Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileBackdrop = document.getElementById('mobileMenuBackdrop');

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    if (mobileBackdrop) mobileBackdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden', 'mobile-menu-open');
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    if (mobileBackdrop) mobileBackdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden', 'mobile-menu-open');
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   7. Sticky Header Elevation
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('shadow-xl', 'bg-slate-950/95');
      header.classList.remove('bg-slate-950/80');
    } else {
      header.classList.remove('shadow-xl', 'bg-slate-950/95');
      header.classList.add('bg-slate-950/80');
    }
  });
}

/* --------------------------------------------------------------------------
   8. WhatsApp Instant Quote Dispatcher
   -------------------------------------------------------------------------- */
window.openWhatsAppQuote = function(serviceName = 'Commercial Printing') {
  const phone = '919820636646';
  const text = encodeURIComponent(`Hello Imagine Printers! I would like to get an instant quote and technical consultation for: *${serviceName}*. Please share specifications, pricing, and turnaround time.`);
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
};

/* --------------------------------------------------------------------------
   9. Services Filtering & Search (services.html)
   -------------------------------------------------------------------------- */
function initServicesFilterAndSearch() {
  const searchInput = document.getElementById('serviceSearchInput');
  const filterButtons = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.service-card-item');
  const noResults = document.getElementById('noServicesFound');
  const resultsCount = document.getElementById('servicesCountDisplay');

  if (!serviceCards.length) return;

  let currentCategory = 'all';
  let currentSearchQuery = '';

  function filterCards() {
    let visibleCount = 0;

    serviceCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const desc = card.textContent.toLowerCase();

      const matchesCategory = (currentCategory === 'all') || (category === currentCategory);
      const matchesSearch = !currentSearchQuery || 
        title.includes(currentSearchQuery) || 
        tags.includes(currentSearchQuery) || 
        desc.includes(currentSearchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultsCount) {
      resultsCount.textContent = `Showing ${visibleCount} of ${serviceCards.length} services`;
    }

    if (noResults) {
      if (visibleCount === 0) {
        noResults.classList.remove('hidden');
      } else {
        noResults.classList.add('hidden');
      }
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-brand-lime', 'text-slate-950', 'font-bold');
        b.classList.add('bg-slate-900', 'text-slate-300', 'border-slate-800');
      });
      btn.classList.add('bg-brand-lime', 'text-slate-950', 'font-bold');
      btn.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-800');

      currentCategory = btn.getAttribute('data-filter') || 'all';
      filterCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      filterCards();
    });
  }
}

/* --------------------------------------------------------------------------
   10. Portfolio Lightbox & Filter (portfolio.html)
   -------------------------------------------------------------------------- */
function initPortfolioLightbox() {
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const modal = document.getElementById('portfolioLightbox');
  const modalImg = document.getElementById('lightboxImage');
  const modalTitle = document.getElementById('lightboxTitle');
  const modalTag = document.getElementById('lightboxTag');
  const closeBtn = document.getElementById('closeLightbox');
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');

  if (filterBtns.length && portfolioItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-brand-lime', 'text-slate-950', 'font-bold');
          b.classList.add('bg-slate-900', 'text-slate-300', 'border-slate-800');
        });
        btn.classList.add('bg-brand-lime', 'text-slate-950', 'font-bold');
        btn.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-800');

        const filter = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  if (modal && modalImg) {
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-img') || item.querySelector('img')?.src;
        const title = item.getAttribute('data-title') || 'Print Production Showcase';
        const tag = item.getAttribute('data-tag') || 'Imagine Printers Atelier';

        if (imgSrc) {
          modalImg.src = imgSrc;
          if (modalTitle) modalTitle.textContent = title;
          if (modalTag) modalTag.textContent = tag;
          modal.classList.remove('hidden');
          modal.classList.add('flex');
          document.body.classList.add('overflow-hidden');
        }
      });
    });

    function closeLightbox() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
      if (modalImg) modalImg.src = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeLightbox();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   11. Google Sheets Background Integration & Form Dispatchers
   -------------------------------------------------------------------------- */
// Configurable Google Apps Script Web App Endpoint URL
// Users can set window.IMAGINE_SCRIPT_URL or replace this string directly
const GOOGLE_SHEETS_SCRIPT_URL = window.IMAGINE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbz5NU0N5CX48CZGW4POYhAcZGv2mL--PER0wEJaCH-NXFuZI42DvcpP9SKRKEiJ1ORJ/exec';

/**
 * Ultra-fast, non-blocking background dispatcher to Google Sheets
 * - Uses mode: 'no-cors' so browser executes immediately without preflight delay
 * - Uses keepalive: true so browser delivers payload even if user jumps to WhatsApp
 */
function sendToGoogleSheet(payload) {
  if (!GOOGLE_SHEETS_SCRIPT_URL || GOOGLE_SHEETS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
    // Soft log in developer console so page never errors or delays
    console.info('[Imagine Sync] Sheet URL not configured yet. Form payload:', payload);
    return;
  }

  try {
    fetch(GOOGLE_SHEETS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(function(err) {
      console.warn('[Imagine Sync] Background sync warning:', err);
    });
  } catch (err) {
    console.warn('[Imagine Sync] Dispatch error:', err);
  }
}

function initContactForm() {
  const form = document.getElementById('contactInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName')?.value.trim();
    const phone = document.getElementById('formPhone')?.value.trim();
    const email = document.getElementById('formEmail')?.value.trim() || 'Not specified';
    const service = document.getElementById('formService')?.value || 'General Inquiry';
    const message = document.getElementById('formMessage')?.value.trim() || 'Need pricing details and timeline.';

    if (!name || !phone) {
      alert('Please provide your name and phone number so our team can reach you.');
      return;
    }

    // 1. Send to Google Sheets instantly in background (non-blocking)
    sendToGoogleSheet({
      formType: 'Contact Inquiries',
      name: name,
      phone: phone,
      email: email,
      service: service,
      message: message,
      sourcePage: 'Contact Page',
      status: 'New Lead'
    });

    // 2. Pre-fill WhatsApp message
    const targetPhone = '919820636646';
    const formattedText = encodeURIComponent(
      `*New Inquiry via Imagine Printers Website*\n` +
      `--------------------------------\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `✉️ *Email:* ${email}\n` +
      `📦 *Service Required:* ${service}\n` +
      `📝 *Message / Specs:* ${message}\n` +
      `--------------------------------\n` +
      `Please provide best rate and dispatch schedule.`
    );

    window.open(`https://wa.me/${targetPhone}?text=${formattedText}`, '_blank');
    form.reset();

    const statusBanner = document.getElementById('formSuccessBanner');
    if (statusBanner) {
      statusBanner.classList.remove('hidden');
      setTimeout(() => statusBanner.classList.add('hidden'), 6000);
    }
  });
}

/* --------------------------------------------------------------------------
   12. Request A Call Back Modal (Session-Aware, 6s Auto-Popup)
   -------------------------------------------------------------------------- */
function initCallbackModal() {
  const modal = document.getElementById('callbackModal');
  if (!modal) return;

  // Auto-trigger modal after 6 seconds if not dismissed in this session
  setTimeout(() => {
    if (sessionStorage.getItem('imagine_callback_dismissed') === 'true') {
      return; // User already closed the modal in this session, do not show while navigating inside pages
    }
    openCallbackModal();
  }, 6000);

  // Close when clicking outside on modal backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCallbackModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeCallbackModal();
    }
  });
}

function openCallbackModal() {
  const modal = document.getElementById('callbackModal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('modal-open');
}

function closeCallbackModal() {
  const modal = document.getElementById('callbackModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  document.body.classList.remove('modal-open');
  // Once closed, do not display again while navigating inside website pages in this session
  sessionStorage.setItem('imagine_callback_dismissed', 'true');
}

function handleCallbackSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cbName')?.value.trim();
  const phone = document.getElementById('cbPhone')?.value.trim();
  const service = document.getElementById('cbService')?.value || 'General Printing';

  if (!name || !phone) {
    alert('Please enter your name and mobile number.');
    return;
  }

  // 1. Send to Google Sheets instantly in background (non-blocking)
  sendToGoogleSheet({
    formType: 'Callback Requests',
    name: name,
    phone: phone,
    service: service,
    sourcePage: document.title || window.location.pathname,
    status: 'New Lead'
  });

  // 2. Pre-fill WhatsApp message
  const targetPhone = '919820636646';
  const text = encodeURIComponent(
    `*Request A Quick Call Back - Imagine Prints*\n` +
    `--------------------------------\n` +
    `👤 *Name / Company:* ${name}\n` +
    `📞 *Mobile:* ${phone}\n` +
    `📦 *Requirement:* ${service}\n` +
    `--------------------------------\n` +
    `Please call me back within 15 minutes regarding rates & turnaround.`
  );

  window.open(`https://wa.me/${targetPhone}?text=${text}`, '_blank');

  // Show success state
  const form = document.getElementById('callbackForm');
  const successMsg = document.getElementById('cbSuccessMsg');
  if (form) form.classList.add('hidden');
  if (successMsg) successMsg.classList.remove('hidden');

  // Dismiss for this browsing session
  sessionStorage.setItem('imagine_callback_dismissed', 'true');

  // Auto close after 3 seconds
  setTimeout(() => {
    closeCallbackModal();
    if (form) form.classList.remove('hidden');
    if (successMsg) successMsg.classList.add('hidden');
    if (form) form.reset();
  }, 3000);
}
