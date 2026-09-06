/**
 * IMAGINE PRINTERS - High-Performance Interaction Engine
 * Hero Showcase & Finish Toggles, Pincode Checker, Live Clock, Calculator, Filters, Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
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


