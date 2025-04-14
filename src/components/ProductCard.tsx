
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock?: boolean;
}

interface ProductCardProps {
  product: Product;
  redirectToCartOnAdd?: boolean;
}

const ProductCard = ({ product, redirectToCartOnAdd = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.inStock === false) {
      toast({
        title: "Product unavailable",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }
    
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to add items to your cart",
        action: (
          <Link to="/login" className="bg-sage-900 text-white px-3 py-1 text-xs rounded-md hover:bg-sage-700">
            Login
          </Link>
        ),
      });
      navigate('/login');
      return;
    }
    
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
    
    if (redirectToCartOnAdd) {
      navigate('/cart');
    }
  };
  
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to add items to your wishlist",
        action: (
          <Link to="/login" className="bg-sage-900 text-white px-3 py-1 text-xs rounded-md hover:bg-sage-700">
            Login
          </Link>
        ),
      });
      navigate('/login');
      return;
    }
    
    const isCurrentlyInWishlist = isInWishlist(product.id);
    
    if (isCurrentlyInWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };

  // Get a fallback image based on product ID to ensure it's always different
  const getFallbackImage = () => {
    const fallbackImages = [
      "https://images.pexels.com/photos/2292919/pexels-photo-2292919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4751969/pexels-photo-4751969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ];
    return fallbackImages[product.id % fallbackImages.length];
  };

  return (
    <div className="group relative h-full overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Product Image with lazy loading */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <Avatar className="h-full w-full rounded-none">
          <AvatarImage
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <AvatarFallback className="h-full w-full rounded-none">
            <img 
              src={getFallbackImage()} 
              alt={product.name}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
          </AvatarFallback>
        </Avatar>
        
        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="rounded-full bg-sage-900 px-3 py-1 text-xs font-medium text-white">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="rounded-full bg-earth-300 px-3 py-1 text-xs font-medium text-earth-950">
              Best Seller
            </span>
          )}
          {product.inStock === false && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
              Sold Out
            </span>
          )}
        </div>
        
        {/* Wishlist button */}
        <button 
          onClick={handleWishlistToggle}
          className={cn(
            "absolute right-4 top-4 rounded-full p-2 backdrop-blur-sm transition-all duration-300",
            isAuthenticated && isInWishlist(product.id) 
              ? "bg-red-50 text-red-500 hover:bg-red-100" 
              : "bg-white/80 text-sage-900 hover:bg-white hover:text-earth-300"
          )}
          aria-label={isAuthenticated && isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
          title={!isAuthenticated ? "Please log in to add to wishlist" : ""}
        >
          <Heart className={cn("h-4 w-4", isAuthenticated && isInWishlist(product.id) ? "fill-current" : "")} />
        </button>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <Link to={`/products?category=${product.category}`} className="text-xs font-medium uppercase text-sage-600">
            {product.category.replace('-', ' ')}
          </Link>
          <div className="flex items-center text-xs">
            <span className="mr-1 text-sage-900">★</span>
            <span>{product.rating}</span>
            <span className="ml-1 text-sage-600">({product.reviews})</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`} className="mb-2 block">
          <h3 className="text-lg font-medium text-sage-900 transition-colors group-hover:text-sage-700">
            {product.name}
          </h3>
        </Link>
        
        <p className="mb-4 text-sm text-sage-600 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-sage-900">₹{product.price}</span>
          <div className="flex gap-2">
            <Link 
              to={`/product/${product.id}`}
              className="flex items-center rounded-full bg-white border border-sage-900 px-3 py-1.5 text-xs font-medium text-sage-900 transition-colors hover:bg-sage-50"
            >
              <Eye className="mr-1 h-3.5 w-3.5" />
              View
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={product.inStock === false}
              className={cn(
                "flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                product.inStock === false 
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
                  : "bg-sage-900 text-white hover:bg-sage-800"
              )}
              title={!isAuthenticated ? "Please log in to add to cart" : ""}
            >
              <ShoppingCart className="mr-1 h-3.5 w-3.5" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
