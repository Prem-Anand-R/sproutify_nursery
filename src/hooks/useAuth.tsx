
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export type UserRole = 'admin' | 'seller' | 'customer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  contact?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
  isSeller: () => boolean;
  isCustomer: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users with expanded data
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as const,
    contact: '+91 9876543210',
    address: '123 Admin Street, Tech City',
    avatar: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Green Farms',
    email: 'seller@example.com',
    password: 'seller123',
    role: 'seller' as const,
    contact: '+91 9876543211',
    address: '456 Garden Avenue, Green Zone',
    avatar: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Customer User',
    email: 'customer@example.com',
    password: 'customer123',
    role: 'customer' as const,
    contact: '+91 9876543212',
    address: '789 Customer Road, Shop City',
    avatar: '/placeholder.svg'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check for saved user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const matchedUser = MOCK_USERS.find(
        u => u.email === email && u.password === password
      );
      
      if (matchedUser) {
        // Remove password before storing user
        const { password: _, ...userWithoutPassword } = matchedUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${userWithoutPassword.name}!`,
        });
        
        // Redirect based on role
        switch (userWithoutPassword.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'seller':
            navigate('/seller/dashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };
  
  const isAdmin = () => user?.role === 'admin';
  const isSeller = () => user?.role === 'seller';
  const isCustomer = () => user?.role === 'customer';

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      login, 
      logout,
      isAdmin,
      isSeller,
      isCustomer
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
