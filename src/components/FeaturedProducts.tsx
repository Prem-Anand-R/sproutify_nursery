
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/components/ProductCard';

// Sample products data with WebP images where possible for better performance
const products: Product[] = [
  {
    id: 1,
    name: 'Tomato Saplings',
    description: 'High-yield cherry tomato saplings, perfect for home gardens',
    price: 120,
    image: 'https://images.pexels.com/photos/1647794/pexels-photo-1647794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
    image: 'https://images.pexels.com/photos/1838594/pexels-photo-1838594.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'herbs',
    rating: 4.7,
    reviews: 89,
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 3,
    name: 'Spinach Bundle',
    description: 'Nutrient-rich spinach saplings for continuous harvest',
    price: 70,
    image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'leafy-greens',
    rating: 4.5,
    reviews: 76,
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: 4,
    name: 'Bell Pepper Mix',
    description: 'Colorful bell pepper saplings - red, yellow and green varieties',
    price: 150,
    image: 'https://images.pexels.com/photos/5503238/pexels-photo-5503238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'vegetables',
    rating: 4.9,
    reviews: 112,
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 5,
    name: 'Mint Collection',
    description: 'Assorted mint varieties - peppermint, spearmint and chocolate mint',
    price: 90,
    image: 'https://images.pexels.com/photos/977903/pexels-photo-977903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'herbs',
    rating: 4.6,
    reviews: 68,
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: 6,
    name: 'Carrot Saplings',
    description: 'Sweet carrot saplings that grow well in containers or gardens',
    price: 100,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'root-vegetables',
    rating: 4.7,
    reviews: 94,
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
  },
];

const FeaturedProducts = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainer = useRef<HTMLDivElement>(null);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : activeFilter === 'new-arrivals' 
      ? products.filter(product => product.isNewArrival) 
      : products.filter(product => product.isBestSeller);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const { current } = scrollContainer;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Check if there are products after filtering
  const hasProducts = filteredProducts.length > 0;

  return (
    <section className="py-20 bg-sage-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="mb-2 inline-block rounded-full bg-sage-100 px-3 py-1 text-sm font-medium text-sage-900">
                Our Products
              </span>
              <h2 className="font-serif text-4xl font-medium leading-tight text-sage-900 md:text-5xl">
                Featured Saplings
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeFilter === 'all' 
                    ? "bg-sage-900 text-white" 
                    : "bg-white text-sage-900 hover:bg-sage-100"
                )}
              >
                All Products
              </button>
              <button
                onClick={() => setActiveFilter('best-sellers')}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeFilter === 'best-sellers' 
                    ? "bg-sage-900 text-white" 
                    : "bg-white text-sage-900 hover:bg-sage-100"
                )}
              >
                Best Sellers
              </button>
              <button
                onClick={() => setActiveFilter('new-arrivals')}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeFilter === 'new-arrivals' 
                    ? "bg-sage-900 text-white" 
                    : "bg-white text-sage-900 hover:bg-sage-100"
                )}
              >
                New Arrivals
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Scroll Buttons - Only show if we have products */}
          {hasProducts && (
            <>
              <button
                onClick={() => scroll('left')}
                className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-sage-900 shadow-md transition-all hover:bg-sage-100 md:-left-6"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => scroll('right')}
                className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-sage-900 shadow-md transition-all hover:bg-sage-100 md:-right-6"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          
          {/* Products Carousel */}
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="flex justify-between">
                      <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
                      <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : hasProducts ? (
            <div 
              ref={scrollContainer}
              className="hide-scrollbar -mx-4 flex overflow-x-auto pb-8 pt-2 snap-x snap-mandatory"
            >
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  className="min-w-[280px] max-w-[280px] snap-start px-4 sm:min-w-[350px] sm:max-w-[350px] md:min-w-[320px] md:max-w-[320px]"
                >
                  <ProductCard product={product} redirectToCartOnAdd={true} />
                </div>
              ))}
            </div>
          ) : (
            // No products found
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-sage-600">No products found for this category.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/products" 
            className="inline-flex items-center rounded-md bg-sage-900 px-6 py-3 font-medium text-white transition-colors hover:bg-sage-800"
          >
            View All Products
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
