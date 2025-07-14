import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useCartStore } from "../../store/cartStore";
import { useEffect } from "react";

export const ThankYou = (): JSX.Element => {
  const navigate = useNavigate();
  const { addOrder } = useCartStore();

  useEffect(() => {
    addOrder();
  }, [addOrder]);

  // Example delivery details (replace with real data as needed)
  const name = "SAI";
  const pincode = "560082";
  const address = "Udaipalya village Bengaluru,Karnataka";
  const phone = "70xxxxxx89";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fafbff] to-[#f3f6fb] p-6">
      <div className="flex flex-col items-center w-full max-w-xs mx-auto">
        {/* Checkmark icon */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#eaffea] mb-8 mt-2">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="24" fill="#5ec401" fillOpacity="0.15" />
            <path d="M16 24.5L22 30.5L32 18.5" stroke="#5ec401" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold font-['Poppins',sans-serif] text-black mb-4">Order placed</h1>
        {/* Delivery details */}
        <div className="text-center text-base text-black font-medium mb-1">
          Deliver To <span className="font-bold">{name}, {pincode}</span>
        </div>
        <div className="text-center text-sm text-black mb-1">
          {address}
        </div>
        <div className="text-center text-sm text-black mb-6">
          IN Phno-<span className="font-bold">{phone}</span>
        </div>
        {/* Back to Home button */}
        <Button className="w-full bg-[#5ec401] text-white text-base font-semibold rounded-lg py-2 mb-2" onClick={() => navigate("/")}>Back To Home</Button>
        {/* Go to my Orders link */}
        <button
          onClick={() => navigate("/profile?tab=orders")}
          className="bg-[#5ec401] text-white px-6 py-3 rounded-lg font-semibold mt-6 shadow hover:bg-[#4bb300] transition"
        >
          Go to My Orders
        </button>
      </div>
    </div>
  );
}; 