
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplyingCoupon(true);
    
    // Simulate coupon application
    setTimeout(() => {
      toast({
        title: "Invalid coupon code",
        description: "The coupon code you entered is invalid or has expired.",
        variant: "destructive",
      });
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const shippingCost = cartTotal > 500 ? 0 : 50;
  const totalCost = cartTotal + shippingCost;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-sage-900 mb-6">Your Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-16 w-16 text-sage-300" />
              </div>
              <h2 className="text-2xl font-serif font-medium text-sage-800 mb-4">Your cart is empty</h2>
              <p className="text-sage-600 mb-6">
                Looks like you haven't added any saplings to your cart yet.
              </p>
              <Link to="/products" className="btn-primary inline-flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-medium text-sage-900">
                        Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                      </h2>
                      <button
                        onClick={clearCart}
                        className="text-sm text-sage-600 hover:text-sage-900"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        
                        <div className="ml-0 sm:ml-4 mt-4 sm:mt-0 flex-1">
                          <div className="flex justify-between">
                            <div>
                              <Link to={`/product/${item.id}`} className="text-lg font-medium text-sage-900 hover:text-sage-700">
                                {item.name}
                              </Link>
                              <p className="mt-1 text-sm text-sage-600">
                                Category: {item.category.replace('-', ' ')}
                              </p>
                            </div>
                            <p className="text-lg font-medium text-sage-900">₹{item.price}</p>
                          </div>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                                className="px-3 py-1 text-sage-600 hover:text-sage-900"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-sage-900">{item.quantity || 1}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                                className="px-3 py-1 text-sage-600 hover:text-sage-900"
                              >
                                +
                              </button>
                            </div>
                            
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 flex items-center"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 border-t border-gray-200">
                    <Link to="/products" className="text-sage-600 hover:text-sage-900 inline-flex items-center">
                      <ChevronLeft className="mr-1 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-medium text-sage-900">Order Summary</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sage-600">Subtotal</span>
                      <span className="text-sage-900 font-medium">₹{cartTotal}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sage-600">Shipping</span>
                      <span className="text-sage-900 font-medium">
                        {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                      </span>
                    </div>
                    
                    <form onSubmit={handleApplyCoupon} className="pt-2 pb-2">
                      <div className="flex">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon code"
                          className="flex-1 px-4 py-2 border border-r-0 border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          disabled={!couponCode.trim() || isApplyingCoupon}
                          className="px-4 py-2 bg-sage-900 text-white rounded-r-md disabled:bg-sage-300"
                        >
                          {isApplyingCoupon ? 'Applying...' : 'Apply'}
                        </button>
                      </div>
                    </form>
                    
                    <div className="border-t border-gray-200 pt-4 flex justify-between">
                      <span className="text-lg font-medium text-sage-900">Total</span>
                      <span className="text-xl font-medium text-sage-900">₹{totalCost}</span>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full" 
                        variant="sage" 
                        size="lg"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout
                      </Button>
                      
                      <div className="mt-4 text-xs text-sage-600 text-center">
                        <p>Taxes calculated at checkout</p>
                        <p className="mt-1">Free shipping on orders above ₹500</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
