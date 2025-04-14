
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Filter, SlidersHorizontal, Search, X } from 'lucide-react';
import ProductCard, { Product } from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const allProducts: Product[] = [
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
  {
    id: 3,
    name: 'Spinach Bundle',
    description: 'Nutrient-rich spinach saplings for continuous harvest',
    price: 70,
    image: 'https://images.unsplash.com/photo-1576675936714-1a576c1e9de5?q=80&w=1974&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1592924357228-9b5becb5d44f?q=80&w=1974&auto=format&fit=crop',
    category: 'vegetables',
    rating: 4.9,
    reviews: 112,
    isNewArrival: false,
    isBestSeller: true,
    inStock: false,
  },
  {
    id: 5,
    name: 'Mint Collection',
    description: 'Assorted mint varieties - peppermint, spearmint and chocolate mint',
    price: 90,
    image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2080&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1550237330-a5d774594098?q=80&w=1974&auto=format&fit=crop',
    category: 'root-vegetables',
    rating: 4.7,
    reviews: 94,
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 7,
    name: 'Cucumber Saplings',
    description: 'Easy-to-grow cucumber saplings perfect for beginners',
    price: 85,
    image: 'https://images.unsplash.com/photo-1591197172062-c718f82aba20?q=80&w=1974&auto=format&fit=crop',
    category: 'vegetables',
    rating: 4.4,
    reviews: 58,
    isNewArrival: true,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: 8,
    name: 'Lettuce Variety Pack',
    description: 'Mix of romaine, butterhead, and iceberg lettuce saplings',
    price: 110,
    image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?q=80&w=1925&auto=format&fit=crop',
    category: 'leafy-greens',
    rating: 4.8,
    reviews: 87,
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 9,
    name: 'Coriander Herbs',
    description: 'Fresh coriander saplings with strong aroma and flavor',
    price: 60,
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1964&auto=format&fit=crop',
    category: 'herbs',
    rating: 4.3,
    reviews: 43,
    isNewArrival: true,
    isBestSeller: false,
    inStock: false,
  },
  {
    id: 10,
    name: 'Beetroot Saplings',
    description: 'Vibrant beetroot saplings with excellent nutritional value',
    price: 95,
    image: 'https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?q=80&w=1974&auto=format&fit=crop',
    category: 'root-vegetables',
    rating: 4.6,
    reviews: 62,
    isNewArrival: false,
    isBestSeller: false,
    inStock: true,
  },
  {
    id: 11,
    name: 'Broccoli Plants',
    description: 'Nutrient-dense broccoli saplings ready for your garden',
    price: 130,
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?q=80&w=2070&auto=format&fit=crop',
    category: 'vegetables',
    rating: 4.7,
    reviews: 78,
    isNewArrival: true,
    isBestSeller: true,
    inStock: true,
  },
  {
    id: 12,
    name: 'Rosemary Herb',
    description: 'Aromatic rosemary saplings perfect for culinary and ornamental use',
    price: 85,
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?q=80&w=2070&auto=format&fit=crop',
    category: 'herbs',
    rating: 4.9,
    reviews: 105,
    isNewArrival: false,
    isBestSeller: true,
    inStock: true,
  },
];

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'herbs', name: 'Herbs' },
  { id: 'leafy-greens', name: 'Leafy Greens' },
  { id: 'root-vegetables', name: 'Root Vegetables' },
];

const sortOptions = [
  { id: 'featured', name: 'Featured' },
  { id: 'newest', name: 'Newest Arrivals' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'rating', name: 'Customer Rating' },
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [loadedCount, setLoadedCount] = useState(8);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const categoryParam = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'featured';
  const inStockOnly = searchParams.get('instock') === 'true';

  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    let filtered = [...allProducts];
    
    if (categoryParam && categoryParam !== 'all') {
      filtered = filtered.filter(product => product.category === categoryParam);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }
    
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock !== false);
    }
    
    switch (sortBy) {
      case 'newest':
        filtered = filtered.filter(product => product.isNewArrival).concat(
          filtered.filter(product => !product.isNewArrival)
        );
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered = filtered.filter(product => product.isBestSeller).concat(
          filtered.filter(product => !product.isBestSeller)
        );
    }
    
    setFilteredProducts(filtered);
    setLoadedCount(8);
  }, [categoryParam, searchQuery, sortBy, inStockOnly]);

  useEffect(() => {
    setVisibleProducts(filteredProducts.slice(0, loadedCount));
  }, [filteredProducts, loadedCount]);

  const handleLoadMore = () => {
    setLoadedCount(prev => Math.min(prev + 8, filteredProducts.length));
  };

  const handleCategoryChange = (category: string) => {
    searchParams.set('category', category);
    if (category === 'all') {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (sort: string) => {
    searchParams.set('sort', sort);
    setSearchParams(searchParams);
  };

  const handleStockFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      searchParams.set('instock', 'true');
    } else {
      searchParams.delete('instock');
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      searchParams.set('search', searchInput);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    setSearchInput('');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Added proper spacing to prevent overlap with fixed navbar */}
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-medium text-sage-900 md:text-4xl">
              Vegetable Saplings
            </h1>
            <p className="mt-2 text-sage-600">
              Browse our collection of high-quality vegetable saplings for your garden
            </p>
          </div>
          
          <div className="mb-8 space-y-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-sage-500" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search for saplings..."
                  className="w-full rounded-full border border-sage-200 bg-white py-2 pl-10 pr-10 text-sage-900 focus:border-sage-500 focus:outline-none focus:ring-1 focus:ring-sage-500"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-500 hover:text-sage-700"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </form>
            
            <div className="flex gap-2 md:hidden">
              <button
                onClick={toggleFilterMenu}
                className="flex items-center gap-2 rounded-full border border-sage-200 bg-white px-4 py-2 text-sm font-medium text-sage-900"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              <div className="relative inline-block text-left flex-grow">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full appearance-none rounded-full border border-sage-200 bg-white px-4 py-2 text-sm font-medium text-sage-900 focus:border-sage-500 focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sage-700">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-sage-700">Category:</span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                          categoryParam === category.id
                            ? "bg-sage-900 text-white"
                            : "bg-white text-sage-900 hover:bg-sage-100 border border-sage-200"
                        )}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-sage-700">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="rounded-full border border-sage-200 bg-white px-3 py-1 text-sm text-sage-900 focus:border-sage-500 focus:outline-none"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="instock"
                      checked={inStockOnly}
                      onChange={handleStockFilterChange}
                      className="h-4 w-4 rounded border-sage-300 text-sage-600 focus:ring-sage-500"
                    />
                    <label htmlFor="instock" className="text-sm font-medium text-sage-700">
                      In Stock Only
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {isFilterMenuOpen && (
            <div className="mb-6 rounded-lg border border-sage-200 bg-white p-4 shadow-sm md:hidden">
              <div className="mb-4">
                <h3 className="mb-2 font-medium text-sage-900">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                        categoryParam === category.id
                          ? "bg-sage-900 text-white"
                          : "bg-white text-sage-900 hover:bg-sage-100 border border-sage-200"
                      )}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="mb-2 font-medium text-sage-900">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full rounded-md border border-sage-200 bg-white px-3 py-2 text-sm text-sage-900 focus:border-sage-500 focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="instock-mobile"
                  checked={inStockOnly}
                  onChange={handleStockFilterChange}
                  className="h-4 w-4 rounded border-sage-300 text-sage-600 focus:ring-sage-500"
                />
                <label htmlFor="instock-mobile" className="text-sm font-medium text-sage-700">
                  In Stock Only
                </label>
              </div>
              
              <button
                onClick={toggleFilterMenu}
                className="mt-4 w-full rounded-md bg-sage-900 py-2 text-sm font-medium text-white hover:bg-sage-800"
              >
                Apply Filters
              </button>
            </div>
          )}
          
          <div className="mb-6">
            <p className="text-sm text-sage-600">
              Showing {visibleProducts.length} of {filteredProducts.length} products
            </p>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="my-16 text-center">
              <h3 className="mb-2 text-xl font-medium text-sage-900">No products found</h3>
              <p className="text-sage-600">Try adjusting your filters or search terms</p>
            </div>
          )}
          
          {loadedCount < filteredProducts.length && (
            <div className="mt-12 text-center">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center rounded-md bg-sage-900 px-6 py-3 font-medium text-white transition-colors hover:bg-sage-800"
              >
                Load More Products
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
