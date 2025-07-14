import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { MinusIcon, PlusIcon, TrashIcon, ArrowLeftIcon, TagIcon } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { DivWrapperByAnima } from "../Home/sections/DivWrapperByAnima";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { ProgressBar } from "../../components/ui/progress-bar";

export const Cart = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    updateQuantity,
    savedItems,
    recentlyViewed,
    appliedCoupon,
    discount,
    removeCoupon
  } = useCartStore();

  // Price calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST

  const initialShipping = subtotal > 500 || (appliedCoupon === 'FREESHIP') ? 0 : 100;
  const [shipping, setShipping] = useState(initialShipping);

  // Update shipping when coupon changes
  useEffect(() => {
    setShipping(subtotal > 500 || (appliedCoupon === 'FREESHIP') ? 0 : 100);
  }, [appliedCoupon, subtotal]);

  // Recalculate total whenever dependencies change
  const total = subtotal + shipping + tax - discount;

  // Delivery date calculation
  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-[#fafbff] min-h-screen pb-28">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-['Poppins',sans-serif] text-black">My Bag</h1>
      </div>

      {/* Only show main content if cart is not empty */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 min-h-[60vh] w-full">
          {/* Bag illustration (SVG) */}
          <svg width="96" height="96" fill="none" viewBox="0 0 96 96" className="mb-6">
            <rect x="16" y="32" width="64" height="40" rx="8" fill="#f3f4f6"/>
            <path d="M32 32V28a16 16 0 0132 0v4" stroke="#5ec401" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="48" cy="48" r="8" fill="#5ec401"/>
            <rect x="36" y="56" width="24" height="8" rx="4" fill="#e5e7eb"/>
          </svg>
          <p className="text-gray-500 mb-4 text-lg font-medium">Your shopping bag is empty</p>
          <div className="flex justify-center w-full">
            <button
              onClick={() => navigate("/")}
              className="bg-[#5ec401] text-white px-8 py-3 rounded-lg text-base font-semibold shadow-md hover:bg-[#4bb300] transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="px-4 w-full my-4">
            <ProgressBar steps={["Bag", "Address", "Payment"]} currentStep={1} />
          </div>
          <div className="p-4 space-y-3 max-w-2xl mx-auto">
            <div className="text-lg font-medium mb-1">Products</div>
            
            {/* Cart Items */}
            <div className="space-y-3">
            {items.map((item, index) => (
              <Card key={item.id} className="overflow-hidden border border-gray-200 rounded-lg">
                <CardContent className="p-3">
                  <div className="flex justify-between">
                    <div className="flex gap-3">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        {index === 0 && (
                          <span className="absolute top-0 left-0 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-sm">
                            Best Seller
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-sm leading-tight mb-1">{item.name}</h3>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#5ec401] font-semibold">₹{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-gray-500 line-through text-xs">
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>
                          {item.colors && (
                            <div className="flex items-center space-x-2 mt-1">
                              {item.colors.map((color: string, i: number) => (
                                <div
                                  key={i}
                                  className={`w-4 h-4 rounded-full border ${i === 0 ? 'border-[#5ec401] p-0.5' : 'border-gray-300'}`}
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => {
                              if (item.quantity - 1 <= 0) {
                                removeItem(item.id);
                              } else {
                                updateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 transition-colors duration-150 hover:bg-[#e6f9d5] active:scale-90 focus:ring-2 focus:ring-[#5ec401]"
                          >
                            <MinusIcon className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-sm transition-all duration-150" key={item.quantity}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 transition-colors duration-150 hover:bg-[#e6f9d5] active:scale-90 focus:ring-2 focus:ring-[#5ec401]"
                          >
                            <PlusIcon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 p-1 transition-colors duration-150 hover:text-red-500 active:scale-90 focus:ring-2 focus:ring-red-300"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <div className="text-right text-xs">
                        <div className="flex items-center justify-end">
                          <span className="text-[#5ec401] font-medium">FREE</span>
                          <span className="ml-1 line-through text-gray-400 text-[10px]">₹40</span>
                        </div>
                        <div className="text-gray-600 mt-1">
                          Delivery by {31 + index} March 2024
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>

            {/* Coupon Section */}
            <div className="mt-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <TagIcon className="w-6 h-6 text-[#5ec401]" />
                      <div>
                        {appliedCoupon ? (
                          <>
                            <p className="font-bold text-green-600">Coupon Applied!</p>
                            <p className="text-sm text-gray-600 font-semibold">{appliedCoupon}</p>
                          </>
                        ) : (
                          <p className="font-semibold">Apply Coupon</p>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => appliedCoupon ? removeCoupon() : navigate('/coupons')}
                      variant="outline"
                      className="text-[#5ec401] border-[#5ec401] hover:bg-green-50"
                    >
                      {appliedCoupon ? 'Remove' : 'Select'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Estimated delivery: {getDeliveryDate()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recently Viewed Items */}
          {recentlyViewed.length > 0 && (
            <div className="mt-8">
              <h2 className="font-semibold mb-4">Recently Viewed</h2>
              <div className="grid grid-cols-2 gap-4">
                {recentlyViewed.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-[#5ec401] font-semibold">₹{item.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Saved Items Section */}
          {savedItems.length > 0 && (
            <div className="mt-8">
              <h2 className="font-semibold mb-4">Saved for Later</h2>
              <div className="space-y-4">
                {savedItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">₹{item.price}</span>
                            {item.originalPrice && (
                              <span className="text-gray-500 line-through text-sm">
                                ₹{item.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Bottom Navigation Bar: Only show if cart is not empty */}
      {items.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-10">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <div className="text-black font-semibold">
              <div className="text-lg">₹{Math.round(total)}</div>
            </div>
            <Button
              onClick={() => navigate("/checkout")}
              className="bg-[#5ec401] text-white rounded-lg px-8 h-10 text-base font-semibold"
            >
              Proceed to Pay
            </Button>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 grid grid-cols-4 text-xs text-gray-500 pt-2 pb-1 z-20">
        <div className="flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Categories</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"></path>
            <polyline points="9 10 12 13 15 10"></polyline>
            <line x1="12" y1="16" x2="12" y2="4"></line>
          </svg>
          <span>Offers</span>
        </div>
        <div className="flex flex-col items-center justify-center text-[#5ec401]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#5ec401]">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span>Bag</span>
        </div>
      </div>

      <DivWrapperByAnima />
    </div>
  );
};
