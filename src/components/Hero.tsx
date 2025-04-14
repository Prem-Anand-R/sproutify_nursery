import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1582757345040-95aa282e95d9?q=80&w=1974&auto=format&fit=crop',
    fallbackImage: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    title: 'Grow Your Own Vegetables',
    description: 'Premium vegetable saplings for your home garden',
    cta: 'Shop Now',
    position: 'center',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1624239913688-7c9e74c4df36?q=80&w=1974&auto=format&fit=crop',
    fallbackImage: 'https://5.imimg.com/data5/SELLER/Default/2020/12/CE/LF/SH/46453324/plants-1000x1000.jpg',
    title: 'Organic Herbs & Vegetables',
    description: 'Healthy, pesticide-free saplings delivered to your doorstep',
    cta: 'Explore Collection',
    position: 'center',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1599322354177-8cbdf1c30bfa?q=80&w=1974&auto=format&fit=crop',
    fallbackImage: 'https://www.rootzzo.com/wp-content/uploads/2024/10/Firefly-Benefits-of-Using-Coco-Peat-for-Seedling-Germination-and-Propagation-39956-1024x796.jpg',
    title: 'Farm Fresh Saplings',
    description: 'Start your kitchen garden with our carefully grown saplings',
    cta: 'Get Started',
    position: 'left',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoadStatus, setImageLoadStatus] = useState<Record<number, boolean>>({});
  const [fallbacks, setFallbacks] = useState<Record<number, boolean>>({});
  const slideInterval = useRef<number | null>(null);

  // Initialize image loading state
  // useEffect(() => {
  //   const initialStatus = slides.reduce((acc, slide) => {
  //     acc[slide.id] = false;
  //     return acc;
  //   }, {} as Record<number, boolean>);
    
  //   setImageLoadStatus(initialStatus);
  // }, []);

  const startSlideTimer = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    slideInterval.current = window.setInterval(() => {
      nextSlide();
    }, 5000);
  };

  useEffect(() => {
    startSlideTimer();
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [currentSlide]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleImageLoad = (id: number) => {
    setImageLoadStatus(prev => ({
      ...prev,
      [id]: true
    }));
  };

  const handleImageError = (id: number) => {
    setFallbacks(prev => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 w-full transition-opacity duration-1000 ease-in-out',
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
          style={{ height: 'calc(100vh - 64px)' }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 h-full w-full">
            {!imageLoadStatus[slide.id] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <Loader2 className="h-10 w-10 animate-spin text-sage-600" />
              </div>
            )}
            <img
              src={fallbacks[slide.id] ? slide.fallbackImage : slide.image}
              alt={slide.title}
              className={cn(
                "h-full w-full object-cover transition-opacity duration-300",
                imageLoadStatus[slide.id] ? 'opacity-100' : 'opacity-0'
              )}
              loading="lazy"
              onLoad={() => handleImageLoad(slide.id)}
              onError={() => handleImageError(slide.id)}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content */}
          <div className="relative z-20 flex h-full w-full items-center px-4">
            <div className={cn(
              "w-full mx-auto px-4 sm:px-6 lg:px-8",
              slide.position === 'left' 
                ? 'text-left' 
                : slide.position === 'right' 
                  ? 'text-right' 
                  : 'text-center'
            )}>
              <div className={cn(
                "max-w-2xl space-y-4 sm:space-y-6 text-white",
                slide.position === 'center' && 'mx-auto',
                slide.position === 'right' && 'ml-auto'
              )}>
                <h1 className="animate-fade-in font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl" style={{ animationDelay: '0.2s' }}>
                  {slide.title}
                </h1>
                <p className="animate-fade-in text-sm sm:text-base md:text-lg" style={{ animationDelay: '0.4s' }}>
                  {slide.description}
                </p>
                <div className="animate-fade-in pt-2 sm:pt-4" style={{ animationDelay: '0.6s' }}>
                  <Link 
                    to="/products" 
                    className="inline-block rounded-md bg-sage-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sage-800 sm:px-6 sm:py-3 sm:text-base"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-1 text-white backdrop-blur-sm transition-colors hover:bg-white/40 sm:left-4 sm:p-2"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-1 text-white backdrop-blur-sm transition-colors hover:bg-white/40 sm:right-4 sm:p-2"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center space-x-2 sm:bottom-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-1.5 w-6 rounded-full transition-all duration-300 sm:h-2 sm:w-8',
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;