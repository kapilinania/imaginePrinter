from pathlib import Path
import re

# =========================================================================
# 1. Update index.html
# =========================================================================
index_path = Path("index.html")
content = index_path.read_text(encoding="utf-8")

# A. Insert Early Brand Image Loader Script in <head>
early_loader_script = '''  <!-- Universal Instant Brand Image Loader & Fail-Safe Fallback -->
  <script>
    window.onImagineImgLoaded = function(img) {
      if (!img) return;
      img.classList.add("is-loaded");
      var parent = img.closest(".img-loader-box") || img.parentElement;
      if (parent) {
        var placeholder = parent.querySelector(".img-logo-placeholder");
        if (placeholder) {
          placeholder.classList.add("is-hidden");
        }
      }
    };

    window.onImagineImgError = function(img) {
      if (!img) return;
      // 1. Try PNG fallback first if WebP failed
      if (img.src && img.src.includes(".webp") && !img.dataset.pngTried) {
        img.dataset.pngTried = "true";
        img.src = img.src.replace(/\\.webp(\\?.*)?$/, ".png$1");
        return;
      }
      // 2. Fallback to Imagine Printers Brand Logo by default
      img.onerror = null;
      var isSub = window.location.pathname.includes("/portfolio/") ||
                  window.location.pathname.includes("/services/") ||
                  window.location.pathname.includes("/about/") ||
                  window.location.pathname.includes("/contact/");
      img.src = isSub ? "../assets/logo/Imagine%20Logo.png" : "assets/logo/Imagine%20Logo.png";
      img.classList.add("is-loaded", "is-fallback-logo");
      var parent = img.closest(".img-loader-box") || img.parentElement;
      if (parent) {
        var placeholder = parent.querySelector(".img-logo-placeholder");
        if (placeholder) {
          placeholder.classList.add("is-hidden");
        }
      }
    };
  </script>
</head>'''

if "window.onImagineImgLoaded = function" not in content[:3000]:
    content = content.replace("</head>", early_loader_script, 1)

# B. Build the 6 Hero Slides with clean <picture> tags, %20 encoded paths, and prominent logo placeholders
hero_slides_markup = '''            <!-- Main Interactive Slide Viewport -->
            <div class="hero-slider-viewport relative">
              
              <!-- Slide 1: Luxury Cards & Foil -->
              <div class="hero-slide active img-loader-box" data-index="0">
                <div class="img-logo-placeholder">
                  <div class="placeholder-logo-badge">
                    <img src="assets/logo/Imagine%20Logo.png" alt="Imagine Printers" class="placeholder-logo-img">
                  </div>
                  <span class="placeholder-text"><span class="placeholder-dot"></span> IMAGINE ATELIER PRODUCTION</span>
                </div>
                <picture>
                  <source srcset="assets/images/Visiting%20Card/Visiting%20Card%20-%201.webp" type="image/webp">
                  <img src="assets/images/Visiting%20Card/Visiting%20Card%20-%201.png" alt="Velvet Visiting Cards with Raised Gold Foil" class="hero-slide-img imagine-lazy-img" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">
                </picture>
                <div class="hero-slide-overlay z-10"></div>
                <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                  <div class="space-y-1">
                    <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-lime text-slate-950 uppercase">
                      ROYAL FOIL FINISH
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold font-heading text-white">
                      Velvet Cards & Raised Foil
                    </h3>
                    <p class="text-xs text-slate-300 font-mono">
                      450 GSM • Thermal Gold Foil • Velvet Matte Touch
                    </p>
                  </div>
                  <button onclick="openWhatsAppQuote('Hero Slider: Velvet Gold Foil Cards')" class="w-11 h-11 rounded-2xl bg-brand-lime text-slate-950 flex items-center justify-center text-lg hover:bg-brand-limeHover transition-all flex-shrink-0 shadow-lg hover:scale-110 ml-2" title="Order Velvet Cards">
                    <i class="fa-brands fa-whatsapp"></i>
                  </button>
                </div>
              </div>

              <!-- Slide 2: Glow Sign & 3D Acrylic -->
              <div class="hero-slide img-loader-box" data-index="1">
                <div class="img-logo-placeholder">
                  <div class="placeholder-logo-badge">
                    <img src="assets/logo/Imagine%20Logo.png" alt="Imagine Printers" class="placeholder-logo-img">
                  </div>
                  <span class="placeholder-text"><span class="placeholder-dot"></span> IMAGINE ATELIER PRODUCTION</span>
                </div>
                <picture>
                  <source srcset="assets/images/Sign%20Board%20Acrylic%20WOrk/Signboard%20-%201.webp" type="image/webp">
                  <img src="assets/images/Sign%20Board%20Acrylic%20WOrk/Signboard%20-%201.png" alt="Backlit 3D Acrylic Glow Signboard" class="hero-slide-img imagine-lazy-img" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">
                </picture>
                <div class="hero-slide-overlay z-10"></div>
                <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                  <div class="space-y-1">
                    <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-cyan text-slate-950 uppercase">
                      ARCHITECTURAL SIGNAGE
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold font-heading text-white">
                      3D Illuminated Glow Signs
                    </h3>
                    <p class="text-xs text-slate-300 font-mono">
                      Cast Acrylic • Samsung IP67 Modules • CNC Extrusion
                    </p>
                  </div>
                  <button onclick="openWhatsAppQuote('Hero Slider: 3D Acrylic Glow Signs')" class="w-11 h-11 rounded-2xl bg-brand-lime text-slate-950 flex items-center justify-center text-lg hover:bg-brand-limeHover transition-all flex-shrink-0 shadow-lg hover:scale-110 ml-2" title="Order Glow Sign">
                    <i class="fa-brands fa-whatsapp"></i>
                  </button>
                </div>
              </div>

              <!-- Slide 3: UV DTF 3D Crystal Stickers -->
              <div class="hero-slide img-loader-box" data-index="2">
                <div class="img-logo-placeholder">
                  <div class="placeholder-logo-badge">
                    <img src="assets/logo/Imagine%20Logo.png" alt="Imagine Printers" class="placeholder-logo-img">
                  </div>
                  <span class="placeholder-text"><span class="placeholder-dot"></span> IMAGINE ATELIER PRODUCTION</span>
                </div>
                <picture>
                  <source srcset="assets/images/Sticker%20Print/Sticker%20Print.webp" type="image/webp">
                  <img src="assets/images/Sticker%20Print/Sticker%20Print.png" alt="UV DTF Cold Transfer 3D Crystal Stickers" class="hero-slide-img imagine-lazy-img" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">
                </picture>
                <div class="hero-slide-overlay z-10"></div>
                <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                  <div class="space-y-1">
                    <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-brand-magenta text-white uppercase">
                      COLD-TRANSFER TECH
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold font-heading text-white">
                      UV DTF 3D Crystal Stickers
                    </h3>
                    <p class="text-xs text-slate-300 font-mono">
                      No Heat Required • 3D Embossed Varnish • Waterproof
                    </p>
                  </div>
                  <button onclick="openWhatsAppQuote('Hero Slider: UV DTF 3D Stickers')" class="w-11 h-11 rounded-2xl bg-brand-lime text-slate-950 flex items-center justify-center text-lg hover:bg-brand-limeHover transition-all flex-shrink-0 shadow-lg hover:scale-110 ml-2" title="Order UV DTF Stickers">
                    <i class="fa-brands fa-whatsapp"></i>
                  </button>
                </div>
              </div>

              <!-- Slide 4: Flex Banners & Highway Hoardings -->
              <div class="hero-slide img-loader-box" data-index="3">
                <div class="img-logo-placeholder">
                  <div class="placeholder-logo-badge">
                    <img src="assets/logo/Imagine%20Logo.png" alt="Imagine Printers" class="placeholder-logo-img">
                  </div>
                  <span class="placeholder-text"><span class="placeholder-dot"></span> IMAGINE ATELIER PRODUCTION</span>
                </div>
                <picture>
                  <source srcset="assets/images/Flex%20Banner%20Hoarding%20Printing/Banner%20-1.webp" type="image/webp">
                  <img src="assets/images/Flex%20Banner%20Hoarding%20Printing/Banner%20-1.png" alt="Flex Banners & Hoarding Printing" class="hero-slide-img imagine-lazy-img" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">
                </picture>
                <div class="hero-slide-overlay z-10"></div>
                <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                  <div class="space-y-1">
                    <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-yellow-400 text-slate-950 uppercase">
                      HEAVY-DUTY OUTDOOR
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold font-heading text-white">
                      Flex Banners & Hoardings
                    </h3>
                    <p class="text-xs text-slate-300 font-mono">
                      340 GSM Reinforced PVC • Weatherproof Eyelets • Vivid CMYK
                    </p>
                  </div>
                  <button onclick="openWhatsAppQuote('Hero Slider: Flex Banners & Hoardings')" class="w-11 h-11 rounded-2xl bg-brand-lime text-slate-950 flex items-center justify-center text-lg hover:bg-brand-limeHover transition-all flex-shrink-0 shadow-lg hover:scale-110 ml-2" title="Order Flex Banners">
                    <i class="fa-brands fa-whatsapp"></i>
                  </button>
                </div>
              </div>

              <!-- Slide 5: Brochures & Catalogs -->
              <div class="hero-slide img-loader-box" data-index="4">
                <div class="img-logo-placeholder">
                  <div class="placeholder-logo-badge">
                    <img src="assets/logo/Imagine%20Logo.png" alt="Imagine Printers" class="placeholder-logo-img">
                  </div>
                  <span class="placeholder-text"><span class="placeholder-dot"></span> IMAGINE ATELIER PRODUCTION</span>
                </div>
                <picture>
                  <source srcset="assets/images/Brochure/Brochure%20-%201.webp" type="image/webp">
                  <img src="assets/images/Brochure/Brochure%20-%201.png" alt="High Quality Commercial Brochures & Catalogs" class="hero-slide-img imagine-lazy-img" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">
                </picture>
                <div class="hero-slide-overlay z-10"></div>
                <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                  <div class="space-y-1">
                    <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-400 text-slate-950 uppercase">
                      COMMERCIAL OFFSET
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold font-heading text-white">
                      Tri-Fold Brochures & Catalogs
                    </h3>
                    <p class="text-xs text-slate-300 font-mono">
                      170-300 GSM Art Gloss / Matte • Spot UV • Precision Fold
                    </p>
                  </div>
                  <button onclick="openWhatsAppQuote('Hero Slider: Brochures & Catalogs')" class="w-11 h-11 rounded-2xl bg-brand-lime text-slate-950 flex items-center justify-center text-lg hover:bg-brand-limeHover transition-all flex-shrink-0 shadow-lg hover:scale-110 ml-2" title="Order Brochures">
                    <i class="fa-brands fa-whatsapp"></i>
                  </button>
                </div>
              </div>

              <!-- Slide 6: Roll-Up Standees & Displays -->
              <div class="hero-slide img-loader-box" data-index="5">
                <div class="img-logo-placeholder">
                  <div class="placeholder-logo-badge">
                    <img src="assets/logo/Imagine%20Logo.png" alt="Imagine Printers" class="placeholder-logo-img">
                  </div>
                  <span class="placeholder-text"><span class="placeholder-dot"></span> IMAGINE ATELIER PRODUCTION</span>
                </div>
                <picture>
                  <source srcset="assets/images/Rollup%20Standee/Rollup%20Standee%20-%202.webp" type="image/webp">
                  <img src="assets/images/Rollup%20Standee/Rollup%20Standee%20-%202.png" alt="Roll-up Standee Exhibition Display" class="hero-slide-img imagine-lazy-img" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">
                </picture>
                <div class="hero-slide-overlay z-10"></div>
                <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                  <div class="space-y-1">
                    <span class="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-teal-400 text-slate-950 uppercase">
                      EXHIBITIONS & EVENTS
                    </span>
                    <h3 class="text-lg sm:text-xl font-bold font-heading text-white">
                      Roll-Up Standees & Displays
                    </h3>
                    <p class="text-xs text-slate-300 font-mono">
                      Star Matte Anti-Curl Media • Anodized Aluminum Base • Padded Bag
                    </p>
                  </div>
                  <button onclick="openWhatsAppQuote('Hero Slider: Roll-up Standee')" class="w-11 h-11 rounded-2xl bg-brand-lime text-slate-950 flex items-center justify-center text-lg hover:bg-brand-limeHover transition-all flex-shrink-0 shadow-lg hover:scale-110 ml-2" title="Order Roll-Up Standee">
                    <i class="fa-brands fa-whatsapp"></i>
                  </button>
                </div>
              </div>

              <!-- Interactive Floating Navigation Arrows -->
              <button id="heroSlidePrev" class="hero-slider-nav-btn absolute left-3 top-1/2 -translate-y-1/2" aria-label="Previous Slide">
                <i class="fa-solid fa-chevron-left text-sm"></i>
              </button>
              <button id="heroSlideNext" class="hero-slider-nav-btn absolute right-3 top-1/2 -translate-y-1/2" aria-label="Next Slide">
                <i class="fa-solid fa-chevron-right text-sm"></i>
              </button>

            </div>'''

# Replace from '<!-- Main Interactive Slide Viewport -->' to '<div class="pt-3.5 space-y-2.5">'
viewport_start = content.find('<!-- Main Interactive Slide Viewport -->')
viewport_end = content.find('<!-- Bottom Navigation: Compact Slide Dots + Responsive 6-Item Quick Selector Grid -->')

if viewport_start != -1 and viewport_end != -1:
    content = content[:viewport_start] + hero_slides_markup + '\n\n            ' + content[viewport_end:]
    print("Hero viewport replaced successfully!")
else:
    print("Error: Could not find viewport markers in index.html")

# Update thumbnail buttons to match
thumb_start = content.find('<div id="heroThumbStrip"')
thumb_end = content.find('</div>\n            </div>\n\n          </div>\n\n        </div>')

new_thumbs = '''<div id="heroThumbStrip" class="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                <button class="hero-thumb-btn active" data-index="0" title="Visiting Cards">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-lime flex-shrink-0"></span>
                  <span class="thumb-title truncate">Cards</span>
                </button>
                <button class="hero-thumb-btn" data-index="1" title="3D Glow Signs">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-cyan flex-shrink-0"></span>
                  <span class="thumb-title truncate">Signage</span>
                </button>
                <button class="hero-thumb-btn" data-index="2" title="UV DTF Stickers">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-magenta flex-shrink-0"></span>
                  <span class="thumb-title truncate">UV DTF</span>
                </button>
                <button class="hero-thumb-btn" data-index="3" title="Flex Banners">
                  <span class="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0"></span>
                  <span class="thumb-title truncate">Banners</span>
                </button>
                <button class="hero-thumb-btn" data-index="4" title="Brochures & Catalogs">
                  <span class="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"></span>
                  <span class="thumb-title truncate">Brochure</span>
                </button>
                <button class="hero-thumb-btn" data-index="5" title="Roll-Up Standees">
                  <span class="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0"></span>
                  <span class="thumb-title truncate">Standees</span>
                </button>
              </div>'''

if thumb_start != -1 and thumb_end != -1:
    content = content[:thumb_start] + new_thumbs + content[thumb_end:]
    print("Hero thumbs replaced successfully!")

# Ensure all raw spaces in img src / logo src across index.html are URL encoded to %20
def encode_src_spaces(match):
    full = match.group(0)
    prefix = match.group(1)
    val = match.group(2)
    suffix = match.group(3)
    encoded_val = val.replace(" ", "%20")
    return f'{prefix}"{encoded_val}"{suffix}'

content = re.sub(r'(src=)["\']([^"\']+)["\'](\s|>|/)', encode_src_spaces, content)

index_path.write_text(content, encoding="utf-8")
print("index.html fully updated!")