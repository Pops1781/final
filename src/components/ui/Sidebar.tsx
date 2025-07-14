import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { images } from "../../constants/images";

interface Category {
  id: string;
  name: string;
  image: string;
  path: string;
}

export const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Define product categories
  const categories: Category[] = [
    {
      id: "lipsticks",
      name: "Lipsticks",
      image: images.lipsticks,
      path: "/shop-by/lipsticks"
    },
    {
      id: "foundations",
      name: "Foundations",
      image: images.foundations,
      path: "/shop-by/foundations"
    },
    {
      id: "mascaras",
      name: "Mascaras",
      image: images.mascaras,
      path: "/shop-by/mascaras"
    },
    {
      id: "eyeshadows",
      name: "Eyeshadows",
      image: images.eyeshadows,
      path: "/shop-by/eyeshadows"
    },
    {
      id: "blushes",
      name: "Blushes",
      image: images.blushes,
      path: "/shop-by/blushes"
    },
    {
      id: "highlighters",
      name: "Highlighters",
      image: images.highlighters,
      path: "/shop-by/highlighters"
    },
    {
      id: "eyeliners",
      name: "Eyeliners",
      image: images.eyeliners,
      path: "/shop-by/eyeliners"
    },
    {
      id: "primers",
      name: "Primers",
      image: images.primers,
      path: "/shop-by/primers"
    }
  ];

  // Get the active category from the URL path
  const getCategoryFromPath = () => {
    const path = location.pathname;
    const category = categories.find(cat => path.includes(cat.id));
    return category?.id || null;
  };

  const activeCategory = getCategoryFromPath();

  return (
    <div className="flex flex-row overflow-x-auto sm:flex-col sm:w-[60px] md:w-[70px] fixed left-0 top-[113px] z-[5] bg-white h-[calc(100vh-113px)] overflow-y-auto">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        const isHovered = hoveredCategory === category.id;

        return (
          <div 
            key={category.id}
            className={`flex flex-col items-center px-2 py-3 cursor-pointer ${
              isActive ? 'bg-[#f7f7f7]' : ''
            }`}
            onClick={() => navigate(category.path)}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className={`w-[34px] h-[34px] rounded-full overflow-hidden mb-1 ${
              isActive ? 'border border-[#5ec401]' : ''
            }`}>
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className={`text-[10px] text-center ${
              isActive ? 'text-[#5ec401] font-medium' : 'text-gray-600'
            }`}>
              {category.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}; 