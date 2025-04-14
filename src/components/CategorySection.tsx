
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 'leafy-greens',
    name: 'Leafy Greens',
    description: 'Spinach, Lettuce, Kale & More',
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?q=80&w=1950&auto=format&fit=crop',
    color: 'bg-sage-900',
  },
  {
    id: 'herbs',
    name: 'Herbs',
    description: 'Mint, Basil, Coriander & More',
    image: 'https://img.freepik.com/free-photo/top-view-herbs-arrangement-concept_23-2148579408.jpg?t=st=1743007688~exp=1743011288~hmac=79225d55f5dcd993f68b523abb75c1dac5d1f99867f293c79d4b18001ece4360&w=740',
    color: 'bg-earth-300',
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    description: 'Tomatoes, Peppers, Eggplants & More',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1975&auto=format&fit=crop',
    color: 'bg-cream-300',
  },
  {
    id: 'root-vegetables',
    name: 'Root Vegetables',
    description: 'Carrots, Radish, Beetroot & More',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1974&auto=format&fit=crop',
    color: 'bg-sage-800',
  },
];

const CategorySection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block rounded-full bg-sage-100 px-3 py-1 text-sm font-medium text-sage-900">
            Explore Categories
          </span>
          <h2 className="font-serif text-4xl font-medium leading-tight text-sage-900 md:text-5xl">
            What Would You Like To Grow?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group relative flex h-80 overflow-hidden rounded-lg card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 mt-auto p-6 text-white">
                <h3 className="text-2xl font-bold text-white/90">{category.name}</h3>
                <p className="mt-1 text-sm text-white/90">{category.description}</p>
                
                <div className={cn(
                  "mt-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-300",
                  category.color,
                  "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                )}>
                  <span>View Products</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/products" 
            className="inline-flex items-center rounded-md border border-sage-900 bg-transparent px-6 py-3 font-medium text-sage-900 transition-colors hover:bg-sage-900 hover:text-white"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
