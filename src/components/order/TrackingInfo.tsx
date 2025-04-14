
import React from "react";
import { Package } from "lucide-react";

const TrackingInfo: React.FC = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <div className="flex items-start">
        <div className="mt-1 text-sage-600">
          <Package className="h-5 w-5" />
        </div>
        <div className="ml-3">
          <h3 className="font-medium text-sage-900">Tracking Information</h3>
          <p className="text-sage-600 text-sm mt-1">
            A tracking number will be provided once your order ships. You'll receive 
            an email with tracking details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackingInfo;
