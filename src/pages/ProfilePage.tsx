
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  User, 
  Settings, 
  LogOut, 
  ShoppingBag, 
  Heart, 
  BarChart4, 
  Package, 
  Store,
  Edit
} from 'lucide-react';

const ProfilePage = () => {
  const { user, logout, isAdmin, isSeller, isCustomer } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    contact: user?.contact || '',
    address: user?.address || ''
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sage-900"></div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile on the server
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl font-medium text-sage-900 md:text-4xl mb-8">
            My Profile
          </h1>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Sidebar */}
            <Card className="md:col-span-1">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => setIsEditing(false)}>
                    <User className="mr-2 h-4 w-4" />
                    Profile Information
                  </Button>
                  
                  {isCustomer() && (
                    <>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => navigate('/orders')}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        My Orders
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => navigate('/wishlist')}
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        My Wishlist
                      </Button>
                    </>
                  )}
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => navigate('/account-settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  
                  {isAdmin() && (
                    <>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin')}>
                        <BarChart4 className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/admin/product')}>
                        <Package className="mr-2 h-4 w-4" />
                        Manage Products
                      </Button>
                    </>
                  )}
                  
                  {isSeller() && (
                    <>
                      <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/seller/dashboard')}>
                        <Store className="mr-2 h-4 w-4" />
                        Seller Dashboard
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Package className="mr-2 h-4 w-4" />
                        My Products
                      </Button>
                    </>
                  )}
                  
                  <Separator className="my-4" />
                  <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>

            {/* Profile Content */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  {isEditing 
                    ? "Update your personal information" 
                    : "View and manage your personal information"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input 
                      id="name" 
                      name="name" 
                      value={profileData.name} 
                      onChange={handleInputChange} 
                    />
                  ) : (
                    <div className="text-lg">{user.name}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input 
                      id="email" 
                      name="email" 
                      value={profileData.email} 
                      onChange={handleInputChange} 
                      type="email"
                    />
                  ) : (
                    <div className="text-lg">{user.email}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  {isEditing ? (
                    <Input 
                      id="contact" 
                      name="contact" 
                      value={profileData.contact} 
                      onChange={handleInputChange} 
                    />
                  ) : (
                    <div className="text-lg">{user.contact || "Not provided"}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input 
                      id="address" 
                      name="address" 
                      value={profileData.address} 
                      onChange={handleInputChange} 
                    />
                  ) : (
                    <div className="text-lg">{user.address || "Not provided"}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div className="text-lg capitalize">{user.role}</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            {/* Quick Actions Cards - Visible on small screens */}
            <div className="md:hidden col-span-1 space-y-4">
              {isCustomer() && (
                <>
                  <Card className="bg-sage-50 hover:bg-sage-100 transition-colors cursor-pointer" onClick={() => navigate('/orders')}>
                    <CardContent className="p-4 flex items-center">
                      <ShoppingBag className="h-8 w-8 text-sage-700 mr-3" />
                      <div>
                        <h3 className="font-medium text-sage-900">My Orders</h3>
                        <p className="text-sm text-sage-600">Track your order history</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-sage-50 hover:bg-sage-100 transition-colors cursor-pointer" onClick={() => navigate('/wishlist')}>
                    <CardContent className="p-4 flex items-center">
                      <Heart className="h-8 w-8 text-sage-700 mr-3" />
                      <div>
                        <h3 className="font-medium text-sage-900">My Wishlist</h3>
                        <p className="text-sm text-sage-600">View saved items</p>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
              
              <Card className="bg-sage-50 hover:bg-sage-100 transition-colors cursor-pointer" onClick={() => navigate('/account-settings')}>
                <CardContent className="p-4 flex items-center">
                  <Settings className="h-8 w-8 text-sage-700 mr-3" />
                  <div>
                    <h3 className="font-medium text-sage-900">Account Settings</h3>
                    <p className="text-sm text-sage-600">Manage your preferences</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
