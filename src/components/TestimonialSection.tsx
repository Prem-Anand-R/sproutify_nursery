
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Home Gardener',
    quote: "The vegetable saplings I received were in perfect condition and started growing rapidly. I'm already harvesting fresh tomatoes!",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1558203728-00f45181dd84?q=80&w=2000&auto=format&fit=crop',
    productImage: 'https://images.unsplash.com/photo-1592165710414-1bf75ae5d389?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Raj Patel',
    role: 'Urban Farmer',
    quote: "I've tried many suppliers, but Sproutify provides the healthiest saplings by far. My terrace garden is flourishing!",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
    productImage: 'https://images.unsplash.com/photo-1623224316956-835f559bec3c?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Ananya Gupta',
    role: 'Kitchen Garden Enthusiast',
    quote: 'The variety of herb saplings is amazing, and they all grow so well. The mint and basil are thriving in my kitchen garden.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=1965&auto=format&fit=crop',
    productImage: 'https://images.unsplash.com/photo-1620301551587-71d030991fd8?q=80&w=1974&auto=format&fit=crop',
  },
];

const TestimonialSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? 'text-earth-300' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block rounded-full bg-sage-100 px-3 py-1 text-sm font-medium text-sage-900">
            Customer Stories
          </span>
          <h2 className="font-serif text-4xl font-medium leading-tight text-sage-900 md:text-5xl">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-sage-900 shadow-md transition-all hover:bg-sage-100 md:-left-6"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 text-sage-900 shadow-md transition-all hover:bg-sage-100 md:-right-6"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Testimonials */}
          <div className="relative mx-auto overflow-hidden">
            <div 
              ref={testimonialRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="min-w-full">
                  <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-lg shadow-lg lg:w-1/2">
                      <img
                        src={testimonial.productImage}
                        alt="Customer's garden"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Testimonial Content */}
                    <div className="flex flex-col justify-center lg:w-1/2">
                      <div className="mb-4 flex text-xl text-yellow-500">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      <blockquote className="mb-6">
                        <p className="text-xl font-medium italic text-sage-900 md:text-2xl">
                          "{testimonial.quote}"
                        </p>
                      </blockquote>
                      
                      <div className="flex items-center">
                        <div className="mr-4 h-14 w-14 overflow-hidden rounded-full border-2 border-sage-100">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-sage-900">{testimonial.name}</h4>
                          <p className="text-sage-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={cn(
                  'h-2 w-8 rounded-full transition-all duration-300',
                  index === activeTestimonial ? 'bg-sage-900' : 'bg-sage-200'
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
