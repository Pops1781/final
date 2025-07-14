import { useState } from "react";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { SearchIcon } from "lucide-react";
import { DivWrapperByAnima } from "../Home/sections/DivWrapperByAnima";
import { images } from "../../constants/images";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../components/ui/SearchBar";

// Category data
const categories = [
  {
    id: 1,
    name: "Skincare",
    image: images.beautyProducts,
    itemCount: 245,
    subcategories: ["Cleansers", "Moisturizers", "Serums", "Masks"],
    products: [
      {
        id: "1",
        name: "Vitamin C Serum",
        image: images.vitaminSerum,
        price: 1299,
        originalPrice: 1999,
        discount: "35%"
      },
      {
        id: "2",
        name: "Retinol Cream",
        image: images.skincareSet,
        price: 1499,
        originalPrice: 2499,
        discount: "40%"
      }
    ]
  },
  {
    id: 2,
    name: "Makeup",
    image: images.beautyBrand,
    itemCount: 158,
    subcategories: ["Face", "Eyes", "Lips", "Brushes"],
    products: [
      {
        id: "3",
        name: "Makeup Set",
        image: images.makeupSet,
        price: 200,
        originalPrice: 400,
        discount: "50%"
      }
    ]
  },
  {
    id: 3,
    name: "Haircare",
    image: images.vitaminSerum,
    itemCount: 132,
    subcategories: ["Shampoo", "Conditioner", "Treatments", "Styling"],
    products: [
      {
        id: "4",
        name: "Hair Care Set",
        image: images.hairCareSet,
        price: 300,
        originalPrice: 600,
        discount: "50%"
      }
    ]
  },
  {
    id: 4,
    name: "Fragrance",
    image: images.luxuryBrand,
    itemCount: 89,
    subcategories: ["Perfume", "Body Spray", "Gift Sets"],
    products: [
      {
        id: "5",
        name: "Fragrance Set",
        image: images.fragranceSet,
        price: 800,
        originalPrice: 1600,
        discount: "50%"
      }
    ]
  },
  {
    id: 5,
    name: "Tools",
    image: images.acneSkin,
    itemCount: 76,
    subcategories: ["Hair Tools", "Makeup Tools", "Skincare Tools"],
    products: [
      {
        id: "6",
        name: "Beauty Tools Set",
        image: images.beautyProducts,
        price: 999,
        originalPrice: 1999,
        discount: "50%"
      }
    ]
  },
  {
    id: 6,
    name: "Bath & Body",
    image: images.skinTypes,
    itemCount: 94,
    subcategories: ["Body Wash", "Lotions", "Scrubs", "Soap"],
    products: [
      {
        id: "7",
        name: "Bath & Body Set",
        image: images.skincareSet,
        price: 699,
        originalPrice: 1399,
        discount: "50%"
      }
    ]
  }
];

export const Categories = (): JSX.Element => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Filter categories as user types
  const filteredCategories = search.trim()
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
      )
    : categories;

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="bg-[#fafbff] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-5 py-4">
        <h1 className="text-2xl md:text-3xl font-bold font-['Poppins',sans-serif] text-black mb-4">Categories</h1>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search Categories"
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5ec401] focus:border-transparent"
        />
      </div>

      {/* Categories Grid */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {filteredCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-base md:text-lg font-['Poppins',sans-serif] mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.itemCount} items</p>
                  <ScrollArea className="w-full mt-2">
                    <div className="flex gap-2">
                      {category.subcategories.map((sub, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                  
                  {/* Products Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {category.products.map((product) => (
                      <div
                        key={product.id}
                        className="cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <h4 className="text-xs font-medium mt-1">{product.name}</h4>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-semibold">₹{product.price}</span>
                          <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <DivWrapperByAnima />
    </div>
  );
};