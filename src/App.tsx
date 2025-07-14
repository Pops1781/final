import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home/Home";
import { Categories } from "./screens/Categories/Categories";
import { ShopByCategoryPage } from "./screens/ShopBy/ShopByCategoryPage";
import { ProductDetails } from "./screens/ProductDetails/ProductDetails";
import { MyFavorites } from "./screens/MyFavorites/MyFavorites";
import { Cart } from "./screens/Cart/Cart";
import { Checkout } from "./screens/Checkout/Checkout";
import { ThankYou } from "./screens/ThankYou/ThankYou";
import { SimplifiedProfile } from "./screens/Profile/SimplifiedProfile";
import { SimplifiedNotifications } from "./screens/Profile/SimplifiedNotifications";
import { SearchResultsPage } from "./screens/Search/SearchResultsPage";
import { Offers } from "./screens/Offers";
import { Coupons } from "./screens/Coupons/Coupons";
import { OrderDetails } from "./screens/OrderDetails/OrderDetails";

function App() {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<SimplifiedProfile />} />
        <Route path="/notifications" element={<SimplifiedNotifications />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/shop-by/:category" element={<ShopByCategoryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/favorites" element={<MyFavorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/order/:orderId" element={<OrderDetails />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/offers" element={<Offers />} />
        {/* Direct category routes for sidebar */}
        <Route path="/shop-by/lipsticks" element={<ShopByCategoryPage />} />
        <Route path="/shop-by/foundations" element={<ShopByCategoryPage />} />
        <Route path="/shop-by/mascaras" element={<ShopByCategoryPage />} />
        <Route path="/shop-by/eyeshadows" element={<ShopByCategoryPage />} />
        <Route path="/shop-by/blushes" element={<ShopByCategoryPage />} />
        <Route path="/shop-by/highlighters" element={<ShopByCategoryPage />} />
        <Route path="/shop-by/eyeliners" element={<ShopByCategoryPage />} />
        <Route path="/shop-by/primers" element={<ShopByCategoryPage />} />
        <Route path="/shop-by" element={<ShopByCategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App; 