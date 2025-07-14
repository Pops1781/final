import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useCartStore } from "../../store/cartStore";
import { useProductStore } from "../../store/productStore";
import { images } from "../../constants/images";
import { ArrowLeft, Heart, Share2, Star, Clock, ChevronRight, MessageCircle } from "lucide-react";

// Define a more detailed structure for sizes
interface SizeOption {
  name: string;
  price: number;
  originalPrice: number;
  stock?: number; // Optional: for future stock management per size
}

export const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  const { items, addItem, updateQuantity, addToRecentlyViewed } = useCartStore();
  const { getProductById, products } = useProductStore();
  
  const product = getProductById(productId || '');

  // State for the currently selected main product image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (product) {
      const viewedItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      addToRecentlyViewed(viewedItem);
    }
  }, [product, addToRecentlyViewed]);

  const itemInCart = useMemo(() => {
    if (!product) return undefined;
    return items.find(item => item.id === product.id);
  }, [items, product]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id, 
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image, 
      quantity: 1,
      size: product.quantity || 'Standard',
    });
  };
  
  const handleIncrement = () => {
    if (itemInCart) {
      updateQuantity(itemInCart.id, itemInCart.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (itemInCart && itemInCart.quantity > 1) {
      updateQuantity(itemInCart.id, itemInCart.quantity - 1);
    }
  };

  if (!product) { 
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Product Not Found</h1>
        <p className="text-gray-600 mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Button onClick={() => navigate('/')}>Go Back to Home</Button>
      </div>
    );
  }

  const productImages = [product.image, images.skincareSet, images.vitaminSerum, images.makeupSet].filter(Boolean);
  const recommendedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen pb-28">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-base font-semibold truncate px-2">{product.name}</h1>
        <div className="flex gap-2">
          <button className="p-2">
            <Heart className="w-6 h-6 text-gray-700" />
          </button>
          <button className="p-2">
            <Share2 className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white p-4">
        <div className="relative h-80">
          <img
            src={productImages[selectedImageIndex]}
            alt={product.name}
            className="w-full h-full object-contain"
          />
          {productImages.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
              {productImages.map((_imgSrc, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    selectedImageIndex === index ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white mt-2 p-4">
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        <h1 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h1>
        
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
                {product.originalPrice && (
                    <p className="text-base text-gray-400 line-through">₹{product.originalPrice}</p>
                )}
            </div>
            <div className="flex items-center gap-1 text-sm bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-md">
                <Star className="w-4 h-4 text-green-500 fill-current" />
                <span>{product.rating}</span>
            </div>
        </div>
        {product.discount && (
            <p className="text-sm font-semibold text-green-600 mb-4">{product.discount}% OFF</p>
        )}
        <p className="text-sm text-gray-600 leading-relaxed">
            This is a great product that will solve all your problems. It's made of the finest materials and is guaranteed to last. Buy it now!
        </p>
      </div>
      
      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mt-4 p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-4">
              {recommendedProducts.map(recProduct => (
                  <div key={recProduct.id} className="bg-white rounded-lg shadow-sm p-2 cursor-pointer" onClick={() => navigate(`/product/${recProduct.id}`)}>
                      <img src={recProduct.image} alt={recProduct.name} className="w-full h-32 object-cover rounded-md mb-2" />
                      <h3 className="text-sm font-semibold line-clamp-2 h-10">{recProduct.name}</h3>
                      <p className="text-base font-bold mt-1">₹{recProduct.price}</p>
                  </div>
              ))}
          </div>
        </div>
      )}

      {/* Action bar */}
       <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t p-3 flex gap-4 items-center">
        {itemInCart ? (
          <>
            <div className="flex items-center justify-center w-1/3">
              <div className="flex items-center justify-between w-full max-w-[120px] h-11 border-2 border-gray-300 rounded-lg">
                  <button onClick={handleDecrement} className="px-4 py-1 text-xl font-bold text-gray-700">-</button>
                  <span className="text-base font-medium text-gray-800">{itemInCart.quantity}</span>
                  <button onClick={handleIncrement} className="px-4 py-1 text-xl font-bold text-gray-700">+</button>
              </div>
            </div>
            <Button className="w-2/3 h-12 bg-green-500 text-white text-base font-bold hover:bg-green-600" onClick={() => navigate('/bag')}>
                Go to Bag
            </Button>
          </>
        ) : (
           <Button className="w-full h-12 bg-green-500 text-white text-base font-bold hover:bg-green-600" onClick={handleAddToCart}>
                Add to Bag
            </Button>
        )}
      </div>
    </div>
  );
}; 