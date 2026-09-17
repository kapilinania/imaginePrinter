from pathlib import Path

category_meta = {
    'Visiting Card': ('cards', 'Visiting Cards', 'text-brand-lime', 'Luxury Corporate Cards', '450 GSM • Velvet Touch • Hot Gold Foil'),
    'Sign Board Acrylic WOrk': ('signage', '3D Acrylic & Glow Signs', 'text-yellow-400', 'Illuminated Architectural Sign', 'Cast Acrylic • Samsung IP67 Modules • CNC Extruded'),
    'Brochure': ('brochures', 'Brochures & Catalogs', 'text-brand-cyan', 'Commercial Offset Brochure', '170-350 GSM Japanese Art • Tri-Fold & Stitched'),
    'FLYER  Handbill': ('flyers', 'Flyers & Handbills', 'text-orange-400', 'Promotional Handbill', '130 GSM Gloss Coated • Fast Commercial Run'),
    'Flex Banner Hoarding Printing': ('banners', 'Flex & Hoardings', 'text-purple-400', 'Outdoor Advertising Banner', '340 GSM Reinforced PVC • Heavy Weather Eyelets'),
    'Letter Head': ('stationery', 'Executive Letterheads', 'text-emerald-400', 'Bond Stationery Letterhead', '100 GSM Royal Bond Paper • Laser Compatible'),
    'ENVELOPE': ('stationery', 'Office Envelopes', 'text-blue-400', 'Custom Branded Envelope', 'Peel & Seal Strip • Inside Security Tint'),
    'Rollup Standee': ('standees', 'Roll-Up Standees', 'text-pink-400', 'Aluminum Roll-Up Standee', 'Star Matte Anti-Curl Film • Heavy Base 6x3 ft'),
    'Sticker Print': ('stickers', 'UV DTF & Stickers', 'text-brand-magenta', 'UV DTF 3D Crystal Decals', 'Cold Transfer Varnish • Waterproof Permanent'),
    'Sunboard Cutout': ('sunboard', 'Sunboard 3D Cutouts', 'text-amber-400', 'Event Sunboard Cutout', '5mm High Density Foam • CNC Contour Router Cut'),
    'Welcome Board Sunboard': ('sunboard', 'Welcome Sunboards', 'text-teal-400', 'Luxury Welcome Board', 'High Definition UV Flatbed • Rigid Foam Display')
}

img_dir = Path('assets/images')
items = []

for folder, meta in category_meta.items():
    cat_path = img_dir / folder
    if not cat_path.exists():
        continue
    for f in sorted(cat_path.glob('*.webp')):
        slug, badge, color, def_title, def_tag = meta
        raw_stem = f.stem
        if 'Gemini' in raw_stem:
            title = f'Custom Artistic {badge}'
        elif raw_stem.lower().startswith('envelope'):
            title = f'Corporate {raw_stem.title()} Mailer'
        elif raw_stem.lower().startswith('brochure'):
            title = f'Tri-Fold {raw_stem.title()} Catalog'
        elif raw_stem.lower().startswith('flyer'):
            title = f'Commercial {raw_stem.title()} Distribution'
        elif raw_stem.lower().startswith('letterhead'):
            title = f'Executive {raw_stem.title()} Stationery'
        elif raw_stem.lower().startswith('visiting card'):
            title = f'Velvet Finish {raw_stem.title()}'
        elif raw_stem.lower().startswith('banner'):
            title = f'Heavy-Duty Frontlit {raw_stem.title()}'
        elif raw_stem.lower().startswith('billboard'):
            title = f'Highway Unipole {raw_stem.title()}'
        elif 'clipon' in raw_stem.lower():
            title = 'Ultra-Slim LED Clip-On Light Box'
        elif 'event back drop' in raw_stem.lower():
            title = 'Stage Backdrop & Exhibition Display'
        elif 'hospital' in raw_stem.lower():
            title = 'Wayfinding & Department Sign Board'
        elif 'signboard' in raw_stem.lower():
            title = f'Backlit 3D Acrylic {raw_stem.title()}'
        elif 'sticker' in raw_stem.lower():
            title = f'Waterproof {raw_stem.title()}'
        elif 'sunboard' in raw_stem.lower():
            title = f'Dimensional {raw_stem.title()}'
        else:
            clean = raw_stem.replace('-', ' ').replace('_', ' ').strip()
            title = f'{clean.title()} Display'

        items.append({
            'category': slug,
            'badge': badge,
            'color': color,
            'rel_path': f'{folder}/{f.name}',
            'title': title,
            'tag': def_tag
        })

print(f'Total items: {len(items)}')

filter_html = f'''      <!-- Category Filter Pills -->
      <div class="flex flex-wrap items-center justify-center gap-2 pt-4">
        <button class="portfolio-filter-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-brand-lime text-slate-950" data-filter="all">
          All Works ({len(items)})
        </button>
        <button class="portfolio-filter-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-lime" data-filter="cards">
          Visiting Cards (8)
        </button>
        <button class="portfolio-filter-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-lime" data-filter="signage">
          3D Acrylic & Signs (10)
        </button>
        <button class="portfolio-filter-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-lime" data-filter="brochures">
          Brochures (7)
        </button>
        <button class="portfolio-filter-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-lime" data-filter="flyers">
          Flyers & Handbills (10)
        </button>
        <button class="portfolio-filter-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-lime" data-filter="banners">
          Flex & Hoardings (6)
        </button>
        <button class="portfolio-filter-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-lime" data-filter="stationery">
          Stationery & Envelopes (12)
        </button>
        <button class="portfolio-filter-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-lime" data-filter="standees">
          Roll-Up Standees (1)
        </button>
        <button class="portfolio-filter-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-lime" data-filter="stickers">
          UV DTF & Stickers (2)
        </button>
        <button class="portfolio-filter-btn px-4 py-2 rounded-xl text-xs font-semibold transition-all bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-brand-lime" data-filter="sunboard">
          Sunboard & Welcome (5)
        </button>
      </div>

      <!-- Live Search Box & Results Counter -->
      <div class="pt-6 max-w-md mx-auto">
        <div class="relative">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input id="portfolioSearchInput" type="text" placeholder="Search works (e.g. visiting card, acrylic, gold foil, flyer)..." class="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-900/90 border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-brand-lime transition-all shadow-inner">
        </div>
        <p id="portfolioCountDisplay" class="text-center text-[11px] font-mono text-slate-400 mt-2">Showing {len(items)} of {len(items)} portfolio items</p>
      </div>'''

cards_list = []
for idx, itm in enumerate(items, 1):
    img_url = f"../assets/images/{itm['rel_path']}"
    card = f'''        <!-- Item {idx}: {itm['title']} -->
        <div class="portfolio-item group cursor-pointer relative rounded-2xl overflow-hidden dark-card reveal-on-scroll" data-category="{itm['category']}" data-img="{img_url}" data-title="{itm['title']}" data-tag="{itm['tag']}">
          <div class="img-loader-box aspect-[4/3] bg-slate-950">
            <div class="img-logo-placeholder">
              <div class="placeholder-logo-badge">
                <img src="../assets/logo/Imagine Logo.png" alt="Imagine Printers" class="placeholder-logo-img">
              </div>
              <span class="placeholder-text"><span class="placeholder-dot"></span> Imagine Craft</span>
            </div>
            <img src="{img_url}" alt="{itm['title']}" class="imagine-lazy-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">
          </div>
          <div class="p-4 bg-[#0E1322] border-t border-white/5 flex items-center justify-between">
            <div class="min-w-0 pr-2">
              <span class="text-[10px] font-mono font-bold {itm['color']} uppercase">{itm['badge']}</span>
              <h4 class="text-sm font-bold text-white group-hover:text-brand-lime transition-colors truncate">{itm['title']}</h4>
              <p class="text-[11px] text-slate-400 truncate mt-0.5">{itm['tag']}</p>
            </div>
            <div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-brand-lime group-hover:text-black transition-colors flex-shrink-0">
              <i class="fa-solid fa-expand text-xs"></i>
            </div>
          </div>
        </div>'''
    cards_list.append(card)

grid_html = '''  <!-- Portfolio Gallery Grid (Dark Theme) -->
  <section class="py-12 section-dark">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
''' + '\n\n'.join(cards_list) + '''
      </div>
    </div>
  </section>'''

lightbox_html = f'''  <!-- Full-Screen Lightbox Modal -->
  <div id="portfolioLightbox" class="fixed inset-0 z-50 hidden items-center justify-center p-3 sm:p-6 modal-backdrop">
    <div class="relative max-w-5xl w-full bg-[#0E1322] rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col">
      
      <!-- Close Button -->
      <button id="closeLightbox" class="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/80 text-white hover:bg-brand-lime hover:text-black flex items-center justify-center text-lg transition-all shadow-lg" aria-label="Close modal">
        <i class="fa-solid fa-xmark"></i>
      </button>

      <!-- Prev / Next Floating Navigation Buttons -->
      <button id="lightboxPrev" class="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/80 text-white hover:bg-brand-lime hover:text-black flex items-center justify-center text-base transition-all shadow-lg" aria-label="Previous image">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button id="lightboxNext" class="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/80 text-white hover:bg-brand-lime hover:text-black flex items-center justify-center text-base transition-all shadow-lg" aria-label="Next image">
        <i class="fa-solid fa-chevron-right"></i>
      </button>

      <!-- Full-Resolution Image Area with Centered Imagine Logo Loader -->
      <div class="relative h-[65vh] sm:h-[72vh] bg-black/95 flex items-center justify-center overflow-hidden">
        <div id="lightboxLoader" class="lightbox-loader-wrap">
          <div class="p-3 bg-white/10 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md">
            <img src="../assets/logo/Imagine Logo.png" alt="Imagine Printers" class="h-10 w-auto object-contain animate-pulse">
          </div>
          <span class="text-xs font-mono text-slate-400 mt-3 uppercase tracking-wider flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-lime animate-ping"></span> Loading High-Res Output...
          </span>
        </div>
        <img id="lightboxImage" src="" alt="Portfolio Full Preview" class="max-h-[65vh] sm:max-h-[72vh] w-auto max-w-full object-contain transition-opacity duration-300">
      </div>

      <!-- Details Footer Bar with Direct WhatsApp Action -->
      <div class="p-4 sm:p-6 bg-[#0E1322] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="min-w-0">
          <div class="flex items-center gap-3">
            <span id="lightboxTag" class="text-xs font-mono text-brand-lime font-bold uppercase truncate">Imagine Atelier</span>
            <span class="text-slate-600">•</span>
            <span id="lightboxCounter" class="text-xs font-mono text-slate-400 flex-shrink-0">1 / {len(items)}</span>
          </div>
          <h3 id="lightboxTitle" class="text-base sm:text-lg font-bold font-heading text-white mt-1 truncate">Project Inspection</h3>
        </div>
        <button onclick="
          const title = document.getElementById('lightboxTitle').textContent;
          openWhatsAppQuote(`Portfolio Work Sample: ${title}`);
        " class="px-5 py-2.5 rounded-xl bg-brand-lime text-slate-950 font-heading font-black text-xs hover:bg-brand-limeHover transition-all flex items-center justify-center gap-2 flex-shrink-0 shadow-lg shadow-brand-lime/20">
          <i class="fa-brands fa-whatsapp text-sm"></i>
          <span>Order Similar Output</span>
        </button>
      </div>

    </div>
  </div>'''

p_path = Path('portfolio/index.html')
content = p_path.read_text(encoding='utf-8')

pattern_top = '<!-- Category Filter Pills -->'
pattern_marquee = '<!-- =========================================================================\n       REAL GOOGLE REVIEWS INFINITE MARQUEE SLIDER'

idx_top = content.find(pattern_top)
idx_marquee = content.find(pattern_marquee)

if idx_top != -1 and idx_marquee != -1:
    content = content[:idx_top] + filter_html + '\n    </div>\n  </section>\n\n' + grid_html + '\n\n  ' + content[idx_marquee:]

lb_start = content.find('<!-- Full-Screen Lightbox Modal -->')
lb_end = content.find('<!-- =========================================================================\n       URGENT INQUIRY / CONSULTATION BANNER')

if lb_start != -1 and lb_end != -1:
    content = content[:lb_start] + lightbox_html + '\n\n  ' + content[lb_end:]

p_path.write_text(content, encoding='utf-8')
print('portfolio/index.html updated successfully!')