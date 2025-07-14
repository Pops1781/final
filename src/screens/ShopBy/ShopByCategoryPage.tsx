import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ShoppingBag, Filter, Search } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { images } from "../../constants/images";
import { Switch } from "../../components/ui/switch";
import { Accordion, AccordionItem } from "../../components/ui/accordion";
import { allProducts } from "../../constants/allProducts";
import { useCartStore } from "../../store/cartStore";


interface ProductCategory {
  id: string;
  name: string;
  image: string;
}

interface Product {
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

const categories: ProductCategory[] = [
  { id: "makeup", name: "Makeup", image: images.makeupSet },
  { id: "skincare", name: "Skincare", image: images.skincareSet },
  { id: "haircare", name: "Hair Care", image: images.hairCareSet },
  { id: "fragrance", name: "Fragrance", image: images.fragranceSet },
  { id: "nail-care", name: "Nail Care", image: images.nailPolish },
  { id: "lipsticks", name: "Lipsticks", image: images.lipsticks },
  { id: "foundations", name: "Foundations", image: images.foundations },
  { id: "mascaras", name: "Mascaras", image: images.mascaras },
  { id: "eyeshadows", name: "Eyeshadows", image: images.eyeshadows },
  { id: "blushes", name: "Blushes", image: images.blushes },
  { id: "highlighters", name: "Highlighters", image: images.highlighters },
  { id: "eyeliners", name: "Eyeliners", image: images.eyeliners },
  { id: "primers", name: "Primers", image: images.primers }
];

export const ShopByCategoryPage = (): JSX.Element => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { items, addItem, updateQuantity } = useCartStore();
  const [selectedBrand, setSelectedBrand] = useState<string | null>("all");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedMinRating, setSelectedMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const categoryProducts = useMemo(() => {
    if (!selectedCategory) {
      return allProducts;
    }
    return allProducts.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  const availableBrands = useMemo(() => {
    const brandsSet = new Set(categoryProducts.map(p => p.brand));
    const brandsArray = Array.from(brandsSet).sort().map(brandName => ({
        id: brandName, 
        name: brandName
    }));
    return [{ id: "all", name: "All Brands" }, ...brandsArray];
  }, [categoryProducts]);

  // Effect to handle category changes
  useEffect(() => {
    const isValidCategory = categories.some(c => c.id === category);
    setSelectedCategory(isValidCategory ? category as string : null);
    setSelectedBrand('all'); // Reset brand filter when category changes
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [category]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowerCaseQuery = searchQuery.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerCaseQuery) ||
        p.brand.toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery]);

  // Filter products based on selected category and brand
  const getFilteredProducts = () => {
    // Start with products already filtered by category
    let filtered = categoryProducts;
    
    // Then filter by brand if not "all"
    if (selectedBrand && selectedBrand !== "all") {
      // Use strict equality for a precise match
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }
    
    // Apply price filter
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && (max ? p.price <= max : true));
    }

    // Apply rating filter
    if (selectedMinRating > 0) {
      filtered = filtered.filter(p => p.rating >= selectedMinRating);
    }

    // Apply in-stock filter
    if (inStockOnly) {
      // Simple check if quantity exists as a proxy for stock
      filtered = filtered.filter(p => p.quantity); 
    }

    // Apply on-sale filter
    if (onSaleOnly) {
      filtered = filtered.filter(p => p.discount && p.discount > 0);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const getItemInCart = (productId: string) => {
    return items.find((item) => item.id === productId);
  };

  // Navigate back
  const handleBackClick = () => {
    navigate('/');
  };
  
  // Handle adding product to bag
  const handleAddToBag = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addItem({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.quantity || "Standard",
    });
  };

  const handleIncrement = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const item = getItemInCart(productId);
    if (item) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const item = getItemInCart(productId);
    if (item) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate(`/shop-by/${categoryId}`);
  };

  // Handle product click
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  // In the header, show dynamic title
  const getHeaderTitle = () => {
    if (!selectedCategory) return "All Products";
    const found = categories.find(cat => cat.id === selectedCategory);
    return found ? found.name : selectedCategory;
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button onClick={handleBackClick} className="p-2" aria-label="Go back">
            <ArrowLeft className="w-6 h-6 text-[#37474F]" />
          </button>
          <h1 className="text-xl font-bold">{getHeaderTitle()}</h1>
        </div>
        <div className="flex items-center gap-2 relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-40 sm:w-48 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5ec401] text-sm"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>

            {searchQuery.trim() && (
              <div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-30 max-h-80 overflow-y-auto">
                {filteredSearchResults.length === 0 ? (
                  <div className="p-3 text-gray-500 text-sm">No results found.</div>
                ) : (
                  filteredSearchResults.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setSearchQuery(""); // Clear search after selection
                      }}
                    >
                      <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                      <div>
                        <div className="text-sm font-medium">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.brand}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </form>

          <button className="p-2" aria-label="Filter" onClick={() => setShowFilterModal(true)}>
            <Filter className="w-6 h-6 text-[#37474F]" />
          </button>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="flex gap-2 px-4 py-3 bg-white sticky top-[61px] z-10 shadow-sm border-b overflow-x-auto whitespace-nowrap no-scrollbar">
        {availableBrands.map((brand) => (
          <button
            key={brand.id}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full border text-sm font-medium ${
              selectedBrand === brand.id 
                ? "bg-[#e6f4ea] border-[#5ec401] text-[#5ec401]" 
                : "bg-white border-gray-300 text-gray-700"
            }`}
            onClick={() => {
              if (brand.id === "all") {
                setSelectedBrand("all");
              } else if (selectedBrand === brand.id) {
                setSelectedBrand("all");
              } else {
                setSelectedBrand(brand.id);
              }
            }}
          >
            {brand.name}
          </button>
        ))}
      </div>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Category Sidebar */}
        <div className="flex w-[70px] md:w-[80px] bg-white flex-col items-center pt-2 md:pt-4 overflow-y-auto border-r no-scrollbar">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className={`flex flex-col items-center mb-4 cursor-pointer w-full px-1 py-2 rounded-lg transition-colors ${
                selectedCategory === cat.id ? 'bg-pink-100' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden mb-1 flex items-center justify-center transition-all duration-300 ${
                selectedCategory === cat.id ? 'bg-pink-200 border-2 border-pink-300' : 'bg-gray-100'
              }`}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="text-[10px] md:text-[11px] text-center leading-tight font-medium text-gray-700">{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Main Content: Product Grid */}
        <div className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-50">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse flex space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No products found for the selected filters.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                  {filteredProducts.map(product => {
                    const itemInCart = getItemInCart(product.id);
                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col cursor-pointer transition-shadow hover:shadow-lg group"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="relative h-40 md:h-48 bg-gray-100">
                          <img 
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.discount && product.discount > 20 && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                              HOT DEAL
                            </span>
                          )}
                        </div>
                        
                        <div className="p-2 md:p-3 flex-1 flex flex-col">
                          <div>
                            <div className="text-xs text-gray-500">{product.brand}</div>
                            <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 h-10 mb-1">
                              {product.name}
                            </h3>
                            
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="font-bold text-base md:text-lg text-gray-900">₹{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-xs md:text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                              )}
                            </div>
                            
                            {product.discount && (
                                <p className="text-sm font-semibold text-green-600">{product.discount}% OFF</p>
                            )}

                            <div className="flex items-center mt-2 text-xs text-gray-500">
                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                <span>{product.rating}</span>
                                <span className="mx-1">|</span>
                                <span className="text-nowrap overflow-hidden text-ellipsis">{product.reviews} Reviews</span>
                            </div>
                          </div>
                          
                          <div className="mt-auto pt-3">
                            {itemInCart ? (
                              <div className="flex items-center justify-between w-full h-9 md:h-10 border-2 border-green-500 rounded-lg">
                                <button
                                  onClick={(e) => handleDecrement(e, product.id)}
                                  className="px-3 md:px-4 py-1 text-lg font-bold text-green-600"
                                >
                                  -
                                </button>
                                <span className="text-sm md:text-base font-medium text-green-600">
                                  {itemInCart.quantity}
                                </span>
                                <button
                                  onClick={(e) => handleIncrement(e, product.id)}
                                  className="px-3 md:px-4 py-1 text-lg font-bold text-green-600"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button 
                                className="w-full h-9 md:h-10 border border-green-500 rounded-lg text-center text-green-600 text-xs md:text-sm font-bold hover:bg-green-100 transition-colors"
                                onClick={(e) => handleAddToBag(e, product)}
                              >
                                Add To Bag
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Sticky Cart Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          className="bg-[#5ec401] text-white rounded-full p-3 shadow-lg flex items-center justify-center"
          onClick={() => navigate('/cart')}
        >
          <ShoppingBag className="w-6 h-6" />
          {cartItemCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-[#ff6b6b] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItemCount}
            </div>
          )}
        </button>
      </div>

      {showFilterModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Filter Options</h2>
            <Accordion>
              <AccordionItem title="Price Range">
                <div className="px-4 pb-4 flex flex-wrap gap-2">
                  {[
                    { label: "All Prices", range: null },
                    { label: "Under ₹500", range: "0-500" },
                    { label: "₹500 - ₹1000", range: "501-1000" },
                    { label: "₹1000 - ₹2000", range: "1001-2000" },
                    { label: "₹2000+", range: "2001-" },
                  ].map((rangeOption) => (
                    <button
                      key={rangeOption.label}
                      onClick={() => setSelectedPriceRange(rangeOption.range)}
                      className={`px-3 py-1 rounded-full border text-sm font-medium whitespace-nowrap ${
                        selectedPriceRange === rangeOption.range
                          ? "bg-[#e6f4ea] border-[#5ec401] text-[#5ec401]"
                          : "bg-white border-gray-300 text-gray-700"
                      }`}
                    >
                      {rangeOption.label}
                    </button>
                  ))}
                </div>
              </AccordionItem>

              <AccordionItem title="Customer Rating">
                <div className="px-4 pb-4 flex flex-wrap gap-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedMinRating(rating === selectedMinRating ? 0 : rating)}
                      className={`px-3 py-1 rounded-full border text-sm flex items-center gap-1 ${
                        selectedMinRating === rating
                          ? "bg-[#e6f4ea] border-[#5ec401] text-[#5ec401]"
                          : "bg-white border-gray-300 text-gray-700"
                      }`}
                    >
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                      ))}
                      {rating < 5 && " & Up"}
                    </button>
                  ))}
                </div>
              </AccordionItem>

              <AccordionItem title="Availability">
                <div className="px-4 pb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="in-stock" className="text-sm font-medium">In Stock</label>
                    <Switch
                      id="in-stock"
                      checked={inStockOnly}
                      onCheckedChange={setInStockOnly}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="on-sale" className="text-sm font-medium">On Sale</label>
                    <Switch
                      id="on-sale"
                      checked={onSaleOnly}
                      onCheckedChange={setOnSaleOnly}
                    />
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="py-2 px-4 rounded-lg border border-gray-300 text-gray-700"
                onClick={() => {
                  setSelectedPriceRange(null);
                  setSelectedMinRating(0);
                  setInStockOnly(false);
                  setOnSaleOnly(false);
                  setShowFilterModal(false);
                }}
              >
                Reset Filters
              </button>
              <button
                className="bg-[#5ec401] text-white py-2 px-4 rounded-lg"
                onClick={() => setShowFilterModal(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 