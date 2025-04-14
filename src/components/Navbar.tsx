import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingCart, Menu, X, Search, Globe, Heart, LogOut, User, LogIn } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    } else {
      toast({
        title: "Search Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
    }
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const handleLoginPrompt = () => {
    toast({
      title: "Login Required",
      description: "Please log in to access your cart and wishlist",
      action: (
        <Link to="/login" className="bg-sage-900 text-white px-3 py-1 text-xs rounded-md hover:bg-sage-700">
          Login
        </Link>
      ),
    });
  };
  
  const useBackgroundColor = () => {
    const [isLightBg, setIsLightBg] = useState(false);
  
    useEffect(() => {
      const checkBackground = () => {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          const bgColor = window.getComputedStyle(heroSection).backgroundColor;
          // Simple brightness check
          const rgb = bgColor.match(/\d+/g)?.map(Number);
          if (rgb) {
            const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
            setIsLightBg(brightness > 128);
          }
        }
      };
  
      checkBackground();
      window.addEventListener('resize', checkBackground);
      return () => window.removeEventListener('resize', checkBackground);
    }, []);
  
    return isLightBg;
  };
  
  return (
    <header
   
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'bg-white/95 py-2 text-gray-900' 
          : 'bg-black/10 py-3 text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold">Sproutify</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-sage-700 font-medium transition-colors link-underline">
              Home
            </Link>
            <Link to="/products" className="hover:text-sage-700 font-medium transition-colors link-underline">
              Shop
            </Link>
            <Link to="/about" className="hover:text-sage-700 font-medium transition-colors link-underline">
              About
            </Link>
            <Link to="/contact" className="hover:text-sage-700 font-medium transition-colors link-underline">
              Contact
            </Link>
            {isAdmin() && (
              <Link to="/admin" className="hover:text-sage-700 font-medium transition-colors link-underline">
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <button 
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 hover:text-sage-700 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full border border-sage-200 focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500 w-40 lg:w-56"
              />
            </form>
            <button 
              className="hover:text-sage-700 transition-colors"
              aria-label="Language"
            >
              <Globe className="h-5 w-5" />
            </button>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/wishlist"
                  className="relative hover:text-sage-700 transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-sage-900 text-xs text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/cart"
                  className="relative hover:text-sage-700 transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-sage-900 text-xs text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <div className="flex items-center space-x-4">
                  <div 
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={goToProfile}
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="hover:text-sage-700 transition-colors font-medium link-underline flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-sage-700 transition-colors font-medium link-underline"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={goToProfile}
                  className="relative hover:text-sage-700 transition-colors"
                  aria-label="Profile"
                >
                  <User className="h-5 w-5" />
                </button>
                <Link 
                  to="/wishlist"
                  className="relative hover:text-sage-700 transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-sage-900 text-xs text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/cart"
                  className="relative hover:text-sage-700 transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-sage-900 text-xs text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="relative hover:text-sage-700 transition-colors"
                aria-label="Login"
              >
                <LogIn className="h-5 w-5" />
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:text-sage-700 transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 animate-fade-in text-sage-900">
          <div className="flex flex-col p-6 space-y-6">
            <form onSubmit={handleSearch} className="relative mb-4">
              <button 
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-900 hover:text-sage-700 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-sage-200 focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
              />
            </form>
            
            <Link 
              to="/" 
              className="text-xl hover:text-sage-700 font-medium transition-colors py-2 border-b border-sage-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-xl hover:text-sage-700 font-medium transition-colors py-2 border-b border-sage-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="text-xl hover:text-sage-700 font-medium transition-colors py-2 border-b border-sage-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-xl hover:text-sage-700 font-medium transition-colors py-2 border-b border-sage-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isAdmin() && (
              <Link 
                to="/admin" 
                className="text-xl hover:text-sage-700 font-medium transition-colors py-2 border-b border-sage-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            
            <div className="flex items-center space-x-4 py-2">
              <button 
                className="text-sage-900 hover:text-sage-700 transition-colors"
                aria-label="Language"
              >
                <Globe className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-4 pt-4">
              {isAuthenticated ? (
                <>
                  <div 
                    className="flex items-center space-x-2 py-2 cursor-pointer"
                    onClick={() => {
                      navigate('/profile');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <User className="h-5 w-5 text-sage-900" />
                    <span className="text-sm font-medium text-sage-900">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="btn-secondary w-full text-center flex items-center justify-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-secondary w-full text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary w-full text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;