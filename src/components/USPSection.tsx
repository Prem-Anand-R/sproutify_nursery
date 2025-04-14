
import React from 'react';
import { Truck, Leaf, Tag, HelpCircle } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-sage-900" />,
    title: 'Organic Saplings',
    description: 'Our saplings are grown organically without harmful pesticides or chemicals.',
  },
  {
    icon: <Truck className="h-8 w-8 text-sage-900" />,
    title: 'Doorstep Delivery',
    description: 'Fast and careful delivery to ensure your saplings arrive fresh and healthy.',
  },
  {
    icon: <Tag className="h-8 w-8 text-sage-900" />,
    title: 'Best Prices',
    description: 'We offer competitive prices without compromising on quality.',
  },
  {
    icon: <HelpCircle className="h-8 w-8 text-sage-900" />,
    title: 'Expert Gardening Tips',
    description: 'Benefit from our knowledge with care instructions for each sapling.',
  },
];

const USPSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block rounded-full bg-sage-100 px-3 py-1 text-sm font-medium text-sage-900">
            Our Promise
          </span>
          <h2 className="font-serif text-4xl font-medium leading-tight text-sage-900 md:text-5xl">
            Why Choose Us?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-600">
            We're committed to providing the highest quality vegetable saplings to help you grow your own garden successfully.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-sm transition-all duration-300 hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 rounded-full bg-sage-100 p-4">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold text-sage-900">{feature.title}</h3>
              <p className="text-sage-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;
