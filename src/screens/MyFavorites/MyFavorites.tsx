import { useFavoritesStore } from "../../store/favoritesStore";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

export const MyFavorites = (): JSX.Element => {
  const { favorites, removeFromFavorites } = useFavoritesStore();
  const navigate = useNavigate();

  return (
    <div className="bg-[#fafbff] min-h-screen pb-20">
      <div className="bg-white px-5 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2">
          <span className="text-lg">←</span>
        </button>
        <h1 className="text-2xl font-semibold text-blacknormal">My Favorites</h1>
      </div>
      <div className="p-5 space-y-4">
        {favorites.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No favorite items yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[#5ec401] font-semibold">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-gray-500 line-through text-sm">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => removeFromFavorites(item.id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 