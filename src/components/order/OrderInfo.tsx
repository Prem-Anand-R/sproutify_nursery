
import React from "react";

interface OrderInfoProps {
  orderId: string;
}

const OrderInfo: React.FC<OrderInfoProps> = ({ orderId }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-sage-900 mb-4">Order Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sage-600 text-sm">Order ID</div>
          <div className="font-medium text-sage-900">#{orderId}</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sage-600 text-sm">Order Date</div>
          <div className="font-medium text-sage-900">{new Date().toLocaleDateString('en-IN')}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
