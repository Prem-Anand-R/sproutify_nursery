
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Save, Upload, X, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const AdminProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    inStock: true,
    isNewArrival: false,
    isBestSeller: false,
    rating: '4.5',
    reviews: '0',
    tags: ''
  });

  useEffect(() => {
    // If in edit mode, fetch the product data
    if (isEditMode) {
      // This would be replaced with an actual API call in a real application
      // Simulating product fetch for demo purposes
      setTimeout(() => {
        setFormData({
          name: 'Tomato Saplings',
          description: 'High-yield tomato saplings that are disease resistant and perfect for home gardens.',
          price: '50',
          category: 'vegetables',
          inStock: true,
          isNewArrival: true,
          isBestSeller: true,
          rating: '4.8',
          reviews: '24',
          tags: 'tomato,vegetable,organic'
        });
        
        setImagePreview('/placeholder.svg');
      }, 300);
    }
  }, [isEditMode, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagePreview) {
      toast.error('Please upload a product image');
      return;
    }
    
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      if (isEditMode) {
        toast.success('Product updated successfully!');
      } else {
        toast.success('Product added successfully!');
      }
      navigate('/admin');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Bar */}
      <div className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/admin" className="text-sage-600 hover:text-sage-900 mr-4">
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-medium">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-sage-900 hover:bg-sage-800"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Product' : 'Save Product'}
          </Button>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto py-8 px-4">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-6">Product Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      placeholder="e.g. Tomato Saplings"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      placeholder="Describe your product..."
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price (₹) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      >
                        <option value="">Select a category</option>
                        <option value="vegetables">Vegetables</option>
                        <option value="herbs">Herbs</option>
                        <option value="leafy-greens">Leafy Greens</option>
                        <option value="root-vegetables">Root Vegetables</option>
                        <option value="fruit-plants">Fruit Plants</option>
                        <option value="exotic-varieties">Exotic Varieties</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                        Rating
                      </label>
                      <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        step="0.1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                        placeholder="4.5"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="reviews" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Reviews
                      </label>
                      <input
                        type="number"
                        id="reviews"
                        name="reviews"
                        value={formData.reviews}
                        onChange={handleChange}
                        min="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      placeholder="e.g. organic, vegetable, healthy"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-6">Product Image</h2>
                
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Product preview" 
                      className="w-full h-64 object-cover rounded-md" 
                    />
                    <button 
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <X className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Upload className="h-12 w-12 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Drag and drop an image here, or click to select a file</p>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="image">
                      <Button 
                        type="button"
                        className="bg-white border border-gray-300 text-sage-800 hover:bg-gray-50"
                      >
                        Browse Files
                      </Button>
                    </label>
                  </div>
                )}
                
                <div className="mt-4 flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    Upload a high-quality image to showcase your product. Recommended size: 800x800 pixels.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-6">Status</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="inStock"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-sage-600 focus:ring-sage-500"
                    />
                    <label htmlFor="inStock" className="ml-2 block text-sm text-gray-700">
                      In Stock
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isNewArrival"
                      name="isNewArrival"
                      checked={formData.isNewArrival}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-sage-600 focus:ring-sage-500"
                    />
                    <label htmlFor="isNewArrival" className="ml-2 block text-sm text-gray-700">
                      New Arrival
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isBestSeller"
                      name="isBestSeller"
                      checked={formData.isBestSeller}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-sage-600 focus:ring-sage-500"
                    />
                    <label htmlFor="isBestSeller" className="ml-2 block text-sm text-gray-700">
                      Best Seller
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium mb-6">Inventory</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                      SKU (Stock Keeping Unit)
                    </label>
                    <input
                      type="text"
                      id="sku"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      placeholder="e.g. TOM-SAP-001"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      id="stock"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      placeholder="e.g. 50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lowStockAlert" className="block text-sm font-medium text-gray-700 mb-1">
                      Low Stock Alert Threshold
                    </label>
                    <input
                      type="number"
                      id="lowStockAlert"
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                      placeholder="e.g. 10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Tips for great product listings</h3>
                    <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
                      <li>Use clear, high-quality images</li>
                      <li>Include detailed growing instructions</li>
                      <li>Mention the benefits of your saplings</li>
                      <li>Be specific about care requirements</li>
                      <li>List any unique characteristics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
