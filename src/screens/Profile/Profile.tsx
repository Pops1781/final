import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Camera, Edit, ChevronRight, CreditCard, MapPin, 
  Package, Award, Bell, Moon, Sun, HelpCircle, LogOut, User
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Avatar } from "../../components/ui/avatar";
import { images } from "../../constants/images";
import { DivWrapperByAnima } from "../Home/sections/DivWrapperByAnima";

// Example user data
const userData = {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  phone: "9876543210",
  profilePicture: images.profile,
};

// Example address data
const addressData = {
  street: "123 Main Street, Apt 4B",
  city: "Bangalore",
  state: "Karnataka",
  postalCode: "560001",
  country: "India",
  phone: "9876543210"
};

// Example order history data
const orderHistory = [
  {
    id: "ORD123456",
    date: "2023-05-15",
    status: "Delivered",
    total: 1250
  },
  {
    id: "ORD789012",
    date: "2023-06-02",
    status: "Shipped",
    total: 850
  },
  {
    id: "ORD345678",
    date: "2023-06-20",
    status: "Pending",
    total: 1680
  }
];

// Example payment methods
const paymentMethods = [
  {
    id: "card1",
    cardNumber: "•••• 5678",
    cardType: "visa",
    expiryDate: "12/25",
    isDefault: true
  },
  {
    id: "card2",
    cardNumber: "•••• 1234",
    cardType: "mastercard",
    expiryDate: "09/24",
    isDefault: false
  }
];

interface UserProfileData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();
  
  // User information state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileData>({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
  });
  const [userProfileErrors, setUserProfileErrors] = useState<FormErrors>({});
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Handle profile input changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (userProfileErrors[name]) {
      setUserProfileErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate profile data
  const validateProfileData = (): boolean => {
    const errors: FormErrors = {};
    
    if (!userProfile.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!userProfile.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(userProfile.phone.replace(/[^\d]/g, ''))) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    
    setUserProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Save profile changes
  const saveProfileChanges = async () => {
    if (!validateProfileData()) return;
    
    setIsSavingProfile(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success - update the user data and exit edit mode
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setUserProfileErrors({
        form: "Failed to save profile. Please try again."
      });
    } finally {
      setIsSavingProfile(false);
    }
  };
  
  // Toggle theme
  const toggleTheme = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIsDarkMode(!isDarkMode);
      // In a real app, you'd apply the theme class to body or a wrapper div
      // document.body.classList.toggle('dark');
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="bg-[#fafbff] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold font-['Poppins',sans-serif] text-black">My Profile</h1>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* User Information */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                  <img src={userData.profilePicture} alt={userData.name} className="w-full h-full object-cover" />
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-[#5ec401] text-white p-1.5 rounded-full shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              {/* User Details */}
              <div className="flex-1 space-y-4">
                {isEditingProfile ? (
                  <div className="space-y-3">
                    {userProfileErrors.form && (
                      <div className="bg-red-50 text-red-500 p-2 rounded">
                        {userProfileErrors.form}
                      </div>
                    )}
                    
                    <div>
                      <Input 
                        name="name"
                        value={userProfile.name}
                        onChange={handleProfileChange}
                        placeholder="Full Name"
                        className={userProfileErrors.name ? "border-red-500" : ""}
                      />
                      {userProfileErrors.name && (
                        <p className="text-red-500 text-xs mt-1">{userProfileErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <Input 
                        name="email"
                        value={userProfile.email}
                        onChange={handleProfileChange}
                        placeholder="Email Address"
                        disabled
                        className="bg-gray-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                    
                    <div>
                      <Input 
                        name="phone"
                        value={userProfile.phone}
                        onChange={handleProfileChange}
                        placeholder="Phone Number"
                        className={userProfileErrors.phone ? "border-red-500" : ""}
                      />
                      {userProfileErrors.phone && (
                        <p className="text-red-500 text-xs mt-1">{userProfileErrors.phone}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => setIsEditingProfile(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={saveProfileChanges}
                        className="flex-1 bg-[#5ec401]"
                        disabled={isSavingProfile}
                      >
                        {isSavingProfile ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold">{userProfile.name}</h2>
                    <p className="text-gray-600">{userProfile.email}</p>
                    <p className="text-gray-600">{userProfile.phone}</p>
                    <Button
                      onClick={() => setIsEditingProfile(true)}
                      className="mt-4 flex items-center gap-2 bg-[#5ec401]"
                    >
                      <Edit className="w-4 h-4" /> Edit Profile
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Default Shipping Address */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5ec401] mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">Default Shipping Address</h3>
                  {addressData ? (
                    <div className="text-gray-600 mt-1">
                      <p>{addressData.street}</p>
                      <p>{addressData.city}, {addressData.state} {addressData.postalCode}</p>
                      <p>{addressData.country}</p>
                      <p className="mt-1">Phone: {addressData.phone}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 mt-1">No default address set</p>
                  )}
                </div>
              </div>
              {addressData ? (
                <Button
                  onClick={() => navigate("/addresses")}
                  variant="outline"
                  className="flex items-center gap-1 h-9"
                >
                  Change <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => navigate("/addresses")}
                  className="bg-[#5ec401] text-white h-9"
                >
                  Add Address
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Order History */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#5ec401]" />
                <h3 className="text-lg font-semibold">Recent Orders</h3>
              </div>
              <Button
                onClick={() => navigate("/orders")}
                variant="outline"
                className="h-8 text-xs"
              >
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {orderHistory.map(order => (
                <div 
                  key={order.id}
                  className="border rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                    <div className={`text-xs font-medium mt-1 inline-block px-2 py-0.5 rounded-full ${
                      order.status === "Delivered" 
                        ? "bg-green-100 text-green-800" 
                        : order.status === "Shipped" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {order.status}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-right">₹{order.total}</p>
                    <Button
                      onClick={() => 
                        order.status === "Shipped" 
                          ? navigate(`/orders/${order.id}/track`) 
                          : navigate(`/orders/${order.id}`)
                      }
                      variant="outline"
                      className="h-8 mt-2 text-xs"
                    >
                      {order.status === "Shipped" ? "Track Order" : "Details"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Saved Payment Methods */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#5ec401]" />
                <h3 className="text-lg font-semibold">Saved Payment Methods</h3>
              </div>
              <Button
                onClick={() => navigate("/payment-methods")}
                className="bg-[#5ec401] h-8 text-xs"
              >
                Add New Card
              </Button>
            </div>
            
            {paymentMethods.length > 0 ? (
              <div className="space-y-3">
                {paymentMethods.map(card => (
                  <div 
                    key={card.id}
                    className="border rounded-lg p-3 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                        {card.cardType === "visa" ? (
                          <span className="font-bold text-blue-600 text-xs">VISA</span>
                        ) : (
                          <span className="font-bold text-orange-600 text-xs">MC</span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{card.cardNumber}</p>
                        <p className="text-sm text-gray-500">Expires: {card.expiryDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {card.isDefault ? (
                        <span className="text-xs text-[#5ec401] font-medium">Default</span>
                      ) : (
                        <Button
                          variant="outline"
                          className="h-8 text-xs"
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="h-8 text-xs text-red-500 border-red-200 hover:bg-red-50 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No payment methods saved</p>
            )}
          </CardContent>
        </Card>
        
        {/* Loyalty & Rewards */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#5ec401] mt-1" />
                <div>
                  <h3 className="text-lg font-semibold">Loyalty Points</h3>
                  <p className="text-xl font-bold text-[#5ec401] mt-1">1,250 points</p>
                  <p className="text-amber-600 text-sm mt-1">100 points expiring on July 31st</p>
                </div>
              </div>
              <Button
                onClick={() => navigate("/rewards")}
                variant="outline"
                className="flex items-center gap-1 h-9"
              >
                View Rewards <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Notifications */}
        <Card>
          <CardContent className="p-4">
            <div onClick={() => navigate("/notifications")} className="cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-[#5ec401]" />
                  <h3 className="text-lg font-semibold">Notifications & Preferences</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* App Settings & Theme */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#5ec401]" />
                <h3 className="text-lg font-semibold">App Settings</h3>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Dark Mode Toggle */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {isDarkMode ? (
                    <Moon className="w-5 h-5 text-purple-500" />
                  ) : (
                    <Sun className="w-5 h-5 text-amber-500" />
                  )}
                  <span>Dark Mode</span>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                  <input
                    type="checkbox"
                    id="toggle"
                    className="absolute w-0 h-0 opacity-0"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                  />
                  <label
                    htmlFor="toggle"
                    className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                      isDarkMode ? "bg-[#5ec401]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                        isDarkMode ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </label>
                </div>
              </div>
              
              {/* Regional Settings */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <span>Currency</span>
                  <select className="p-2 border rounded-md">
                    <option value="INR">₹ INR</option>
                    <option value="USD">$ USD</option>
                    <option value="EUR">€ EUR</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span>Units</span>
                  <select className="p-2 border rounded-md">
                    <option value="metric">Metric (g, ml)</option>
                    <option value="imperial">Imperial (oz, fl oz)</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Help & Support */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#5ec401]" />
                <h3 className="text-lg font-semibold">Help & Support</h3>
              </div>
              <Button
                onClick={() => window.location.href = "mailto:support@beautyplus.com"}
                variant="outline"
                className="h-8 text-xs"
              >
                Contact Support
              </Button>
            </div>
            
            {/* FAQ Accordion */}
            <div className="space-y-2 mt-2">
              <div className="border rounded-md overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-3 cursor-pointer font-medium">
                    How do I track my order?
                    <ChevronRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="p-3 pt-0 border-t">
                    <p className="text-sm text-gray-600">You can track your order by going to "My Orders" in your profile and clicking on "Track Order" for any shipped items.</p>
                  </div>
                </details>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-3 cursor-pointer font-medium">
                    How do I return an item?
                    <ChevronRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="p-3 pt-0 border-t">
                    <p className="text-sm text-gray-600">To return an item, go to your orders, select the order containing the item you wish to return, and click "Return Item". Follow the instructions to complete the return process.</p>
                  </div>
                </details>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-3 cursor-pointer font-medium">
                    How can I redeem loyalty points?
                    <ChevronRight className="w-5 h-5 transform group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="p-3 pt-0 border-t">
                    <p className="text-sm text-gray-600">You can redeem your loyalty points during checkout. When you're on the payment page, you'll see an option to use your available points toward your purchase.</p>
                  </div>
                </details>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2 h-12"
        >
          <LogOut className="w-5 h-5" /> Logout
        </Button>
      </div>

      <DivWrapperByAnima />
    </div>
  );
}; 