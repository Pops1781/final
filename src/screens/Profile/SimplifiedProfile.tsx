import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Phone, User, MapPin } from "lucide-react";
import { images } from "../../constants/images";
import { useState, useRef, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import { AddressMap } from "../../components/ui/AddressMap";

export const SimplifiedProfile = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orders, addresses, addAddress, updateAddress, removeAddress } = useCartStore();
  const ordersRef = useRef<HTMLDivElement>(null);
  
  const [editingAddress, setEditingAddress] = useState(null as any);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", pincode: "", label: "", address: "", landmark: "", phone: "" });

  const [mapPosition, setMapPosition] = useState<[number, number] | null>([12.9716, 77.5946]); // Default to Bangalore
  const [showMap, setShowMap] = useState(false);

  const [payments, setPayments] = useState([
    { id: 1, type: "Visa", last4: "1234", expiry: "08/26" },
    { id: 2, type: "Mastercard", last4: "5678", expiry: "11/25" },
  ]);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({ type: "", last4: "", expiry: "" });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'orders' && ordersRef.current) {
      ordersRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  const handleFetchLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setMapPosition([latitude, longitude]);
        setShowMap(true);

        // Fetch address from coordinates
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          if (data && data.display_name) {
            const address = data.display_name;
            const landmark = data.address.road || data.address.suburb || '';

            if (editingAddress) {
              setEditingAddress((prev: any) => ({ ...prev!, address, landmark }));
            } else if (showAddAddress) {
              setNewAddress((prev: any) => ({ ...prev, address, landmark }));
            }
          }
        } catch (error) {
          console.error("Error fetching address: ", error);
        }
      },
      (error) => {
        console.error("Error getting location: ", error);
        // Fallback to default or show an error message
        setShowMap(true); // Still show map, but with default location
      }
    );
  };

  return (
    <div className="bg-[#f7f8fa] min-h-screen pb-10">
      {/* Header */}
      <div className="bg-[#5ec401] px-6 py-5 flex items-center gap-4 text-white shadow-md">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-[#4bb300]/20 transition">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow overflow-hidden">
              <img 
                src={images.profile}
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
          {/* User Details */}
          <div className="flex-1 w-full">
            <h2 className="text-xl font-bold mb-2 text-[#222]">Jane Smith</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex items-center gap-2">
                <User className="text-[#5ec401] w-5 h-5" />
                <span className="font-medium">jane.smith@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-[#5ec401] w-5 h-5" />
                <span className="font-medium">9876543210</span>
              </div>
            </div>
            <button 
              onClick={() => navigate("/")}
              className="mt-6 px-5 py-2 bg-[#5ec401] text-white rounded-lg font-semibold shadow hover:bg-[#4bb300] transition"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* My Previous Orders */}
        <div ref={ordersRef} className="bg-white rounded-2xl shadow p-6 mb-10">
          <h3 className="text-lg font-bold mb-6 text-[#222] tracking-tight">My Previous Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-500 text-center">You have no previous orders.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {orders.slice().reverse().map((order) => (
                <div 
                  key={order.id}
                  onClick={() => navigate(`/order/${order.id.replace('#', '')}`)}
                  className="border rounded-xl p-4 flex flex-col gap-2 bg-gray-50 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="font-semibold text-base">Order {order.id}</div>
                  <div className="text-xs text-gray-500 mb-1">
                    Delivered on {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <img src={order.items[0]?.image || images.beautyProducts} alt="Product" className="w-10 h-10 rounded" />
                    <span className="text-sm">{order.items[0]?.name || 'Order Item'}{order.items.length > 1 ? ` + ${order.items.length - 1} more` : ''}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#5ec401] font-bold text-lg">₹{order.total.toFixed(2)}</span>
                    <button className="text-xs px-3 py-1 border border-[#5ec401] text-[#5ec401] rounded hover:bg-[#e6f9d5] font-semibold">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Addresses */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10">
          <h3 className="text-lg font-bold mb-6 flex items-center justify-between text-[#222] tracking-tight">
            Saved Addresses
            <button className="text-xs px-3 py-1 border border-[#5ec401] text-[#5ec401] rounded hover:bg-[#e6f9d5] font-semibold" onClick={() => setShowAddAddress(true)}>Add Address</button>
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {addresses.map(addr => (
              <div key={addr.id} className="border rounded-xl p-4 bg-gray-50 flex flex-col gap-1 shadow-sm">
                <div className="font-semibold mb-1 text-base">{addr.label} ({addr.name})</div>
                <div className="text-sm text-gray-700">{addr.address}, {addr.pincode}</div>
                <div className="text-sm text-gray-600">Landmark: {addr.landmark}</div>
                <div className="text-xs text-gray-500 mt-1">Phone: {addr.phone}</div>
                <div className="flex gap-2 mt-2">
                  <button className="text-xs px-3 py-1 border border-[#5ec401] text-[#5ec401] rounded hover:bg-[#e6f9d5] font-semibold" onClick={() => setEditingAddress(addr)}>Edit</button>
                  <button className="text-xs px-3 py-1 border border-red-400 text-red-500 rounded hover:bg-red-50 font-semibold" onClick={() => removeAddress(addr.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          {/* Edit Address Modal */}
          {editingAddress && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h4 className="font-bold mb-4">Edit Address</h4>
                {showMap && mapPosition && (
                  <div className="mb-4">
                    <AddressMap position={mapPosition} addressLabel={editingAddress.label || "Selected Location"}/>
                  </div>
                )}
                <button
                  onClick={handleFetchLocation}
                  className="w-full flex items-center justify-center gap-2 text-sm text-[#5ec401] font-semibold mb-4 p-2 border rounded-lg hover:bg-green-50"
                >
                  <MapPin className="w-4 h-4" />
                  Use Current Location
                </button>
                <input className="border p-2 w-full mb-2 rounded" placeholder="Name" value={editingAddress.name} onChange={e => setEditingAddress({ ...editingAddress, name: e.target.value })} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Pincode" value={editingAddress.pincode} onChange={e => setEditingAddress({ ...editingAddress, pincode: e.target.value })} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Label" value={editingAddress.label} onChange={e => setEditingAddress({ ...editingAddress, label: e.target.value })} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Address" value={editingAddress.address} onChange={e => setEditingAddress({ ...editingAddress, address: e.target.value })} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Landmark" value={editingAddress.landmark} onChange={e => setEditingAddress({ ...editingAddress, landmark: e.target.value })} />
                <input
                  type="tel"
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Phone"
                  maxLength={10}
                  value={editingAddress.phone}
                  onChange={e => setEditingAddress({ ...editingAddress, phone: e.target.value.replace(/[^0-9]/g, '') })}
                />
                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-2 bg-[#5ec401] text-white rounded-lg flex-1" onClick={() => {
                    updateAddress(editingAddress);
                    setEditingAddress(null);
                    setShowMap(false);
                  }}>Save</button>
                  <button className="px-4 py-2 bg-gray-200 rounded-lg flex-1" onClick={() => {
                    setEditingAddress(null);
                    setShowMap(false);
                  }}>Cancel</button>
                </div>
              </div>
            </div>
          )}
          {/* Add Address Modal */}
          {showAddAddress && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h4 className="font-bold mb-4">Add Address</h4>
                {showMap && mapPosition && (
                  <div className="mb-4">
                    <AddressMap position={mapPosition} addressLabel={newAddress.label || "Selected Location"}/>
                  </div>
                )}
                <button
                  onClick={handleFetchLocation}
                  className="w-full flex items-center justify-center gap-2 text-sm text-[#5ec401] font-semibold mb-4 p-2 border rounded-lg hover:bg-green-50"
                >
                  <MapPin className="w-4 h-4" />
                  Use Current Location
                </button>
                <input className="border p-2 w-full mb-2 rounded" placeholder="Name" value={newAddress.name} onChange={e => setNewAddress({ ...newAddress, name: e.target.value })} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Pincode" value={newAddress.pincode} onChange={e => setNewAddress({ ...newAddress, pincode: e.target.value })} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Label" value={newAddress.label} onChange={e => setNewAddress({ ...newAddress, label: e.target.value })} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Address" value={newAddress.address} onChange={e => setNewAddress({ ...newAddress, address: e.target.value })} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Landmark" value={newAddress.landmark} onChange={e => setNewAddress({ ...newAddress, landmark: e.target.value })} />
                <input
                  type="tel"
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Phone"
                  maxLength={10}
                  value={newAddress.phone}
                  onChange={e => setNewAddress({ ...newAddress, phone: e.target.value.replace(/[^0-9]/g, '') })}
                />
                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-2 bg-[#5ec401] text-white rounded-lg flex-1" onClick={() => {
                    addAddress(newAddress);
                    setNewAddress({ name: "", pincode: "", label: "", address: "", landmark: "", phone: "" });
                    setShowAddAddress(false);
                    setShowMap(false);
                  }}>Add</button>
                  <button className="px-4 py-2 bg-gray-200 rounded-lg flex-1" onClick={() => {
                    setShowAddAddress(false)
                    setShowMap(false);
                    }}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Saved Payment Methods */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center justify-between">
            Saved Payment Methods
            <button className="text-xs px-3 py-1 border border-[#5ec401] text-[#5ec401] rounded hover:bg-[#e6f9d5]" onClick={() => setShowAddPayment(true)}>Add Payment</button>
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {payments.map(pm => (
              <div key={pm.id} className="border rounded-lg p-4 bg-gray-50 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-8 h-5 bg-gray-200 rounded mr-2" />
                  <span className="font-semibold">{pm.type} ending {pm.last4}</span>
                </div>
                <div className="text-xs text-gray-500">Expires {pm.expiry}</div>
                <button className="mt-1 text-xs px-3 py-1 border border-red-400 text-red-500 rounded hover:bg-red-50" onClick={() => setPayments(payments.filter(p => p.id !== pm.id))}>Remove</button>
              </div>
            ))}
          </div>
          {/* Add Payment Modal */}
          {showAddPayment && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h4 className="font-bold mb-2">Add Payment Method</h4>
                <input className="border p-2 w-full mb-2 rounded" placeholder="Type (e.g. Visa)" value={newPayment.type} onChange={e => setNewPayment({ ...newPayment, type: e.target.value })} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Last 4 digits" value={newPayment.last4} onChange={e => setNewPayment({ ...newPayment, last4: e.target.value })} />
                <input className="border p-2 w-full mb-2 rounded" placeholder="Expiry (MM/YY)" value={newPayment.expiry} onChange={e => setNewPayment({ ...newPayment, expiry: e.target.value })} />
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 bg-[#5ec401] text-white rounded" onClick={() => {
                    setPayments([...payments, { ...newPayment, id: Date.now() }]);
                    setNewPayment({ type: "", last4: "", expiry: "" });
                    setShowAddPayment(false);
                  }}>Add</button>
                  <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setShowAddPayment(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 