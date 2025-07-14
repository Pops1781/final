import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingBag, Search as SearchIcon } from "lucide-react";
import { useMemo } from "react";
import { allProducts } from "../../constants/allProducts";
import { useCartStore } from "../../store/cartStore";

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const { items, addItem, updateQuantity } = useCartStore();

  const filteredProducts = useMemo(() => {
    if (!query) {
      return [];
    }
    const lowerCaseQuery = query.toLowerCase();
    return allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        product.brand.toLowerCase().includes(lowerCaseQuery) ||
        product.category.toLowerCase().includes(lowerCaseQuery)
    );
  }, [query]);
  
  const getItemInCart = (productId: string) => {
    return items.find(item => item.id === productId);
  };

  const handleAddToCart = (e: React.MouseEvent, product: (typeof allProducts)[0]) => {
    e.stopPropagation();
    addItem({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      // Assuming a default or no size for items from global search
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
    if (item && item.quantity > 0) { // allows decrementing to 0, which will be handled by cart logic to remove
      updateQuantity(item.id, item.quantity - 1);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-2" aria-label="Go back">
            <ArrowLeft className="w-6 h-6 text-[#37474F]" />
          </button>
          <h1 className="text-xl font-bold truncate">Search Results for "{query}"</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/bag" className="relative p-2" aria-label="Shopping Bag">
            <ShoppingBag className="w-6 h-6 text-[#37474F]" />
            {items.length > 0 && (
                <span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {items.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
            )}
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <SearchIcon className="w-16 h-16 mb-4 text-gray-300" />
            <h2 className="text-lg font-semibold">No Results Found</h2>
            <p className="max-w-xs">We couldn't find any products matching your search. Try a different keyword.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => {
              const itemInCart = getItemInCart(String(product.id));

              return (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg flex flex-col shadow-sm cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="bg-gray-100 h-36 rounded-t-lg overflow-hidden relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    {product.discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-sm">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                  
                  <div className="p-2 flex-grow flex flex-col">
                    <div className="text-sm text-gray-700">{product.brand}</div>
                    <div className="text-xs text-gray-800 font-medium line-clamp-2 min-h-[32px]">{product.name}</div>
                    <div className="text-xs text-gray-500 mb-1">{product.quantity}</div>
                    
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-bold">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center bg-green-100 text-green-700 rounded px-1 py-0.5 text-xs">
                        <Star className="w-3 h-3 fill-green-500 text-green-500 mr-0.5" /> 
                        <span>{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>

                    <div className="mt-auto">
                        {itemInCart ? (
                           <div className="flex items-center justify-between w-full h-[34px] border border-green-500 rounded">
                               <button 
                                   onClick={(e) => handleDecrement(e, String(product.id))}
                                   className="px-3 py-1 text-green-600"
                                >
                                   -
                               </button>
                               <span className="text-sm font-medium text-green-600">{itemInCart.quantity}</span>
                               <button 
                                   onClick={(e) => handleIncrement(e, String(product.id))}
                                   className="px-3 py-1 text-green-600"
                               >
                                   +
                               </button>
                           </div>
                        ) : (
                           <button 
                               className="w-full h-[34px] border border-green-500 rounded text-center text-green-600 text-sm font-medium hover:bg-green-50 transition-colors"
                               onClick={(e) => handleAddToCart(e, product)}
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
      </div>
    </div>
  );
}; 