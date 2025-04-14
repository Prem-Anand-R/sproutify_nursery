import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip as RechartsTooltip, Legend, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  LayoutDashboard, ShoppingBag, Users, Package, BarChart3, 
  Settings, LogOut, Plus, DollarSign, TrendingUp, Clock, Eye, Edit, Trash,
  ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

// Sample data for dashboard
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const newUsersData = [
  { name: 'Jan', users: 120 },
  { name: 'Feb', users: 140 },
  { name: 'Mar', users: 160 },
  { name: 'Apr', users: 180 },
  { name: 'May', users: 210 },
  { name: 'Jun', users: 250 },
  { name: 'Jul', users: 290 },
];

const topProducts = [
  { name: 'Tomato Saplings', value: 400, color: '#FF6B6B' },
  { name: 'Basil Herb', value: 300, color: '#4ECDC4' },
  { name: 'Bell Pepper Mix', value: 250, color: '#FFD166' },
  { name: 'Mint Collection', value: 200, color: '#06D6A0' },
  { name: 'Lettuce Variety', value: 150, color: '#118AB2' },
];

const orderStatusData = [
  { name: 'Delivered', value: 540, color: '#4ECDC4' },
  { name: 'Pending', value: 120, color: '#FFD166' },
  { name: 'Processing', value: 210, color: '#118AB2' },
  { name: 'Cancelled', value: 30, color: '#FF6B6B' },
];

const COLORS = ['#4ECDC4', '#FFD166', '#118AB2', '#FF6B6B', '#06D6A0'];

const recentOrders = [
  { id: '#ORD-7621', customer: 'Rahul Mehta', date: '2 mins ago', status: 'Pending', payment: 'COD', amount: '₹590' },
  { id: '#ORD-7620', customer: 'Priya Singh', date: '25 mins ago', status: 'Processing', payment: 'Paid', amount: '₹890' },
  { id: '#ORD-7619', customer: 'Neha Sharma', date: '1 hour ago', status: 'Completed', payment: 'Paid', amount: '₹1,230' },
  { id: '#ORD-7618', customer: 'Vikram Patel', date: '3 hours ago', status: 'Completed', payment: 'Paid', amount: '₹450' },
  { id: '#ORD-7617', customer: 'Anjali Gupta', date: '5 hours ago', status: 'Completed', payment: 'Paid', amount: '₹780' },
];

const productsList = [
  { id: 1, name: 'Tomato Saplings', category: 'Vegetables', price: '₹50', stock: 10 },
  { id: 2, name: 'Basil Herb', category: 'Herbs', price: '₹30', stock: 5 },
  { id: 3, name: 'Bell Pepper Mix', category: 'Vegetables', price: '₹45', stock: 15 },
  { id: 4, name: 'Mint Collection', category: 'Herbs', price: '₹25', stock: 20 },
  { id: 5, name: 'Lettuce Variety', category: 'Leafy Greens', price: '₹35', stock: 8 },
];

const usersList = [
  { id: 1, name: 'Prem Kumar', email: 'prem@email.com', role: 'Customer', status: 'Active', registeredDate: '12 Jun 2023' },
  { id: 2, name: 'Suresh Reddy', email: 'suresh@seller.com', role: 'Seller', status: 'Active', registeredDate: '05 Mar 2023' },
  { id: 3, name: 'Karthik Nair', email: 'karthik@email.com', role: 'Customer', status: 'Inactive', registeredDate: '22 Sep 2023' },
  { id: 4, name: 'Ananya Desai', email: 'ananya@email.com', role: 'Customer', status: 'Active', registeredDate: '18 Nov 2023' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@seller.com', role: 'Seller', status: 'Active', registeredDate: '03 Jan 2024' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth();

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to render the active tab content
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'products':
        return <ManageProducts />;
      case 'users':
        return <ManageUsers />;
      case 'orders':
        return <ManageOrders />;
      case 'analytics':
        return <SalesAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Toggle Button for Mobile */}
      {!sidebarOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-50 bg-sage-900 text-white p-2 rounded-full shadow-lg md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Fixed Sidebar with dynamic width based on open state */}
      <div className={cn(
        "bg-sage-900 text-white fixed h-full overflow-y-auto left-0 top-0 z-40 transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-0 md:w-20",
        isMobile && !sidebarOpen && "hidden"
      )}>
        {/* Sidebar Header */}
        <div className="p-5 border-b border-sage-800 flex justify-between items-center">
          <Link to="/" className={cn("font-bold flex items-center", !sidebarOpen && "md:hidden")}>
            <span className="font-serif text-xl">Sproutify</span>
            <span className="text-xs ml-2 bg-sage-800 px-2 py-1 rounded">Admin</span>
          </Link>
          {/* Icon only when sidebar is collapsed on desktop */}
          <Link to="/" className={cn("font-bold items-center", sidebarOpen && "hidden", "hidden md:flex")}>
            <span className="font-serif text-xl">S</span>
          </Link>
          
          {/* Close button visible only on mobile */}
          {isMobile && (
            <button 
              onClick={toggleSidebar}
              className="text-white"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          {/* Toggle sidebar button visible only on desktop */}
          {!isMobile && (
            <button 
              onClick={toggleSidebar}
              className="text-white hidden md:block"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          )}
        </div>
        
        {/* Sidebar Navigation */}
        <div className="flex-grow p-5">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium",
                activeTab === 'dashboard' 
                  ? "bg-sage-800 text-white" 
                  : "text-sage-300 hover:bg-sage-800 hover:text-white"
              )}
            >
              <LayoutDashboard className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className={cn(!sidebarOpen && "md:hidden")}>Dashboard</span>
            </button>
            
            <button
              onClick={() => setActiveTab('products')}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium",
                activeTab === 'products' 
                  ? "bg-sage-800 text-white" 
                  : "text-sage-300 hover:bg-sage-800 hover:text-white"
              )}
            >
              <ShoppingBag className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className={cn(!sidebarOpen && "md:hidden")}>Products</span>
            </button>
            
            <button
              onClick={() => setActiveTab('users')}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium",
                activeTab === 'users' 
                  ? "bg-sage-800 text-white" 
                  : "text-sage-300 hover:bg-sage-800 hover:text-white"
              )}
            >
              <Users className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className={cn(!sidebarOpen && "md:hidden")}>Users</span>
            </button>
            
            <button
              onClick={() => setActiveTab('orders')}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium",
                activeTab === 'orders' 
                  ? "bg-sage-800 text-white" 
                  : "text-sage-300 hover:bg-sage-800 hover:text-white"
              )}
            >
              <Package className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className={cn(!sidebarOpen && "md:hidden")}>Orders</span>
            </button>
            
            <button
              onClick={() => setActiveTab('analytics')}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium",
                activeTab === 'analytics' 
                  ? "bg-sage-800 text-white" 
                  : "text-sage-300 hover:bg-sage-800 hover:text-white"
              )}
            >
              <BarChart3 className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className={cn(!sidebarOpen && "md:hidden")}>Analytics</span>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium",
                activeTab === 'settings' 
                  ? "bg-sage-800 text-white" 
                  : "text-sage-300 hover:bg-sage-800 hover:text-white"
              )}
            >
              <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className={cn(!sidebarOpen && "md:hidden")}>Settings</span>
            </button>
          </nav>
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-5 border-t border-sage-800">
          <button
            onClick={logout}
            className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-sage-300 hover:bg-sage-800 hover:text-white"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className={cn(!sidebarOpen && "md:hidden")}>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content with dynamic margin based on sidebar state */}
      <div className={cn(
        "flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 min-h-screen transition-all duration-300 ease-in-out",
        sidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"
      )}>
        {renderContent()}
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium text-sage-900">Dashboard Overview</h1>
        <Link
          to="/admin/product"
          className="bg-sage-900 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-sage-800"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Link>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 glassmorphism">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-sage-600">Total Revenue</h3>
              <p className="text-2xl font-semibold text-sage-900">₹284,394</p>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+12.5%</span>
            <span className="text-sage-600 ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 glassmorphism">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-sage-600">Total Orders</h3>
              <p className="text-2xl font-semibold text-sage-900">1,832</p>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+8.1%</span>
            <span className="text-sage-600 ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 glassmorphism">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-sage-600">Total Users</h3>
              <p className="text-2xl font-semibold text-sage-900">3,549</p>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">+5.2%</span>
            <span className="text-sage-600 ml-2">from last month</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 glassmorphism">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-sage-600">Total Products</h3>
              <p className="text-2xl font-semibold text-sage-900">200</p>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-red-500 font-medium">15 out of stock</span>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 glassmorphism">
          <h2 className="text-lg font-medium text-sage-900 mb-4">Monthly Revenue</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="sales" fill="#4D7C0F" name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 glassmorphism">
          <h2 className="text-lg font-medium text-sage-900 mb-4">Order Status</h2>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => [`${value}`, 'Orders']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 glassmorphism">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-sage-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      order.status === 'Completed' ? "bg-green-100 text-green-800" :
                      order.status === 'Processing' ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {order.payment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-sage-900 hover:text-sage-700 mr-2">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-sage-900 hover:text-sage-700">
                      <Edit className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4">
          <button 
            onClick={() => {}}
            className="text-sm font-medium text-sage-900 hover:text-sage-700"
          >
            View all orders →
          </button>
        </div>
      </div>
    </div>
  );
};

// Manage Products Component
const ManageProducts = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium text-sage-900">Manage Products</h1>
        <Link
          to="/admin/product"
          className="bg-sage-900 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-sage-800"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Link>
      </div>
      
      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-sage-900">All Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productsList.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900">
                    #{product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      product.stock > 10 ? "bg-green-100 text-green-800" :
                      product.stock > 5 ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    )}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/product/${product.id}`} className="text-sage-900 hover:text-sage-700 mr-3">
                      <Edit className="h-4 w-4 inline" />
                    </Link>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-sage-600">
            Showing 1 to 5 of 5 entries
          </div>
          <div className="flex space-x-2">
            <Button className="bg-white border border-gray-300 text-sage-700" size="sm" disabled>
              Previous
            </Button>
            <Button className="bg-sage-900 text-white" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Manage Users Component
const ManageUsers = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium text-sage-900">Manage Users</h1>
      </div>
      
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-sage-900">All Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Registered On
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersList.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      user.status === 'Active' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    )}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {user.registeredDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-sage-900 hover:text-sage-700 mr-3">
                      <Edit className="h-4 w-4 inline" />
                    </button>
                    <button className={cn(
                      user.status === 'Active' ? "text-red-600 hover:text-red-800" : "text-green-600 hover:text-green-800"
                    )}>
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-sage-600">
            Showing 1 to 5 of 5 entries
          </div>
          <div className="flex space-x-2">
            <Button className="bg-white border border-gray-300 text-sage-700" size="sm" disabled>
              Previous
            </Button>
            <Button className="bg-sage-900 text-white" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Manage Orders Component
const ManageOrders = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-medium text-sage-900">Manage Orders</h1>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-sage-900">All Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Payment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-sage-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      order.status === 'Completed' ? "bg-green-100 text-green-800" :
                      order.status === 'Processing' ? "bg-blue-100 text-blue-800" :
                      "bg-yellow-100 text-yellow-800"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {order.payment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-sage-900 hover:text-sage-700 mr-2">
                      <Eye className="h-4 w-4 inline" />
                    </button>
                    <select className="border border-gray-300 rounded-md text-xs p-1">
                      <option value="">Update Status</option>
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-sage-600">
            Showing 1 to 5 of 5 entries
          </div>
          <div className="flex space-x-2">
            <Button className="bg-white border border-gray-300 text-sage-700" size="sm" disabled>
              Previous
            </Button>
            <Button className="bg-sage-900 text-white" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sales Analytics Component
const SalesAnalytics = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-sage-900">Sales Analytics</h1>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-sage-900 mb-4">Monthly Revenue</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="sales" fill="#4D7C0F" name="Revenue (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-sage-900 mb-4">Order Status</h2>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => [`${value}`, 'Orders']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-sage-900 mb-4">Top Selling Products</h2>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topProducts}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-sage-900 mb-4">Customer Growth</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={newUsersData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" name="New Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Settings Component
const AdminSettings = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-sage-900">Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-sage-900 mb-6">Website Content</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Homepage Banner Text
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                defaultValue="Grow Your Own Garden with Premium Saplings"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                About Us Description
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                defaultValue="Sproutify is dedicated to providing high-quality vegetable saplings to help you grow your own organic garden."
              ></textarea>
            </div>
            
            <Button className="bg-sage-900 hover:bg-sage-800 text-white">
              Save Changes
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-sage-900 mb-6">Payment Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cod"
                defaultChecked
                className="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded"
              />
              <label htmlFor="cod" className="ml-2 block text-sm text-gray-700">
                Cash on Delivery (COD)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="upi"
                defaultChecked
                className="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded"
              />
              <label htmlFor="upi" className="ml-2 block text-sm text-gray-700">
                UPI Payment
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cards"
                defaultChecked
                className="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded"
              />
              <label htmlFor="cards" className="ml-2 block text-sm text-gray-700">
                Credit/Debit Cards
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                defaultValue="18"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Charge (₹)
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                defaultValue="40"
              />
            </div>
            
            <Button className="bg-sage-900 hover:bg-sage-800 text-white">
              Save Changes
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-sage-900 mb-6">Promotional Offers</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Code
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                placeholder="e.g. WELCOME10"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Percentage (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
                placeholder="10"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid From
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valid Until
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
            </div>
            
            <Button className="bg-sage-900 hover:bg-sage-800 text-white">
              Add Discount
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
