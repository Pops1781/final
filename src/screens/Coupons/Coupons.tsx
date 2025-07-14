import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { ArrowLeftIcon, TagIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export const Coupons = (): JSX.Element => {
  const navigate = useNavigate();
  const { items, applyCoupon, appliedCoupon, removeCoupon } = useCartStore();
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(appliedCoupon);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const coupons = {
    "SAVE10": { type: "percentage", value: 0.1, description: "10% off your order" },
    "SAVE20": { type: "percentage", value: 0.2, description: "20% off your order" },
    "FREESHIP": { type: "shipping", value: 0, description: "Free shipping on your order" },
    "OFF250": { type: "fixed", value: 250, description: `Flat ₹250 off on orders above ₹1000` }
  };

  const calculateSaving = (code: string) => {
    const coupon = coupons[code as keyof typeof coupons];
    if (!coupon) return 0;

    if (coupon.type === 'fixed') return coupon.value;
    if (coupon.type === 'percentage') return subtotal * coupon.value;
    if (coupon.type === 'shipping') return 100; // Assuming a standard shipping fee
    return 0;
  };

  const handleApply = () => {
    if (selectedCoupon) {
      applyCoupon(selectedCoupon);
    }
    navigate('/cart');
  };

  const handleSelectCoupon = (code: string) => {
    if (selectedCoupon === code) {
        setSelectedCoupon(null); // Deselect if already selected
        removeCoupon();
    } else {
        setSelectedCoupon(code);
    }
  }

  const maxSavings = selectedCoupon ? calculateSaving(selectedCoupon) : 0;

  return (
    <div className="bg-[#fafbff] min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white px-5 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
            <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold font-['Poppins',sans-serif] text-black">Apply Coupon</h1>
        </div>

        <main className="flex-grow p-4">
            {/* Input for coupon code */}
            <div className="relative mb-6">
                <Input
                    placeholder="Enter coupon code"
                    className="h-12 pr-24"
                />
                <Button variant="outline" className="absolute right-1 top-1/2 -translate-y-1/2 h-10 text-[#5ec401] font-bold border-gray-300 hover:bg-gray-100 hover:text-[#4bb300]">
                    Check
                </Button>
            </div>
            
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Available Coupons</h2>

            {/* List of available coupons */}
            <div className="space-y-3">
            {Object.entries(coupons).map(([code, { description }]) => (
                <div
                key={code}
                onClick={() => handleSelectCoupon(code)}
                className={`p-4 border rounded-lg flex items-start gap-4 cursor-pointer transition-all ${
                    selectedCoupon === code ? 'border-[#5ec401] bg-green-50' : 'border-gray-200 bg-white'
                }`}
                >
                <TagIcon className={`w-6 h-6 mt-1 transition-colors ${selectedCoupon === code ? 'text-[#5ec401]' : 'text-gray-400'}`} />
                <div className="flex-grow">
                    <p className="font-bold text-base text-gray-800 tracking-wider">{code}</p>
                    <p className="text-sm text-gray-600">{description}</p>
                    {selectedCoupon === code && (
                         <p className="text-sm font-bold text-green-600 mt-1">
                            You save ₹{calculateSaving(code).toFixed(2)}
                        </p>
                    )}
                </div>
                <div className={`w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedCoupon === code ? 'bg-[#5ec401] border-[#5ec401]' : 'border-gray-300'
                }`}>
                    {selectedCoupon === code && <div className="w-3 h-3 bg-white rounded-full" />}
                </div>
                </div>
            ))}
            </div>
        </main>
      
        {/* Footer */}
        <div className="bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] sticky bottom-0 z-10">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-lg font-bold">₹{maxSavings.toFixed(2)}</p>
                    <p className="text-xs text-gray-500 -mt-1">Maximum savings</p>
                </div>
                <Button
                    onClick={handleApply}
                    disabled={!selectedCoupon}
                    className="bg-[#5ec401] text-white rounded-lg px-12 py-6 text-base font-semibold w-1/2"
                >
                    Apply
                </Button>
            </div>
        </div>
    </div>
  );
}; 