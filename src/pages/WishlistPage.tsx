
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart, Trash2, ArrowRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (productId: number, productName: string) => {
    removeFromWishlist(productId);
    toast({
      title: "Removed from wishlist",
      description: `${productName} has been removed from your wishlist`,
    });
  };

  const handleMoveToCart = (productId: number) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      removeFromWishlist(productId);
      toast({
        title: "Moved to cart",
        description: `${product.name} has been moved to your cart`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="font-serif text-3xl font-medium text-sage-900 md:text-4xl">
                My Wishlist
              </h1>
              <p className="mt-2 text-sage-600">
                Items you've saved for later
              </p>
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
          
          {wishlistItems.length > 0 ? (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-sage-600">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
                </p>
                <button
                  onClick={() => {
                    clearWishlist();
                    toast({
                      title: "Wishlist cleared",
                      description: "All items have been removed from your wishlist",
                    });
                  }}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Clear Wishlist
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <ul className="divide-y divide-gray-200">
                  {wishlistItems.map(item => (
                    <li key={item.id} className="p-4 sm:p-6 hover:bg-gray-50">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-20 sm:h-20 w-full max-w-[120px] mx-auto sm:mx-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <Link 
                                to={`/product/${item.id}`}
                                className="text-lg font-medium text-sage-900 hover:text-sage-700"
                              >
                                {item.name}
                              </Link>
                              <p className="text-sm text-sage-600 line-clamp-1 mt-1">{item.description}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 text-lg font-medium text-sage-900">
                              ₹{item.price}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-2 justify-end">
                            <button
                              onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </button>
                            
                            <button
                              onClick={() => handleMoveToCart(item.id)}
                              disabled={item.inStock === false}
                              className={cn(
                                "flex items-center gap-1 text-sm px-3 py-1 rounded-full font-medium",
                                item.inStock === false
                                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                  : "bg-sage-900 text-white hover:bg-sage-800"
                              )}
                            >
                              <ShoppingCart className="h-4 w-4" />
                              Move to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center">
                <Link
                  to="/products"
                  className="flex items-center text-sage-900 hover:text-sage-700 font-medium"
                >
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Continue Shopping
                </Link>
                
                <Link
                  to="/cart"
                  className="flex items-center text-sage-900 bg-white border border-sage-900 px-4 py-2 rounded-md hover:bg-sage-50 font-medium"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Go to Cart
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mb-4 inline-block p-4 bg-sage-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-medium text-sage-900 mb-2">Your wishlist is empty</h2>
              <p className="text-sage-600 mb-6">
                Add items to your wishlist by clicking the heart icon on product pages.
              </p>
              <Link
                to="/products"
                className="btn-primary inline-flex items-center"
              >
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
