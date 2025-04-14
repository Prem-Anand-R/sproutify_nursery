
import React from "react";
import { Home, MapPin, Phone, Calendar, Clock } from "lucide-react";

const DeliveryDetails: React.FC = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-sage-900 mb-4 flex items-center">
        <MapPin className="h-5 w-5 text-sage-600 mr-2" />
        Delivery Details
      </h2>
      <div className="bg-white/80 backdrop-blur-sm border border-sage-200 p-5 rounded-lg shadow-sm">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start">
            <Home className="h-5 w-5 text-sage-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium text-sage-900">John Doe</div>
              <div className="text-sage-700">
                123 Green Street, Bangalore, Karnataka - 560001
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <Phone className="h-5 w-5 text-sage-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium text-sage-900">Contact</div>
              <div className="text-sage-700">+91 9876543210</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-sage-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium text-sage-900">Estimated Delivery</div>
              <div className="text-sage-700">May 25, 2023 - May 28, 2023</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-sage-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <div className="font-medium text-sage-900">Delivery Window</div>
              <div className="text-sage-700">10:00 AM - 6:00 PM</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-sage-200">
          <div className="text-sm text-sage-600">
            <span className="font-medium text-sage-700">Note:</span> Our delivery partner will contact you before delivery. Please ensure someone is available to receive the package.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
