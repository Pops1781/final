import { useState } from "react";
import { ClockIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { images } from "../../../../constants/images";
import { beautyTabs, beautyTabProducts } from "../../../../constants/beautyProducts";

// Category data for the "Shop by" section
const categoryItems = [
  { image: images.beautyProducts, title: "Products", alt: "Beauty products", navTitle: "Make Up & Beauty" },
  { image: images.beautyBrand, title: "Brand", alt: "A beauty brand", navTitle: "Skincare Essentials" },
  { image: images.vitaminSerum, title: "Ingredient", alt: "Vitamin C serum", navTitle: "Hair Care Products" },
  { image: images.luxuryBrand, title: "Luxury", alt: "Luxury brand", navTitle: "Fragrances & Perfumes" },
  { image: images.acneSkin, title: "Concerns", alt: "Acne skin", navTitle: "Cosmetic Tools & Accessories" },
  { image: images.skinTypes, title: "Skin Type", alt: "Skin types", navTitle: "Nail Care" },
];

// Top offers data
const topOffers = [
  {
    image: images.makeupSet,
    title: "Makeup Set",
    currentPrice: "₹200",
    originalPrice: "₹400",
    discount: "50%",
    timeRemaining: "Ends In 2Hr 15m",
  },
  {
    image: images.skincareSet,
    title: "Skincare Set",
    currentPrice: "₹600",
    originalPrice: "₹1200",
    discount: "50%",
    timeRemaining: "Ends In 2Hr 15m",
  },
  {
    image: images.fragranceSet,
    title: "Fragrance Set",
    currentPrice: "₹800",
    originalPrice: "₹1600",
    discount: "50%",
    timeRemaining: "Ends In 2Hr 15m",
  },
  {
    image: images.hairCareSet,
    title: "Hair Care Set",
    currentPrice: "₹300",
    originalPrice: "₹600",
    discount: "50%",
    timeRemaining: "Ends In 2Hr 10m",
  },
];

export const FrameByAnima = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(beautyTabs[0]);

  const handleProductClick = (productId: string | number) => {
    navigate(`/product/${productId.toString()}`);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      {/* Hero Banner */}
      <img
        className="w-full h-[234px] object-cover"
        alt="Beauty products banner"
        src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=60"
      />

      {/* Shop by Categories Section */}
      <div className="flex flex-col gap-3 px-5 py-2.5 w-full">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-semibold text-black text-xl font-['Inter',Helvetica]">
            Shop by
          </h2>
          <button 
            onClick={() => navigate('/shop-by')}
            className="font-normal text-black text-xs font-['Inter',Helvetica] hover:text-[#5ec401] transition-colors"
          >
            View All
          </button>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-[10px] w-full">
          {categoryItems.map((item, index) => (
            <div
              key={index}
              className="inline-flex flex-col items-center justify-center gap-1.5 cursor-pointer"
              onClick={() => navigate(`/shop-by/${encodeURIComponent(item.navTitle)}`)}
            >
                <img
                  className="w-[100px] h-[100px] object-cover"
                  alt={item.alt}
                  src={item.image}
                />
              <div className="font-medium text-black text-xs text-center font-['Inter',Helvetica] w-full">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Beauty Essentials Section */}
      <div className="flex flex-col gap-2 p-5 w-full bg-gradient-to-b from-white to-[#ffc3bd] md:from-[#fff5f2] md:to-[#ffc3bd]">
        <div className="font-normal text-black text-base font-['Inter',Helvetica]">
          <span className="font-semibold">
            Beauty Essentials <br />
          </span>
          <span className="text-sm">Top Picks In</span>
        </div>

        <ScrollArea className="w-full">
          <div className="flex items-center gap-3.5 p-px overflow-x-auto w-full">
            {beautyTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-[5px] rounded-lg border font-medium text-xs font-['Poppins',Helvetica] whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "border-[#37474f] text-[#37474f] bg-white shadow"
                    : "border-[#a2a2a2] text-[#a2a2a2] bg-transparent"
                }`}
                style={{ minWidth: 90 }}
              >
                {tab}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <ScrollArea className="w-full">
          <div className="flex items-center gap-3 p-px h-[171px] w-full overflow-x-auto">
            {(beautyTabProducts[activeTab] || []).map((product, index) => (
              <Card
                key={product.id}
                className="h-[171px] w-[119.7px] rounded-[6.84px] border border-solid border-[#90909066] shadow-[0px_3.42px_75.24px_#0000000d] bg-white cursor-pointer flex-shrink-0"
                onClick={() => handleProductClick(product.id)}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col items-start justify-center gap-2 p-2">
                    <img
                      className="w-[102.6px] h-[118.85px] object-cover"
                      alt="Product"
                      src={product.image}
                    />
                    <div className="flex items-center justify-center gap-1 w-full h-[25.68px]">
                      <div className="mt-[-9.02px] mb-[-7.31px] font-medium text-black text-[34.2px] text-center font-['Libre_Caslon_Text',Helvetica]">
                        {index + 1}
                      </div>
                      <div className="flex flex-col w-[72.68px] items-start justify-center p-[3.42px] rounded-[3.42px] bg-gradient-to-r from-[rgba(255,195,189,0.8)] to-[rgba(255,255,255,0.8)]">
                        <div className="mt-[-0.85px] font-normal text-black text-[8.6px] leading-[10.3px] font-['Poppins',Helvetica] whitespace-pre-line">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Top Offers Section */}
      <div className="flex flex-col gap-3 px-5 py-2.5 w-full">
        <h2 className="text-xl md:text-2xl font-semibold font-['Poppins',sans-serif] mb-2">Top Offers</h2>
        {/* Mobile: horizontal scroll */}
        <ScrollArea className="w-full block sm:hidden">
          <div className="flex items-center gap-4 overflow-x-auto w-full">
            {topOffers.length === 0 ? (
              <div className="text-gray-500 text-center w-full">No offers available.</div>
            ) : (
              topOffers.map((offer, index) => (
                <Card
                  key={index}
                  className="rounded-[6.02px] overflow-hidden shadow-[0px_0px_10px_#00000033] flex-shrink-0 w-[220px]"
                >
                  <img
                    className="w-full h-[180px] object-cover"
                    alt={offer.title}
                    src={offer.image}
                  />
                  <CardContent className="gap-0.5 px-2.5 py-1.5 bg-white">
                    <div className="font-normal text-black text-base font-['Poppins',Helvetica] mb-1">
                      {offer.title}
                    </div>
                    <div className="flex items-center gap-2 w-full mb-1">
                      <div className="font-semibold text-black text-base font-['Poppins',Helvetica]">
                        {offer.currentPrice}
                      </div>
                      <div className="font-medium text-[#727272] text-sm line-through font-['Poppins',Helvetica]">
                        {offer.originalPrice}
                      </div>
                      <div className="font-medium text-[#5ec401] text-sm font-['Poppins',Helvetica]">
                        {offer.discount} OFF
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <ClockIcon className="h-4 w-4" />
                      <span>{offer.timeRemaining}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {/* Desktop: 2-column grid */}
        <div className="hidden sm:grid grid-cols-2 gap-4 w-full">
          {topOffers.length === 0 ? (
            <div className="text-gray-500 text-center col-span-2">No offers available.</div>
          ) : (
            topOffers.map((offer, index) => (
              <Card
                key={index}
                className="rounded-[6.02px] overflow-hidden shadow-[0px_0px_10px_#00000033]"
              >
                <img
                  className="w-full h-[180px] object-cover"
                  alt={offer.title}
                  src={offer.image}
                />
                <CardContent className="gap-0.5 px-2.5 py-1.5 bg-white">
                  <div className="font-normal text-black text-base font-['Poppins',Helvetica] mb-1">
                    {offer.title}
                  </div>
                  <div className="flex items-center gap-2 w-full mb-1">
                    <div className="font-semibold text-black text-base font-['Poppins',Helvetica]">
                      {offer.currentPrice}
                    </div>
                    <div className="font-medium text-[#727272] text-sm line-through font-['Poppins',Helvetica]">
                      {offer.originalPrice}
                    </div>
                    <div className="font-medium text-[#5ec401] text-sm font-['Poppins',Helvetica]">
                      {offer.discount} OFF
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <ClockIcon className="h-4 w-4" />
                    <span>{offer.timeRemaining}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
