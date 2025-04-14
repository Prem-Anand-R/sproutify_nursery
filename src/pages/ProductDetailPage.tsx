import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Heart, Star, Share2, Truck, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const fetchProductById = (id: string): Product | undefined => {
  const products = [
    {
      id: 1,
      name: 'Tomato Saplings',
      description: 'High-yield cherry tomato saplings, perfect for home gardens. These saplings are grown organically and are ready to be transplanted into your garden or container. They will produce sweet, juicy cherry tomatoes throughout the growing season with proper care. Ideal for beginners and experienced gardeners alike.',
      price: 120,
      image: 'https://images.unsplash.com/photo-1618791974639-5242ac954e14?q=80&w=1974&auto=format&fit=crop',
      category: 'vegetables',
      rating: 4.8,
      reviews: 124,
      isNewArrival: true,
      isBestSeller: true,
      inStock: true
    },
    {
      id: 2,
      name: 'Basil Herb',
      description: 'Fragrant basil saplings, essential for Italian cuisine. These aromatic herbs add wonderful flavor to pasta dishes, salads, and sauces. Our basil plants are grown without chemical pesticides and are ready to be placed in your herb garden or kitchen windowsill. Regular harvesting promotes bushier growth and extends the plant\'s productive life.',
      price: 80,
      image: 'https://images.unsplash.com/photo-1625064714619-3e021704df38?q=80&w=1974&auto=format&fit=crop',
      category: 'herbs',
      rating: 4.7,
      reviews: 89,
      isNewArrival: false,
      isBestSeller: true,
      inStock: true
    }
  ];
  
  return products.find(product => product.id === Number(id));
};

const getRelatedProducts = (currentProduct: Product | undefined): Product[] => {
  if (!currentProduct) return [];
  
  const allProducts = [
    {
      id: 1,
      name: 'Tomato Saplings',
      description: 'High-yield cherry tomato saplings, perfect for home gardens',
      price: 120,
      image: 'https://images.unsplash.com/photo-1618791974639-5242ac954e14?q=80&w=1974&auto=format&fit=crop',
      category: 'vegetables',
      rating: 4.8,
      reviews: 124,
      isNewArrival: true,
      isBestSeller: true,
      inStock: true,
    },
    {
      id: 2,
      name: 'Basil Herb',
      description: 'Fragrant basil saplings, essential for Italian cuisine',
      price: 80,
      image: 'https://images.unsplash.com/photo-1625064714619-3e021704df38?q=80&w=1974&auto=format&fit=crop',
      category: 'herbs',
      rating: 4.7,
      reviews: 89,
      isNewArrival: false,
      isBestSeller: true,
      inStock: true,
    },
  ];
  
  return allProducts
    .filter(product => product.category === currentProduct.category && product.id !== currentProduct.id)
    .slice(0, 4);
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const fetchedProduct = fetchProductById(id);
      setProduct(fetchedProduct);
      setRelatedProducts(getRelatedProducts(fetchedProduct));
      
      setIsImageLoading(true);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
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
    
    addToCart({ ...product, quantity });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
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
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const getFallbackImage = (productId?: number) => {
    if (!productId) return "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    
    const fallbackImages = [
      "https://images.pexels.com/photos/2292919/pexels-photo-2292919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/4751969/pexels-photo-4751969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ];
    return fallbackImages[productId % fallbackImages.length];
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-medium text-sage-900">Product not found</h2>
              <p className="mt-2 text-sage-600">The product you're looking for doesn't exist or has been removed.</p>
              <Link to="/products" className="btn-primary inline-block mt-6">
                Back to Products
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const productImages = [
    product.image,
    'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4751969/pexels-photo-4751969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1105019/pexels-photo-1105019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link to="/products" className="inline-flex items-center text-sage-600 hover:text-sage-900">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Products
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
                  {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <div className="w-12 h-12 border-4 border-sage-200 border-t-sage-800 rounded-full animate-spin"></div>
                    </div>
                  )}
                  <Avatar className="h-full w-full rounded-none">
                    <AvatarImage 
                      src={productImages[activeImage]} 
                      alt={product.name} 
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      onLoad={() => setIsImageLoading(false)}
                    />
                    <AvatarFallback className="h-full w-full rounded-none">
                      <img 
                        src={getFallbackImage(product.id)} 
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                        loading="lazy"
                      />
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex space-x-2 overflow-auto pb-2">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveImage(index);
                        setIsImageLoading(true);
                      }}
                      className={`flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden ${
                        activeImage === index ? 'border-sage-700' : 'border-transparent'
                      }`}
                    >
                      <Avatar className="h-full w-full rounded-none">
                        <AvatarImage
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <AvatarFallback className="h-full w-full rounded-none bg-gray-100">
                          <img 
                            src={getFallbackImage(product.id + index)} 
                            alt={`${product.name} view ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <Link to={`/products?category=${product.category}`} className="text-xs font-medium uppercase text-sage-600">
                      {product.category.replace('-', ' ')}
                    </Link>
                    <div className="flex items-center space-x-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : i < product.rating
                              ? 'text-yellow-400 fill-yellow-400 opacity-50'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-sage-600">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <h1 className="mt-2 text-2xl font-serif font-medium text-sage-900 md:text-3xl">
                    {product.name}
                  </h1>
                  
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-medium text-sage-900">₹{product.price}</p>
                      <p className="text-sm text-sage-600">Inclusive of all taxes</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.inStock
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                      {product.isNewArrival && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sage-100 text-sage-800">
                          New Arrival
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-b border-gray-200 py-4">
                  <p className="text-sage-600">
                    {product.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="mr-3 text-sage-900 font-medium">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="px-3 py-1 text-sage-600 hover:text-sage-900 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sage-600">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        className="px-3 py-1 text-sage-600 hover:text-sage-900"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="btn-primary flex-1 flex items-center justify-center"
                      title={!isAuthenticated ? "Please log in to add to cart" : ""}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </button>
                    
                    <button
                      onClick={handleWishlistToggle}
                      className="btn-secondary flex items-center justify-center"
                      title={!isAuthenticated ? "Please log in to add to wishlist" : ""}
                    >
                      <Heart
                        className={`mr-2 h-5 w-5 ${
                          isAuthenticated && isInWishlist(product.id) ? 'fill-earth-300 text-earth-300' : ''
                        }`}
                      />
                      {isAuthenticated && isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-sage-700 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-sage-900">Free Delivery</h4>
                      <p className="text-xs text-sage-600">On orders above ₹500</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck className="h-5 w-5 text-sage-700 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-sage-900">Quality Guarantee</h4>
                      <p className="text-xs text-sage-600">7-day replacement policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-medium text-sage-900 mb-6">
                You May Also Like
              </h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} redirectToCartOnAdd={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;

