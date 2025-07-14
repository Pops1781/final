import { useState } from "react";
import { ArrowLeft, CreditCard, Percent, Landmark, BanknoteIcon, QrCode, PlusCircle, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { DivWrapperByAnima } from "../Home/sections/DivWrapperByAnima";
import { ProgressBar } from "../../components/ui/progress-bar";
import { Accordion, AccordionItem } from "../../components/ui/accordion";
import { AddressMap } from "../../components/ui/AddressMap";

// New address form interface
interface AddressFormData {
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
  label: string;
  landmark: string;
}

// Form validation errors interface
interface FormErrors {
  [key: string]: string;
}

export const Checkout = (): JSX.Element => {
  const navigate = useNavigate();
  const { items, addresses, addAddress } = useCartStore();
  const [step, setStep] = useState(2);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // New address form state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressFormData, setAddressFormData] = useState<AddressFormData>({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    phone: "",
    label: "Home",
    landmark: ""
  });
  const [addressFormErrors, setAddressFormErrors] = useState<FormErrors>({});
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);
  const [showMap, setShowMap] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shipping;

  // Handle form input changes
  const handleAddressFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddressFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (addressFormErrors[name]) {
      setAddressFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

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
          if (data && data.address) {
            setAddressFormData(prev => ({
                ...prev,
                street: [data.address.road, data.address.neighbourhood].filter(Boolean).join(', ') || '',
                city: data.address.city || data.address.town || data.address.village || '',
                state: data.address.state || '',
                pincode: data.address.postcode || '',
                country: data.address.country || '',
                landmark: data.address.suburb || ''
            }));
          }
        } catch (error) {
          console.error("Error fetching address: ", error);
        }
      },
      (error) => {
        console.error("Error getting location: ", error);
        setShowMap(true); // Still show map, but with default location if available
      }
    );
  };

  // Validate address form
  const validateAddressForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!addressFormData.name.trim()) errors.name = "Name is required";
    if (!addressFormData.street.trim()) errors.street = "Street address is required";
    if (!addressFormData.city.trim()) errors.city = "City is required";
    if (!addressFormData.state.trim()) errors.state = "State is required";
    if (!addressFormData.pincode.trim()) errors.pincode = "Postal code is required";
    if (!addressFormData.country.trim()) errors.country = "Country is required";
    
    // Validate phone number (basic validation)
    if (!addressFormData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(addressFormData.phone.replace(/[^\d]/g, ''))) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    
    setAddressFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save new address
  const saveAddress = async () => {
    if (!validateAddressForm()) return;
    
    setIsSavingAddress(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new address object
      const newAddress = {
        name: addressFormData.name,
        pincode: addressFormData.pincode,
        address: `${addressFormData.street}, ${addressFormData.city}, ${addressFormData.state}, ${addressFormData.country}`,
        phone: addressFormData.phone,
        label: addressFormData.label,
        landmark: addressFormData.landmark,
      };
      
      addAddress(newAddress);
      
      // Reset form and hide it
      setAddressFormData({
        name: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        phone: "",
        label: "Home",
        landmark: ""
      });
      setShowAddressForm(false);
    } catch (error) {
      console.error("Error saving address:", error);
      setAddressFormErrors({
        form: "Failed to save address. Please try again."
      });
    } finally {
      setIsSavingAddress(false);
    }
  };

  // Process payment
  const processPayment = async () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }
    
    setIsProcessingPayment(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to thank you page
      navigate("/thank-you");
    } catch (error) {
      console.error("Payment processing error:", error);
      setIsProcessingPayment(false);
      alert("Payment processing failed. Please try again.");
    }
  };

  return (
    <div className="bg-[#fafbff] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6 text-[#37474F]" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold font-['Poppins',sans-serif] text-black">Checkout</h1>
        <div className="w-10" />
      </div>

      {/* Progress Bar */}
      <ProgressBar steps={["Bag", "Address", "Payment"]} currentStep={step} />

      {/* Address Selection Section */}
      {step === 2 && (
        <div className="p-5 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Select Address</h2>
          <div className="space-y-4">
            {addresses.map(addr => (
              <label
                key={addr.id}
                className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedAddress === addr.id ? 'border-[#5ec401] bg-white' : 'border-gray-200 bg-gray-50'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-black">Deliver To </span>
                    <span className="font-bold text-black">{addr.name}, {addr.pincode}</span>
                  </div>
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={selectedAddress === addr.id}
                    onChange={() => setSelectedAddress(addr.id)}
                    className="accent-[#5ec401] w-5 h-5"
                  />
                </div>
                <div className="text-black mt-1 whitespace-pre-line">{addr.address}</div>
                <div className="text-black mt-1">Phno-<span className="font-bold">{addr.phone}</span></div>
              </label>
            ))}
          </div>
          
          {/* Add New Address Button */}
          <button 
            className="mt-4 flex items-center text-[#5ec401] font-medium"
            onClick={() => setShowAddressForm(!showAddressForm)}
          >
            <PlusCircle className="w-5 h-5 mr-1" />
            {showAddressForm ? 'Cancel' : '+ Add New Address'}
          </button>
          
          {/* New Address Form */}
          {showAddressForm && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white">
              <h3 className="font-semibold text-lg mb-3">Add New Address</h3>
              
              {addressFormErrors.form && (
                <div className="bg-red-50 text-red-500 p-2 rounded mb-3">
                  {addressFormErrors.form}
                </div>
              )}
              
              {showMap && mapPosition && (
                  <div className="mb-4">
                    <AddressMap position={mapPosition} addressLabel={"Your Location"}/>
                  </div>
              )}

              <button
                  onClick={handleFetchLocation}
                  className="w-full flex items-center justify-center gap-2 text-sm text-[#5ec401] font-semibold mb-4 p-2 border rounded-lg hover:bg-green-50"
                >
                  <MapPin className="w-4 h-4" />
                  Use Current Location
              </button>

              <div className="space-y-3">
                <div>
                  <Input 
                    placeholder="Full Name *" 
                    name="name" 
                    value={addressFormData.name}
                    onChange={handleAddressFormChange}
                    className={addressFormErrors.name ? "border-red-500" : ""}
                  />
                  {addressFormErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{addressFormErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <Input 
                    placeholder="Street Address *" 
                    name="street" 
                    value={addressFormData.street}
                    onChange={handleAddressFormChange}
                    className={addressFormErrors.street ? "border-red-500" : ""}
                  />
                  {addressFormErrors.street && (
                    <p className="text-red-500 text-xs mt-1">{addressFormErrors.street}</p>
                  )}
                </div>
                
                <div>
                  <Input 
                    placeholder="Landmark"
                    name="landmark"
                    value={addressFormData.landmark}
                    onChange={handleAddressFormChange}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input 
                      placeholder="City *" 
                      name="city" 
                      value={addressFormData.city}
                      onChange={handleAddressFormChange}
                      className={addressFormErrors.city ? "border-red-500" : ""}
                    />
                    {addressFormErrors.city && (
                      <p className="text-red-500 text-xs mt-1">{addressFormErrors.city}</p>
                    )}
                  </div>
                  <div>
                    <Input 
                      placeholder="State/Province *" 
                      name="state" 
                      value={addressFormData.state}
                      onChange={handleAddressFormChange}
                      className={addressFormErrors.state ? "border-red-500" : ""}
                    />
                    {addressFormErrors.state && (
                      <p className="text-red-500 text-xs mt-1">{addressFormErrors.state}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input 
                      placeholder="Postal Code *" 
                      name="pincode" 
                      value={addressFormData.pincode}
                      onChange={handleAddressFormChange}
                      className={addressFormErrors.pincode ? "border-red-500" : ""}
                    />
                    {addressFormErrors.pincode && (
                      <p className="text-red-500 text-xs mt-1">{addressFormErrors.pincode}</p>
                    )}
                  </div>
                  <div>
                    <select
                      name="country"
                      value={addressFormData.country}
                      onChange={handleAddressFormChange}
                      className={`w-full h-10 px-3 py-2 border rounded-md ${
                        addressFormErrors.country ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                    {addressFormErrors.country && (
                      <p className="text-red-500 text-xs mt-1">{addressFormErrors.country}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Input 
                    placeholder="Phone Number *" 
                    name="phone" 
                    value={addressFormData.phone}
                    onChange={handleAddressFormChange}
                    className={addressFormErrors.phone ? "border-red-500" : ""}
                  />
                  {addressFormErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{addressFormErrors.phone}</p>
                  )}
                </div>
                
                <Button
                  className="w-full bg-[#5ec401] text-white mt-2"
                  onClick={saveAddress}
                  disabled={isSavingAddress}
                >
                  {isSavingAddress ? "Saving..." : "Save Address"}
                </Button>
              </div>
            </div>
          )}
          
          <Button
            className="w-full bg-[#5ec401] text-white mt-6"
            onClick={() => setStep(3)}
            disabled={!selectedAddress}
          >
            Continue to Payment
          </Button>
        </div>
      )}

      {/* Payment Section */}
      {step === 3 && (
        <div className="p-5 max-w-2xl mx-auto">
          <div className="bg-[#eaffea] border-l-4 border-[#5ec401] rounded p-3 mb-4">
            <div className="font-semibold text-black mb-1">Deliver To:</div>
            <div className="text-black">
              <span className="font-bold">{addresses.find(a => a.id === selectedAddress)?.name}</span>,
              {" "}{addresses.find(a => a.id === selectedAddress)?.pincode}
            </div>
            <div className="text-black">{addresses.find(a => a.id === selectedAddress)?.address}</div>
            <div className="text-black">Phno-<span className="font-bold">{addresses.find(a => a.id === selectedAddress)?.phone}</span></div>
          </div>

          <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

          <Accordion>
            <AccordionItem 
              title="Credit/Debit Card" 
              subtitle="Add and secure card as per RBI guidelines"
              icon={<CreditCard size={20} />}
              defaultOpen={selectedPaymentMethod === 'card'}
            >
              <div className="space-y-4">
                <Input placeholder="Card Number" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" />
                </div>
                <Input placeholder="Name on Card" />
                <Button 
                  className="w-full bg-[#5ec401] text-white"
                  onClick={() => setSelectedPaymentMethod('card')}
                >
                  Select
                </Button>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="EMI" 
              subtitle="Get Debit and Cardless EMIs on Bank"
              icon={<Percent size={20} />}
            >
              <div className="space-y-4">
                <div className="border rounded p-3 text-sm">
                  <h4 className="font-medium mb-2">Available EMI Options</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>3 Months</span>
                      <span>₹{Math.round(total / 3)}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>6 Months</span>
                      <span>₹{Math.round(total / 6)}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span>12 Months</span>
                      <span>₹{Math.round(total / 12)}/month</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#5ec401] text-white"
                  onClick={() => setSelectedPaymentMethod('emi')}
                >
                  Select
                </Button>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="UPI" 
              subtitle="Pay by any UPI app"
              icon={<QrCode size={20} />}
            >
              <div className="space-y-4">
                <Input placeholder="Enter UPI ID (e.g. example@upi)" />
                <div className="flex justify-center py-2">
                  <div className="grid grid-cols-3 gap-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-8 object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" alt="Paytm" className="h-8 object-contain" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="GPay" className="h-8 object-contain" />
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#5ec401] text-white"
                  onClick={() => setSelectedPaymentMethod('upi')}
                >
                  Select
                </Button>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="Net Banking" 
              subtitle="Pay through net banking"
              icon={<Landmark size={20} />}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="border rounded p-2 text-center cursor-pointer hover:border-[#5ec401]">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/2048px-SBI-logo.svg.png" alt="SBI" className="h-8 mx-auto object-contain" />
                    <p className="text-xs mt-1">SBI</p>
                  </div>
                  <div className="border rounded p-2 text-center cursor-pointer hover:border-[#5ec401]">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/HDFC_Bank_Logo.svg/2560px-HDFC_Bank_Logo.svg.png" alt="HDFC" className="h-8 mx-auto object-contain" />
                    <p className="text-xs mt-1">HDFC</p>
                  </div>
                  <div className="border rounded p-2 text-center cursor-pointer hover:border-[#5ec401]">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/ICICI_Bank_Logo.svg/2560px-ICICI_Bank_Logo.svg.png" alt="ICICI" className="h-8 mx-auto object-contain" />
                    <p className="text-xs mt-1">ICICI</p>
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#5ec401] text-white"
                  onClick={() => setSelectedPaymentMethod('netbanking')}
                >
                  Select
                </Button>
              </div>
            </AccordionItem>

            <AccordionItem 
              title="Cash on Delivery" 
              subtitle="Pay through cash"
              icon={<BanknoteIcon size={20} />}
            >
              <div className="space-y-4 text-center">
                <p className="text-sm text-gray-600">Pay ₹{total} at the time of delivery</p>
                <Button 
                  className="w-full bg-[#5ec401] text-white"
                  onClick={() => setSelectedPaymentMethod('cod')}
                >
                  Select
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {/* Order Summary */}
      <div className="p-5 max-w-2xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order button - replaces Apply Coupon section */}
      {step === 3 && (
        <div className="px-5 pb-5 max-w-2xl mx-auto">
          <Button
            className="w-full bg-[#5ec401] text-white h-12 text-base font-semibold"
            onClick={processPayment}
            disabled={isProcessingPayment || !selectedPaymentMethod}
          >
            {isProcessingPayment ? "Processing..." : "Place Order"}
          </Button>
        </div>
      )}

      <DivWrapperByAnima />
    </div>
  );
}; 