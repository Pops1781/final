import { images } from "./images";

export const beautyTabs = [
  "Serum",
  "Cleanser",
  "Lipstick",
  "Foundation",
  "Shampoo"
];

export const beautyTabProducts: Record<string, { id: string | number; image: string; name: string; category?: string }[]> = {
  Serum: [
    { id: "himalaya-neem-face-wash", image: images.vitaminSerum, name: "Vitamin C Serum", category: "Skincare" },
    { id: "dove-deep-moisture", image: images.skincareSet, name: "Retinol Serum", category: "Skincare" },
    { id: "ponds-pure-white", image: images.beautyProducts, name: "Hyaluronic Acid Serum", category: "Skincare" },
    { id: "loreal-voluminous-mascara", image: images.luxuryBrand, name: "Niacinamide Serum", category: "Skincare" },
    { id: "fenty-beauty-eyeshadow", image: images.acneSkin, name: "Peptide Serum", category: "Skincare" },
    { id: "estee-primer", image: images.skinTypes, name: "Collagen Booster", category: "Skincare" },
  ],
  Cleanser: [
    { id: "himalaya-neem-face-wash", image: images.beautyProducts, name: "Gentle Cleanser", category: "Skincare" },
    { id: "ponds-pure-white", image: images.skincareSet, name: "Foaming Cleanser", category: "Skincare" },
    { id: "dove-deep-moisture", image: images.luxuryBrand, name: "Hydrating Cleanser", category: "Skincare" },
    { id: "sunsilk-coconut-hydration", image: images.fragranceSet, name: "Exfoliating Cleanser", category: "Skincare" },
    { id: "loreal-true-match", image: images.hairCareSet, name: "Micellar Cleanser", category: "Skincare" },
    { id: "mac-retro-matte", image: images.acneSkin, name: "Brightening Cleanser", category: "Skincare" },
  ],
  Lipstick: [
    { id: "mac-retro-matte", image: images.makeupSet, name: "Red Lipstick", category: "Makeup" },
    { id: "new-lipstick-1", image: images.makeupSet, name: "Nude Lipstick", category: "Makeup" },
    { id: "loreal-true-match", image: images.beautyBrand, name: "Pink Lipstick", category: "Makeup" },
    { id: "himalaya-neem-face-wash", image: images.luxuryBrand, name: "Matte Lipstick", category: "Makeup" },
    { id: "dove-deep-moisture", image: images.acneSkin, name: "Glossy Lipstick", category: "Makeup" },
    { id: "ponds-pure-white", image: images.skinTypes, name: "Coral Lipstick", category: "Makeup" },
  ],
  Foundation: [
    { id: "loreal-true-match", image: images.makeupSet, name: "Matte Foundation", category: "Makeup" },
    { id: "fenty-beauty-eyeshadow", image: images.makeupSet, name: "Dewy Foundation", category: "Makeup" },
    { id: "estee-primer", image: images.beautyProducts, name: "Full Coverage Foundation", category: "Makeup" },
    { id: "rare-beauty-blush", image: images.luxuryBrand, name: "Lightweight Foundation", category: "Makeup" },
    { id: "becca-highlighter", image: images.acneSkin, name: "Hydrating Foundation", category: "Makeup" },
    { id: "nyx-epic-ink-liner", image: images.skinTypes, name: "Longwear Foundation", category: "Makeup" },
  ],
  Shampoo: [
    { id: "sunsilk-coconut-hydration", image: images.hairCareSet, name: "Volumizing Shampoo", category: "Haircare" },
    { id: "dove-deep-moisture", image: images.hairCareSet, name: "Repair Shampoo", category: "Haircare" },
    { id: "himalaya-neem-face-wash", image: images.beautyProducts, name: "Color Protect Shampoo", category: "Haircare" },
    { id: "mac-retro-matte", image: images.luxuryBrand, name: "Moisture Shampoo", category: "Haircare" },
    { id: "loreal-true-match", image: images.acneSkin, name: "Clarifying Shampoo", category: "Haircare" },
    { id: "new-lipstick-1", image: images.skinTypes, name: "Smoothing Shampoo", category: "Haircare" },
  ],
  // Also keep the new categories for Offers page
  Makeup: [
    { id: 1, image: images.makeupSet, name: "Red Lipstick", category: "Makeup" },
    { id: 2, image: images.makeupSet, name: "Nude Lipstick", category: "Makeup" },
    { id: 3, image: images.beautyBrand, name: "Pink Lipstick", category: "Makeup" },
    { id: 4, image: images.luxuryBrand, name: "Matte Lipstick", category: "Makeup" },
    { id: 5, image: images.acneSkin, name: "Glossy Lipstick", category: "Makeup" },
    { id: 6, image: images.skinTypes, name: "Coral Lipstick", category: "Makeup" },
    { id: 7, image: images.makeupSet, name: "Matte Foundation", category: "Makeup" },
    { id: 8, image: images.makeupSet, name: "Dewy Foundation", category: "Makeup" },
  ],
  Skincare: [
    { id: 9, image: images.vitaminSerum, name: "Vitamin C Serum", category: "Skincare" },
    { id: 10, image: images.skincareSet, name: "Retinol Serum", category: "Skincare" },
    { id: 11, image: images.beautyProducts, name: "Hyaluronic Acid Serum", category: "Skincare" },
    { id: 12, image: images.luxuryBrand, name: "Niacinamide Serum", category: "Skincare" },
    { id: 13, image: images.acneSkin, name: "Peptide Serum", category: "Skincare" },
    { id: 14, image: images.skinTypes, name: "Collagen Booster", category: "Skincare" },
  ],
  Haircare: [
    { id: 15, image: images.hairCareSet, name: "Volumizing Shampoo", category: "Haircare" },
    { id: 16, image: images.hairCareSet, name: "Repair Shampoo", category: "Haircare" },
    { id: 17, image: images.beautyProducts, name: "Color Protect Shampoo", category: "Haircare" },
    { id: 18, image: images.luxuryBrand, name: "Moisture Shampoo", category: "Haircare" },
    { id: 19, image: images.acneSkin, name: "Clarifying Shampoo", category: "Haircare" },
    { id: 20, image: images.skinTypes, name: "Smoothing Shampoo", category: "Haircare" },
  ],
  Fragrance: [
    { id: 21, image: images.fragranceSet, name: "Floral Perfume", category: "Fragrance" },
    { id: 22, image: images.fragranceSet, name: "Woody Perfume", category: "Fragrance" },
    { id: 23, image: images.fragranceSet, name: "Citrus Perfume", category: "Fragrance" },
    { id: 24, image: images.fragranceSet, name: "Musk Perfume", category: "Fragrance" },
  ],
}; 