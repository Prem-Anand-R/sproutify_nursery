
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If already authenticated, redirect to home
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      // login function handles navigation
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-medium text-sage-900">
              Sign In
            </h1>
            <p className="mt-2 text-sm text-sage-600">
              Welcome back! Please enter your details.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-sage-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-sage-300 rounded-md shadow-sm placeholder-sage-400 focus:outline-none focus:ring-sage-500 focus:border-sage-500"
                  placeholder="example@mail.com"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-sage-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm font-medium text-sage-700 hover:text-sage-900">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-4 py-3 border border-sage-300 rounded-md shadow-sm placeholder-sage-400 focus:outline-none focus:ring-sage-500 focus:border-sage-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sage-500 hover:text-sage-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 text-sage-600 focus:ring-sage-500 border-sage-300 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-sage-700">
                    Remember me
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-900 hover:bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-sage-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-sage-900 hover:text-sage-800">
                  Sign up
                </Link>
              </p>
            </div>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-sage-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-sage-500">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-sage-300 rounded-md shadow-sm bg-white text-sm font-medium text-sage-700 hover:bg-sage-50"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.23C21.21 18.5 22.56 15.66 22.56 12.25Z" fill="#4285F4" />
                  <path d="M12 23C14.97 23 17.46 22.01 19.23 20.34L15.71 17.57C14.74 18.23 13.48 18.63 12 18.63C9.19 18.63 6.8 16.73 5.94 14.09H2.31V16.96C4.07 20.57 7.77 23 12 23Z" fill="#34A853" />
                  <path d="M5.94 14.09C5.72 13.44 5.6 12.74 5.6 12C5.6 11.26 5.73 10.56 5.94 9.91V7.04H2.31C1.65 8.56 1.25 10.24 1.25 12C1.25 13.76 1.65 15.44 2.31 16.96L5.94 14.09Z" fill="#FBBC05" />
                  <path d="M12 5.38C13.62 5.38 15.06 5.94 16.2 7.02L19.31 3.92C17.45 2.19 14.97 1 12 1C7.77 1 4.07 3.43 2.31 7.04L5.94 9.91C6.8 7.27 9.19 5.38 12 5.38Z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-sage-300 rounded-md shadow-sm bg-white text-sm font-medium text-sage-700 hover:bg-sage-50"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.6699 0H7.32992C3.28302 0 0 3.28302 0 7.32992V16.6699C0 20.717 3.28302 24 7.32992 24H16.6699C20.717 24 24 20.717 24 16.6699V7.32992C24 3.28302 20.717 0 16.6699 0Z" fill="#1877F2" />
                  <path d="M16.6699 0H7.32992C3.28302 0 0 3.28302 0 7.32992V16.6699C0 20.717 3.28302 24 7.32992 24H12.4762V14.7179H10.0058V11.0838H12.4762V8.41144C12.4762 5.31287 14.4245 3.51971 17.2027 3.51971C18.2789 3.51971 19.4341 3.63737 19.6899 3.68592V7.17063H17.8919C16.4762 7.17063 16.1982 7.84255 16.1982 8.80491V11.0838H19.564L19.1694 14.7179H16.1982V24H16.6699C20.717 24 24 20.717 24 16.6699V7.32992C24 3.28302 20.717 0 16.6699 0Z" fill="#1877F2" />
                  <path d="M16.1982 24V14.7179H19.1694L19.564 11.0838H16.1982V8.80491C16.1982 7.84255 16.4762 7.17063 17.8919 7.17063H19.6899V3.68592C19.4341 3.63737 18.2789 3.51971 17.2027 3.51971C14.4245 3.51971 12.4762 5.31287 12.4762 8.41144V11.0838H10.0058V14.7179H12.4762V24H16.1982Z" fill="white" />
                </svg>
                Facebook
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
