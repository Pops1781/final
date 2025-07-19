import { useState } from "react";
import { BellIcon, Heart } from "lucide-react";
import { Avatar } from "../../../../components/ui/avatar";
import { images } from "../../../../constants/images";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../../../store/productStore";

export const FrameWrapperByAnima = (): JSX.Element => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { products: allProducts } = useProductStore();

  // Filter products as user types
  const filteredProducts = search.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col w-full items-center gap-4 pt-2.5 pb-5 px-3 sm:px-5 bg-white">
      {/* App Header */}
      <div className="flex items-center justify-between relative self-stretch w-full">
        <div className="font-['Inter',Helvetica] font-semibold text-blacknormal text-xl sm:text-2xl">
          Sample Kart
        </div>
        <div className="flex items-center gap-3 sm:gap-[12px]">
          <a 
            href="/notifications" 
            className="relative w-7 h-7 sm:w-6 sm:h-6 hover:text-[#5ec401] transition-colors block"
          >
            <BellIcon className="absolute w-5 h-5 sm:w-6 sm:h-6 top-0 left-0 text-black" />
          </a>
          <button onClick={() => navigate("/favorites")} className="p-1 hover:text-[#5ec401]">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <a 
            href="/profile" 
            className="p-0 hover:opacity-80 transition-opacity block"
          >
            <Avatar className="w-7 h-7 sm:w-[25px] sm:h-[25px]">
              <img
                className="w-full h-full object-cover"
                alt="Profile"
                src={images.profile}
              />
            </Avatar>
          </a>
        </div>
      </div>
      {/* Search Bar */}
      <div className="relative self-stretch w-full">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for products, brands, and more..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5ec401] focus:border-transparent"
        />
        {/* Show filtered results below search bar */}
        {search.trim() && (
          <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-20 max-h-60 overflow-y-auto">
            {filteredProducts.length === 0 ? (
              <div className="p-3 text-gray-500 text-sm">No results found.</div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded" />
                  <span className="text-sm">{product.name}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
