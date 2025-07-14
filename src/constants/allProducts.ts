import { images } from "./images";

export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  quantity?: string;
  category: string;
}

export const allProducts: Product[] = [
  // Lipsticks
  {
    id: "mac-retro-matte",
    name: "MAC Retro Matte Lipstick",
    brand: "Fenty Beauty",
    image: images.macRetroMatte,
    price: 1700,
    originalPrice: 1900,
    discount: 10,
    rating: 4.7,
    reviews: 320,
    quantity: "3g",
    category: "lipsticks"
  },
  {
    id: "new-lipstick-1",
    name: "Glamour Red Lipstick",
    brand: "L'Oreal",
    image: images.glamourRedLipstick,
    price: 950,
    originalPrice: 1200,
    discount: 20,
    rating: 4.5,
    reviews: 150,
    quantity: "4g",
    category: "lipsticks"
  },
  // Foundations
  {
    id: "loreal-true-match",
    name: "L'Oreal True Match Foundation",
    brand: "L'Oreal",
    image: images.lorealTrueMatch,
    price: 899,
    originalPrice: 999,
    discount: 10,
    rating: 4.5,
    reviews: 180,
    quantity: "30ml",
    category: "foundations"
  },
  // Himalaya products
  {
    id: "himalaya-neem-face-wash",
    name: "Himalaya Neem Face Wash",
    brand: "Himalaya",
    image: images.himalayaNeemFaceWash,
    price: 150,
    originalPrice: 250,
    discount: 40,
    rating: 4.5,
    reviews: 200,
    quantity: "150ml",
    category: "facewash"
  },
  // Shampoo
  {
    id: "sunsilk-coconut-hydration",
    name: "Sunsilk Coconut Hydration Shampoo",
    brand: "Sunsilk",
    image: images.sunsilkCoconutHydration,
    price: 300,
    originalPrice: 400,
    discount: 25,
    rating: 4.3,
    reviews: 150,
    quantity: "250ml",
    category: "shampoo"
  },
  // Body wash
  {
    id: "dove-deep-moisture",
    name: "Dove Deep Moisture Body Wash",
    brand: "Dove",
    image: images.doveDeepMoisture,
    price: 699,
    originalPrice: 777,
    discount: 10,
    rating: 4.2,
    reviews: 80,
    quantity: "500ml",
    category: "bodywash"
  },
  // Face wash
  {
    id: "ponds-pure-white",
    name: "Pond's Pure White Anti-Pollution Face Wash",
    brand: "Pond's",
    image: images.pondsPureWhite,
    price: 200,
    originalPrice: 235,
    discount: 15,
    rating: 4.8,
    reviews: 1200,
    quantity: "100g",
    category: "facewash"
  },
  // Mascara
  {
    id: "loreal-voluminous-mascara",
    name: "L'Oreal Voluminous Mascara",
    brand: "L'Oreal",
    image: images.lorealVoluminousMascara,
    price: 499,
    originalPrice: 699,
    discount: 29,
    rating: 4.6,
    reviews: 320,
    quantity: "9ml",
    category: "mascaras"
  },
  // Eyeshadow
  {
    id: "fenty-beauty-eyeshadow",
    name: "Fenty Beauty Eyeshadow Palette",
    brand: "Fenty Beauty",
    image: images.fentyBeautyEyeshadow,
    price: 3200,
    originalPrice: 3800,
    discount: 16,
    rating: 4.9,
    reviews: 450,
    quantity: "12g",
    category: "eyeshadows"
  },
  // Primer
  {
    id: "estee-primer",
    name: "Estée The Illuminator Primer",
    brand: "Estée",
    image: images.esteePrimer,
    price: 2800,
    originalPrice: 3200,
    discount: 12,
    rating: 4.7,
    reviews: 180,
    quantity: "30ml",
    category: "primers"
  },
  // New Products
  {
    id: "rare-beauty-blush",
    name: "Rare Beauty Soft Pinch Liquid Blush",
    brand: "Rare Beauty",
    image: images.rareBeautyBlush,
    price: 1800,
    originalPrice: 2000,
    discount: 10,
    rating: 4.8,
    reviews: 250,
    quantity: "7.5ml",
    category: "blushes"
  },
  {
    id: "becca-highlighter",
    name: "BECCA Shimmering Skin Perfector",
    brand: "BECCA",
    image: images.beccaHighlighter,
    price: 2500,
    originalPrice: 3000,
    discount: 16,
    rating: 4.9,
    reviews: 300,
    quantity: "8g",
    category: "highlighters"
  },
  {
    id: "nyx-epic-ink-liner",
    name: "NYX Epic Ink Liner",
    brand: "NYX Professional Makeup",
    image: images.nyxEpicInkLiner,
    price: 700,
    originalPrice: 850,
    discount: 17,
    rating: 4.5,
    reviews: 400,
    quantity: "1ml",
    category: "eyeliners"
  },
  {
    id: "maybelline-lash-sensational",
    name: "Maybelline Lash Sensational Mascara",
    brand: "Maybelline",
    image: images.maybellineLashSensational,
    price: 550,
    originalPrice: 700,
    discount: 21,
    rating: 4.6,
    reviews: 500,
    quantity: "9.5ml",
    category: "mascaras"
  }
]; 