# ASSETS_TODO.md

This document tracks all 3D models, photography, videos, and graphical assets needed for **Bhojon Bilash**, along with exact production specifications and fallback strategies.

---

## 1. 3D Models (.glb)

Currently, the site uses high-performance **procedural 3D geometry** (artisanal ceramic plate, spiced saffron rice mound, flame-roasted meats, herb garnish, floating spice meshes, and rising steam particles).

When producing custom photogrammetry or 3D artist `.glb` models, follow these exact requirements:

| Asset Name | Target Path | Target Size | Draco Compression | Textures | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Smoked Kacchi Biryani** | `/public/models/kacchi-biryani.glb` | < 1.8 MB | **Yes (Required)** | Max 1024×1024 WebP/JPG (Albedo, Roughness, Normal) | Signature goat kacchi biryani on dark ceramic plate with saffron tint and roasted meat chunks. |
| **Flame-Grilled Chicken Tikka** | `/public/models/chicken-tikka.glb` | < 1.5 MB | **Yes (Required)** | Max 1024×1024 WebP/JPG | Charred chicken skewers with lime wedges, red chili flakes, and onion rings. |
| **Royal Beef Rezala** | `/public/models/beef-rezala.glb` | < 1.8 MB | **Yes (Required)** | Max 1024×1024 WebP/JPG | Traditional white cashew curry bowl with tender beef cuts and chili oil ripple. |
| **Tandoori Jumbo Prawns** | `/public/models/tandoori-prawns.glb` | < 1.5 MB | **Yes (Required)** | Max 1024×1024 WebP/JPG | Clay tandoor grilled freshwater prawns with mustard turmeric crust. |
| **Firni Dessert Bowl** | `/public/models/firni.glb` | < 1.2 MB | **Yes (Required)** | Max 1024×1024 WebP/JPG | Earthen clay bowl with creamy pistachio firni and edible gold leaf shimmer. |

### Technical Rules for 3D Assets:
1. **Pivot Point:** The center of the plate bottom must sit at coordinate `[0, 0, 0]`.
2. **Polycount Budget:** Under 35,000 triangles per model.
3. **Materials:** Single standard PBR material per model whenever possible to minimize draw calls.
4. **Compression:** Use `gltf-pipeline -i model.glb -o model-draco.glb -d` or Blender glTF export with Draco enabled.

---

## 2. Photography & Videos

| Asset Type | Path | Spec / Dimensions | Notes |
| :--- | :--- | :--- | :--- |
| **Hero Fallback Poster** | `/public/images/hero-fallback.webp` | 1920×1080 WebP, < 180 KB | Shown on low-power devices, unsupported WebGL, or `prefers-reduced-motion`. |
| **Open Graph Banner** | `/public/images/og-image.jpg` | 1200×630 JPG, < 250 KB | Social share card for WhatsApp, Facebook, Twitter. |
| **Atmosphere Clips** | `/public/videos/kitchen-flame.mp4` | 1080p, 24fps, H.264, no audio, < 3 MB | Looping ambient video for story/gallery sections. |

---

## 3. Current Fallbacks Active
- If a `.glb` path is not provided or fails to load, the R3F `<DishModel />` automatically renders the high-detail procedural plate and biryani assembly with zero errors.
- If WebGL is not supported or `prefers-reduced-motion` is active, the scene automatically swaps to the CSS fallback poster container.
