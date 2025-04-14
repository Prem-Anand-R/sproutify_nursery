
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll respond shortly.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="font-serif text-4xl font-medium text-sage-900 md:text-5xl mb-4">
              Get In Touch
            </h1>
            <p className="max-w-2xl mx-auto text-sage-600 text-lg">
              Have questions about our products or need gardening advice? We're here to help!
            </p>
          </div>
          
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="bg-sage-100 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-sage-700" />
              </div>
              <h3 className="text-xl font-medium text-sage-900 mb-3">Call Us</h3>
              <p className="text-sage-600 mb-2">
                Mon-Fri, 9am-6pm IST
              </p>
              <a href="tel:+917890123456" className="text-sage-900 font-medium hover:underline">
                +91 7890 123 456
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="bg-sage-100 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-sage-700" />
              </div>
              <h3 className="text-xl font-medium text-sage-900 mb-3">Email Us</h3>
              <p className="text-sage-600 mb-2">
                We'll respond within 24 hours
              </p>
              <a href="mailto:support@sproutify.com" className="text-sage-900 font-medium hover:underline">
                support@sproutify.com
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="bg-sage-100 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-sage-700" />
              </div>
              <h3 className="text-xl font-medium text-sage-900 mb-3">Visit Us</h3>
              <p className="text-sage-600 mb-2">
                Our nursery is open to visitors
              </p>
              <address className="text-sage-900 font-medium not-italic">
                123 Green Path, Bangalore, India
              </address>
            </div>
          </div>
          
          {/* Contact Form and Map */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-16">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="font-serif text-2xl font-medium text-sage-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-sage-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-sage-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-sage-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-sage-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-sage-700 mb-1">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-sage-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                    >
                      <option value="">Select a topic</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Support">Order Support</option>
                      <option value="Growing Advice">Growing Advice</option>
                      <option value="Business Inquiry">Business Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-sage-700 mb-1">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-sage-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              </div>
              
              <div className="md:w-1/2">
                <div className="h-full min-h-[300px] bg-sage-100 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-lg font-medium text-sage-900 mb-2">Our Location</h3>
                    <p className="text-sage-600 mb-4">123 Green Path, Bangalore, India</p>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.6309395!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Sproutify Nursery Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-medium text-sage-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-sage-900 mb-3">How do I care for my saplings?</h3>
                <p className="text-sage-600">
                  Each product comes with detailed care instructions. Generally, keep soil moist but not waterlogged, and place in appropriate sunlight conditions for the specific plant.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-sage-900 mb-3">What is your shipping policy?</h3>
                <p className="text-sage-600">
                  We ship throughout India. Orders typically arrive within 3-5 business days, packed in our special plant-safe containers to ensure they arrive healthy.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-sage-900 mb-3">Can I return plants if they arrive damaged?</h3>
                <p className="text-sage-600">
                  Yes! If your plants arrive damaged, please take photos and contact us within 24 hours. We'll arrange a replacement or refund.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-sage-900 mb-3">Do you offer bulk discounts?</h3>
                <p className="text-sage-600">
                  Yes, we offer discounts for orders over 20 saplings. Contact our sales team for a custom quote for your garden or community project.
                </p>
              </div>
            </div>
          </div>
          
          {/* Newsletter Section */}
          <div className="bg-sage-100 rounded-lg p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl font-medium text-sage-900 mb-4">Join Our Newsletter</h2>
            <p className="text-sage-600 mb-6 max-w-2xl mx-auto">
              Subscribe for seasonal growing tips, new product announcements, and exclusive discounts.
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-2 rounded-l-md border-y border-l border-sage-200 focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-sage-900 text-white px-6 py-2 rounded-r-md font-medium hover:bg-sage-800 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
