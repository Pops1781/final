import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Slider } from "../../components/ui/slider";
import { ClockIcon, SearchIcon, ShareIcon, Filter as FilterIcon } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { DivWrapperByAnima } from "../Home/sections/DivWrapperByAnima";
import { images } from "../../constants/images";
import { useNavigate } from "react-router-dom";
import { beautyTabProducts } from "../../constants/beautyProducts";

// Get products specifically for the offers page from categories that have numeric IDs
const offerSourceProducts = Object.values(beautyTabProducts)
  .flat()
  .filter(p => typeof p.id === 'number' && p.category);

// Create offers from these products, assigning correct categories
const offers = offerSourceProducts.map((product, idx) => ({
  ...product,
  currentPrice: Math.floor(Number(product.id) * 100 + 199),
  originalPrice: Math.floor(Number(product.id) * 100 + 399),
  discount: `${10 + (idx % 5) * 10}%`,
  endTime: `${1 + (idx % 4)}Hr ${15 + (idx % 5) * 5}m`,
  category: product.category!, // Use the product's own category
  title: product.name,
}));

const offerCategories = ["All", "Makeup", "Skincare", "Haircare", "Fragrance"];
const discountLevels = [10, 20, 30, 40];

export const Offers = (): JSX.Element => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState("Discount");
  const [addingId, setAddingId] = useState<number | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleAddToBag = async (offer: typeof offers[0]) => {
    setAddingId(Number(offer.id));
    addItem({
      id: offer.id.toString(),
      name: offer.title,
      price: offer.currentPrice,
      image: offer.image,
      quantity: 1,
      originalPrice: offer.originalPrice,
    });
    setTimeout(() => setAddingId(null), 700); // Simulate feedback
  };

  const handleProductClick = (productId: string | number) => {
    navigate(`/product/${productId}`);
  };

  // Update filter logic to use selectedCategory
  let filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(search.toLowerCase()) ||
      (offer.category || "").toLowerCase().includes(search.toLowerCase());
    const matchesPrice =
      offer.currentPrice >= minPrice && offer.currentPrice <= maxPrice;
    const matchesCategory =
      selectedCategory === "All" || offer.category === selectedCategory;
    const matchesDiscount =
      selectedDiscount === null || parseInt(offer.discount) >= selectedDiscount;
    return matchesSearch && matchesPrice && matchesCategory && matchesDiscount;
  });

  // Sorting
  if (sortBy === "Discount") {
    filteredOffers = filteredOffers.sort((a, b) =>
      parseInt(b.discount) - parseInt(a.discount)
    );
  } else if (sortBy === "Price: Low to High") {
    filteredOffers = filteredOffers.sort((a, b) => a.currentPrice - b.currentPrice);
  } else if (sortBy === "Price: High to Low") {
    filteredOffers = filteredOffers.sort((a, b) => b.currentPrice - a.currentPrice);
  }

  // Update category pill handler
  const handleCategoryPill = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-[#fafbff] min-h-screen pb-20">
      {/* Header Image */}
      <img
        className="w-full h-[180px] object-cover mb-2"
        alt="Offers Banner"
        src={images.heroBanner}
      />
      <div className="bg-white px-5 py-4 sticky top-0 z-20 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold font-['Poppins',sans-serif] text-black mb-4">Offers</h1>
        <div className="relative mb-4">
          <SearchIcon className="absolute w-[17px] h-[17px] top-[12px] left-[15px] z-10 text-blackmedium" />
          <Input
            className="h-[42px] bg-[#f0f1f2] pl-10 text-sm font-['Inter',Helvetica] text-blackmedium placeholder:text-blackmedium placeholder:opacity-[0.87]"
            placeholder="Search Offers"
            value={search}
            aria-label="Search Offers"
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {/* Category Pills - horizontal scrollable */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar py-1 sticky top-[70px] bg-white z-30">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-[#5ec401]"
            onClick={() => setShowFilters(!showFilters)}
            aria-label={showFilters ? "Hide Filters" : "Show Filters"}
            aria-expanded={showFilters}
            title={showFilters ? "Hide Filters" : "Show Filters"}
            style={{ minWidth: 40 }}
          >
            <FilterIcon className="w-5 h-5 text-blackmedium" />
          </button>
          {offerCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5ec401] shadow-sm ${
                selectedCategory === category
                  ? "bg-[#5ec401] text-white border-[#5ec401]"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => handleCategoryPill(category)}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
        {showFilters && (
          <div className="mb-4 p-5 bg-gray-50 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-base font-bold mb-3 text-[#222]">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <label className="text-sm mb-2 block font-medium">Min Price</label>
                <input
                  type="number"
                  min={0}
                  max={maxPrice}
                  value={minPrice}
                  onChange={e => setMinPrice(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#5ec401]"
                  placeholder="Min"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block font-medium">Max Price</label>
                <input
                  type="number"
                  min={minPrice}
                  max={4000}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#5ec401]"
                  placeholder="Max"
                />
              </div>
              {/* Discount Level */}
              <div>
                <label className="text-sm mb-2 block font-medium">Discount Level</label>
                <div className="flex gap-2 flex-wrap">
                  {discountLevels.map((level) => (
                    <button
                      key={level}
                      className={`px-4 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5ec401] shadow-sm ${
                        selectedDiscount === level
                          ? "bg-[#5ec401] text-white border-[#5ec401]"
                          : "bg-white text-black border-gray-300 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedDiscount(level === selectedDiscount ? null : level)}
                      aria-pressed={selectedDiscount === level}
                    >
                      {level}%+
                    </button>
                  ))}
                </div>
              </div>
              {/* Sort By */}
              <div>
                <label className="text-sm mb-2 block font-medium">Sort by</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#5ec401]"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  aria-label="Sort offers"
                >
                  <option>Discount</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 text-sm font-medium mr-2"
                onClick={() => {
                  setMinPrice(0);
                  setMaxPrice(4000);
                  setSelectedDiscount(null);
                  setSelectedCategory("All");
                  setShowFilters(false);
                }}
              >
                Reset
              </button>
              <button
                className="px-4 py-1.5 rounded-full bg-[#5ec401] text-white text-sm font-medium border border-[#5ec401] hover:bg-[#4bb300]"
                onClick={() => setShowFilters(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
      <ScrollArea className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredOffers.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              <span className="text-lg">No offers found. Try adjusting your filters or search.</span>
            </div>
          ) : (
            filteredOffers.map((offer) => (
              <Card
                key={offer.id.toString()}
                className="overflow-hidden transition-transform duration-200 hover:scale-[1.03] hover:shadow-lg group"
              >
                <CardContent className="p-0">
                  <div
                    className="relative cursor-pointer"
                    onClick={() => handleProductClick(Number(offer.id))}
                    tabIndex={0}
                    aria-label={`View details for ${offer.title}`}
                    onKeyDown={e => { if (e.key === 'Enter') handleProductClick(Number(offer.id)); }}
                  >
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-40 object-cover group-hover:brightness-95"
                    />
                    <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow">
                      <ShareIcon className="h-4 w-4" />
                    </div>
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-[#5ec401] to-[#3a8c00] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white">
                      {offer.discount} OFF
                    </div>
                  </div>
                  <div className="p-3 flex flex-col flex-1 justify-between">
                    <h3 className="font-semibold text-base md:text-lg font-['Poppins',sans-serif] mb-1 cursor-pointer" onClick={() => handleProductClick(Number(offer.id))}>
                      {offer.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">₹{offer.currentPrice}</span>
                      <span className="text-gray-500 line-through text-sm">
                        ₹{offer.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                      <ClockIcon className="h-3 w-3" />
                      <span>Ends in {offer.endTime}</span>
                    </div>
                    {/* Quantity selector or Add to Bag */}
                    {(() => {
                      const cartItem = items.find((i) => i.id === offer.id.toString());
                      if (cartItem) {
                        return (
                          <div className="flex items-center justify-between w-full bg-[#f5f7fa] rounded-lg px-2 py-1 transition-all duration-300 border border-[#e0e0e0]">
                            <button
                              onClick={() => {
                                if (cartItem.quantity - 1 <= 0) {
                                  removeItem(cartItem.id);
                                } else {
                                  updateQuantity(cartItem.id, cartItem.quantity - 1);
                                }
                              }}
                              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-[#5ec401] text-2xl font-bold hover:bg-[#e6f9d5] transition-all duration-200"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xl font-semibold select-none">{cartItem.quantity}</span>
                            <button
                              onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-[#5ec401] text-2xl font-bold hover:bg-[#e6f9d5] transition-all duration-200"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        );
                      }
                      return (
                        <button
                          onClick={() => handleAddToBag(offer)}
                          className={`w-full bg-[#5ec401] text-white py-2 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#5ec401] ${addingId === Number(offer.id) ? "opacity-60" : ""}`}
                          disabled={addingId === Number(offer.id)}
                          aria-label={`Add ${offer.title} to bag`}
                        >
                          {addingId === Number(offer.id) ? "Added!" : "Add to Bag"}
                        </button>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
      <DivWrapperByAnima />
    </div>
  );
};