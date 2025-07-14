import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Mail, MessageSquare, AlertCircle } from "lucide-react";
import { useState } from "react";

export const SimplifiedNotifications = (): JSX.Element => {
  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#5ec401] px-5 py-4 flex items-center gap-4 text-white">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      <div className="p-4">
        <div className="bg-gray-100 rounded-lg p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-[#5ec401]" />
            <div>
              <h2 className="text-xl font-bold">Notification Settings</h2>
              <p className="text-gray-600 text-sm mt-1">Manage how you receive notifications</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-gray-500 text-sm">Receive order updates and offers</p>
                </div>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="emailToggle"
                  className="absolute w-0 h-0 opacity-0"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
                <label
                  htmlFor="emailToggle"
                  className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                    emailNotifications ? "bg-[#5ec401]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                      emailNotifications ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </label>
              </div>
            </div>
            
            {/* SMS Notifications */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-gray-500 text-sm">Receive text messages for updates</p>
                </div>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="smsToggle"
                  className="absolute w-0 h-0 opacity-0"
                  checked={smsNotifications}
                  onChange={() => setSmsNotifications(!smsNotifications)}
                />
                <label
                  htmlFor="smsToggle"
                  className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                    smsNotifications ? "bg-[#5ec401]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                      smsNotifications ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </label>
              </div>
            </div>
            
            {/* Push Notifications */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-gray-500 text-sm">Receive app notifications</p>
                </div>
              </div>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input
                  type="checkbox"
                  id="pushToggle"
                  className="absolute w-0 h-0 opacity-0"
                  checked={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                />
                <label
                  htmlFor="pushToggle"
                  className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                    pushNotifications ? "bg-[#5ec401]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                      pushNotifications ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </label>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => navigate("/")}
            className="mt-8 px-4 py-2 bg-[#5ec401] text-white rounded"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}; 