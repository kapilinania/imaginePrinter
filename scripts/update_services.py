from pathlib import Path
import re

services_img_map = {
    "temp_7.jpg": ("Brochure/Brochure - 1.webp", "Brochure Printing"),
    "temp_1.jpg": ("Visiting Card/Visiting Card - 1.webp", "Visiting Cards"),
    "temp_9.jpg": ("FLYER  Handbill/Flyer - 1.webp", "Pamphlets & Flyers"),
    "temp_11.jpg": ("Letter Head/letterhead - 1.webp", "Bill Books"),
    "temp_15.jpg": ("Letter Head/letterhead - 2.webp", "Letterheads"),
    "temp_17.jpg": ("Visiting Card/Visiting Card - 3.webp", "ID Cards"),
    "temp_19.jpg": ("Sticker Print/Sticker printing ].webp", "Stickers & Labels"),
    "temp_21.jpg": ("ENVELOPE/Envelope - 1.webp", "Envelopes"),
    "temp_4.jpg": ("Sign Board Acrylic WOrk/Signboard - 1.webp", "Glow Sign Board"),
    "temp_8.jpg": ("Sign Board Acrylic WOrk/Signboard - 2.webp", "Acrylic Work"),
    "temp_10.jpg": ("Sign Board Acrylic WOrk/Untitled design (11).webp", "UV Printing"),
    "temp_14.jpg": ("Sign Board Acrylic WOrk/Hospital Board.webp", "Signages"),
    "temp_23.jpg": ("Sunboard Cutout/EVENT Sunboard CUTOUT.webp", "Sunboard Sheets"),
    "temp_16.jpg": ("Rollup Standee/Rollup Standee - 2.webp", "Roll-up Standee"),
    "temp_24.jpg": ("Flex Banner Hoarding Printing/Banner -1.webp", "Flex Banner"),
    "temp_27.jpg": ("Flex Banner Hoarding Printing/Billboard - 1.webp", "Vinyl Graphics"),
    "temp_12.jpg": ("Sticker Print/Sticker Print.webp", "UV DTF STICKER"),
    "temp_20.jpg": ("Visiting Card/Visiting Card - 5.webp", "Coffee MUG & Gifting"),
    "temp_28.jpg": ("Brochure/Brochure - 6.webp", "TENT CARD"),
    "temp_35.jpg": ("Sign Board Acrylic WOrk/Event Back Drop.webp", "Video Editing Backdrop"),
    "temp_40.jpg": ("Welcome Board Sunboard/Gemini_Generated_Image_y7smm3y7smm3y7sm.webp", "AI Video & Creative Visuals")
}

services_path = Path("services/index.html")
content = services_path.read_text(encoding="utf-8")

for temp_name, (rel_img, alt_text) in services_img_map.items():
    # Replace the img tag and its container
    old_snippet_pattern = re.compile(
        r'<div class="aspect-\[16/10\] overflow-hidden bg-slate-950 relative(?: img-loader-box)?">\s*'
        r'<img src="(?:\.\./)?assets/images/' + re.escape(temp_name) + r'"[^>]*>\s*'
        r'(<span class="absolute top-3 left-3[^"]*">[^<]*</span>)\s*'
        r'</div>',
        re.MULTILINE
    )

    replacement = (
        '<div class="aspect-[16/10] overflow-hidden bg-slate-950 relative img-loader-box">\n'
        '              <div class="img-logo-placeholder">\n'
        '                <div class="placeholder-logo-badge">\n'
        '                  <img src="../assets/logo/Imagine Logo.png" alt="Imagine Printers" class="placeholder-logo-img">\n'
        '                </div>\n'
        '                <span class="placeholder-text"><span class="placeholder-dot"></span> Imagine Craft</span>\n'
        '              </div>\n'
        '              <img src="../assets/images/' + rel_img + '" alt="' + alt_text + '" class="imagine-lazy-img w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" onload="onImagineImgLoaded(this)" onerror="onImagineImgError(this)">\n'
        '              \\1\n'
        '            </div>'
    )

    # If span has z-index needed, replace it in the replacement
    new_content, count = old_snippet_pattern.subn(replacement, content)
    if count > 0:
        content = new_content
        print(f"Replaced {temp_name} -> {rel_img}")
    else:
        print(f"Warning: pattern not found for {temp_name}")

# Also ensure spans have z-10 so they sit on top of the placeholder
content = content.replace(
    '<span class="absolute top-3 left-3 text-[10px]',
    '<span class="absolute top-3 left-3 z-10 text-[10px]'
)

services_path.write_text(content, encoding="utf-8")
print("services/index.html updated successfully!")