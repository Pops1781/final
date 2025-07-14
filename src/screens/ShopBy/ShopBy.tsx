import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { images } from "../../constants/images";
import { useState } from "react";

const productCategories = [
  { image: images.beautyProducts, title: "Make Up & Beauty" },
  { image: images.skincareSet, title: "Skincare Essentials" },
  { image: images.hairCareSet, title: "Hair Care Products" },
  { image: images.fragranceSet, title: "Fragrances & Perfumes" },
  { image: images.beautyProducts, title: "Cosmetic Tools & Accessories" },
  { image: images.beautyProducts, title: "Nail Care" },
  { image: images.skincareSet, title: "Bath & Body Products" },
  { image: images.beautyBrand, title: "Men's Grooming" },
  { image: images.acneSkin, title: "Organic & Natural Beauty" },
  { image: images.skincareSet, title: "Anti-Aging Treatments" },
  { image: images.makeupSet, title: "Beauty Supplements" },
  { image: images.skinTypes, title: "Baby Care" },
];

const skinTypeCategories = [
  { image: images.beautyProducts, title: "Dry Skin" },
  { image: images.beautyBrand, title: "Oily Skin" },
  { image: images.vitaminSerum, title: "Combination" },
  { image: images.luxuryBrand, title: "Sensitive Skin" },
  { image: images.acneSkin, title: "Acne Prone" },
  { image: images.skinTypes, title: "Normal Skin" },
];

export const ShopBy = (): JSX.Element => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredProductCategories = productCategories.filter(cat =>
    cat.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredSkinTypeCategories = skinTypeCategories.filter(cat =>
    cat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#fafbff] min-h-screen pb-8">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6 text-[#37474F]" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-['Poppins',sans-serif] text-black">Shop By</h1>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Search Bar */}
      <div className="px-5 pt-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search Categories"
          className="w-full h-11 rounded-lg bg-[#f0f1f2] px-4 text-base font-['Inter',Helvetica] text-black placeholder:text-gray-400 outline-none border-none mb-4"
        />
      </div>

      {/* Shop By Products */}
      <div className="px-5">
        <h2 className="text-xl md:text-2xl font-semibold font-['Poppins',sans-serif] mb-3">Shop By Products</h2>
        <div className="grid grid-cols-4 gap-3 mb-6">
          {filteredProductCategories.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => navigate(`/shop-by/${encodeURIComponent(item.title)}`)}>
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg shadow-sm"
              />
              <span className="text-xs text-center font-medium text-black font-['Inter',Helvetica] break-words max-w-[64px]">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Shop By Skin type */}
      <div className="px-5">
        <h2 className="text-xl md:text-2xl font-semibold font-['Poppins',sans-serif] mb-3 text-[#1a4d6e]">Shop By Skin type</h2>
        <div className="grid grid-cols-4 gap-3">
          {filteredSkinTypeCategories.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg shadow-sm"
              />
              <span className="text-xs text-center font-medium text-black font-['Inter',Helvetica] break-words max-w-[64px]">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 