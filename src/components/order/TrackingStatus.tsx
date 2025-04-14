
import React from "react";
import { CheckCircle, Package, TruckIcon } from "lucide-react";

interface TrackingStatusProps {
  deliveryDate: Date;
}

const TrackingStatus: React.FC<TrackingStatusProps> = ({ deliveryDate }) => {
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-sage-900 mb-4">Delivery Status</h2>
      <div className="relative">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="ml-4">
            <div className="font-medium text-sage-900">Order Confirmed</div>
            <div className="text-sage-600 text-sm">{new Date().toLocaleString('en-IN')}</div>
          </div>
        </div>
        
        <div className="h-12 w-px bg-gray-200 absolute left-5 top-10"></div>
        
        <div className="flex items-center mt-12">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            <Package className="h-5 w-5 text-gray-400" />
          </div>
          <div className="ml-4">
            <div className="font-medium text-sage-600">Order Processing</div>
            <div className="text-sage-600 text-sm">Your order is being processed</div>
          </div>
        </div>
        
        <div className="h-12 w-px bg-gray-200 absolute left-5 top-32"></div>
        
        <div className="flex items-center mt-12">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            <TruckIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="ml-4">
            <div className="font-medium text-sage-600">Expected Delivery</div>
            <div className="text-sage-600 text-sm">{formattedDeliveryDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingStatus;
