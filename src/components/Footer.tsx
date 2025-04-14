
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sage-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="border-b border-sage-800 py-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="font-serif text-2xl font-medium md:text-3xl">
                Subscribe to Our Newsletter
              </h3>
              <p className="mt-2 text-sage-300">
                Get gardening tips, special offers, and updates on new saplings.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-l-md border border-sage-700 bg-sage-800 px-4 py-3 placeholder-sage-400 focus:border-sage-500 focus:outline-none sm:rounded-r-none"
                />
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-r-md bg-earth-300 px-6 py-3 font-medium text-earth-950 transition-colors hover:bg-earth-400 sm:mt-0"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: About */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-serif text-2xl font-bold">
              Sproutify
            </Link>
            <p className="mt-4 text-sage-300">
              Premium vegetable saplings grown with care. We're dedicated to helping you create a thriving home garden with organic, healthy plants.
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-800 text-white transition-colors hover:bg-sage-700"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-800 text-white transition-colors hover:bg-sage-700"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sage-800 text-white transition-colors hover:bg-sage-700"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sage-300">
              <li>
                <Link to="/" className="transition-colors hover:text-white hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="transition-colors hover:text-white hover:underline">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-white hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-white hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="transition-colors hover:text-white hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Products */}
          <div>
            <h4 className="text-lg font-semibold">Our Products</h4>
            <ul className="mt-4 space-y-2 text-sage-300">
              <li>
                <Link to="/products?category=leafy-greens" className="transition-colors hover:text-white hover:underline">
                  Leafy Greens
                </Link>
              </li>
              <li>
                <Link to="/products?category=herbs" className="transition-colors hover:text-white hover:underline">
                  Herbs
                </Link>
              </li>
              <li>
                <Link to="/products?category=vegetables" className="transition-colors hover:text-white hover:underline">
                  Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products?category=root-vegetables" className="transition-colors hover:text-white hover:underline">
                  Root Vegetables
                </Link>
              </li>
              <li>
                <Link to="/products?category=gardening-tools" className="transition-colors hover:text-white hover:underline">
                  Gardening Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <ul className="mt-4 space-y-4 text-sage-300">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0 text-earth-300" />
                <span>123 Garden Street, Green City, 600001</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 flex-shrink-0 text-earth-300" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 flex-shrink-0 text-earth-300" />
                <a href="mailto:info@sproutify.com" className="transition-colors hover:text-white hover:underline">
                  info@sproutify.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-sage-800 py-6">
          <div className="flex flex-col justify-between gap-4 text-sm text-sage-400 sm:flex-row">
            <p>© {new Date().getFullYear()} Sproutify. All rights reserved.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/privacy-policy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="transition-colors hover:text-white">
                Terms of Service
              </Link>
              <Link to="/shipping-policy" className="transition-colors hover:text-white">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
