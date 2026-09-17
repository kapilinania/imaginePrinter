from pathlib import Path
import re

# 1. Update about/index.html
about_path = Path("about/index.html")
about_content = about_path.read_text(encoding="utf-8")

about_map = {
    "temp_3.jpg": ("FLYER  Handbill/Flyer - 1.webp", "Commercial Offset Press"),
    "temp_10.jpg": ("Sign Board Acrylic WOrk/Untitled design (11).webp", "Industrial UV Flatbed Printers"),
    "temp_13.jpg": ("Sticker Print/Sticker Print.webp", "UV DTF Crystal Transfer Units"),
    "temp_14.jpg": ("Sunboard Cutout/EVENT Sunboard CUTOUT.webp", "CNC Laser & Router Systems"),
    "temp_6.jpg": ("Flex Banner Hoarding Printing/Banner - 2.webp", "Roland Eco-Solvent Large Format"),
    "temp_35.jpg": ("Sign Board Acrylic WOrk/Event Back Drop.webp", "AI Video & Media Production")
}

for temp_file, (real_img, title) in about_map.items():
    old_box = re.compile(
        r'<div class="aspect-\[16/10\] rounded-xl overflow-hidden bg-slate-100 mb-2">\s*'
        r'<img src="\.\./assets/images/' + re.escape(temp_file) + r'"[^>]*>\s*'
        r'</div>'
    )
    new_box = (
        '<div class="aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 mb-2 img-loader-box">\n'
        '            <div class="img-logo-placeholder">\n'
        '              <div class="placeholder-logo-badge">\n'
        '                <img src="../assets/logo/Imagine Logo.png" alt="Imagine Printers" class="placeholder-logo-img">\n'
        '              </div>\n'
        '              <span class="placeholder-text"><span class="placeholder-dot"></span> Atelier Tech</span>\n'
        '            </div>\n'
        '            <img src="../assets/images/' + real_img + '" alt="' + title + '" class="imagine-lazy-img w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">\n'
        '          </div>'
    )
    about_content, c = old_box.subn(new_box, about_content)
    print(f"About: {temp_file} -> {real_img} (replaced {c})")

about_path.write_text(about_content, encoding="utf-8")
print("about/index.html updated successfully!")


# 2. Update index.html
index_path = Path("index.html")
index_content = index_path.read_text(encoding="utf-8")

# Hero slides
hero_slides = [
    ("temp_1.jpg", "Visiting Card/Visiting Card - 1.webp", "Velvet Visiting Cards with Raised Gold Foil"),
    ("temp_4.jpg", "Sign Board Acrylic WOrk/Signboard - 1.webp", "Backlit 3D Acrylic Glow Signboard"),
    ("temp_12.jpg", "Sticker Print/Sticker Print.webp", "UV DTF Cold Transfer 3D Crystal Stickers"),
    ("temp_16.jpg", "Rollup Standee/Rollup Standee - 2.webp", "Roll-up Standee & Flex Banner Exhibition"),
    ("temp_2.jpg", "Brochure/Brochure - 1.webp", "High Quality Commercial Brochures & Catalogs"),
    ("temp_38.jpg", "Welcome Board Sunboard/Sunboard - 1.webp", "Welcome Board & Dimensional Sunboards")
]

for temp_img, real_img, alt_txt in hero_slides:
    old_slide_img = re.compile(
        r'<img src="assets/images/' + re.escape(temp_img) + r'" alt="' + re.escape(alt_txt) + r'" class="hero-slide-img">'
    )
    new_slide_img = (
        '<div class="img-logo-placeholder">\n'
        '                  <div class="placeholder-logo-badge">\n'
        '                    <img src="assets/logo/Imagine Logo.png" alt="Imagine Printers" class="placeholder-logo-img">\n'
        '                  </div>\n'
        '                  <span class="placeholder-text"><span class="placeholder-dot"></span> Loading Visual</span>\n'
        '                </div>\n'
        '                <img src="assets/images/' + real_img + '" alt="' + alt_txt + '" class="hero-slide-img imagine-lazy-img" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">'
    )
    index_content, c = old_slide_img.subn(new_slide_img, index_content)
    print(f"Hero Slide: {temp_img} -> {real_img} (replaced {c})")

# Ensure hero slides have img-loader-box
index_content = index_content.replace('<div class="hero-slide active"', '<div class="hero-slide active img-loader-box"')
index_content = index_content.replace('<div class="hero-slide"', '<div class="hero-slide img-loader-box"')
# Make sure overlay & slide text sit above the placeholder
index_content = index_content.replace('<div class="hero-slide-overlay">', '<div class="hero-slide-overlay z-10">')
index_content = index_content.replace('z-10">\n                  <div class="space-y-1">', 'z-20">\n                  <div class="space-y-1">')

# Material Mastery Finish Cards (4)
finish_map = [
    ("temp_2.jpg", "Visiting Card/Visiting Card - 2.webp", "Velvet Soft-Touch and Gold Foil"),
    ("temp_5.jpg", "Brochure/Brochure - 2.webp", "Raised Spot UV Finishing"),
    ("temp_13.jpg", "Sticker Print/Sticker printing ].webp", "UV DTF Crystal Cold Transfer"),
    ("temp_8.jpg", "Sign Board Acrylic WOrk/Signboard - 2.webp", "3D Acrylic & LED Signage")
]

for temp_img, real_img, alt_txt in finish_map:
    old_finish = re.compile(
        r'<div class="aspect-\[4/3\] overflow-hidden bg-slate-100">\s*'
        r'<img src="assets/images/' + re.escape(temp_img) + r'" alt="' + re.escape(alt_txt) + r'"[^>]*>\s*'
        r'</div>'
    )
    new_finish = (
        '<div class="aspect-[4/3] overflow-hidden bg-slate-950 img-loader-box">\n'
        '            <div class="img-logo-placeholder">\n'
        '              <div class="placeholder-logo-badge">\n'
        '                <img src="assets/logo/Imagine Logo.png" alt="Imagine Printers" class="placeholder-logo-img">\n'
        '              </div>\n'
        '              <span class="placeholder-text"><span class="placeholder-dot"></span> Tactile Craft</span>\n'
        '            </div>\n'
        '            <img src="assets/images/' + real_img + '" alt="' + alt_txt + '" class="imagine-lazy-img w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">\n'
        '          </div>'
    )
    index_content, c = old_finish.subn(new_finish, index_content)
    print(f"Material Finish: {temp_img} -> {real_img} (replaced {c})")

# Core Printing Services (6)
services_map = [
    ("temp_1.jpg", "Visiting Card/Visiting Card - 4.webp", "Visiting Cards"),
    ("temp_7.jpg", "Brochure/Brochure - 3.webp", "Brochures & Pamphlets"),
    ("temp_4.jpg", "Sign Board Acrylic WOrk/Untitled design (12).webp", "Glow Sign Board"),
    ("temp_12.jpg", "Sticker Print/Sticker Print.webp", "UV DTF STICKER"),
    ("temp_16.jpg", "Rollup Standee/Rollup Standee - 2.webp", "Roll-up Standee"),
    ("temp_38.jpg", "Welcome Board Sunboard/Gemini_Generated_Image_ddptrqddptrqddpt.webp", "Coffee MUG")
]

for temp_img, real_img, alt_txt in services_map:
    old_svc = re.compile(
        r'<div class="aspect-\[16/10\] overflow-hidden bg-slate-950">\s*'
        r'<img src="assets/images/' + re.escape(temp_img) + r'" alt="' + re.escape(alt_txt) + r'"[^>]*>\s*'
        r'</div>'
    )
    new_svc = (
        '<div class="aspect-[16/10] overflow-hidden bg-slate-950 img-loader-box">\n'
        '              <div class="img-logo-placeholder">\n'
        '                <div class="placeholder-logo-badge">\n'
        '                  <img src="assets/logo/Imagine Logo.png" alt="Imagine Printers" class="placeholder-logo-img">\n'
        '                </div>\n'
        '                <span class="placeholder-text"><span class="placeholder-dot"></span> Core Service</span>\n'
        '              </div>\n'
        '              <img src="assets/images/' + real_img + '" alt="' + alt_txt + '" class="imagine-lazy-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">\n'
        '            </div>'
    )
    index_content, c = old_svc.subn(new_svc, index_content)
    print(f"Core Service: {temp_img} -> {real_img} (replaced {c})")

# Machinery & Production (4)
machinery_map = [
    ("temp_3.jpg", "FLYER  Handbill/Flyer - 1.webp", "Offset Printing Press"),
    ("temp_6.jpg", "Flex Banner Hoarding Printing/Banner - 2.webp", "Roland Wide Format"),
    ("temp_10.jpg", "Sign Board Acrylic WOrk/Untitled design (11).webp", "UV Flatbed Printing"),
    ("temp_14.jpg", "Sunboard Cutout/EVENT Sunboard CUTOUT.webp", "CNC Laser Cutting")
]

for temp_img, real_img, alt_txt in machinery_map:
    old_mach = re.compile(
        r'<div class="aspect-square rounded-xl overflow-hidden bg-slate-100">\s*'
        r'<img src="assets/images/' + re.escape(temp_img) + r'" alt="' + re.escape(alt_txt) + r'"[^>]*>\s*'
        r'</div>'
    )
    new_mach = (
        '<div class="aspect-square rounded-xl overflow-hidden bg-slate-950 img-loader-box">\n'
        '              <div class="img-logo-placeholder">\n'
        '                <div class="placeholder-logo-badge">\n'
        '                  <img src="assets/logo/Imagine Logo.png" alt="Imagine Printers" class="placeholder-logo-img">\n'
        '                </div>\n'
        '                <span class="placeholder-text"><span class="placeholder-dot"></span> Facility Press</span>\n'
        '              </div>\n'
        '              <img src="assets/images/' + real_img + '" alt="' + alt_txt + '" class="imagine-lazy-img w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">\n'
        '            </div>'
    )
    index_content, c = old_mach.subn(new_mach, index_content)
    print(f"Machinery: {temp_img} -> {real_img} (replaced {c})")

# Recent Work (4)
recent_map = [
    ("temp_18.jpg", "Letter Head/letterhead - 1.webp", "Corporate Stationery"),
    ("temp_22.jpg", "Sign Board Acrylic WOrk/Signboard - 3.webp", "Storefront Signage"),
    ("temp_26.jpg", "Sticker Print/Sticker printing ].webp", "Custom Stickers"),
    ("temp_32.jpg", "Flex Banner Hoarding Printing/Billboard - 2.webp", "Merchandise & Cups")
]

for temp_img, real_img, alt_txt in recent_map:
    old_rec = re.compile(
        r'<a href="portfolio/" class="group relative rounded-2xl overflow-hidden aspect-square bg-slate-900 border border-white/10">\s*'
        r'<img src="assets/images/' + re.escape(temp_img) + r'" alt="' + re.escape(alt_txt) + r'"[^>]*>\s*'
        r'<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">\s*'
        r'(<span[^>]*>[^<]*</span>)\s*'
        r'</div>\s*'
        r'</a>'
    )
    new_rec = (
        '<a href="portfolio/" class="group relative rounded-2xl overflow-hidden aspect-square bg-slate-900 border border-white/10 img-loader-box">\n'
        '          <div class="img-logo-placeholder">\n'
        '            <div class="placeholder-logo-badge">\n'
        '              <img src="assets/logo/Imagine Logo.png" alt="Imagine Printers" class="placeholder-logo-img">\n'
        '            </div>\n'
        '            <span class="placeholder-text"><span class="placeholder-dot"></span> Dispatched Output</span>\n'
        '          </div>\n'
        '          <img src="assets/images/' + real_img + '" alt="' + alt_txt + '" class="imagine-lazy-img w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">\n'
        '          <div class="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">\n'
        '            \\1\n'
        '          </div>\n'
        '        </a>'
    )
    index_content, c = old_rec.subn(new_rec, index_content)
    print(f"Recent: {temp_img} -> {real_img} (replaced {c})")

index_path.write_text(index_content, encoding="utf-8")
print("index.html updated successfully!")