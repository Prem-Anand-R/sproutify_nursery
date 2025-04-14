
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="font-serif text-4xl font-medium text-sage-900 md:text-5xl mb-4">
              Our Story
            </h1>
            <p className="max-w-2xl mx-auto text-sage-600 text-lg">
              At Sproutify, we're passionate about bringing nature's goodness to your doorstep, making sustainable gardening accessible to everyone.
            </p>
          </div>
          
          {/* Mission Section */}
          <div className="mb-20">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1621693247912-cff8a1427610?q=80&w=1974&auto=format&fit=crop" 
                    alt="Organic farming" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex items-center">
                  <div>
                    <h2 className="font-serif text-3xl font-medium text-sage-900 mb-4">Our Mission</h2>
                    <p className="text-sage-600 mb-6">
                      We believe everyone deserves access to fresh, homegrown produce. Our mission is to empower people to grow their own food, regardless of space constraints or gardening experience.
                    </p>
                    <p className="text-sage-600">
                      By providing high-quality vegetable saplings and comprehensive growing guides, we're making sustainable food production a reality for urban dwellers, suburban families, and rural communities alike.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="mb-20">
            <h2 className="font-serif text-3xl font-medium text-sage-900 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="bg-sage-100 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-sage-900 mb-3">Sustainability</h3>
                <p className="text-sage-600">
                  We're committed to sustainable farming practices that protect our planet for future generations.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="bg-sage-100 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-sage-900 mb-3">Quality</h3>
                <p className="text-sage-600">
                  Every sapling we sell is carefully nurtured to ensure robust growth and abundant harvests.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="bg-sage-100 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-sage-900 mb-3">Accessibility</h3>
                <p className="text-sage-600">
                  We believe everyone should be able to grow their own food, regardless of space or experience.
                </p>
              </div>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-20">
            <h2 className="font-serif text-3xl font-medium text-sage-900 mb-8 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden text-center">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop" 
                  alt="Aarav Sharma" 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="font-medium text-sage-900 text-xl">Aarav Sharma</h3>
                  <p className="text-sage-600 mb-3">Founder & CEO</p>
                  <p className="text-sage-600 text-sm">
                    Urban farmer with 15+ years of experience in sustainable agriculture.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden text-center">
                <img 
                  src="https://images.unsplash.com/photo-1573497161161-c3e73707e25c?q=80&w=987&auto=format&fit=crop" 
                  alt="Priya Patel" 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="font-medium text-sage-900 text-xl">Priya Patel</h3>
                  <p className="text-sage-600 mb-3">Agricultural Scientist</p>
                  <p className="text-sage-600 text-sm">
                    PhD in Agricultural Science with expertise in organic farming techniques.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden text-center">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=987&auto=format&fit=crop" 
                  alt="Raj Mehta" 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="font-medium text-sage-900 text-xl">Raj Mehta</h3>
                  <p className="text-sage-600 mb-3">Operations Manager</p>
                  <p className="text-sage-600 text-sm">
                    Logistics expert ensuring our saplings reach you in perfect condition.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden text-center">
                <img 
                  src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=987&auto=format&fit=crop" 
                  alt="Meera Singh" 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="font-medium text-sage-900 text-xl">Meera Singh</h3>
                  <p className="text-sage-600 mb-3">Customer Experience</p>
                  <p className="text-sage-600 text-sm">
                    Dedicated to helping you succeed in your gardening journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="bg-sage-100 rounded-lg p-8 md:p-12 text-center">
            <h2 className="font-serif text-3xl font-medium text-sage-900 mb-4">Ready to Start Growing?</h2>
            <p className="text-sage-600 mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who have transformed their spaces into thriving gardens with Sproutify.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/products" className="btn-primary">Shop Now</a>
              <a href="/contact" className="btn-secondary">Contact Us</a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
