
import React from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from "@/components/ui/separator";
import OrderInfo from '@/components/order/OrderInfo';
import DeliveryDetails from '@/components/order/DeliveryDetails';
import TrackingStatus from '@/components/order/TrackingStatus';
import TrackingInfo from '@/components/order/TrackingInfo';
import OrderActions from '@/components/order/OrderActions';

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  // Generate a random delivery date (3-5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-8 text-center border-b border-gray-200">
              <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl md:text-3xl font-serif font-medium text-sage-900 mb-2">
                Order Confirmed!
              </h1>
              <p className="text-sage-600">
                Thank you for your purchase. Your order has been received.
              </p>
            </div>
            
            <div className="p-6 md:p-8">
              <OrderInfo orderId={orderId || ''} />
              
              <Separator className="my-6" />
              
              <DeliveryDetails />
              
              <Separator className="my-6" />
              
              <TrackingStatus deliveryDate={deliveryDate} />
              
              <TrackingInfo />
              
              <OrderActions />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
