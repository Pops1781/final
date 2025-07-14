import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Mail, AlertCircle, MessageSquare } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { DivWrapperByAnima } from "../Home/sections/DivWrapperByAnima";

// Interface for notification preferences
interface NotificationPreferences {
  orderUpdatesEmail: boolean;
  orderUpdatesSMS: boolean;
  orderUpdatesPush: boolean;
  promoOffersEmail: boolean;
  promoOffersSMS: boolean;
  newsletters: boolean;
}

export const NotificationsPage = (): JSX.Element => {
  const navigate = useNavigate();
  
  // Notification preferences state
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    orderUpdatesEmail: true,
    orderUpdatesSMS: true,
    orderUpdatesPush: true,
    promoOffersEmail: false,
    promoOffersSMS: false,
    newsletters: true
  });
  
  // Loading states for each preference
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  
  // Error states for each preference
  const [errorStates, setErrorStates] = useState<{[key: string]: string}>({});
  
  // Update notification preference
  const updatePreference = async (key: keyof NotificationPreferences) => {
    // Set loading state for this toggle
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update preference
      setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
      
      // Clear any previous error
      if (errorStates[key]) {
        setErrorStates(prev => {
          const newErrors = { ...prev };
          delete newErrors[key];
          return newErrors;
        });
      }
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      
      // Revert toggle state on error
      setPreferences(prev => ({ ...prev }));
      
      // Set error message
      setErrorStates(prev => ({ 
        ...prev, 
        [key]: "Failed to update preference. Try again." 
      }));
    } finally {
      // Clear loading state
      setLoadingStates(prev => {
        const newLoadingStates = { ...prev };
        delete newLoadingStates[key];
        return newLoadingStates;
      });
    }
  };

  return (
    <div className="bg-[#fafbff] min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-5 py-4 flex items-center gap-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold font-['Poppins',sans-serif] text-black">Notifications</h1>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-3 mb-6">
              <Bell className="w-6 h-6 text-[#5ec401] mt-1" />
              <div>
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
                <p className="text-gray-600 mt-1">Choose how you'd like to receive updates from us</p>
              </div>
            </div>
            
            {/* Order Updates Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                Order Updates
              </h3>
              
              <div className="space-y-4 pl-7">
                {/* Email Toggle */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>Email</span>
                  </div>
                  <div className="flex items-center">
                    {loadingStates.orderUpdatesEmail && (
                      <div className="w-4 h-4 border-2 border-t-[#5ec401] border-r-[#5ec401] border-b-[#5ec401] border-l-transparent rounded-full animate-spin mr-2"></div>
                    )}
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                      <input
                        type="checkbox"
                        id="orderUpdatesEmail"
                        className="absolute w-0 h-0 opacity-0"
                        checked={preferences.orderUpdatesEmail}
                        onChange={() => updatePreference('orderUpdatesEmail')}
                        disabled={!!loadingStates.orderUpdatesEmail}
                      />
                      <label
                        htmlFor="orderUpdatesEmail"
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          preferences.orderUpdatesEmail ? "bg-[#5ec401]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                            preferences.orderUpdatesEmail ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {errorStates.orderUpdatesEmail && (
                  <p className="text-red-500 text-xs">{errorStates.orderUpdatesEmail}</p>
                )}
                
                {/* SMS Toggle */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span>SMS</span>
                  </div>
                  <div className="flex items-center">
                    {loadingStates.orderUpdatesSMS && (
                      <div className="w-4 h-4 border-2 border-t-[#5ec401] border-r-[#5ec401] border-b-[#5ec401] border-l-transparent rounded-full animate-spin mr-2"></div>
                    )}
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                      <input
                        type="checkbox"
                        id="orderUpdatesSMS"
                        className="absolute w-0 h-0 opacity-0"
                        checked={preferences.orderUpdatesSMS}
                        onChange={() => updatePreference('orderUpdatesSMS')}
                        disabled={!!loadingStates.orderUpdatesSMS}
                      />
                      <label
                        htmlFor="orderUpdatesSMS"
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          preferences.orderUpdatesSMS ? "bg-[#5ec401]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                            preferences.orderUpdatesSMS ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {errorStates.orderUpdatesSMS && (
                  <p className="text-red-500 text-xs">{errorStates.orderUpdatesSMS}</p>
                )}
                
                {/* Push Notifications Toggle */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-gray-500" />
                    <span>Push Notifications</span>
                  </div>
                  <div className="flex items-center">
                    {loadingStates.orderUpdatesPush && (
                      <div className="w-4 h-4 border-2 border-t-[#5ec401] border-r-[#5ec401] border-b-[#5ec401] border-l-transparent rounded-full animate-spin mr-2"></div>
                    )}
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                      <input
                        type="checkbox"
                        id="orderUpdatesPush"
                        className="absolute w-0 h-0 opacity-0"
                        checked={preferences.orderUpdatesPush}
                        onChange={() => updatePreference('orderUpdatesPush')}
                        disabled={!!loadingStates.orderUpdatesPush}
                      />
                      <label
                        htmlFor="orderUpdatesPush"
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          preferences.orderUpdatesPush ? "bg-[#5ec401]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                            preferences.orderUpdatesPush ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {errorStates.orderUpdatesPush && (
                  <p className="text-red-500 text-xs">{errorStates.orderUpdatesPush}</p>
                )}
              </div>
            </div>
            
            {/* Promotional Offers Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-green-500" />
                Promotional Offers
              </h3>
              
              <div className="space-y-4 pl-7">
                {/* Email Toggle */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>Email</span>
                  </div>
                  <div className="flex items-center">
                    {loadingStates.promoOffersEmail && (
                      <div className="w-4 h-4 border-2 border-t-[#5ec401] border-r-[#5ec401] border-b-[#5ec401] border-l-transparent rounded-full animate-spin mr-2"></div>
                    )}
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                      <input
                        type="checkbox"
                        id="promoOffersEmail"
                        className="absolute w-0 h-0 opacity-0"
                        checked={preferences.promoOffersEmail}
                        onChange={() => updatePreference('promoOffersEmail')}
                        disabled={!!loadingStates.promoOffersEmail}
                      />
                      <label
                        htmlFor="promoOffersEmail"
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          preferences.promoOffersEmail ? "bg-[#5ec401]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                            preferences.promoOffersEmail ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {errorStates.promoOffersEmail && (
                  <p className="text-red-500 text-xs">{errorStates.promoOffersEmail}</p>
                )}
                
                {/* SMS Toggle */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span>SMS</span>
                  </div>
                  <div className="flex items-center">
                    {loadingStates.promoOffersSMS && (
                      <div className="w-4 h-4 border-2 border-t-[#5ec401] border-r-[#5ec401] border-b-[#5ec401] border-l-transparent rounded-full animate-spin mr-2"></div>
                    )}
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                      <input
                        type="checkbox"
                        id="promoOffersSMS"
                        className="absolute w-0 h-0 opacity-0"
                        checked={preferences.promoOffersSMS}
                        onChange={() => updatePreference('promoOffersSMS')}
                        disabled={!!loadingStates.promoOffersSMS}
                      />
                      <label
                        htmlFor="promoOffersSMS"
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          preferences.promoOffersSMS ? "bg-[#5ec401]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                            preferences.promoOffersSMS ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {errorStates.promoOffersSMS && (
                  <p className="text-red-500 text-xs">{errorStates.promoOffersSMS}</p>
                )}
              </div>
            </div>
            
            {/* Newsletters */}
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-purple-500" />
                Newsletters
              </h3>
              
              <div className="space-y-4 pl-7">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>Weekly Beauty & Skincare Tips</span>
                  </div>
                  <div className="flex items-center">
                    {loadingStates.newsletters && (
                      <div className="w-4 h-4 border-2 border-t-[#5ec401] border-r-[#5ec401] border-b-[#5ec401] border-l-transparent rounded-full animate-spin mr-2"></div>
                    )}
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                      <input
                        type="checkbox"
                        id="newsletters"
                        className="absolute w-0 h-0 opacity-0"
                        checked={preferences.newsletters}
                        onChange={() => updatePreference('newsletters')}
                        disabled={!!loadingStates.newsletters}
                      />
                      <label
                        htmlFor="newsletters"
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          preferences.newsletters ? "bg-[#5ec401]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                            preferences.newsletters ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {errorStates.newsletters && (
                  <p className="text-red-500 text-xs">{errorStates.newsletters}</p>
                )}
                
                <p className="text-gray-500 text-sm">
                  By subscribing to our newsletter, you'll receive weekly tips, tutorials, 
                  and exclusive offers directly to your inbox.
                </p>
              </div>
            </div>
            
          </CardContent>
        </Card>
      </div>

      <DivWrapperByAnima />
    </div>
  );
}; 