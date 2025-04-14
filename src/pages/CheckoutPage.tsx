
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Wallet, Building, Truck, Lock, DollarSign, QrCode, ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'cod' | 'wallet';

interface DeliveryAddress {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const [address, setAddress] = useState<DeliveryAddress>({
    name: 'John Doe',
    address: '123 Green Street',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    phone: '9876543210'
  });

  const shippingCost = cartTotal > 500 ? 0 : 50;
  const finalTotal = cartTotal + shippingCost - discount;
  
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    
    setIsApplyingPromo(true);
    
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'SAPLING10') {
        const promoDiscount = Math.round(cartTotal * 0.1);
        setDiscount(promoDiscount);
        toast({
          title: "Promo code applied!",
          description: `You saved ₹${promoDiscount} with this code.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Invalid promo code",
          description: "The code you entered is not valid or has expired.",
          variant: "destructive",
        });
      }
      setIsApplyingPromo(false);
    }, 1000);
  };

  const validatePaymentDetails = () => {
    switch (paymentMethod) {
      case 'upi':
        if (!upiId.includes('@')) {
          toast({
            title: "Invalid UPI ID",
            description: "Please enter a valid UPI ID (e.g., yourname@upi)",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 'card':
        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
          toast({
            title: "Invalid card number",
            description: "Please enter a valid 16-digit card number",
            variant: "destructive",
          });
          return false;
        }
        if (!cardName) {
          toast({
            title: "Missing information",
            description: "Please enter the cardholder name",
            variant: "destructive",
          });
          return false;
        }
        if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
          toast({
            title: "Invalid expiry date",
            description: "Please enter a valid expiry date (MM/YY)",
            variant: "destructive",
          });
          return false;
        }
        if (cardCvv.length !== 3 || !/^\d+$/.test(cardCvv)) {
          toast({
            title: "Invalid CVV",
            description: "Please enter a valid 3-digit CVV code",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 'netbanking':
        if (!selectedBank) {
          toast({
            title: "Bank selection required",
            description: "Please select your bank for net banking",
            variant: "destructive",
          });
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  const handlePayment = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add items before checkout.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePaymentDetails()) {
      return;
    }

    setIsProcessingPayment(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      
      // Order success flow
      toast({
        title: "Payment successful!",
        description: "Your order has been placed successfully.",
      });
      
      const orderId = Math.floor(100000 + Math.random() * 900000);
      clearCart();
      
      // Navigate to order confirmation
      navigate(`/order-confirmation/${orderId}`);
    }, 2000);
  };

  const isHighValueOrder = cartTotal > 5000;
  const isCodDisabled = isHighValueOrder && paymentMethod === 'cod';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button 
              variant="light" 
              size="sm" 
              className="mb-4"
              onClick={() => navigate('/cart')}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to cart
            </Button>
            <h1 className="font-serif text-3xl font-medium text-sage-900">Checkout</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-8">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-medium text-sage-900">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-md overflow-hidden border border-gray-200 mr-3">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sage-900">{item.name}</p>
                          <p className="text-sage-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium text-sage-900">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between">
                    <span className="text-sage-600">Subtotal</span>
                    <span className="font-medium">₹{cartTotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sage-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                    </span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  
                  <form onSubmit={handleApplyPromo} className="pt-2">
                    <div className="flex">
                      <Input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="rounded-r-none"
                      />
                      <Button 
                        type="submit" 
                        disabled={!promoCode.trim() || isApplyingPromo}
                        className="rounded-l-none"
                        variant="sage"
                      >
                        {isApplyingPromo ? 'Applying...' : 'Apply'}
                      </Button>
                    </div>
                    <p className="text-xs text-sage-600 mt-1">Try code: SAPLING10 for 10% off</p>
                  </form>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-sage-900">Total</span>
                    <span className="text-xl font-medium text-sage-900">₹{finalTotal}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Section */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-sm mb-6">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-medium text-sage-900">Delivery Address</h2>
                </div>
                
                <div className="p-6">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-sage-900">{address.name}</h3>
                        <p className="text-sage-700 mt-1">{address.address}, {address.city}, {address.state} - {address.pincode}</p>
                        <p className="text-sage-700">Phone: {address.phone}</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sage-600 text-sm mt-2">
                    <Truck className="h-4 w-4" />
                    <span>Estimated delivery: 3-5 business days</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-medium text-sage-900">Payment Method</h2>
                </div>
                
                <div className="p-6">
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    className="grid gap-4"
                  >
                    {/* UPI Option */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center cursor-pointer">
                          <Wallet className="h-5 w-5 mr-2 text-sage-600" />
                          <span>UPI Payment</span>
                        </Label>
                      </div>
                      
                      {paymentMethod === 'upi' && (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="upiId">UPI ID / VPA</Label>
                            <Input 
                              id="upiId" 
                              type="text" 
                              placeholder="yourname@upi" 
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                            />
                          </div>
                          
                          <Button variant="outline" size="sm" className="flex items-center">
                            <QrCode className="h-4 w-4 mr-2" />
                            Pay with QR Code
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Credit/Debit Card Option */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center cursor-pointer">
                          <CreditCard className="h-5 w-5 mr-2 text-sage-600" />
                          <span>Credit/Debit Card</span>
                        </Label>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input 
                              id="cardNumber" 
                              type="text" 
                              placeholder="1234 5678 9012 3456" 
                              maxLength={16}
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              className="font-mono"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name</Label>
                            <Input 
                              id="cardName" 
                              type="text" 
                              placeholder="As printed on card" 
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input 
                                id="expiry" 
                                type="text" 
                                placeholder="MM/YY" 
                                maxLength={5}
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input 
                                id="cvv" 
                                type="password" 
                                placeholder="123" 
                                maxLength={3}
                                value={cardCvv}
                                onChange={(e) => setCvv(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="saveCard"
                              checked={saveCard}
                              onChange={(e) => setSaveCard(e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-sage-600 focus:ring-sage-500"
                            />
                            <label htmlFor="saveCard" className="ml-2 text-sm text-sage-700">
                              Save card for future purchases
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Net Banking Option */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="netbanking" id="netbanking" />
                        <Label htmlFor="netbanking" className="flex items-center cursor-pointer">
                          <Building className="h-5 w-5 mr-2 text-sage-600" />
                          <span>Net Banking</span>
                        </Label>
                      </div>
                      
                      {paymentMethod === 'netbanking' && (
                        <div className="mt-4 space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="bank">Select Bank</Label>
                            <select
                              id="bank"
                              value={selectedBank}
                              onChange={(e) => setSelectedBank(e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-sage-500 focus:outline-none focus:ring-sage-500"
                            >
                              <option value="">Select your bank</option>
                              <option value="hdfc">HDFC Bank</option>
                              <option value="sbi">State Bank of India</option>
                              <option value="icici">ICICI Bank</option>
                              <option value="axis">Axis Bank</option>
                              <option value="kotak">Kotak Mahindra Bank</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Cash on Delivery Option */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cod" id="cod" disabled={isHighValueOrder} />
                        <Label 
                          htmlFor="cod" 
                          className={`flex items-center cursor-pointer ${isHighValueOrder ? 'text-gray-400' : ''}`}
                        >
                          <DollarSign className={`h-5 w-5 mr-2 ${isHighValueOrder ? 'text-gray-400' : 'text-sage-600'}`} />
                          <span>Cash on Delivery (COD)</span>
                        </Label>
                      </div>
                      
                      {isHighValueOrder && (
                        <p className="text-red-500 text-sm mt-2">
                          COD not available for orders above ₹5000
                        </p>
                      )}
                      
                      {paymentMethod === 'cod' && !isHighValueOrder && (
                        <p className="text-sage-600 text-sm mt-2">
                          Pay with cash when your order is delivered
                        </p>
                      )}
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center text-sm text-sage-600 mb-4">
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                  
                  <Button 
                    className="w-full"
                    size="lg"
                    variant="sage"
                    onClick={handlePayment}
                    disabled={isCodDisabled || isProcessingPayment}
                  >
                    {isProcessingPayment ? 'Processing...' : `Pay ₹${finalTotal}`}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
