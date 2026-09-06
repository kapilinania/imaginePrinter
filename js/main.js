/**
 * IMAGINE PRINTERS - High-Performance Interaction Engine
 * Hero Showcase & Finish Toggles, Pincode Checker, Live Clock, Calculator, Filters, Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initAccessibilityStudio();
  initCustomCursor();
  initMobileMenu();
  initHeroShowcaseTabs();
  initHeroFinishToggles();
  initHeroCardTilt();
  initPortfolioFilter();
  initLightbox();
  initQuoteCalculator();
  initCounterAnimations();
  initSmoothScroll();
  initLiveStudioClock();
  initPincodeChecker();
  initBackToTop();
  initGsmSimulator();
  initScrollReveal();
});

/* --------------------------------------------------------------------------
   1. Hero Interactive Showcase Switcher
   -------------------------------------------------------------------------- */
const heroShowcaseData = {
  visiting_cards: {
    img: 'images/temp_5.jpg',
    title: 'Pro One Executive Business Card',
    sub: '350 GSM Velvet Matte + Raised Gloss Spot UV',
    badge: 'Luxury Stationery',
    finish: 'Velvet Matte + Spot UV'
  },
  brochures: {
    img: 'images/temp_35.jpg',
    title: 'Tech Mahindra Corporate Profile',
    sub: '300 GSM Heavy Cover + 170 GSM Inner Pages with Satin Coat',
    badge: 'Corporate E-Book',
    finish: 'Satin Laminated'
  },
  signages: {
    img: 'images/temp_50.jpg',
    title: 'Style 5 Hair Studio Storefront',
    sub: '3D Warm Backlit Channel Letters + Gold Acrylic CNC Finish',
    badge: '3D Illuminated Sign',
    finish: '3D Backlit Acrylic'
  },
  flyers: {
    img: 'images/temp_23.jpg',
    title: 'Navnit Motors Campaign (Volkswagen & Maruti)',
    sub: '130 GSM Imported Art Gloss Paper • High-Speed Web Run',
    badge: 'Commercial Flyer',
    finish: 'Gloss Art Paper'
  }
};

let currentCategory = 'visiting_cards';

function initHeroShowcaseTabs() {
  const tabs = document.querySelectorAll('.hero-tab-btn');
  const showcaseImg = document.getElementById('heroShowcaseImg');
  const showcaseTitle = document.getElementById('heroShowcaseTitle');
  const showcaseSub = document.getElementById('heroShowcaseSub');
  const showcaseBadge = document.getElementById('heroShowcaseBadge');

  if (!tabs.length || !showcaseImg) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active', 'bg-brand-lime', 'text-brand-dark'));
      tab.classList.add('active', 'bg-brand-lime', 'text-brand-dark');

      currentCategory = tab.getAttribute('data-showcase');
      const item = heroShowcaseData[currentCategory];

      if (item) {
        showcaseImg.style.opacity = '0';
        showcaseImg.style.transform = 'scale(0.96)';

        setTimeout(() => {
          showcaseImg.src = item.img;
          if (showcaseTitle) showcaseTitle.textContent = item.title;
          if (showcaseSub) showcaseSub.textContent = item.sub;
          if (showcaseBadge) showcaseBadge.textContent = item.badge;
          showcaseImg.style.opacity = '1';
          showcaseImg.style.transform = 'scale(1)';
        }, 180);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Hero Finish Embellishment Toggles & Realistic Live Simulator
   -------------------------------------------------------------------------- */
function initHeroFinishToggles() {
  const finishBtns = document.querySelectorAll('.hero-finish-btn');
  const showcaseSub = document.getElementById('heroShowcaseSub');
  const showcaseCard = document.getElementById('heroShowcaseCard');
  const finishTagText = document.getElementById('heroFinishTagText');

  if (!finishBtns.length) return;

  finishBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      finishBtns.forEach(b => {
        b.classList.remove('active', 'bg-brand-lime/20', 'border-brand-lime', 'text-brand-lime');
        b.classList.add('bg-slate-900', 'border-slate-800', 'text-slate-400');
      });

      btn.classList.add('active', 'bg-brand-lime/20', 'border-brand-lime', 'text-brand-lime');
      btn.classList.remove('bg-slate-900', 'border-slate-800', 'text-slate-400');

      const finishKey = btn.getAttribute('data-finish') || 'spot-uv';
      const finishName = btn.getAttribute('data-finish-label');

      if (showcaseSub) {
        showcaseSub.textContent = `Finish Applied: ${finishName} (High-Precision Simulation)`;
      }

      if (finishTagText) {
        finishTagText.textContent = `${finishName} Applied`;
      }

      // Reset and apply visual simulation classes
      if (showcaseCard) {
        showcaseCard.classList.remove(
          'finish-active-spot-uv',
          'finish-active-gold-foil',
          'finish-active-velvet',
          'finish-active-led-acrylic',
          'spot-uv-card'
        );

        void showcaseCard.offsetWidth; // Force reflow

        showcaseCard.classList.add(`finish-active-${finishKey}`);

        if (finishKey === 'spot-uv') {
          showcaseCard.classList.add('spot-uv-card');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Interactive 3D Perspective Card Tilt on Mousemove
   -------------------------------------------------------------------------- */
function initHeroCardTilt() {
  const card = document.getElementById('heroShowcaseCard');
  if (!card) return;

  // Only run tilt on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const container = card.parentElement;

  container.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = ((y / rect.height) - 0.5) * -12;
    const rotY = ((x / rect.width) - 0.5) * 12;

    card.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  container.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* --------------------------------------------------------------------------
   3. Footer Pincode Delivery Availability Checker
   -------------------------------------------------------------------------- */
function initPincodeChecker() {
  const pinInput = document.getElementById('footerPincodeInput');
  const pinBtn = document.getElementById('footerPincodeBtn');
  const pinResult = document.getElementById('footerPincodeResult');

  if (!pinInput || !pinBtn || !pinResult) return;

  pinBtn.addEventListener('click', () => {
    const pin = pinInput.value.trim();
    if (!pin || pin.length < 6) {
      pinResult.innerHTML = '<span class="text-amber-400">Please enter a valid 6-digit postal code.</span>';
      pinResult.classList.remove('hidden');
      return;
    }

    if (pin.startsWith('400') || pin.startsWith('401') || pin.startsWith('410') || pin.startsWith('421')) {
      pinResult.innerHTML = `<span class="text-brand-lime font-bold">✓ Pincode ${pin} Verified:</span> Express Same-Day & 24H Doorstep Dispatch Available across MMR!`;
    } else {
      pinResult.innerHTML = `<span class="text-brand-lime font-bold">✓ Pincode ${pin} Verified:</span> Express Courier Delivery (2-3 Business Days) across India!`;
    }
    pinResult.classList.remove('hidden');
  });
}

/* --------------------------------------------------------------------------
   4. Live Studio Clock in Footer
   -------------------------------------------------------------------------- */
function initLiveStudioClock() {
  const clockEl = document.getElementById('studioLiveClock');
  if (!clockEl) return;

  function updateTime() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    clockEl.textContent = now.toLocaleTimeString('en-US', options) + ' IST';
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* --------------------------------------------------------------------------
   5. Back To Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   6. App Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMobileMenu');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('flex');
    document.body.classList.add('overflow-hidden');
    // Trigger smooth staggered entrance animation
    requestAnimationFrame(() => {
      mobileMenu.classList.add('mobile-menu-active');
    });
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('mobile-menu-active');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    }, 150);
  };

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/* --------------------------------------------------------------------------
   7. Portfolio Filtering
   -------------------------------------------------------------------------- */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. Lightbox Modal Preview
   -------------------------------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalClient = document.getElementById('modalClient');
  const modalSpec = document.getElementById('modalSpec');
  const closeModalBtn = document.getElementById('closeModal');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (!modal || !modalImg) return;

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.getAttribute('data-title') || 'Imagine Print Project';
      const client = card.getAttribute('data-client') || 'Client Production';
      const spec = card.getAttribute('data-spec') || 'Premium Offset / Digital Print';

      if (img) {
        modalImg.src = img.src;
        modalTitle.textContent = title;
        modalClient.textContent = client;
        modalSpec.textContent = spec;
        modal.classList.add('modal-active');
        document.body.classList.add('overflow-hidden');
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('modal-active');
    document.body.classList.remove('overflow-hidden');
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal-active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   9. Interactive Print Calculator & Direct WhatsApp Message Creator
   -------------------------------------------------------------------------- */
const productConfigs = {
  visiting_cards: {
    name: 'Visiting / Business Cards',
    materials: [
      { id: 'matte_350', name: '350 GSM Premium Matte Laminated' },
      { id: 'velvet_touch', name: 'Soft-Touch Velvet Laminated (Luxury Prestige)' },
      { id: 'spot_uv', name: 'Velvet Matte + Raised Spot UV Gloss' },
      { id: 'gold_foil', name: 'Matte Laminated + Metallic Gold/Silver Foil' },
      { id: 'qr_textured', name: 'Textured Imported Paper + Scannable QR Code' }
    ],
    quantities: [
      { qty: 100, label: '100 Cards (Trial / Executive)' },
      { qty: 500, label: '500 Cards (Most Popular)' },
      { qty: 1000, label: '1,000 Cards (Best Corporate Value)' },
      { qty: 2500, label: '2,500 Cards (Bulk Team Pack)' }
    ]
  },
  brochures: {
    name: 'Brochures & Company Profiles',
    materials: [
      { id: 'trifold_170', name: 'Tri-fold Brochure (170 GSM Art Gloss)' },
      { id: 'trifold_250', name: 'Tri-fold Brochure (250 GSM Premium Matte)' },
      { id: 'bifold_300', name: 'Bi-fold 4-Page (300 GSM Heavy Art Card)' },
      { id: 'booklet_multipage', name: 'Multi-page Corporate Booklet / E-Profile' }
    ],
    quantities: [
      { qty: 250, label: '250 Prints' },
      { qty: 500, label: '500 Prints (Popular)' },
      { qty: 1000, label: '1,000 Prints (Economical)' },
      { qty: 2500, label: '2,500 Prints (Mega Campaign)' }
    ]
  },
  flyers: {
    name: 'Marketing Flyers & Leaflets',
    materials: [
      { id: 'flyer_a5_130', name: 'A5 Size (130 GSM Gloss Art - Single Side)' },
      { id: 'flyer_a5_both', name: 'A5 Size (130 GSM Gloss Art - Both Sides)' },
      { id: 'flyer_a4_170', name: 'A4 Size (170 GSM Premium Gloss Presentation)' },
      { id: 'menu_card', name: 'Thick Restaurant Menu Card (350 GSM Laminated)' }
    ],
    quantities: [
      { qty: 1000, label: '1,000 Copies (Minimum batch)' },
      { qty: 2500, label: '2,500 Copies' },
      { qty: 5000, label: '5,000 Copies (Standard Commercial)' },
      { qty: 10000, label: '10,000 Copies (Mass Door-to-Door)' }
    ]
  },
  signages: {
    name: '3D Glow Signboards & Storefronts',
    materials: [
      { id: 'led_glow_box', name: 'Backlit LED Glow Signboard (Aluminum Frame)' },
      { id: 'acrylic_3d_letter', name: '3D Acrylic Warm/White Backlit Channel Letters' },
      { id: 'sunboard_vinyl', name: '5mm Sunboard Vinyl Mounted Sheet' },
      { id: 'neon_sign', name: 'Custom LED Flex Neon Glow Art' }
    ],
    quantities: [
      { qty: 1, label: 'Single Unit / Standard Storefront (Approx 10-15 sq ft)' },
      { qty: 2, label: '2 Units / Dual Facade (Front + Side Pillar)' },
      { qty: 5, label: 'Chain Retail / Multiple Locations (5+ Boards)' }
    ]
  },
  standees: {
    name: 'Roll-up Standees & Displays',
    materials: [
      { id: 'standee_standard', name: 'Aluminum Base Roll-Up Standee (2.5 x 6 ft - High-Res Flex)' },
      { id: 'standee_star_flex', name: 'Luxury Roll-Up Standee (3 x 6 ft - Star Non-Tear Vinyl)' },
      { id: 'cutout_standee', name: 'Life-Size Die-Cut Sunboard Mascot/Figure Standee' }
    ],
    quantities: [
      { qty: 1, label: '1 Standee (Immediate Event)' },
      { qty: 2, label: '2 Standees (Twin Stage Setup)' },
      { qty: 5, label: '5 Standees (Exhibition / Expo Booth)' },
      { qty: 10, label: '10+ Standees (Corporate Franchise)' }
    ]
  },
  stickers: {
    name: 'UV DTF Transfers & Custom Stickers',
    materials: [
      { id: 'uv_dtf', name: 'UV DTF 3D Varnish Transfer Sticker (Sticks to any hard surface)' },
      { id: 'die_cut_vinyl', name: 'Custom Die-Cut Vinyl Stickers (Waterproof & Scratchproof)' },
      { id: 'gold_foil_label', name: 'Gold Foil Embossed Product Jar Labels' },
      { id: 'transparent_sticker', name: 'Transparent Clear Vinyl Product Decals' }
    ],
    quantities: [
      { qty: 100, label: '100 Labels / Stickers' },
      { qty: 500, label: '500 Labels / Stickers' },
      { qty: 1000, label: '1,000 Labels (Production Pack)' },
      { qty: 5000, label: '5,000 Labels (Industrial Volume)' }
    ]
  }
};

function initQuoteCalculator() {
  const productSelect = document.getElementById('calcProduct');
  const materialSelect = document.getElementById('calcMaterial');
  const quantitySelect = document.getElementById('calcQuantity');
  const summaryProduct = document.getElementById('summaryProduct');
  const summaryMaterial = document.getElementById('summaryMaterial');
  const summaryQty = document.getElementById('summaryQty');
  const whatsappQuoteBtn = document.getElementById('whatsappQuoteBtn');

  if (!productSelect || !materialSelect || !quantitySelect) return;

  function populateOptions(productKey) {
    const config = productConfigs[productKey] || productConfigs['visiting_cards'];

    materialSelect.innerHTML = '';
    config.materials.forEach(mat => {
      const opt = document.createElement('option');
      opt.value = mat.id;
      opt.textContent = mat.name;
      materialSelect.appendChild(opt);
    });

    quantitySelect.innerHTML = '';
    config.quantities.forEach(q => {
      const opt = document.createElement('option');
      opt.value = q.qty;
      opt.textContent = q.label;
      quantitySelect.appendChild(opt);
    });

    updateSummary();
  }

  function updateSummary() {
    const prodKey = productSelect.value;
    const config = productConfigs[prodKey];
    if (!config) return;

    const selectedMatName = materialSelect.options[materialSelect.selectedIndex]?.text || '';
    const selectedQtyText = quantitySelect.options[quantitySelect.selectedIndex]?.text || '';

    if (summaryProduct) summaryProduct.textContent = config.name;
    if (summaryMaterial) summaryMaterial.textContent = selectedMatName;
    if (summaryQty) summaryQty.textContent = selectedQtyText;

    const msg = `Hello Imagine Printers team!\n\nI would like an instant quotation for my printing requirement:\n\n*Product:* ${config.name}\n*Specification/Finish:* ${selectedMatName}\n*Volume/Size:* ${selectedQtyText}\n*City:* Thane / Mumbai\n\nPlease let me know pricing and delivery timeline!`;

    const encodedMsg = encodeURIComponent(msg);
    if (whatsappQuoteBtn) {
      whatsappQuoteBtn.href = `https://wa.me/919820636646?text=${encodedMsg}`;
    }
  }

  productSelect.addEventListener('change', () => {
    populateOptions(productSelect.value);
  });

  materialSelect.addEventListener('change', updateSummary);
  quantitySelect.addEventListener('change', updateSummary);

  populateOptions(productSelect.value || 'visiting_cards');
}

/* --------------------------------------------------------------------------
   10. Counter Animations
   -------------------------------------------------------------------------- */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
          const duration = 1800;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current).toLocaleString();
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('metricsBar');
  if (statsSection) observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   11. Smooth Anchor Scrolling
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   12. Ashvik Media Style Custom Interactive Cursor
   (Glowing Inner Pinpoint + Fluid Lerp Follower Ring + Hover Scaling Aura)
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const cursorText = document.getElementById('cursorText');

  if (!dot || !ring) return;

  // Gracefully disable on touch screens or mobile viewports
  if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window || window.innerWidth < 1024) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isVisible = false;
  let animationFrameId = null;

  // Track cursor position immediately for inner dot
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      isVisible = true;
    }

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Buttery-smooth Linear Interpolation (Lerp) Physics for the outer ring
  function animateRing() {
    // 0.15 gives silky-smooth fluid drag without sluggish delay
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    ring.style.left = `${ringX.toFixed(2)}px`;
    ring.style.top = `${ringY.toFixed(2)}px`;

    animationFrameId = requestAnimationFrame(animateRing);
  }
  animationFrameId = requestAnimationFrame(animateRing);

  // Interactive Elements Selector for Normal Hover Scale (No text)
  const hoverSelectors = [
    'a',
    'button',
    'input',
    'select',
    'textarea',
    '[role="button"]',
    '.brand-gradient-text',
    '.hero-tab-btn',
    '.hero-finish-btn',
    '.filter-btn'
  ].join(', ');

  document.addEventListener('mouseover', (e) => {
    // 1. Zoom Text & Big Cursor Ring on Headings / Interactive Text (Clean Transparent Hollow Ring)
    const zoomTextTarget = e.target.closest('.zoom-text-hover, h1, h2, h3, h4');
    if (zoomTextTarget) {
      ring.classList.add('cursor-text-expand');
      ring.classList.remove('cursor-card-hover');
      if (cursorText) cursorText.textContent = '';
      dot.classList.add('cursor-shrink');
      return;
    }

    // 2. Check for card with explicit data-cursor
    const cardTarget = e.target.closest('[data-cursor]');
    if (cardTarget) {
      const text = cardTarget.getAttribute('data-cursor') || 'VIEW';
      if (cursorText) cursorText.textContent = text;
      ring.classList.add('cursor-card-hover');
      ring.classList.remove('cursor-text-expand');
      dot.classList.add('cursor-hide');
      return;
    }

    // 3. Check for portfolio card, showcase card, or spot-uv card
    const portfolioTarget = e.target.closest('.portfolio-card, #heroShowcaseCard, .tilt-card');
    if (portfolioTarget) {
      if (cursorText) cursorText.textContent = 'VIEW';
      ring.classList.add('cursor-card-hover');
      ring.classList.remove('cursor-text-expand');
      dot.classList.add('cursor-hide');
      return;
    }

    // 4. Standard interactive buttons / links (Clean, zero blur, no text)
    const target = e.target.closest(hoverSelectors);
    if (target) {
      ring.classList.add('cursor-expand');
      dot.classList.add('cursor-shrink');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const zoomTextTarget = e.target.closest('.zoom-text-hover, h1, h2, h3, h4');
    if (zoomTextTarget) {
      ring.classList.remove('cursor-text-expand');
    }

    const cardTarget = e.target.closest('[data-cursor], .portfolio-card, #heroShowcaseCard, .tilt-card');
    if (cardTarget) {
      ring.classList.remove('cursor-card-hover');
      dot.classList.remove('cursor-hide');
      if (cursorText) cursorText.textContent = '';
    }

    const target = e.target.closest(hoverSelectors);
    if (target) {
      ring.classList.remove('cursor-expand');
      dot.classList.remove('cursor-shrink');
    }
  });

  // Tactile Spring Click Response
  window.addEventListener('mousedown', () => {
    ring.classList.add('cursor-click');
  });

  window.addEventListener('mouseup', () => {
    ring.classList.remove('cursor-click');
  });

  // Gracefully handle cursor leaving/entering browser window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    isVisible = false;
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
    isVisible = true;
  });
}

/* --------------------------------------------------------------------------
   13. Interactive Paper GSM & Stock Thickness Simulator
   -------------------------------------------------------------------------- */
function initGsmSimulator() {
  const slider = document.getElementById('gsmSlider');
  const badge = document.getElementById('gsmBadge');
  const thickness = document.getElementById('gsmThickness');
  const rigidity = document.getElementById('gsmRigidity');
  const usage = document.getElementById('gsmUsage');

  if (!slider || !badge || !thickness || !rigidity || !usage) return;

  const gsmSpecs = {
    '1': {
      badge: '300 GSM Art Card',
      thickness: '0.35 mm',
      rigidity: '78% Flexible',
      usage: 'Brochures & Flyers'
    },
    '2': {
      badge: '350 GSM Velvet Touch',
      thickness: '0.42 mm',
      rigidity: '92% Ultra-Rigid',
      usage: 'Luxury Cards'
    },
    '3': {
      badge: '450 GSM Cotton Stock',
      thickness: '0.58 mm',
      rigidity: '96% Architectural',
      usage: 'Foil Letterpress'
    },
    '4': {
      badge: '700 GSM Triplex Board',
      thickness: '0.85 mm',
      rigidity: '100% Indestructible',
      usage: 'VIP Membership'
    }
  };

  slider.addEventListener('input', (e) => {
    const val = e.target.value;
    const spec = gsmSpecs[val];
    if (spec) {
      badge.textContent = spec.badge;
      thickness.textContent = spec.thickness;
      rigidity.textContent = spec.rigidity;
      usage.textContent = spec.usage;

      // Subtle tactile micro-interaction
      badge.style.transform = 'scale(1.08)';
      setTimeout(() => {
        badge.style.transform = 'scale(1)';
      }, 160);
    }
  });
}

/* --------------------------------------------------------------------------
   14. Scroll-Triggered Motion Animations (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/* --------------------------------------------------------------------------
   15. Enterprise Accessibility & Design Studio Engine
   Complete Freedom: Colors, Palettes, Typography, WCAG Vision & Motion
   -------------------------------------------------------------------------- */
const studioPalettes = {
  signature: {
    name: 'Imagine Signature',
    primary: '#94C120',
    secondary: '#3B2C85',
    heading: '#FFFFFF',
    body: '#F1F5F9',
    card: '#131728',
    cardBorder: '#263048',
    isLight: false,
    sections: {
      hero: '#07090F',
      services: '#0A0D17',
      portfolio: '#07090F',
      calculator: '#0A0D17',
      finishes: '#07090F',
      about: '#0A0D17',
      contact: '#07090F',
      footer: '#05060A'
    }
  },
  cyberpunk: {
    name: 'Cyberpunk Neon',
    primary: '#00E5FF',
    secondary: '#EC008C',
    heading: '#FFFFFF',
    body: '#E2E8F0',
    card: '#090E20',
    cardBorder: '#00E5FF40',
    isLight: false,
    sections: {
      hero: '#050814',
      services: '#090E20',
      portfolio: '#050814',
      calculator: '#090E20',
      finishes: '#050814',
      about: '#090E20',
      contact: '#050814',
      footer: '#03050C'
    }
  },
  royalgold: {
    name: 'Royal Gold & Onyx',
    primary: '#D4AF37',
    secondary: '#FFB800',
    heading: '#FFFFFF',
    body: '#F5F5F7',
    card: '#141419',
    cardBorder: '#D4AF3740',
    isLight: false,
    sections: {
      hero: '#0B0B0E',
      services: '#141419',
      portfolio: '#0B0B0E',
      calculator: '#141419',
      finishes: '#0B0B0E',
      about: '#141419',
      contact: '#0B0B0E',
      footer: '#070709'
    }
  },
  emerald: {
    name: 'Emerald Atelier',
    primary: '#10B981',
    secondary: '#84CC16',
    heading: '#FFFFFF',
    body: '#F0FDF4',
    card: '#0B1E17',
    cardBorder: '#10B98140',
    isLight: false,
    sections: {
      hero: '#06120E',
      services: '#0B1E17',
      portfolio: '#06120E',
      calculator: '#0B1E17',
      finishes: '#06120E',
      about: '#0B1E17',
      contact: '#06120E',
      footer: '#040B08'
    }
  },
  violet: {
    name: 'Electric Violet',
    primary: '#8B5CF6',
    secondary: '#C084FC',
    heading: '#FFFFFF',
    body: '#F5F3FF',
    card: '#140D2D',
    cardBorder: '#8B5CF640',
    isLight: false,
    sections: {
      hero: '#0D081F',
      services: '#140D2D',
      portfolio: '#0D081F',
      calculator: '#140D2D',
      finishes: '#0D081F',
      about: '#140D2D',
      contact: '#0D081F',
      footer: '#080514'
    }
  },
  sunset: {
    name: 'Sunset Ember',
    primary: '#FF6B35',
    secondary: '#FF3366',
    heading: '#FFFFFF',
    body: '#FFF1F2',
    card: '#1A1111',
    cardBorder: '#FF6B3540',
    isLight: false,
    sections: {
      hero: '#100B0B',
      services: '#1A1111',
      portfolio: '#100B0B',
      calculator: '#1A1111',
      finishes: '#100B0B',
      about: '#1A1111',
      contact: '#100B0B',
      footer: '#0A0606'
    }
  },
  sapphire: {
    name: 'Oceanic Sapphire',
    primary: '#0284C7',
    secondary: '#38BDF8',
    heading: '#FFFFFF',
    body: '#F0F9FF',
    card: '#0B1A30',
    cardBorder: '#0284C740',
    isLight: false,
    sections: {
      hero: '#06101E',
      services: '#0B1A30',
      portfolio: '#06101E',
      calculator: '#0B1A30',
      finishes: '#06101E',
      about: '#0B1A30',
      contact: '#06101E',
      footer: '#030A14'
    }
  },
  crimson: {
    name: 'Crimson Luxury',
    primary: '#E11D48',
    secondary: '#FB7185',
    heading: '#FFFFFF',
    body: '#FFF1F2',
    card: '#200B10',
    cardBorder: '#E11D4840',
    isLight: false,
    sections: {
      hero: '#14070A',
      services: '#200B10',
      portfolio: '#14070A',
      calculator: '#200B10',
      finishes: '#14070A',
      about: '#200B10',
      contact: '#14070A',
      footer: '#0D0406'
    }
  },
  monochrome: {
    name: 'Titanium Monochrome',
    primary: '#F8FAFC',
    secondary: '#94A3B8',
    heading: '#FFFFFF',
    body: '#CBD5E1',
    card: '#111318',
    cardBorder: '#FFFFFF26',
    isLight: false,
    sections: {
      hero: '#08090C',
      services: '#111318',
      portfolio: '#08090C',
      calculator: '#111318',
      finishes: '#08090C',
      about: '#111318',
      contact: '#08090C',
      footer: '#040507'
    }
  },
  paper: {
    name: 'Studio Paper Slate',
    primary: '#65A30D',
    secondary: '#3B2C85',
    heading: '#0F172A',
    body: '#334155',
    card: '#FFFFFF',
    cardBorder: '#0000001A',
    isLight: true,
    sections: {
      hero: '#F1F1F2',
      services: '#EAEAEF',
      portfolio: '#F1F1F2',
      calculator: '#EAEAEF',
      finishes: '#F1F1F2',
      about: '#EAEAEF',
      contact: '#F1F1F2',
      footer: '#E5E5E9'
    }
  }
};

function initAccessibilityStudio() {
  const triggerBtns = document.querySelectorAll('.accessibility-trigger-btn');
  const drawer = document.getElementById('accessibilityDrawer');
  const backdrop = document.getElementById('accessibilityBackdrop');
  const closeBtn = document.getElementById('closeAccessibilityBtn');
  const applyCloseBtn = document.getElementById('applyCloseA11yBtn');
  const resetBtn = document.getElementById('resetA11yBtn');
  
  // Tab elements
  const tabBtns = document.querySelectorAll('.a11y-tab-btn');
  const tabPanels = document.querySelectorAll('.a11y-tab-content');

  // Palettes
  const paletteBtns = document.querySelectorAll('.palette-btn');

  // Custom Color Pickers & Labels
  const pickerPrimary = document.getElementById('pickerAccentPrimary');
  const pickerSecondary = document.getElementById('pickerAccentSecondary');
  const labelPrimary = document.getElementById('labelColorPrimary');
  const labelSecondary = document.getElementById('labelColorSecondary');

  const pickerHeading = document.getElementById('pickerColorHeading');
  const labelHeading = document.getElementById('labelColorHeading');
  const pickerBody = document.getElementById('pickerColorBody');
  const labelBody = document.getElementById('labelColorBody');
  const pickerCard = document.getElementById('pickerColorCard');
  const labelCard = document.getElementById('labelColorCard');
  const pickerBorder = document.getElementById('pickerBorderCard');
  const labelBorder = document.getElementById('labelBorderCard');

  const sectionPickers = document.querySelectorAll('#sectionPickersList input[type="color"]');

  // Typography Elements
  const fontSizeSlider = document.getElementById('fontSizeSlider');
  const fontSizeScaleLabel = document.getElementById('fontSizeScaleLabel');
  const fontScalePresets = document.querySelectorAll('.font-scale-preset');
  const headingFontBtns = document.querySelectorAll('.font-heading-btn');
  const bodyFontBtns = document.querySelectorAll('.font-body-btn');
  const lineHeightBtns = document.querySelectorAll('.line-height-btn');
  const letterSpacingBtns = document.querySelectorAll('.letter-spacing-btn');
  const toggleBionicReading = document.getElementById('toggleBionicReading');

  // Vision Elements
  const toggleHighContrast = document.getElementById('toggleHighContrast');
  const toggleGrayscale = document.getElementById('toggleGrayscale');
  const toggleInvert = document.getElementById('toggleInvert');
  const toggleHighlightLinks = document.getElementById('toggleHighlightLinks');
  const toggleReadingRuler = document.getElementById('toggleReadingRuler');
  const toggleBigCursor = document.getElementById('toggleBigCursor');
  const readingRuler = document.getElementById('accessibilityReadingRuler');

  // Advanced Vision Elements
  const toggleReadingMask = document.getElementById('toggleReadingMask');
  const readingMask = document.getElementById('accessibilityReadingMask');
  const daltonismBtns = document.querySelectorAll('.daltonism-btn');
  const toggleWarmShield = document.getElementById('toggleWarmShield');
  const warmShield = document.getElementById('accessibilityWarmShield');
  const warmShieldSlider = document.getElementById('warmShieldSlider');
  const warmShieldLabel = document.getElementById('warmShieldLabel');

  // Next-Gen Feature Elements
  const profileBtns = document.querySelectorAll('.a11y-profile-btn');
  const textAlignBtns = document.querySelectorAll('.text-align-btn');
  const toggleHighContrastLight = document.getElementById('toggleHighContrastLight');
  const toggleVoiceCommander = document.getElementById('toggleVoiceCommander');
  const voicePill = document.getElementById('accessibilityVoicePill');
  const voiceTranscript = document.getElementById('voiceCommandTranscript');
  const closeVoiceBtn = document.getElementById('closeVoiceCommanderBtn');
  const openLandmarksBtn = document.getElementById('openLandmarkNavigatorBtn');
  const landmarksModal = document.getElementById('accessibilityLandmarksModal');
  const closeLandmarksBtn = document.getElementById('closeLandmarksModalBtn');
  const toggleJargonExplainer = document.getElementById('toggleJargonExplainer');
  const jargonTooltip = document.getElementById('accessibilityJargonTooltip');
  const jargonTitle = document.getElementById('jargonTermTitle');
  const jargonDesc = document.getElementById('jargonTermDesc');
  const speakJargonBtn = document.getElementById('speakJargonBtn');

  // Motion & Motor Elements
  const togglePauseAnimations = document.getElementById('togglePauseAnimations');
  const toggleReadAloud = document.getElementById('toggleReadAloud');
  const readAloudStatus = document.getElementById('readAloudStatus');
  const toggleHitboxMagnifier = document.getElementById('toggleHitboxMagnifier');
  const toggleFocusRadar = document.getElementById('toggleFocusRadar');
  const toggleImageAltInspector = document.getElementById('toggleImageAltInspector');
  const imageTooltip = document.getElementById('accessibilityImageTooltip');
  const tooltipText = document.getElementById('accessibilityTooltipText');

  const root = document.documentElement;
  if (!drawer || !backdrop) return;

  // Initial State Definition
  const defaultState = {
    palette: 'signature',
    isLight: false,
    profile: 'none',
    vars: {
      '--theme-accent-primary': '#94C120',
      '--theme-accent-secondary': '#3B2C85',
      '--theme-color-heading': '#FFFFFF',
      '--theme-color-body': '#F1F5F9',
      '--theme-color-card': '#131728',
      '--theme-border-card': '#263048',
      '--theme-bg-hero': '#07090F',
      '--theme-bg-services': '#0A0D17',
      '--theme-bg-portfolio': '#07090F',
      '--theme-bg-calculator': '#0A0D17',
      '--theme-bg-finishes': '#07090F',
      '--theme-bg-about': '#0A0D17',
      '--theme-bg-contact': '#07090F',
      '--theme-bg-footer': '#05060A'
    },
    typography: {
      scale: 100,
      headingFont: "'Outfit', sans-serif",
      bodyFont: "'Plus Jakarta Sans', sans-serif",
      lineHeight: "normal",
      letterSpacing: "normal",
      alignment: "left",
      bionicReading: false
    },
    vision: {
      highContrast: false,
      highContrastLight: false,
      grayscale: false,
      invert: false,
      highlightLinks: false,
      readingRuler: false,
      bigCursor: false,
      readingMask: false,
      daltonism: 'none',
      warmShield: false,
      warmShieldIntensity: 25
    },
    motion: {
      pauseAnimations: false,
      readAloud: false,
      hitboxMagnifier: false,
      focusRadar: false,
      imageAltInspector: false,
      voiceCommander: false,
      jargonExplainer: false
    }
  };

  let currentState = JSON.parse(JSON.stringify(defaultState));

  // Open / Close Drawer
  const openDrawer = () => {
    backdrop.classList.remove('hidden');
    requestAnimationFrame(() => {
      backdrop.classList.add('backdrop-open', 'open');
      drawer.classList.add('drawer-open', 'open');
    });
    document.body.classList.add('overflow-hidden');
  };

  const closeDrawer = () => {
    drawer.classList.remove('drawer-open', 'open');
    backdrop.classList.remove('backdrop-open', 'open');
    setTimeout(() => {
      backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 300);
  };

  triggerBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (applyCloseBtn) applyCloseBtn.addEventListener('click', () => {
    saveState();
    closeDrawer();
  });
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (drawer.classList.contains('drawer-open') || drawer.classList.contains('open'))) {
      closeDrawer();
    }
  });

  // Tab Switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.classList.toggle('text-brand-lime', isActive);
        b.classList.toggle('bg-slate-800', isActive);
        b.classList.toggle('text-slate-400', !isActive);
      });
      tabPanels.forEach(panel => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });

  // Apply CSS Custom Property
  function applyVar(property, value) {
    root.style.setProperty(property, value);
    currentState.vars[property] = value;
  }

  // Save State
  function saveState() {
    try {
      localStorage.setItem('imagine_a11y_state', JSON.stringify(currentState));
      localStorage.setItem('imagine_custom_theme', JSON.stringify(currentState));
    } catch(e) {}
  }

  // Apply Preset Palette
  function applyPalette(key, save = true) {
    const pal = studioPalettes[key];
    if (!pal) return;

    currentState.palette = key;
    currentState.isLight = pal.isLight;

    // Active Checkmark indicators
    paletteBtns.forEach(b => {
      const isMatch = b.getAttribute('data-palette') === key;
      b.classList.toggle('active', isMatch);
      b.classList.toggle('border-brand-lime', isMatch);
      b.classList.toggle('border-slate-800', !isMatch);
      const check = b.querySelector('.palette-check');
      if (check) {
        check.classList.toggle('hidden', !isMatch);
        check.classList.toggle('flex', isMatch);
      }
    });

    // Apply Brand Accents & Colors
    applyVar('--theme-accent-primary', pal.primary);
    applyVar('--theme-accent-secondary', pal.secondary);
    applyVar('--theme-color-heading', pal.heading);
    applyVar('--theme-color-body', pal.body);
    applyVar('--theme-color-card', pal.card);
    applyVar('--theme-border-card', pal.cardBorder);

    // Update color pickers & hex labels
    if (pickerPrimary) pickerPrimary.value = pal.primary;
    if (labelPrimary) labelPrimary.textContent = pal.primary.toUpperCase();
    if (pickerSecondary) pickerSecondary.value = pal.secondary;
    if (labelSecondary) labelSecondary.textContent = pal.secondary.toUpperCase();
    if (pickerHeading) pickerHeading.value = pal.heading;
    if (labelHeading) labelHeading.textContent = pal.heading.toUpperCase();
    if (pickerBody) pickerBody.value = pal.body;
    if (labelBody) labelBody.textContent = pal.body.toUpperCase();
    if (pickerCard) pickerCard.value = pal.card;
    if (labelCard) labelCard.textContent = pal.card.toUpperCase();
    if (pickerBorder) pickerBorder.value = pal.cardBorder.length === 7 ? pal.cardBorder : '#263048';
    if (labelBorder) labelBorder.textContent = pal.cardBorder.toUpperCase();

    // Toggle Light Mode class
    if (pal.isLight) {
      root.classList.add('theme-light');
    } else {
      root.classList.remove('theme-light');
    }

    // Apply section backgrounds
    Object.entries(pal.sections).forEach(([sec, col]) => {
      const varName = `--theme-bg-${sec}`;
      applyVar(varName, col);
      const input = document.querySelector(`input[data-section="${sec}"]`);
      if (input) input.value = col;
    });

    if (save) saveState();
  }

  // Palette Click Handlers
  paletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const palKey = btn.getAttribute('data-palette');
      applyPalette(palKey);
    });
  });

  // Custom Accent Pickers Handlers
  function bindColorPicker(picker, label, varName) {
    if (!picker) return;
    picker.addEventListener('input', (e) => {
      const val = e.target.value;
      applyVar(varName, val);
      if (label) label.textContent = val.toUpperCase();
      currentState.palette = 'custom';
      paletteBtns.forEach(b => {
        b.classList.remove('active', 'border-brand-lime');
        b.classList.add('border-slate-800');
        const check = b.querySelector('.palette-check');
        if (check) { check.classList.add('hidden'); check.classList.remove('flex'); }
      });
    });
    picker.addEventListener('change', saveState);
  }

  bindColorPicker(pickerPrimary, labelPrimary, '--theme-accent-primary');
  bindColorPicker(pickerSecondary, labelSecondary, '--theme-accent-secondary');
  bindColorPicker(pickerHeading, labelHeading, '--theme-color-heading');
  bindColorPicker(pickerBody, labelBody, '--theme-color-body');
  bindColorPicker(pickerCard, labelCard, '--theme-color-card');
  bindColorPicker(pickerBorder, labelBorder, '--theme-border-card');

  // Section Background Handlers
  sectionPickers.forEach(picker => {
    const sec = picker.getAttribute('data-section');
    const varName = `--theme-bg-${sec}`;
    picker.addEventListener('input', (e) => {
      const col = e.target.value;
      applyVar(varName, col);
      currentState.palette = 'custom';
      paletteBtns.forEach(b => {
        b.classList.remove('active', 'border-brand-lime');
        b.classList.add('border-slate-800');
        const check = b.querySelector('.palette-check');
        if (check) { check.classList.add('hidden'); check.classList.remove('flex'); }
      });
    });
    picker.addEventListener('change', saveState);
  });

  // -------------------------------------------------------------------------
  // Typography Controls
  // -------------------------------------------------------------------------
  function applyFontScale(scale, save = true) {
    currentState.typography.scale = scale;
    const factor = scale / 100;
    root.style.setProperty('--theme-font-scale', factor);
    if (fontSizeSlider) fontSizeSlider.value = scale;
    if (fontSizeScaleLabel) fontSizeScaleLabel.textContent = `${scale}%`;

    fontScalePresets.forEach(preset => {
      const match = parseInt(preset.getAttribute('data-scale')) === scale;
      preset.classList.toggle('active', match);
      preset.classList.toggle('border-brand-lime', match);
      preset.classList.toggle('text-brand-lime', match);
      preset.classList.toggle('border-slate-750', !match);
      preset.classList.toggle('text-slate-300', !match);
    });

    if (save) saveState();
  }

  if (fontSizeSlider) {
    fontSizeSlider.addEventListener('input', (e) => {
      applyFontScale(parseInt(e.target.value), false);
    });
    fontSizeSlider.addEventListener('change', () => saveState());
  }

  fontScalePresets.forEach(preset => {
    preset.addEventListener('click', () => {
      const sc = parseInt(preset.getAttribute('data-scale'));
      applyFontScale(sc, true);
    });
  });

  function applyHeadingFont(fontVal, save = true) {
    currentState.typography.headingFont = fontVal;
    root.style.setProperty('--theme-font-heading', fontVal);
    headingFontBtns.forEach(b => {
      const match = b.getAttribute('data-font') === fontVal;
      b.classList.toggle('active', match);
      b.classList.toggle('border-brand-lime', match);
      b.classList.toggle('border-slate-800', !match);
    });
    if (save) saveState();
  }

  headingFontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyHeadingFont(btn.getAttribute('data-font'), true);
    });
  });

  function applyBodyFont(fontVal, save = true) {
    currentState.typography.bodyFont = fontVal;
    root.style.setProperty('--theme-font-body', fontVal);
    bodyFontBtns.forEach(b => {
      const match = b.getAttribute('data-font') === fontVal;
      b.classList.toggle('active', match);
      b.classList.toggle('border-brand-lime', match);
      b.classList.toggle('border-slate-800', !match);
    });
    if (save) saveState();
  }

  bodyFontBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyBodyFont(btn.getAttribute('data-font'), true);
    });
  });

  function applyLineHeight(lh, save = true) {
    currentState.typography.lineHeight = lh;
    root.style.setProperty('--theme-line-height', lh);
    lineHeightBtns.forEach(b => {
      const match = b.getAttribute('data-lh') === lh;
      b.classList.toggle('active', match);
      b.classList.toggle('border-brand-lime', match);
      b.classList.toggle('text-brand-lime', match);
      b.classList.toggle('border-slate-750', !match);
      b.classList.toggle('text-slate-300', !match);
    });
    if (save) saveState();
  }

  lineHeightBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyLineHeight(btn.getAttribute('data-lh'), true);
    });
  });

  function applyLetterSpacing(ls, save = true) {
    currentState.typography.letterSpacing = ls;
    root.style.setProperty('--theme-letter-spacing', ls);
    letterSpacingBtns.forEach(b => {
      const match = b.getAttribute('data-ls') === ls;
      b.classList.toggle('active', match);
      b.classList.toggle('border-brand-lime', match);
      b.classList.toggle('text-brand-lime', match);
      b.classList.toggle('border-slate-750', !match);
      b.classList.toggle('text-slate-300', !match);
    });
    if (save) saveState();
  }

  letterSpacingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyLetterSpacing(btn.getAttribute('data-ls'), true);
    });
  });

  // Text Alignment Suite (WCAG River Reducer)
  function applyTextAlignment(align, save = true) {
    currentState.typography.alignment = align;
    root.classList.remove('a11y-align-left', 'a11y-align-center', 'a11y-align-right');
    if (align !== 'left') {
      root.classList.add(`a11y-align-${align}`);
    }
    textAlignBtns.forEach(btn => {
      const match = btn.getAttribute('data-align') === align;
      btn.classList.toggle('active', match);
      btn.classList.toggle('border-brand-lime', match);
      btn.classList.toggle('text-brand-lime', match);
      btn.classList.toggle('border-slate-750', !match);
      btn.classList.toggle('text-slate-300', !match);
    });
    if (save) saveState();
  }

  textAlignBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      applyTextAlignment(btn.getAttribute('data-align'), true);
    });
  });

  // -------------------------------------------------------------------------
  // Feature 1: Bionic Reading Mode (Saccadic Fixation for ADHD & Dyslexia)
  // -------------------------------------------------------------------------
  function formatBionicString(html) {
    return html.replace(/(<[^>]+>)|(\b[a-zA-Z0-9À-ž]+\b)/g, (match, tag, word) => {
      if (tag) return tag;
      if (!word) return match;
      const len = word.length;
      const fixLen = len <= 3 ? 1 : Math.ceil(len * 0.45);
      return `<b class="bionic-fixation">${word.slice(0, fixLen)}</b>${word.slice(fixLen)}`;
    });
  }

  function updateBionicReading(enabled, save = true) {
    currentState.typography.bionicReading = enabled;
    if (toggleBionicReading) toggleBionicReading.checked = enabled;

    const targets = document.querySelectorAll('main p, main h1, main h2, main h3, main h4, header nav a, .service-card h3, .service-card p, .portfolio-card h4, .portfolio-card p');
    if (enabled) {
      targets.forEach(el => {
        if (el.closest('#accessibilityDrawer')) return;
        if (!el.getAttribute('data-bionic-original')) {
          el.setAttribute('data-bionic-original', el.innerHTML);
        }
        el.innerHTML = formatBionicString(el.getAttribute('data-bionic-original'));
      });
    } else {
      document.querySelectorAll('[data-bionic-original]').forEach(el => {
        el.innerHTML = el.getAttribute('data-bionic-original');
        el.removeAttribute('data-bionic-original');
      });
    }
    if (save) saveState();
  }

  if (toggleBionicReading) {
    toggleBionicReading.addEventListener('change', (e) => {
      updateBionicReading(e.target.checked);
    });
  }

  // -------------------------------------------------------------------------
  // Vision & Focus Aids
  // -------------------------------------------------------------------------
  if (toggleHighContrast) {
    toggleHighContrast.addEventListener('change', (e) => {
      currentState.vision.highContrast = e.target.checked;
      root.classList.toggle('a11y-high-contrast', e.target.checked);
      if (e.target.checked && toggleHighContrastLight && toggleHighContrastLight.checked) {
        toggleHighContrastLight.checked = false;
        updateHighContrastLight(false, false);
      }
      saveState();
    });
  }

  // Feature: Light High-Contrast Mode (WCAG AAA 21:1)
  function updateHighContrastLight(enabled, save = true) {
    currentState.vision.highContrastLight = enabled;
    root.classList.toggle('a11y-high-contrast-light', enabled);
    if (toggleHighContrastLight) toggleHighContrastLight.checked = enabled;
    if (enabled) {
      if (toggleHighContrast && toggleHighContrast.checked) {
        toggleHighContrast.checked = false;
        currentState.vision.highContrast = false;
        root.classList.remove('a11y-high-contrast');
      }
    }
    if (save) saveState();
  }

  if (toggleHighContrastLight) {
    toggleHighContrastLight.addEventListener('change', (e) => {
      updateHighContrastLight(e.target.checked);
    });
  }

  if (toggleGrayscale) {
    toggleGrayscale.addEventListener('change', (e) => {
      currentState.vision.grayscale = e.target.checked;
      root.classList.toggle('a11y-grayscale', e.target.checked);
      saveState();
    });
  }

  if (toggleInvert) {
    toggleInvert.addEventListener('change', (e) => {
      currentState.vision.invert = e.target.checked;
      root.classList.toggle('a11y-invert', e.target.checked);
      saveState();
    });
  }

  if (toggleHighlightLinks) {
    toggleHighlightLinks.addEventListener('change', (e) => {
      currentState.vision.highlightLinks = e.target.checked;
      root.classList.toggle('a11y-highlight-links', e.target.checked);
      saveState();
    });
  }

  if (toggleBigCursor) {
    toggleBigCursor.addEventListener('change', (e) => {
      currentState.vision.bigCursor = e.target.checked;
      root.classList.toggle('a11y-big-cursor', e.target.checked);
      saveState();
    });
  }

  // Reading Guide Ruler
  function updateReadingRulerState(enabled) {
    currentState.vision.readingRuler = enabled;
    if (readingRuler) {
      readingRuler.classList.toggle('active', enabled);
    }
    if (enabled) {
      window.addEventListener('mousemove', onReadingRulerMove, { passive: true });
    } else {
      window.removeEventListener('mousemove', onReadingRulerMove);
    }
  }

  function onReadingRulerMove(e) {
    if (readingRuler && currentState.vision.readingRuler) {
      readingRuler.style.top = `${e.clientY}px`;
    }
  }

  if (toggleReadingRuler) {
    toggleReadingRuler.addEventListener('change', (e) => {
      updateReadingRulerState(e.target.checked);
      saveState();
    });
  }

  // -------------------------------------------------------------------------
  // Feature 2: Reading Mask / Focus Spotlight (ADHD & Cognitive Blinder)
  // -------------------------------------------------------------------------
  function onReadingMaskMove(e) {
    if (readingMask && currentState.vision.readingMask) {
      readingMask.style.setProperty('--mask-y', `${e.clientY}px`);
    }
  }

  function updateReadingMaskState(enabled, save = true) {
    currentState.vision.readingMask = enabled;
    if (readingMask) readingMask.classList.toggle('active', enabled);
    if (toggleReadingMask) toggleReadingMask.checked = enabled;
    if (enabled) {
      window.addEventListener('mousemove', onReadingMaskMove, { passive: true });
    } else {
      window.removeEventListener('mousemove', onReadingMaskMove);
    }
    if (save) saveState();
  }

  if (toggleReadingMask) {
    toggleReadingMask.addEventListener('change', (e) => {
      updateReadingMaskState(e.target.checked);
    });
  }

  // -------------------------------------------------------------------------
  // Feature 3: Daltonism / Color Blindness Filter Engine
  // -------------------------------------------------------------------------
  function applyDaltonism(mode, save = true) {
    currentState.vision.daltonism = mode || 'none';
    root.classList.remove(
      'a11y-filter-protanopia',
      'a11y-filter-deuteranopia',
      'a11y-filter-tritanopia',
      'a11y-filter-achromatopsia'
    );
    if (mode && mode !== 'none') {
      root.classList.add(`a11y-filter-${mode}`);
    }
    daltonismBtns.forEach(btn => {
      const match = btn.getAttribute('data-filter') === (mode || 'none');
      btn.classList.toggle('active', match);
      btn.classList.toggle('border-brand-lime', match);
      btn.classList.toggle('border-slate-800', !match);
    });
    if (save) saveState();
  }

  daltonismBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      applyDaltonism(filter);
    });
  });

  // -------------------------------------------------------------------------
  // Feature 4: Circadian Warm Hue / Blue-Light Night Shield
  // -------------------------------------------------------------------------
  function updateWarmShieldState(enabled, intensity = null, save = true) {
    currentState.vision.warmShield = enabled;
    if (intensity !== null) currentState.vision.warmShieldIntensity = intensity;
    const curIntensity = currentState.vision.warmShieldIntensity || 25;

    if (warmShield) {
      warmShield.classList.toggle('active', enabled);
      warmShield.style.setProperty('--warmth-opacity', (curIntensity / 100));
    }
    if (toggleWarmShield) toggleWarmShield.checked = enabled;
    if (warmShieldSlider) warmShieldSlider.value = curIntensity;
    if (warmShieldLabel) warmShieldLabel.textContent = `${curIntensity}% Warmth`;
    if (save) saveState();
  }

  if (toggleWarmShield) {
    toggleWarmShield.addEventListener('change', (e) => {
      updateWarmShieldState(e.target.checked);
    });
  }

  if (warmShieldSlider) {
    warmShieldSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      updateWarmShieldState(true, val, false);
    });
    warmShieldSlider.addEventListener('change', () => saveState());
  }

  // -------------------------------------------------------------------------
  // Motion & Audio Aids
  // -------------------------------------------------------------------------
  if (togglePauseAnimations) {
    togglePauseAnimations.addEventListener('change', (e) => {
      currentState.motion.pauseAnimations = e.target.checked;
      root.classList.toggle('a11y-pause-animations', e.target.checked);
      saveState();
    });
  }

  // Read Aloud (Web Speech API)
  let speechDebounceTimer = null;
  function handleReadAloudTarget(e) {
    if (!currentState.motion.readAloud) return;
    const target = e.target.closest('h1, h2, h3, h4, h5, h6, p, a, button, li, .service-card');
    if (!target) return;
    
    // Ignore inside drawer to prevent self-reading
    if (target.closest('#accessibilityDrawer')) return;

    const text = target.innerText ? target.innerText.trim() : '';
    if (!text || text.length < 2 || text.length > 250) return;

    clearTimeout(speechDebounceTimer);
    speechDebounceTimer = setTimeout(() => {
      if ('speechSynthesis' in window && currentState.motion.readAloud) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }, 150);
  }

  function updateReadAloudState(enabled) {
    currentState.motion.readAloud = enabled;
    if (readAloudStatus) {
      readAloudStatus.classList.toggle('hidden', !enabled);
      readAloudStatus.classList.toggle('flex', enabled);
    }
    if (enabled) {
      document.addEventListener('mouseover', handleReadAloudTarget, { passive: true });
    } else {
      document.removeEventListener('mouseover', handleReadAloudTarget);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }

  if (toggleReadAloud) {
    toggleReadAloud.addEventListener('change', (e) => {
      updateReadAloudState(e.target.checked);
      saveState();
    });
  }

  // -------------------------------------------------------------------------
  // Feature 5a: Click Target Magnifier (Motor Aid)
  // -------------------------------------------------------------------------
  function updateHitboxMagnifier(enabled, save = true) {
    currentState.motion.hitboxMagnifier = enabled;
    root.classList.toggle('a11y-hitbox-magnifier', enabled);
    if (toggleHitboxMagnifier) toggleHitboxMagnifier.checked = enabled;
    if (save) saveState();
  }

  if (toggleHitboxMagnifier) {
    toggleHitboxMagnifier.addEventListener('change', (e) => {
      updateHitboxMagnifier(e.target.checked);
    });
  }

  // -------------------------------------------------------------------------
  // Feature 5b: Keyboard Navigation Focus Radar
  // -------------------------------------------------------------------------
  function updateFocusRadar(enabled, save = true) {
    currentState.motion.focusRadar = enabled;
    root.classList.toggle('a11y-focus-radar', enabled);
    if (toggleFocusRadar) toggleFocusRadar.checked = enabled;
    if (save) saveState();
  }

  if (toggleFocusRadar) {
    toggleFocusRadar.addEventListener('change', (e) => {
      updateFocusRadar(e.target.checked);
    });
  }

  // -------------------------------------------------------------------------
  // Feature 6: Image Alt-Text Inspector & Content Tooltips
  // -------------------------------------------------------------------------
  let altTooltipTarget = null;
  function onImageInspectHover(e) {
    if (!currentState.motion.imageAltInspector || !imageTooltip) return;
    const img = e.target.closest('img');
    if (!img || img.closest('#accessibilityDrawer')) {
      imageTooltip.classList.remove('visible');
      altTooltipTarget = null;
      return;
    }
    altTooltipTarget = img;
    const alt = img.getAttribute('alt') || 'Showcase Sample Graphic';
    if (tooltipText) tooltipText.textContent = alt;
    imageTooltip.classList.add('visible');
    positionImageTooltip(e);
  }

  function onImageInspectMove(e) {
    if (!currentState.motion.imageAltInspector || !imageTooltip || !altTooltipTarget) return;
    positionImageTooltip(e);
  }

  function positionImageTooltip(e) {
    const pad = 15;
    let x = e.clientX + pad;
    let y = e.clientY + pad;
    if (x + 320 > window.innerWidth) x = e.clientX - 320;
    if (y + 100 > window.innerHeight) y = e.clientY - 90;
    imageTooltip.style.left = `${Math.max(10, x)}px`;
    imageTooltip.style.top = `${Math.max(10, y)}px`;
  }

  function onImageInspectClick(e) {
    if (!currentState.motion.imageAltInspector) return;
    const img = e.target.closest('img');
    if (!img || img.closest('#accessibilityDrawer')) return;
    const alt = img.getAttribute('alt');
    if (alt && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Image description: ${alt}`));
    }
  }

  function updateImageAltInspector(enabled, save = true) {
    currentState.motion.imageAltInspector = enabled;
    if (toggleImageAltInspector) toggleImageAltInspector.checked = enabled;
    if (enabled) {
      document.addEventListener('mouseover', onImageInspectHover, { passive: true });
      document.addEventListener('mousemove', onImageInspectMove, { passive: true });
      document.addEventListener('click', onImageInspectClick);
    } else {
      document.removeEventListener('mouseover', onImageInspectHover);
      document.removeEventListener('mousemove', onImageInspectMove);
      document.removeEventListener('click', onImageInspectClick);
      if (imageTooltip) imageTooltip.classList.remove('visible');
    }
    if (save) saveState();
  }

  if (toggleImageAltInspector) {
    toggleImageAltInspector.addEventListener('change', (e) => {
      updateImageAltInspector(e.target.checked);
    });
  }

  // -------------------------------------------------------------------------
  // Feature 1: 1-Click WCAG Accessibility Profiles Engine
  // -------------------------------------------------------------------------
  function applyAccessibilityProfile(profileName, save = true) {
    currentState.profile = profileName;

    // Update Profile buttons active UI
    profileBtns.forEach(btn => {
      const match = btn.getAttribute('data-profile') === profileName;
      btn.classList.toggle('active', match);
      btn.classList.toggle('border-brand-lime', match);
      btn.classList.toggle('border-slate-800', !match);
    });

    if (profileName === 'adhd') {
      // Bionic reading + Reading mask spotlight + Pause animations
      updateBionicReading(true, false);
      updateReadingMaskState(true, false);
      if (togglePauseAnimations) togglePauseAnimations.checked = true;
      root.classList.add('a11y-pause-animations');
      currentState.motion.pauseAnimations = true;
      applyFontScale(105, false);
    } else if (profileName === 'vision') {
      // 125% zoom + Dark high contrast + Big cursor
      applyFontScale(125, false);
      if (toggleHighContrast) toggleHighContrast.checked = true;
      root.classList.add('a11y-high-contrast');
      currentState.vision.highContrast = true;
      if (toggleBigCursor) toggleBigCursor.checked = true;
      root.classList.add('a11y-big-cursor');
      currentState.vision.bigCursor = true;
    } else if (profileName === 'dyslexia') {
      // Lexend font + 1.7x line-height + Reading ruler + Left alignment
      applyHeadingFont("'Lexend', sans-serif", false);
      applyBodyFont("'Lexend', sans-serif", false);
      applyLineHeight("1.7", false);
      applyLetterSpacing("0.05em", false);
      applyTextAlignment("left", false);
      if (toggleReadingRuler) toggleReadingRuler.checked = true;
      updateReadingRulerState(true);
    } else if (profileName === 'motor') {
      // 48px Hitbox magnifier + Keyboard focus radar + Big cursor
      updateHitboxMagnifier(true, false);
      updateFocusRadar(true, false);
      if (toggleBigCursor) toggleBigCursor.checked = true;
      root.classList.add('a11y-big-cursor');
      currentState.vision.bigCursor = true;
    } else if (profileName === 'calm') {
      // Circadian Warm shield 35% + Pause motion + Monochromatic palette
      updateWarmShieldState(true, 35, false);
      if (togglePauseAnimations) togglePauseAnimations.checked = true;
      root.classList.add('a11y-pause-animations');
      currentState.motion.pauseAnimations = true;
      applyPalette('monochrome', false);
    } else if (profileName === 'colorblind') {
      // Deuteranopia filter matrix + Highlight interactive links
      applyDaltonism('deuteranopia', false);
      if (toggleHighlightLinks) toggleHighlightLinks.checked = true;
      root.classList.add('a11y-highlight-links');
      currentState.vision.highlightLinks = true;
    }

    if (save) saveState();
  }

  profileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prof = btn.getAttribute('data-profile');
      if (currentState.profile === prof) {
        // Toggle off if clicked again
        btn.classList.remove('active', 'border-brand-lime');
        btn.classList.add('border-slate-800');
        currentState.profile = 'none';
        saveState();
      } else {
        applyAccessibilityProfile(prof, true);
      }
    });
  });

  // -------------------------------------------------------------------------
  // Feature 2: Hands-Free Voice Command Navigator (Web Speech API)
  // -------------------------------------------------------------------------
  let voiceRecognition = null;
  function handleVoiceCommand(phrase) {
    const p = phrase.toLowerCase().trim();
    if (voiceTranscript) voiceTranscript.textContent = `"${phrase}"`;

    if (p.includes('service')) {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (p.includes('portfolio') || p.includes('work') || p.includes('sample')) {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (p.includes('calc') || p.includes('cost') || p.includes('price') || p.includes('quote')) {
      const el = document.getElementById('calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (p.includes('finish') || p.includes('foil') || p.includes('uv') || p.includes('tactile')) {
      const el = document.getElementById('finishes');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (p.includes('about') || p.includes('facility') || p.includes('machine')) {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (p.includes('contact') || p.includes('whatsapp') || p.includes('call') || p.includes('reach')) {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (p.includes('down') || p.includes('next')) {
      window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
    } else if (p.includes('up') || p.includes('previous')) {
      window.scrollBy({ top: -window.innerHeight * 0.7, behavior: 'smooth' });
    } else if (p.includes('top') || p.includes('home') || p.includes('header')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (p.includes('bottom') || p.includes('footer')) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }

  function updateVoiceCommander(enabled, save = true) {
    currentState.motion.voiceCommander = enabled;
    if (toggleVoiceCommander) toggleVoiceCommander.checked = enabled;

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      if (enabled) {
        alert('Voice Navigation is supported on Google Chrome, Edge, and modern Chromium browsers.');
        if (toggleVoiceCommander) toggleVoiceCommander.checked = false;
        currentState.motion.voiceCommander = false;
      }
      return;
    }

    if (enabled) {
      if (voicePill) {
        voicePill.classList.remove('hidden');
        voicePill.classList.add('flex');
      }
      try {
        if (!voiceRecognition) {
          voiceRecognition = new SpeechRec();
          voiceRecognition.continuous = true;
          voiceRecognition.interimResults = false;
          voiceRecognition.lang = 'en-US';

          voiceRecognition.onresult = (e) => {
            const last = e.results.length - 1;
            const text = e.results[last][0].transcript;
            handleVoiceCommand(text);
          };

          voiceRecognition.onerror = () => {};
          voiceRecognition.onend = () => {
            if (currentState.motion.voiceCommander) {
              try { voiceRecognition.start(); } catch(err) {}
            }
          };
        }
        voiceRecognition.start();
      } catch(e) {}
    } else {
      if (voicePill) {
        voicePill.classList.remove('flex');
        voicePill.classList.add('hidden');
      }
      if (voiceRecognition) {
        try { voiceRecognition.stop(); } catch(e) {}
      }
    }
    if (save) saveState();
  }

  if (toggleVoiceCommander) {
    toggleVoiceCommander.addEventListener('change', (e) => {
      updateVoiceCommander(e.target.checked);
    });
  }
  if (closeVoiceBtn) {
    closeVoiceBtn.addEventListener('click', () => {
      updateVoiceCommander(false);
    });
  }

  // -------------------------------------------------------------------------
  // Feature 3: Page Structure & Landmark Navigator
  // -------------------------------------------------------------------------
  function openLandmarkModal() {
    if (landmarksModal) {
      landmarksModal.classList.remove('hidden');
      landmarksModal.classList.add('flex');
    }
  }

  function closeLandmarkModal() {
    if (landmarksModal) {
      landmarksModal.classList.remove('flex');
      landmarksModal.classList.add('hidden');
    }
  }

  if (openLandmarksBtn) openLandmarksBtn.addEventListener('click', openLandmarkModal);
  if (closeLandmarksBtn) closeLandmarksBtn.addEventListener('click', closeLandmarkModal);
  if (landmarksModal) {
    landmarksModal.addEventListener('click', (e) => {
      if (e.target === landmarksModal) closeLandmarkModal();
    });
    const landmarkLinks = landmarksModal.querySelectorAll('a[href^="#"]');
    landmarkLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeLandmarkModal();
      });
    });
  }

  // -------------------------------------------------------------------------
  // Feature 4: Print Jargon & Cognitive Plain-Language Assistant
  // -------------------------------------------------------------------------
  const printJargonDict = {
    'gsm': {
      term: 'GSM (Grams per Square Meter)',
      desc: 'Standard global unit measuring paper thickness and weight. Higher GSM (e.g. 350-400) means stiffer, more luxurious board.'
    },
    'spot uv': {
      term: 'Spot UV Varnish',
      desc: 'A glossy ultraviolet coating applied only to specific areas (logos, headings) to make them pop against matte paper.'
    },
    'velvet matte': {
      term: 'Velvet Soft-Touch Matte',
      desc: 'An ultra-premium tactile film lamination that gives brochures and business cards a suede, peach-skin luxury texture.'
    },
    'foil': {
      term: 'Metallic Foil Stamping',
      desc: 'Heat-transferred shiny foil (Gold, Rose Gold, Holographic) creating high-reflection metallic accents.'
    },
    'bleed': {
      term: 'Print Bleed (3mm)',
      desc: 'Artwork extended beyond the cut line so no white edges show after industrial guillotine trimming.'
    },
    'cmyk': {
      term: 'CMYK Color Model',
      desc: 'Cyan, Magenta, Yellow, and Key (Black) inks used in physical offset and digital production for full color reproduction.'
    }
  };

  let jargonActiveTarget = null;
  function showJargonTooltip(termKey, x, y) {
    const data = printJargonDict[termKey.toLowerCase()];
    if (!data || !jargonTooltip) return;

    if (jargonTitle) jargonTitle.textContent = data.term;
    if (jargonDesc) jargonDesc.textContent = data.desc;

    jargonTooltip.classList.remove('hidden');
    jargonTooltip.classList.add('block');

    const tooltipWidth = 280;
    let posX = x + 15;
    let posY = y + 15;
    if (posX + tooltipWidth > window.innerWidth) posX = window.innerWidth - tooltipWidth - 20;
    if (posY + 120 > window.innerHeight) posY = y - 110;

    jargonTooltip.style.left = `${Math.max(10, posX)}px`;
    jargonTooltip.style.top = `${Math.max(10, posY)}px`;
  }

  function hideJargonTooltip() {
    if (jargonTooltip) {
      jargonTooltip.classList.remove('block');
      jargonTooltip.classList.add('hidden');
    }
    jargonActiveTarget = null;
  }

  function wrapJargonTerms() {
    const targetNodes = document.querySelectorAll('main p, main li, .service-card p, .texture-card p, #about p');
    const regex = /\b(GSM|Spot UV|Velvet Matte|Bleed|CMYK)\b/gi;

    targetNodes.forEach(node => {
      if (node.closest('#accessibilityDrawer') || node.getAttribute('data-jargon-wrapped')) return;
      node.setAttribute('data-jargon-wrapped', 'true');
      node.innerHTML = node.innerHTML.replace(regex, (match) => {
        return `<span class="jargon-term" data-jargon="${match.toLowerCase()}">${match}</span>`;
      });
    });
  }

  function unwrapJargonTerms() {
    document.querySelectorAll('.jargon-term').forEach(el => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent), el);
      }
    });
    document.querySelectorAll('[data-jargon-wrapped]').forEach(el => {
      el.removeAttribute('data-jargon-wrapped');
    });
    hideJargonTooltip();
  }

  function onJargonMouseOver(e) {
    if (!currentState.motion.jargonExplainer) return;
    const termEl = e.target.closest('.jargon-term');
    if (termEl) {
      jargonActiveTarget = termEl;
      const termKey = termEl.getAttribute('data-jargon');
      const rect = termEl.getBoundingClientRect();
      showJargonTooltip(termKey, rect.left, rect.bottom);
    }
  }

  function onJargonMouseOut(e) {
    if (!currentState.motion.jargonExplainer) return;
    const termEl = e.target.closest('.jargon-term');
    if (termEl && !jargonTooltip.contains(e.relatedTarget)) {
      hideJargonTooltip();
    }
  }

  function updateJargonExplainer(enabled, save = true) {
    currentState.motion.jargonExplainer = enabled;
    if (toggleJargonExplainer) toggleJargonExplainer.checked = enabled;

    if (enabled) {
      wrapJargonTerms();
      document.addEventListener('mouseover', onJargonMouseOver);
      document.addEventListener('mouseout', onJargonMouseOut);
    } else {
      unwrapJargonTerms();
      document.removeEventListener('mouseover', onJargonMouseOver);
      document.removeEventListener('mouseout', onJargonMouseOut);
    }
    if (save) saveState();
  }

  if (toggleJargonExplainer) {
    toggleJargonExplainer.addEventListener('change', (e) => {
      updateJargonExplainer(e.target.checked);
    });
  }

  if (speakJargonBtn) {
    speakJargonBtn.addEventListener('click', () => {
      if ('speechSynthesis' in window && jargonTitle && jargonDesc) {
        window.speechSynthesis.cancel();
        const text = `${jargonTitle.textContent}. ${jargonDesc.textContent}`;
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
      }
    });
  }

  // -------------------------------------------------------------------------
  // Reset All Settings to Default
  // -------------------------------------------------------------------------
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('imagine_a11y_state');
      localStorage.removeItem('imagine_custom_theme');

      // Reset internal state
      currentState = JSON.parse(JSON.stringify(defaultState));

      // Remove all vision & motion classes
      root.classList.remove(
        'a11y-high-contrast',
        'a11y-high-contrast-light',
        'a11y-grayscale',
        'a11y-invert',
        'a11y-highlight-links',
        'a11y-big-cursor',
        'a11y-pause-animations',
        'a11y-focus-radar',
        'a11y-hitbox-magnifier',
        'a11y-filter-protanopia',
        'a11y-filter-deuteranopia',
        'a11y-filter-tritanopia',
        'a11y-filter-achromatopsia',
        'a11y-align-center',
        'a11y-align-right'
      );

      // Reset Profile Buttons
      profileBtns.forEach(btn => {
        btn.classList.remove('active', 'border-brand-lime');
        btn.classList.add('border-slate-800');
      });

      // Uncheck checkboxes
      if (toggleHighContrast) toggleHighContrast.checked = false;
      if (toggleHighContrastLight) toggleHighContrastLight.checked = false;
      if (toggleGrayscale) toggleGrayscale.checked = false;
      if (toggleInvert) toggleInvert.checked = false;
      if (toggleHighlightLinks) toggleHighlightLinks.checked = false;
      if (toggleReadingRuler) toggleReadingRuler.checked = false;
      if (toggleBigCursor) toggleBigCursor.checked = false;
      if (togglePauseAnimations) togglePauseAnimations.checked = false;
      if (toggleReadAloud) toggleReadAloud.checked = false;

      // Uncheck new features
      updateBionicReading(false, false);
      updateReadingMaskState(false, false);
      applyDaltonism('none', false);
      updateWarmShieldState(false, 25, false);
      updateFocusRadar(false, false);
      updateHitboxMagnifier(false, false);
      updateImageAltInspector(false, false);
      updateReadingRulerState(false);
      updateReadAloudState(false);
      updateVoiceCommander(false, false);
      updateJargonExplainer(false, false);
      updateHighContrastLight(false, false);
      applyTextAlignment('left', false);

      // Reset typography
      applyFontScale(100, false);
      applyHeadingFont("'Outfit', sans-serif", false);
      applyBodyFont("'Plus Jakarta Sans', sans-serif", false);
      applyLineHeight("normal", false);
      applyLetterSpacing("normal", false);

      // Reset palette
      applyPalette('signature', true);

      // Micro bounce visual feedback
      resetBtn.style.transform = 'scale(0.92)';
      setTimeout(() => { resetBtn.style.transform = ''; }, 180);
    });
  }

  // -------------------------------------------------------------------------
  // Restore State on Initial Load
  // -------------------------------------------------------------------------
  try {
    const raw = localStorage.getItem('imagine_a11y_state') || localStorage.getItem('imagine_custom_theme');
    if (raw) {
      const saved = JSON.parse(raw);
      if (saved.vars) {
        Object.entries(saved.vars).forEach(([k, v]) => {
          applyVar(k, v);
        });
      }

      if (saved.palette && studioPalettes[saved.palette]) {
        applyPalette(saved.palette, false);
      } else {
        if (saved.vars && saved.vars['--theme-accent-primary']) {
          if (pickerPrimary) pickerPrimary.value = saved.vars['--theme-accent-primary'];
          if (labelPrimary) labelPrimary.textContent = saved.vars['--theme-accent-primary'].toUpperCase();
        }
        if (saved.vars && saved.vars['--theme-accent-secondary']) {
          if (pickerSecondary) pickerSecondary.value = saved.vars['--theme-accent-secondary'];
          if (labelSecondary) labelSecondary.textContent = saved.vars['--theme-accent-secondary'].toUpperCase();
        }
        if (saved.vars && saved.vars['--theme-color-heading']) {
          if (pickerHeading) pickerHeading.value = saved.vars['--theme-color-heading'];
          if (labelHeading) labelHeading.textContent = saved.vars['--theme-color-heading'].toUpperCase();
        }
        if (saved.vars && saved.vars['--theme-color-body']) {
          if (pickerBody) pickerBody.value = saved.vars['--theme-color-body'];
          if (labelBody) labelBody.textContent = saved.vars['--theme-color-body'].toUpperCase();
        }
        if (saved.vars && saved.vars['--theme-color-card']) {
          if (pickerCard) pickerCard.value = saved.vars['--theme-color-card'];
          if (labelCard) labelCard.textContent = saved.vars['--theme-color-card'].toUpperCase();
        }
        if (saved.vars && saved.vars['--theme-border-card']) {
          if (pickerBorder) pickerBorder.value = saved.vars['--theme-border-card'].length === 7 ? saved.vars['--theme-border-card'] : '#263048';
          if (labelBorder) labelBorder.textContent = saved.vars['--theme-border-card'].toUpperCase();
        }
        sectionPickers.forEach(picker => {
          const sec = picker.getAttribute('data-section');
          const col = saved.vars && saved.vars[`--theme-bg-${sec}`];
          if (col) picker.value = col;
        });
      }

      // Restore Typography
      if (saved.typography) {
        if (saved.typography.scale) applyFontScale(saved.typography.scale, false);
        if (saved.typography.headingFont) applyHeadingFont(saved.typography.headingFont, false);
        if (saved.typography.bodyFont) applyBodyFont(saved.typography.bodyFont, false);
        if (saved.typography.lineHeight) applyLineHeight(saved.typography.lineHeight, false);
        if (saved.typography.letterSpacing) applyLetterSpacing(saved.typography.letterSpacing, false);
        if (saved.typography.alignment) applyTextAlignment(saved.typography.alignment, false);
        if (saved.typography.bionicReading) updateBionicReading(true, false);
      }

      // Restore Vision Aids
      if (saved.vision) {
        if (saved.vision.highContrast) {
          if (toggleHighContrast) toggleHighContrast.checked = true;
          root.classList.add('a11y-high-contrast');
        }
        if (saved.vision.highContrastLight) {
          updateHighContrastLight(true, false);
        }
        if (saved.vision.grayscale) {
          if (toggleGrayscale) toggleGrayscale.checked = true;
          root.classList.add('a11y-grayscale');
        }
        if (saved.vision.invert) {
          if (toggleInvert) toggleInvert.checked = true;
          root.classList.add('a11y-invert');
        }
        if (saved.vision.highlightLinks) {
          if (toggleHighlightLinks) toggleHighlightLinks.checked = true;
          root.classList.add('a11y-highlight-links');
        }
        if (saved.vision.bigCursor) {
          if (toggleBigCursor) toggleBigCursor.checked = true;
          root.classList.add('a11y-big-cursor');
        }
        if (saved.vision.readingRuler) {
          if (toggleReadingRuler) toggleReadingRuler.checked = true;
          updateReadingRulerState(true);
        }
        if (saved.vision.readingMask) {
          updateReadingMaskState(true, false);
        }
        if (saved.vision.daltonism) {
          applyDaltonism(saved.vision.daltonism, false);
        }
        if (saved.vision.warmShield) {
          updateWarmShieldState(true, saved.vision.warmShieldIntensity || 25, false);
        }
      }

      // Restore Motion & Motor Aids
      if (saved.motion) {
        if (saved.motion.pauseAnimations) {
          if (togglePauseAnimations) togglePauseAnimations.checked = true;
          root.classList.add('a11y-pause-animations');
        }
        if (saved.motion.readAloud) {
          if (toggleReadAloud) toggleReadAloud.checked = true;
          updateReadAloudState(true);
        }
        if (saved.motion.focusRadar) {
          updateFocusRadar(true, false);
        }
        if (saved.motion.hitboxMagnifier) {
          updateHitboxMagnifier(true, false);
        }
        if (saved.motion.imageAltInspector) {
          updateImageAltInspector(true, false);
        }
        if (saved.motion.voiceCommander) {
          updateVoiceCommander(true, false);
        }
        if (saved.motion.jargonExplainer) {
          updateJargonExplainer(true, false);
        }
      }

      // Restore 1-Click Profile active state
      if (saved.profile && saved.profile !== 'none') {
        currentState.profile = saved.profile;
        profileBtns.forEach(btn => {
          const match = btn.getAttribute('data-profile') === saved.profile;
          btn.classList.toggle('active', match);
          btn.classList.toggle('border-brand-lime', match);
          btn.classList.toggle('border-slate-800', !match);
        });
      }

      currentState = { ...defaultState, ...saved };
    }
  } catch(e) {}
}


