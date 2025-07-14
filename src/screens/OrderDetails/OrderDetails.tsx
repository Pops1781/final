import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { ArrowLeft, CheckCircle2, MoreVertical, Star, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "../../components/ui/button";

export const OrderDetails = (): JSX.Element => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useCartStore();
  const order = orders.find(o => o.id === `#${orderId}`);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <Button onClick={() => navigate('/profile?tab=orders')}>Go back to orders</Button>
      </div>
    );
  }

  const orderDate = new Date(order.date);
  const deliveredDate = new Date(order.date);
  deliveredDate.setDate(orderDate.getDate() + 2); // Mock delivery 2 days later

  return (
    <div className="bg-[#f1f3f6] min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2">
                <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Order Details</h1>
        </div>
        <button className="p-2">
            <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Order ID & Tracking */}
        <div className="bg-white rounded-lg p-4 text-sm">
            <p className="text-gray-500">Order ID - OD{order.id.replace('#', '')}{orderDate.getTime()}</p>
            <p className="text-gray-500 mt-1">Order can be tracked by <span className="font-semibold text-black">{order.id}</span></p>
        </div>

        {/* Product Details */}
        {order.items.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/product/${item.id}`)}
            >
                <div className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                    <div className="flex-1">
                        <h2 className="font-bold text-base leading-tight">{item.name}</h2>
                        <p className="text-sm text-gray-500 mt-1">Seller: Wizrob Fashion</p>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-lg font-bold">₹{item.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-400 line-through">₹{item.originalPrice?.toFixed(2)}</p>
                            <p className="text-sm text-green-600 font-semibold">1 offer</p>
                        </div>
                    </div>
                </div>
                 <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded-md mt-3">
                    Item was opened and verified at the time of delivery.
                </div>
            </div>
        ))}

        {/* Order Status Timeline */}
        <div className="bg-white rounded-lg p-4">
            <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="flex items-start gap-4 mb-4 relative z-10">
                    <CheckCircle2 className="w-8 h-8 text-green-500 bg-white" />
                    <div>
                        <p className="font-semibold">Order Confirmed</p>
                        <p className="text-xs text-gray-500">{orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4 relative z-10">
                    <CheckCircle2 className="w-8 h-8 text-green-500 bg-white" />
                    <div>
                        <p className="font-semibold">Delivered</p>
                        <p className="text-xs text-gray-500">{deliveredDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Return Policy and Rating */}
        <div className="bg-white rounded-lg p-4 text-sm">
            <p>Return policy valid till <span className="text-green-600 font-semibold">{new Date(deliveredDate.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span></p>
            <div className="flex justify-center items-center gap-2 my-6">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 text-gray-300" />
                ))}
            </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full bg-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5"/> Return
            </Button>
            <Button variant="outline" className="w-full bg-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5"/> Chat with us
            </Button>
        </div>

      </div>
    </div>
  );
}; 