
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  ChevronLeft, 
  Eye, 
  Search, 
  Download, 
  RotateCcw, 
  Truck, 
  X,
  Package
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TrackingInfo from '@/components/order/TrackingInfo';

// Mock data for orders
const MOCK_ORDERS = [
  {
    id: 'ORD001',
    date: '2023-10-10',
    total: 500,
    status: 'Delivered',
    items: [
      { id: 1, name: 'Tomato Sapling', quantity: 2, price: 150 },
      { id: 2, name: 'Cucumber Sapling', quantity: 1, price: 200 },
    ],
    trackingSteps: [
      { step: 'Ordered', completed: true, date: '2023-10-07' },
      { step: 'Packed', completed: true, date: '2023-10-08' },
      { step: 'Shipped', completed: true, date: '2023-10-09' },
      { step: 'Delivered', completed: true, date: '2023-10-10' }
    ],
    address: '123 Main St, Bangalore - 560001',
    paymentMethod: 'Credit Card',
    estimatedDelivery: null,
    canCancel: false,
    canTrack: false,
    canReorder: true
  },
  {
    id: 'ORD002',
    date: '2023-10-12',
    total: 300,
    status: 'Pending',
    items: [
      { id: 3, name: 'Chili Sapling', quantity: 1, price: 180 },
      { id: 4, name: 'Brinjal Sapling', quantity: 1, price: 120 },
    ],
    trackingSteps: [
      { step: 'Ordered', completed: true, date: '2023-10-12' },
      { step: 'Packed', completed: false, date: null },
      { step: 'Shipped', completed: false, date: null },
      { step: 'Delivered', completed: false, date: null }
    ],
    address: '123 Main St, Bangalore - 560001',
    paymentMethod: 'UPI',
    estimatedDelivery: '2023-10-18',
    canCancel: true,
    canTrack: false,
    canReorder: false
  },
  {
    id: 'ORD003',
    date: '2023-09-28',
    total: 750,
    status: 'Shipped',
    items: [
      { id: 5, name: 'Tulsi Plant', quantity: 3, price: 250 },
    ],
    trackingSteps: [
      { step: 'Ordered', completed: true, date: '2023-09-25' },
      { step: 'Packed', completed: true, date: '2023-09-26' },
      { step: 'Shipped', completed: true, date: '2023-09-28' },
      { step: 'Delivered', completed: false, date: null }
    ],
    address: '123 Main St, Bangalore - 560001',
    paymentMethod: 'Debit Card',
    estimatedDelivery: '2023-10-03',
    canCancel: false,
    canTrack: true,
    canReorder: false
  },
  {
    id: 'ORD004',
    date: '2023-08-15',
    total: 420,
    status: 'Cancelled',
    items: [
      { id: 6, name: 'Mint Sapling', quantity: 2, price: 120 },
      { id: 7, name: 'Coriander Sapling', quantity: 3, price: 60 },
    ],
    trackingSteps: [
      { step: 'Ordered', completed: true, date: '2023-08-15' },
      { step: 'Packed', completed: false, date: null },
      { step: 'Shipped', completed: false, date: null },
      { step: 'Delivered', completed: false, date: null }
    ],
    address: '123 Main St, Bangalore - 560001',
    paymentMethod: 'COD',
    estimatedDelivery: null,
    canCancel: false,
    canTrack: false,
    canReorder: true
  }
];

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Filter orders based on search term and status filter
  const filteredOrders = MOCK_ORDERS.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.date.includes(searchTerm) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return "default";
      case 'shipped':
        return "secondary";
      case 'pending':
        return "outline";
      case 'cancelled':
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    });
  };

  const getTimeSince = (dateString: string) => {
    const orderDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - orderDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week(s) ago`;
    return `${Math.floor(diffDays / 30)} month(s) ago`;
  };

  const handleAction = (action: 'view' | 'download' | 'reorder' | 'track' | 'cancel', orderId: string) => {
    switch(action) {
      case 'view':
        toggleOrderDetails(orderId);
        break;
      case 'download':
        alert(`Downloading invoice for order ${orderId}`);
        break;
      case 'reorder':
        alert(`Reordering items from order ${orderId}`);
        break;
      case 'track':
        alert(`Tracking order ${orderId}`);
        break;
      case 'cancel':
        alert(`Cancelling order ${orderId}`);
        break;
      default:
        break;
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="font-serif text-3xl font-medium text-sage-900">My Orders</h1>
              <p className="text-sage-600 mt-1">View and track your order history</p>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4 md:mt-0"
              onClick={() => navigate('/profile')}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Button>
          </div>
          
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="Search by order ID, date, or product..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <Card key={order.id} className={`overflow-hidden border ${expandedOrderId === order.id ? 'border-sage-300 shadow-md' : 'border-gray-200'}`}>
                  <CardContent className="p-0">
                    <div className="p-6 cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                      <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-sage-50 rounded-full">
                            <Package className="h-6 w-6 text-sage-700" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-lg text-sage-900">Order #{order.id}</h3>
                              <Badge
                                variant={getStatusBadgeVariant(order.status)}
                                className={`${
                                  order.status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-800' :
                                  order.status.toLowerCase() === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                  order.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}
                              >
                                {order.status}
                              </Badge>
                            </div>
                            <p className="text-sage-600 text-sm flex items-center mt-1">
                              <Calendar className="h-4 w-4 mr-1" /> 
                              {formatDate(order.date)} ({getTimeSince(order.date)})
                            </p>
                            <p className="text-sage-600 text-sm mt-1">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'items'} | 
                              Payment: {order.paymentMethod}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                          <p className="font-medium text-lg">₹{order.total}</p>
                          {order.estimatedDelivery && order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                            <p className="text-sm text-sage-600">
                              {order.status === 'Shipped' ? 'Expected arrival' : 'Estimated delivery'}: {formatDate(order.estimatedDelivery)}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-sage-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction('view', order.id);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-sage-900"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction('download', order.id);
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Invoice
                        </Button>
                        
                        {order.canReorder && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-sage-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('reorder', order.id);
                            }}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reorder
                          </Button>
                        )}
                        
                        {order.canTrack && (
                          <Button 
                            variant="sage" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('track', order.id);
                            }}
                          >
                            <Truck className="h-4 w-4 mr-2" />
                            Track Order
                          </Button>
                        )}
                        
                        {order.canCancel && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('cancel', order.id);
                            }}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel Order
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {expandedOrderId === order.id && (
                      <div className="border-t border-gray-200 bg-gray-50 p-6">
                        {/* Order Tracking Progress */}
                        <div className="mb-6">
                          <h4 className="font-medium text-sage-900 mb-4">Order Status</h4>
                          <div className="relative">
                            {/* Progress line */}
                            <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 z-0"></div>
                            
                            {/* Progress steps */}
                            <div className="relative z-10 flex justify-between">
                              {order.trackingSteps.map((step, index) => (
                                <div key={index} className="flex flex-col items-center">
                                  <div 
                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                      step.completed 
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-gray-200 text-gray-500'
                                    }`}
                                  >
                                    {step.completed ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      index + 1
                                    )}
                                  </div>
                                  <p className="text-xs font-medium mt-2 text-center">{step.step}</p>
                                  {step.date && (
                                    <p className="text-xs text-gray-500 mt-1">{formatDate(step.date)}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {order.status === 'Shipped' && <TrackingInfo />}
                        
                        <h4 className="font-medium text-sage-900 mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {order.items.map(item => (
                            <div key={item.id} className="flex justify-between bg-white p-3 rounded-md border border-gray-100">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-sage-600">Quantity: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p>₹{item.price} per item</p>
                                <p className="font-medium">₹{item.price * item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="font-medium text-sage-900 mb-2">Shipping Address</h4>
                          <p className="text-sage-600">{order.address}</p>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-200">
                          <p className="font-medium">Total</p>
                          <p className="font-bold text-lg">₹{order.total}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="mb-4 inline-block p-4 bg-gray-100 rounded-full">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">No orders found</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'You haven\'t placed any orders yet'}
              </p>
              <Button onClick={() => navigate('/products')} variant="sage">
                Browse Products
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrdersPage;
