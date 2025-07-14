import { HomeIcon, LayoutGridIcon, TagIcon, ShoppingBag } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCartStore, CartItem } from "../../../../store/cartStore";

export const DivWrapperByAnima = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCartStore();

  // Calculate total quantity of items in the cart
  const totalItems = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  // Navigation items data for easy mapping
  const navItems = [
    {
      id: "home",
      icon: HomeIcon,
      label: "Home",
      path: "/",
    },
    {
      id: "categories",
      icon: LayoutGridIcon,
      label: "Categories",
      path: "/categories",
    },
    {
      id: "offers",
      icon: TagIcon,
      label: "Offers",
      path: "/offers",
    },
    {
      id: "bag",
      icon: ShoppingBag,
      label: "Bag",
      path: "/cart",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-between rounded-t-2xl bg-white/90 backdrop-blur-md px-6 py-2.5 shadow-[0_0_16px_#0002] z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`flex flex-col items-center justify-center gap-1 cursor-pointer focus:outline-none transition-all duration-200 relative group ${isActive ? 'scale-105' : 'hover:scale-105'}`}
            style={{ width: item.id === "bag" ? "27px" : "30px" }}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
          >
            <span className={`transition-colors duration-200 flex items-center justify-center ${isActive ? 'text-[#5ec401]' : 'text-[#979797] group-hover:text-[#5ec401]'} transition-transform ${isActive ? 'scale-105' : 'scale-100'}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon className={isActive ? 'h-6 w-6' : 'h-5 w-5'} />
            </span>
            <span
              className={`text-center text-xs font-semibold font-['Poppins',sans-serif] leading-normal tracking-wide transition-colors duration-200 ${isActive ? 'text-[#5ec401]' : 'text-[#979797] group-hover:text-[#5ec401]'}`}
            >
              {item.label}
            </span>
            {item.id === "bag" && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};