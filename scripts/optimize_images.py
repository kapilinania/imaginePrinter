# IMAGINE PRINTERS — High-Performance Image Optimization Script
# Automatically optimizes all heavy images in assets/images/ to high-performance WebP

import os
from pathlib import Path
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent.parent
IMAGES_DIR = BASE_DIR / 'assets' / 'images'

MAX_DIMENSION = 1600
WEBP_QUALITY = 85

def run():
    print('Scanning assets/images for images to optimize...')
    count = 0
    total_orig = 0
    total_opt = 0

    for root, _, files in os.walk(IMAGES_DIR):
        for file in sorted(files):
            file_lower = file.lower()
            if not (file_lower.endswith('.png') or file_lower.endswith('.jpg') or file_lower.endswith('.jpeg')):
                continue
            if file_lower.endswith('.webp'):
                continue

            input_path = Path(root) / file
            output_path = input_path.with_suffix('.webp')

            orig_size = input_path.stat().st_size
            total_orig += orig_size

            try:
                with Image.open(input_path) as im:
                    if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
                        target_im = im.convert('RGBA')
                    else:
                        target_im = im.convert('RGB')

                    w, h = target_im.size
                    if max(w, h) > MAX_DIMENSION:
                        target_im.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.Resampling.LANCZOS)

                    target_im.save(output_path, 'WEBP', quality=WEBP_QUALITY, method=6)

                opt_size = output_path.stat().st_size
                total_opt += opt_size
                count += 1
                print(f'[{count:02d}] {file} -> {output_path.name} ({(1 - opt_size/orig_size)*100:.1f}% saved)')
            except Exception as e:
                print(f'Error on {file}: {e}')

    print(f'Finished! Processed {count} images.')
    if total_orig > 0:
        print(f'Original: {total_orig/(1024*1024):.2f}MB, WebP: {total_opt/(1024*1024):.2f}MB')

if __name__ == '__main__':
    run()
