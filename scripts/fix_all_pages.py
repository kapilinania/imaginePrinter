from pathlib import Path
import re

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
      if (img.src && img.src.includes(".webp") && !img.dataset.pngTried) {
        img.dataset.pngTried = "true";
        img.src = img.src.replace(/\\.webp(\\?.*)?$/, ".png$1");
        return;
      }
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

def encode_src_spaces(match):
    full = match.group(0)
    prefix = match.group(1)
    val = match.group(2)
    suffix = match.group(3)
    encoded_val = val.replace(" ", "%20")
    return f'{prefix}"{encoded_val}"{suffix}'

files_to_fix = [
    Path("portfolio/index.html"),
    Path("services/index.html"),
    Path("about/index.html")
]

for p in files_to_fix:
    content = p.read_text(encoding="utf-8")
    if "window.onImagineImgLoaded = function" not in content[:3000]:
        content = content.replace("</head>", early_loader_script, 1)
    content = re.sub(r'(src=)["\']([^"\']+)["\'](\s|>|/)', encode_src_spaces, content)
    content = re.sub(r'(data-img=)["\']([^"\']+)["\'](\s|>|/)', encode_src_spaces, content)
    p.write_text(content, encoding="utf-8")
    print(f"Updated {p.name}")

print("All pages fixed with early loader script and encoded URLs!")