import { useState, useEffect, createContext, useContext } from 'react';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ChevronRight,
  Star,
  Zap,
  Headphones,
  BarChart3,
  Users,
  Route,
  CheckCircle2,
  LogOut,
  Search,
  Filter,
  Package,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Eye,
  EyeOff,
  Send,
  Home,
  FileText,
  Settings,
  Download,
  Upload,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Auth Context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  type: 'carrier' | 'shipper';
  avatar: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Navigation context for footer
interface NavContextType {
  navigateTo: (view: ViewType) => void;
}

type ViewType = 'home' | 'loadboard' | 'services' | 'tracking' | 'carrier' | 'become-carrier';

const NavContext = createContext<NavContextType | null>(null);

const useNav = () => {
  const context = useContext(NavContext);
  if (!context) throw new Error('useNav must be used within NavProvider');
  return context;
};

// Better Logo Component
const Logo = ({ size = 'md', showText = true }: { size?: 'sm' | 'md' | 'lg', showText?: boolean }) => {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-lg' },
    md: { container: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-xl' },
    lg: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-2xl' }
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`${sizes[size].container} bg-gradient-to-br from-[hsl(var(--navy))] to-[hsl(210,60%,35%)] rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--orange))]/20 to-transparent" />
        <div className="relative flex items-center justify-center">
          <Eye className={`${sizes[size].icon} text-white`} strokeWidth={2.5} />
          <div className="absolute -bottom-0.5">
            <Truck className="w-2.5 h-2.5 text-[hsl(var(--orange))]" />
          </div>
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-[hsl(var(--navy))] leading-tight ${sizes[size].text}`}>
            Third Eye
          </span>
          <span className="text-xs font-semibold text-[hsl(var(--orange))] tracking-wider">FREIGHT</span>
        </div>
      )}
    </div>
  );
};

// Footer Component
const Footer = ({ user }: { user: User | null }) => {
  const { navigateTo } = useNav();
  
  const footerLinks = [
    { name: 'Home', action: () => navigateTo('home') },
    { name: 'Load Board', action: () => navigateTo('loadboard') },
    { name: 'Services', action: () => navigateTo('services') },
    { name: 'Live Tracking', action: () => navigateTo('tracking') },
    ...(user && user.type === 'carrier' ? [{ name: 'Carrier Portal', action: () => navigateTo('carrier') }] : []),
  ];

  return (
    <footer className="bg-[#0C1519] border-t border-[#3A3534] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Logo size="sm" showText={true} />
            <p className="text-[#C9B8A6] text-sm mt-4">
              Next-generation freight management solutions for modern logistics.
            </p>
            <div className="flex items-center gap-2 text-[#C9B8A6] mt-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">954 LITTLE BAY AVE, NORFOLK, VA, 23503-1328</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <button onClick={link.action} className="text-[#C9B8A6] hover:text-[#CF9D7B] transition-colors text-sm">
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {['Full Truckload (FTL)', 'Less Than Truckload (LTL)', 'Expedited Shipping', 'Refrigerated Freight', 'Flatbed/Oversized', 'Cross-Border'].map((service) => (
                <li key={service}>
                  <button onClick={() => navigateTo('services')} className="text-[#C9B8A6] hover:text-[#CF9D7B] transition-colors text-sm">
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#162127] rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#CF9D7B]" />
                </div>
                <div>
                  <p className="text-xs text-[#C9B8A6]">Call Us</p>
                  <p className="text-sm text-[#E9E0D7]">(757) 777-1714</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#162127] rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#CF9D7B]" />
                </div>
                <div>
                  <p className="text-xs text-[#C9B8A6]">Email Us</p>
                  <p className="text-sm text-[#E9E0D7]">contact@murphyfreightllc.com</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#162127] rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#CF9D7B]" />
                </div>
                <div>
                  <p className="text-xs text-[#C9B8A6]">Address</p>
                  <p className="text-sm text-[#E9E0D7]">954 LITTLE BAY AVE, NORFOLK, VA, 23503-1328</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-[#3A3534] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#C9B8A6] text-sm">
            © 2026 MURPHY FREIGHT LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[#C9B8A6] text-sm">MC-123456</span>
            <span className="text-[#C9B8A6] text-sm">DOT-7890123</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Login Modal
const LoginModal = ({ open, onClose, onLogin }: { open: boolean; onClose: () => void; onLogin: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <Logo size="lg" showText={false} />
          </div>
          <DialogTitle className="text-center text-2xl">Welcome Back</DialogTitle>
          <DialogDescription className="text-center">
            Sign in to access your dashboard
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="carrier@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="bg-[#162127] border border-[#3A3534] p-3 rounded-lg text-sm text-[#CF9D7B]">
            <p className="font-medium">Demo Credentials:</p>
            <p>Carrier: carrier@demo.com / password</p>
            <p>Shipper: shipper@demo.com / password</p>
          </div>
          <Button type="submit" className="w-full bg-[#CF9D7B] hover:bg-[#C08F6C] text-[#0C1519] font-semibold">
            Sign In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Quote Modal
const QuoteModal = ({ open, onClose, serviceName }: { open: boolean; onClose: () => void; serviceName: string }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    origin: '',
    destination: '',
    weight: '',
    date: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Quote request submitted for ${serviceName}! We'll contact you within 24 hours.`);
    onClose();
    setFormData({ name: '', email: '', phone: '', origin: '', destination: '', weight: '', date: '', message: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Get a Quote - {serviceName}</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you with a competitive quote within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quote-name">Full Name *</Label>
              <Input 
                id="quote-name" 
                placeholder="John Smith" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-email">Email *</Label>
              <Input 
                id="quote-email" 
                type="email"
                placeholder="john@company.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quote-phone">Phone Number *</Label>
            <Input 
              id="quote-phone" 
              placeholder="(555) 000-0000" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quote-origin">Origin City *</Label>
              <Input 
                id="quote-origin" 
                placeholder="Los Angeles, CA" 
                value={formData.origin}
                onChange={(e) => setFormData({...formData, origin: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-destination">Destination City *</Label>
              <Input 
                id="quote-destination" 
                placeholder="Phoenix, AZ" 
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quote-weight">Estimated Weight (lbs)</Label>
              <Input 
                id="quote-weight" 
                placeholder="25,000" 
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-date">Preferred Pickup Date</Label>
              <Input 
                id="quote-date" 
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quote-message">Additional Details</Label>
            <textarea 
              id="quote-message" 
              className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm resize-none"
              placeholder="Any special requirements, dimensions, or notes..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>
          
          <Button type="submit" className="w-full bg-[#CF9D7B] hover:bg-[#C08F6C] text-[#0C1519] font-semibold">
            <Send className="w-4 h-4 mr-2" />
            Request Quote
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Load Board Page
const LoadBoard = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState({ origin: '', destination: '', type: 'all' });
  
  const loads = [
    { id: 1, origin: 'Los Angeles, CA', destination: 'Phoenix, AZ', distance: '375 mi', rate: 1850, weight: '32,000 lbs', type: 'FTL', posted: '2 hours ago', expires: '6 hours' },
    { id: 2, origin: 'Houston, TX', destination: 'Dallas, TX', distance: '240 mi', rate: 950, weight: '18,000 lbs', type: 'LTL', posted: '1 hour ago', expires: '8 hours' },
    { id: 3, origin: 'Chicago, IL', destination: 'Detroit, MI', distance: '280 mi', rate: 1200, weight: '28,000 lbs', type: 'FTL', posted: '30 min ago', expires: '12 hours' },
    { id: 4, origin: 'Miami, FL', destination: 'Atlanta, GA', distance: '665 mi', rate: 2200, weight: '35,000 lbs', type: 'FTL', posted: '3 hours ago', expires: '4 hours' },
    { id: 5, origin: 'Denver, CO', destination: 'Salt Lake City, UT', distance: '525 mi', rate: 1750, weight: '22,000 lbs', type: 'LTL', posted: '45 min ago', expires: '10 hours' },
    { id: 6, origin: 'Seattle, WA', destination: 'Portland, OR', distance: '175 mi', rate: 750, weight: '15,000 lbs', type: 'LTL', posted: '15 min ago', expires: '24 hours' },
  ];

  const handleBookLoad = (_loadId: number) => {
    toast.success('Load booked successfully! Check your dashboard for details.');
  };

  return (
    <div className="min-h-screen bg-[#0C1519] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#E9E0D7]">Load Board</h1>
            <p className="text-[#C9B8A6]">Find and book available loads across the nation</p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-[#162127] text-[#CF9D7B] border-[#3A3534]">
            <Package className="w-4 h-4 mr-2" />
            {loads.length} Active Loads
          </Badge>
        </div>

        {/* Filters */}
        <Card className="mb-6 bg-[#162127] border-[#3A3534]">
          <CardContent className="p-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Origin city..." 
                  className="pl-10"
                  value={filters.origin}
                  onChange={(e) => setFilters({...filters, origin: e.target.value})}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Destination city..." 
                  className="pl-10"
                  value={filters.destination}
                  onChange={(e) => setFilters({...filters, destination: e.target.value})}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select 
                  className="w-full h-10 pl-10 pr-4 rounded-md border border-input bg-background text-sm"
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                >
                  <option value="all">All Types</option>
                  <option value="FTL">Full Truckload (FTL)</option>
                  <option value="LTL">Less Than Truckload (LTL)</option>
                </select>
              </div>
              <Button className="bg-[#CF9D7B] hover:bg-[#C08F6C] text-[#0C1519] font-semibold">
                <Search className="w-4 h-4 mr-2" />
                Search Loads
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loads Grid */}
        <div className="grid lg:grid-cols-2 gap-4">
          {loads.map((load) => (
            <Card key={load.id} className="hover:shadow-lg transition-shadow bg-[#162127] border-[#3A3534]">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant={load.type === 'FTL' ? 'default' : 'secondary'} className="bg-[#724B39] text-[#E9E0D7] border-none">{load.type}</Badge>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#CF9D7B]">${load.rate.toLocaleString()}</p>
                    <p className="text-xs text-[#C9B8A6]">{load.distance}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <p className="font-semibold text-[#E9E0D7]">{load.origin}</p>
                    <p className="text-xs text-[#C9B8A6]">Origin</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#C9B8A6]" />
                  <div className="flex-1 text-right">
                    <p className="font-semibold text-[#E9E0D7]">{load.destination}</p>
                    <p className="text-xs text-[#C9B8A6]">Destination</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-[#C9B8A6] mb-4">
                  <span>Weight: {load.weight}</span>
                  <span>Posted: {load.posted}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-[#CF9D7B] border-[#724B39] bg-[#724B39]/20">
                    <Clock className="w-3 h-3 mr-1" />
                    Expires in {load.expires}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="bg-[#CF9D7B] hover:bg-[#C08F6C] text-[#0C1519] font-semibold"
                    onClick={() => handleBookLoad(load.id)}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer user={user} />
    </div>
  );
};

// Carrier Dashboard
// Carrier Portal Component with comprehensive features
const CarrierPortal = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'available' | 'active' | 'history' | 'earnings' | 'profile' | 'support'>('dashboard');

  // Mock data
  const stats = [
    { label: 'Total Earnings', value: '$24,580', change: '+12%', icon: DollarSign },
    { label: 'Loads Completed', value: '47', change: '+5', icon: Package },
    { label: 'On-Time Rate', value: '98.5%', change: '+0.5%', icon: CheckCircle2 },
    { label: 'Miles Driven', value: '12,450', change: '+850', icon: Route },
  ];

  const monthlyEarnings = [2400, 3200, 2800, 4100, 3900, 4400];
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const availableLoads = [
    { id: 1, origin: 'Los Angeles, CA', destination: 'Phoenix, AZ', distance: '375 mi', rate: 1850, weight: '32,000 lbs', type: 'FTL', posted: '2h ago', pickupDate: 'Feb 28', postedBy: 'ABC Logistics' },
    { id: 2, origin: 'Houston, TX', destination: 'Dallas, TX', distance: '240 mi', rate: 950, weight: '18,000 lbs', type: 'LTL', posted: '1h ago', pickupDate: 'Feb 27', postedBy: 'ShipCo Inc' },
    { id: 3, origin: 'Chicago, IL', destination: 'Detroit, MI', distance: '280 mi', rate: 1200, weight: '28,000 lbs', type: 'FTL', posted: '30m ago', pickupDate: 'Mar 1', postedBy: 'Premier Freight' },
  ];

  const activeLoads = [
    { id: 'LD-2024-045', origin: 'Denver, CO', destination: 'Salt Lake City, UT', distance: '525 mi', status: 'In Transit', progress: 65, eta: '2h 15m', amount: 1750 },
    { id: 'LD-2024-046', origin: 'Seattle, WA', destination: 'Portland, OR', distance: '175 mi', status: 'Picked Up', progress: 15, eta: '4h 30m', amount: 750 },
  ];

  const completedLoads = [
    { id: 'LD-2024-001', route: 'LA → Phoenix', date: 'Feb 24, 2024', status: 'Delivered', amount: 1850, rating: 5 },
    { id: 'LD-2024-002', route: 'Houston → Dallas', date: 'Feb 22, 2024', status: 'Delivered', amount: 950, rating: 5 },
    { id: 'LD-2024-003', route: 'Chicago → Detroit', date: 'Feb 20, 2024', status: 'Delivered', amount: 1200, rating: 4 },
  ];

  const invoices = [
    { id: 'INV-001', month: 'February 2024', amount: 8500, status: 'Paid', date: 'Mar 1, 2024' },
    { id: 'INV-002', month: 'January 2024', amount: 7200, status: 'Paid', date: 'Feb 1, 2024' },
    { id: 'INV-003', month: 'December 2023', amount: 6800, status: 'Paid', date: 'Jan 5, 2024' },
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'available', label: 'Available Loads', icon: Package },
    { id: 'active', label: 'My Active Loads', icon: Truck },
    { id: 'history', label: 'Load History', icon: FileText },
    { id: 'earnings', label: 'Earnings & Invoices', icon: DollarSign },
    { id: 'profile', label: 'Profile & Documents', icon: Settings },
    { id: 'support', label: 'Support', icon: Headphones },
  ];

  const handleAcceptLoad = () => {
    toast.success('Load accepted! Check My Active Loads section.');
  };

  const handleRejectLoad = () => {
    toast.info('Load declined.');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h1 className="text-3xl font-bold text-[#E9E0D7] mb-8">Welcome back, {user?.name}!</h1>
            
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <Card key={i} className="bg-[#162127] border-[#3A3534]">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-[#C9B8A6]">{stat.label}</p>
                        <p className="text-2xl font-bold text-[#E9E0D7]">{stat.value}</p>
                      </div>
                      <div className="w-10 h-10 bg-[#724B39]/30 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-[#CF9D7B]" />
                      </div>
                    </div>
                    <p className="text-sm text-[#CF9D7B] mt-2">{stat.change} this month</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Earnings Chart */}
            <Card className="bg-[#162127] border-[#3A3534] mb-8">
              <CardHeader>
                <CardTitle className="text-[#E9E0D7]">Monthly Earnings Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-32 gap-2">
                  {monthlyEarnings.map((earning, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-[#CF9D7B] rounded-t" style={{ height: `${(earning / 4400) * 120}px` }} />
                      <p className="text-xs text-[#C9B8A6] mt-2">{monthLabels[i]}</p>
                      <p className="text-xs text-[#E9E0D7] font-semibold">${earning}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-[#162127] border-[#3A3534] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('available')}>
                <CardContent className="p-6 text-center">
                  <Package className="w-8 h-8 text-[#CF9D7B] mx-auto mb-3" />
                  <p className="font-semibold text-[#E9E0D7]">Browse Available Loads</p>
                  <p className="text-sm text-[#C9B8A6] mt-1">Find loads to haul</p>
                </CardContent>
              </Card>
              <Card className="bg-[#162127] border-[#3A3534] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('active')}>
                <CardContent className="p-6 text-center">
                  <Truck className="w-8 h-8 text-[#CF9D7B] mx-auto mb-3" />
                  <p className="font-semibold text-[#E9E0D7]">My Active Loads</p>
                  <Badge className="bg-[#CF9D7B] text-[#0C1519] mx-auto mt-2">{activeLoads.length}</Badge>
                </CardContent>
              </Card>
              <Card className="bg-[#162127] border-[#3A3534] cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('earnings')}>
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-[#CF9D7B] mx-auto mb-3" />
                  <p className="font-semibold text-[#E9E0D7]">View Earnings</p>
                  <p className="text-sm text-[#CF9D7B] font-semibold mt-1">$24,580 total</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-[#162127] border-[#3A3534]">
              <CardHeader>
                <CardTitle className="text-[#E9E0D7]">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedLoads.slice(0, 3).map((load) => (
                    <div key={load.id} className="flex items-center justify-between p-4 bg-[#0F1A1F] rounded-lg">
                      <div>
                        <p className="font-semibold text-[#E9E0D7]">{load.id}</p>
                        <p className="text-sm text-[#C9B8A6]">{load.route}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#CF9D7B]">${load.amount}</p>
                        <Badge className="bg-[#CF9D7B] text-[#0C1519]">{load.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'available':
        return (
          <div>
            <h1 className="text-3xl font-bold text-[#E9E0D7] mb-6">Available Loads</h1>
            <p className="text-[#C9B8A6] mb-6">Browse and accept loads that match your vehicle and route</p>
            
            <div className="space-y-4">
              {availableLoads.map((load) => (
                <Card key={load.id} className="bg-[#162127] border-[#3A3534] hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#E9E0D7] mb-2">
                          {load.origin} → {load.destination}
                        </h3>
                        <div className="flex gap-4 text-sm text-[#C9B8A6]">
                          <span>{load.distance}</span>
                          <span>•</span>
                          <span>{load.weight}</span>
                          <span>•</span>
                          <Badge className="bg-[#724B39] text-[#E9E0D7]">{load.type}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-[#CF9D7B]">${load.rate}</p>
                        <p className="text-xs text-[#C9B8A6]">Posted {load.posted}</p>
                      </div>
                    </div>
                    <div className="bg-[#0F1A1F] p-4 rounded-lg mb-4 flex justify-between">
                      <div>
                        <p className="text-xs text-[#C9B8A6]">Pickup Date</p>
                        <p className="font-semibold text-[#E9E0D7]">{load.pickupDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#C9B8A6]">Posted By</p>
                        <p className="font-semibold text-[#E9E0D7]">{load.postedBy}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-[#CF9D7B] hover:bg-[#C08F6C] text-[#0C1519] font-semibold" onClick={() => handleAcceptLoad()}>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Accept Load
                      </Button>
                      <Button className="flex-1 variant-outline border-[#3A3534] text-[#CF9D7B] hover:bg-[#162127]" onClick={() => handleRejectLoad()}>
                        <X className="w-4 h-4 mr-2" />
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'active':
        return (
          <div>
            <h1 className="text-3xl font-bold text-[#E9E0D7] mb-6">My Active Loads</h1>
            
            <div className="space-y-4">
              {activeLoads.map((load) => (
                <Card key={load.id} className="bg-[#162127] border-[#3A3534]">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#E9E0D7] mb-2">{load.id}</h3>
                        <p className="text-lg text-[#E9E0D7] font-semibold">{load.origin} → {load.destination}</p>
                        <p className="text-sm text-[#C9B8A6]">{load.distance}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={load.status === 'In Transit' ? 'bg-[#CF9D7B] text-[#0C1519]' : 'bg-[#724B39] text-[#E9E0D7]'}>
                          {load.status}
                        </Badge>
                        <p className="text-2xl font-bold text-[#CF9D7B] mt-2">${load.amount}</p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#C9B8A6]">Progress</span>
                        <span className="font-semibold text-[#E9E0D7]">{load.progress}%</span>
                      </div>
                      <div className="h-3 bg-[#0C1519] rounded-full overflow-hidden">
                        <div className="h-full bg-[#CF9D7B] rounded-full transition-all" style={{ width: `${load.progress}%` }} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#C9B8A6]">ETA: {load.eta}</span>
                      <Button size="sm" className="bg-[#CF9D7B] hover:bg-[#C08F6C] text-[#0C1519]">
                        <MapPin className="w-4 h-4 mr-1" />
                        Update Location
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'history':
        return (
          <div>
            <h1 className="text-3xl font-bold text-[#E9E0D7] mb-6">Load History</h1>
            
            <Card className="bg-[#162127] border-[#3A3534]">
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#3A3534]">
                        <th className="text-left py-3 px-4 text-[#C9B8A6] font-semibold">Load ID</th>
                        <th className="text-left py-3 px-4 text-[#C9B8A6] font-semibold">Route</th>
                        <th className="text-left py-3 px-4 text-[#C9B8A6] font-semibold">Date</th>
                        <th className="text-left py-3 px-4 text-[#C9B8A6] font-semibold">Status</th>
                        <th className="text-left py-3 px-4 text-[#C9B8A6] font-semibold">Rating</th>
                        <th className="text-right py-3 px-4 text-[#C9B8A6] font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedLoads.map((load) => (
                        <tr key={load.id} className="border-b border-[#3A3534] hover:bg-[#0F1A1F]">
                          <td className="py-3 px-4 font-medium text-[#E9E0D7]">{load.id}</td>
                          <td className="py-3 px-4 text-[#C9B8A6]">{load.route}</td>
                          <td className="py-3 px-4 text-[#C9B8A6]">{load.date}</td>
                          <td className="py-3 px-4">
                            <Badge className="bg-[#CF9D7B] text-[#0C1519]">{load.status}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-0.5">
                              {[...Array(load.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-[#CF9D7B] text-[#CF9D7B]" />
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-[#CF9D7B]">${load.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'earnings':
        return (
          <div>
            <h1 className="text-3xl font-bold text-[#E9E0D7] mb-6">Earnings & Invoices</h1>
            
            {/* Earnings Summary */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-[#162127] border-[#3A3534]">
                <CardContent className="p-6">
                  <p className="text-sm text-[#C9B8A6] mb-2">Current Month</p>
                  <p className="text-3xl font-bold text-[#CF9D7B]">$8,500</p>
                  <p className="text-xs text-[#C9B8A6] mt-2">5 loads completed</p>
                </CardContent>
              </Card>
              <Card className="bg-[#162127] border-[#3A3534]">
                <CardContent className="p-6">
                  <p className="text-sm text-[#C9B8A6] mb-2">Total This Year</p>
                  <p className="text-3xl font-bold text-[#CF9D7B]">$64,200</p>
                  <p className="text-xs text-[#C9B8A6] mt-2">+15% from last year</p>
                </CardContent>
              </Card>
              <Card className="bg-[#162127] border-[#3A3534]">
                <CardContent className="p-6">
                  <p className="text-sm text-[#C9B8A6] mb-2">Pending Payout</p>
                  <p className="text-3xl font-bold text-[#CF9D7B]">$2,150</p>
                  <p className="text-xs text-[#C9B8A6] mt-2">Pays out Mar 1</p>
                </CardContent>
              </Card>
            </div>

            {/* Invoices */}
            <Card className="bg-[#162127] border-[#3A3534]">
              <CardHeader>
                <CardTitle className="text-[#E9E0D7]">Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 bg-[#0F1A1F] rounded-lg">
                      <div>
                        <p className="font-semibold text-[#E9E0D7]">{invoice.id}</p>
                        <p className="text-sm text-[#C9B8A6]">{invoice.month} • {invoice.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-[#CF9D7B]">${invoice.amount}</p>
                          <Badge className="bg-[#CF9D7B] text-[#0C1519]">{invoice.status}</Badge>
                        </div>
                        <Button size="sm" variant="ghost" className="text-[#CF9D7B] hover:bg-[#162127]">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'profile':
        return (
          <div>
            <h1 className="text-3xl font-bold text-[#E9E0D7] mb-6">Profile & Documents</h1>
            
            {/* Profile Info */}
            <Card className="bg-[#162127] border-[#3A3534] mb-8">
              <CardHeader>
                <CardTitle className="text-[#E9E0D7]">Carrier Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-[#C9B8A6]">Company Name</label>
                    <p className="text-[#E9E0D7] font-semibold mt-1">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#C9B8A6]">Email</label>
                    <p className="text-[#E9E0D7] font-semibold mt-1">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#C9B8A6]">MC Number</label>
                    <p className="text-[#E9E0D7] font-semibold mt-1">MC-123456</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#C9B8A6]">DOT Number</label>
                    <p className="text-[#E9E0D7] font-semibold mt-1">DOT-7890123</p>
                  </div>
                </div>
                <Button className="mt-6 bg-[#CF9D7B] hover:bg-[#C08F6C] text-[#0C1519] font-semibold">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="bg-[#162127] border-[#3A3534]">
              <CardHeader>
                <CardTitle className="text-[#E9E0D7]">Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Driver\'s License', status: 'Verified', icon: 'ID' },
                    { name: 'Insurance Certificate', status: 'Verified', icon: 'Cert' },
                    { name: 'Vehicle Registration', status: 'Verified', icon: 'Reg' },
                    { name: 'Safety Inspection', status: 'Expires Jun 2024', icon: 'Safety' },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#0F1A1F] rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#CF9D7B]" />
                        <div>
                          <p className="font-semibold text-[#E9E0D7]">{doc.name}</p>
                          <p className="text-sm text-[#C9B8A6]">{doc.status}</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-[#CF9D7B] hover:bg-[#C08F6C] text-[#0C1519]">
                        <Upload className="w-4 h-4 mr-1" />
                        Update
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'support':
        return (
          <div>
            <h1 className="text-3xl font-bold text-[#E9E0D7] mb-6">Support & Help</h1>
            
            {/* Contact Support */}
            <Card className="bg-[#162127] border-[#3A3534] mb-8">
              <CardHeader>
                <CardTitle className="text-[#E9E0D7]">Contact Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 bg-[#0F1A1F] rounded-lg text-center">
                    <Phone className="w-8 h-8 text-[#CF9D7B] mx-auto mb-3" />
                    <p className="font-semibold text-[#E9E0D7]">Call Support</p>
                    <p className="text-sm text-[#C9B8A6] mt-2">+1 (661) 596-3328</p>
                    <p className="text-xs text-[#C9B8A6]">24/7 Dispatch</p>
                  </div>
                  <div className="p-4 bg-[#0F1A1F] rounded-lg text-center">
                    <Mail className="w-8 h-8 text-[#CF9D7B] mx-auto mb-3" />
                    <p className="font-semibold text-[#E9E0D7]">Email Support</p>
                    <p className="text-sm text-[#C9B8A6] mt-2">carrier@thirdeyefreight.com</p>
                    <p className="text-xs text-[#C9B8A6]">Response in 2 hrs</p>
                  </div>
                  <div className="p-4 bg-[#0F1A1F] rounded-lg text-center">
                    <MessageCircle className="w-8 h-8 text-[#CF9D7B] mx-auto mb-3" />
                    <p className="font-semibold text-[#E9E0D7]">Live Chat</p>
                    <p className="text-sm text-[#C9B8A6] mt-2">Chat with an agent</p>
                    <p className="text-xs text-[#C9B8A6]">Mon-Fri: 7am-6pm</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="bg-[#162127] border-[#3A3534]">
              <CardHeader>
                <CardTitle className="text-[#E9E0D7]">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { q: 'How do I accept a load?', a: 'Browse available loads, review details, and click Accept Load button.' },
                    { q: 'When do I get paid?', a: 'Payments are processed on the 1st of each month for all completed loads.' },
                    { q: 'Can I decline a load?', a: 'Yes, you can decline any load. Frequent declines may affect your visibility.' },
                    { q: 'What if I have issues during delivery?', a: 'Contact 24/7 dispatch support immediately at the provided number.' },
                  ].map((faq, i) => (
                    <div key={i} className="p-4 bg-[#0F1A1F] rounded-lg">
                      <p className="font-semibold text-[#E9E0D7] mb-2">{faq.q}</p>
                      <p className="text-sm text-[#C9B8A6]">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0C1519] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 hidden lg:block">
            <Card className="bg-[#162127] border-[#3A3534] sticky top-32">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                        activeTab === item.id
                          ? 'bg-[#CF9D7B] text-[#0C1519] border-r-4 border-[#CF9D7B]'
                          : 'text-[#C9B8A6] hover:bg-[#0F1A1F]'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </button>
                  ))}
                </nav>
                <div className="border-t border-[#3A3534] p-4">
                  <Button
                    onClick={logout}
                    className="w-full bg-[#724B39] hover:bg-[#5D3A2E] text-[#E9E0D7] justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Nav Tabs */}
          <div className="lg:hidden w-full mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  size="sm"
                  onClick={() => setActiveTab(item.id as any)}
                  className={activeTab === item.id ? 'bg-[#CF9D7B] text-[#0C1519]' : 'bg-[#162127] text-[#C9B8A6]'}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Live Tracking Page
const LiveTracking = () => {
  const { user } = useAuth();
  const [selectedShipment, setSelectedShipment] = useState<number | null>(null);
  
  const shipments = [
    { id: 1, loadId: 'LD-2024-002', origin: 'Houston, TX', destination: 'Dallas, TX', progress: 65, eta: '2h 15m', driver: 'John Smith', status: 'On Time' },
    { id: 2, loadId: 'LD-2024-005', origin: 'Denver, CO', destination: 'Salt Lake City, UT', progress: 30, eta: '4h 30m', driver: 'Mike Johnson', status: 'On Time' },
  ];

  return (
    <div className="min-h-screen bg-[#0C1519] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#E9E0D7] mb-2">Live Tracking</h1>
        <p className="text-[#C9B8A6] mb-8">Track your shipments in real-time</p>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-96 flex items-center justify-center bg-gradient-to-br from-[#162127] to-[#0F1A1F] border-[#3A3534]">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-[#CF9D7B] mx-auto mb-4" />
                <p className="text-lg font-semibold text-[#E9E0D7]">Interactive Map</p>
                <p className="text-[#C9B8A6]">Real-time GPS tracking visualization</p>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-[#E9E0D7]">Active Shipments</h3>
            {shipments.map((shipment) => (
              <Card 
                key={shipment.id} 
                className={`cursor-pointer transition-all bg-[#162127] border-[#3A3534] ${selectedShipment === shipment.id ? 'ring-2 ring-[#CF9D7B]' : ''}`}
                onClick={() => setSelectedShipment(shipment.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-[#E9E0D7]">{shipment.loadId}</p>
                      <p className="text-sm text-[#C9B8A6]">{shipment.origin} → {shipment.destination}</p>
                    </div>
                    <Badge variant="outline" className="text-[#CF9D7B] border-[#724B39] bg-[#724B39]/20">
                      {shipment.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#C9B8A6]">Progress</span>
                      <span className="font-medium text-[#E9E0D7]">{shipment.progress}%</span>
                    </div>
                    <div className="h-2 bg-[#0C1519] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#CF9D7B] rounded-full transition-all"
                        style={{ width: `${shipment.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-[#C9B8A6]">Driver: {shipment.driver}</span>
                    <span className="text-[#CF9D7B] font-medium">ETA: {shipment.eta}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer user={user} />
    </div>
  );
};

// Services Page
const ServicesPage = () => {
  const { user } = useAuth();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  
  const services = [
    {
      title: 'Full Truckload (FTL)',
      description: 'Dedicated trucks for your shipments. Best for large loads requiring exclusive use of a trailer.',
      features: ['48\' and 53\' trailers', 'Same-day pickup available', 'Real-time tracking', 'Dedicated support'],
      icon: Truck,
      color: 'bg-[#CF9D7B]',
    },
    {
      title: 'Less Than Truckload (LTL)',
      description: 'Cost-effective shipping for smaller loads. Share trailer space and save on transportation costs.',
      features: ['Palletized shipping', 'Consolidated loads', 'Flexible scheduling', 'Nationwide coverage'],
      icon: Package,
      color: 'bg-[#C08F6C]',
    },
    {
      title: 'Expedited Shipping',
      description: 'Time-critical deliveries when every hour counts. Guaranteed delivery windows.',
      features: ['Same-day delivery', 'Next-flight-out options', '24/7 dispatch', 'Team drivers'],
      icon: Zap,
      color: 'bg-[#724B39]',
    },
    {
      title: 'Refrigerated Freight',
      description: 'Temperature-controlled shipping for perishable goods. Maintain cold chain integrity.',
      features: ['Reefers & frozen trailers', 'Temperature monitoring', 'Food-grade certified', 'Hazmat capable'],
      icon: TrendingUp,
      color: 'bg-[#CF9D7B]',
    },
    {
      title: 'Flatbed/Oversized',
      description: 'Specialized equipment for heavy haul and oversized loads.',
      features: ['Step decks & RGNs', 'Wide load permits', 'Pilot car services', 'Route planning'],
      icon: Route,
      color: 'bg-[#C08F6C]',
    },
    {
      title: 'Cross-Border',
      description: 'Seamless shipping between US, Canada, and Mexico with customs expertise.',
      features: ['Customs clearance', 'Bonded carriers', 'Documentation support', 'Bilingual support'],
      icon: MapPin,
      color: 'bg-[#724B39]',
    },
  ];

  const handleGetQuote = (serviceName: string) => {
    setSelectedService(serviceName);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0C1519] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#E9E0D7] mb-4">Our Services</h1>
          <p className="text-lg text-[#C9B8A6] max-w-2xl mx-auto">
            Comprehensive freight solutions tailored to meet your shipping needs across all 48 states
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Card key={i} className="hover:shadow-xl transition-shadow group bg-[#162127] border-[#3A3534]">
              <CardContent className="p-6">
                <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-7 h-7 text-[#0C1519]" />
                </div>
                <h3 className="text-xl font-bold text-[#E9E0D7] mb-2">{service.title}</h3>
                <p className="text-[#C9B8A6] mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[#C9B8A6]">
                      <CheckCircle2 className="w-4 h-4 text-[#CF9D7B]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-6 bg-[#CF9D7B] hover:bg-[#C08F6C] text-[#0C1519] font-semibold"
                  onClick={() => handleGetQuote(service.title)}
                >
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer user={user} />
      
      <QuoteModal 
        open={quoteModalOpen} 
        onClose={() => setQuoteModalOpen(false)} 
        serviceName={selectedService}
      />
    </div>
  );
};

// Become Carrier Page
const BecomeCarrier = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    mcNumber: '',
    contactName: '',
    phone: '',
    email: '',
    equipment: {
      dryVan: false,
      reefer: false,
      flatbed: false,
      stepDeck: false,
    },
  });

  const handleEquipmentChange = (key: keyof typeof formData.equipment) => {
    setFormData((prev) => ({
      ...prev,
      equipment: {
        ...prev.equipment,
        [key]: !prev.equipment[key],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Application submitted! We will review and contact you within 24-48 hours.');
  };

  return (
    <div className="min-h-screen bg-[#0C1519] pt-24 pb-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#162127,transparent_55%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#162127] border border-[#3A3534]">
              <Eye className="w-4 h-4 text-[#CF9D7B]" />
              <span className="text-sm text-[#CF9D7B]">Carrier Setup</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Join Our <span className="text-[#CF9D7B]">Network</span>
            </h1>
            <p className="text-lg text-[#C9B8A6] max-w-xl">
              We value our carrier partners. At Third Eye Freight Inc, we offer fast payments,
              reliable freight, and a dedicated support team to keep your wheels turning.
            </p>

            <div className="space-y-5">
              {[
                { icon: DollarSign, title: 'Fast Payments', description: 'Quick pay options and standard 15-day terms to keep cash flow healthy.' },
                { icon: CheckCircle2, title: 'Easy Compliance', description: 'Streamlined onboarding with digital document management.' },
                { icon: Route, title: 'Diverse Freight', description: 'Access to a wide variety of loads across all equipment types and lanes.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#162127] border border-[#3A3534] flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-[#CF9D7B]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-[#C9B8A6]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-[#162127] border border-[#3A3534] shadow-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold">Carrier Application</h2>
                <div className="w-10 h-10 rounded-xl bg-[#0C1519] flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#CF9D7B]" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-[#CF9D7B]">Company Name</Label>
                    <Input
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Logistics LLC"
                      className="bg-[#0C1519] border-[#3A3534] text-white placeholder:text-[#8E7A6D]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-[#CF9D7B]">MC Number</Label>
                    <Input
                      value={formData.mcNumber}
                      onChange={(e) => setFormData({ ...formData, mcNumber: e.target.value })}
                      placeholder="123456"
                      className="bg-[#0C1519] border-[#3A3534] text-white placeholder:text-[#8E7A6D]"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-[#CF9D7B]">Contact Name</Label>
                    <Input
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="John Doe"
                      className="bg-[#0C1519] border-[#3A3534] text-white placeholder:text-[#8E7A6D]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-[#CF9D7B]">Phone Number</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 000-0000"
                      className="bg-[#0C1519] border-[#3A3534] text-white placeholder:text-[#8E7A6D]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-[#CF9D7B]">Email Address</Label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@company.com"
                    type="email"
                    className="bg-[#0C1519] border-[#3A3534] text-white placeholder:text-[#8E7A6D]"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-xs text-[#CF9D7B]">Equipment Types</Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { key: 'dryVan', label: 'Dry Van' },
                      { key: 'reefer', label: 'Reefer' },
                      { key: 'flatbed', label: 'Flatbed' },
                      { key: 'stepDeck', label: 'Step Deck' },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center gap-3 rounded-xl border border-[#3A3534] bg-[#0C1519] px-4 py-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.equipment[item.key as keyof typeof formData.equipment]}
                          onChange={() => handleEquipmentChange(item.key as keyof typeof formData.equipment)}
                          className="h-4 w-4 rounded border-[#724B39] bg-[#0C1519] text-[#CF9D7B]"
                        />
                        <span className="text-sm text-[#E9E0D7]">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#CF9D7B] text-[#0C1519] hover:bg-[#E2B08B]"
                >
                  Submit Application
                </Button>
              </form>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#724B39]/40 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-6 w-28 h-28 bg-[#CF9D7B]/30 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
      <Footer user={user} />
    </div>
  );
};

// Main App Component
function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const login = (email: string, password: string): boolean => {
    if (password === 'password') {
      if (email === 'carrier@demo.com') {
        setUser({ id: '1', name: 'John Carrier', email, type: 'carrier', avatar: 'JC' });
        toast.success('Welcome back, John!');
        setLoginOpen(false);
        setCurrentView('carrier');
        return true;
      } else if (email === 'shipper@demo.com') {
        setUser({ id: '2', name: 'Sarah Shipper', email, type: 'shipper', avatar: 'SS' });
        toast.success('Welcome back, Sarah!');
        setLoginOpen(false);
        return true;
      }
    }
    toast.error('Invalid credentials. Try demo accounts above.');
    return false;
  };

  const logout = () => {
    setUser(null);
    setCurrentView('home');
    toast.success('Logged out successfully');
  };

  const navigateTo = (view: ViewType) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const allNavLinks = [
    { name: 'Home', view: 'home' as const },
    { name: 'Load Board', view: 'loadboard' as const },
    { name: 'Services', view: 'services' as const },
    { name: 'Live Tracking', view: 'tracking' as const },
    { name: 'Carrier Setup', view: 'become-carrier' as const },
    ...(user && user.type === 'carrier' ? [{ name: 'Carrier Portal', view: 'carrier' as const }] : []),
  ];

  const navLinks = allNavLinks;

  const renderContent = () => {
    switch (currentView) {
      case 'loadboard':
        return <LoadBoard />;
      case 'services':
        return <ServicesPage />;
      case 'tracking':
        return <LiveTracking />;
      case 'carrier':
        return user && user.type === 'carrier' ? <CarrierPortal /> : <HomePage onNavigate={navigateTo} onLogin={() => setLoginOpen(true)} isScrolled={isScrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} user={user} navLinks={navLinks} />;
      case 'become-carrier':
        return <BecomeCarrier />;
      default:
        return <HomePage 
          onNavigate={navigateTo} 
          onLogin={() => setLoginOpen(true)}
          isScrolled={isScrolled}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          user={user}
          navLinks={navLinks}
        />;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      <NavContext.Provider value={{ navigateTo }}>
        <div className="min-h-screen bg-background">
          {/* Header */}
          {currentView !== 'home' && (
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0C1519]/95 backdrop-blur-md shadow-md border-b border-[#3A3534]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div onClick={() => navigateTo('home')} className="cursor-pointer">
                    <Logo />
                  </div>
                  
                  <nav className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => navigateTo(link.view)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          currentView === link.view
                            ? 'text-[#0C1519] bg-[#CF9D7B]'
                            : 'text-[#E9E0D7] hover:text-[#CF9D7B] hover:bg-[#162127]'
                        }`}
                      >
                        {link.name}
                      </button>
                    ))}
                  </nav>

                  <div className="hidden lg:flex items-center gap-3">
                    {user ? (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[hsl(var(--navy))] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{user.avatar}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={logout}>
                          <LogOut className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="bg-[hsl(var(--orange))] hover:bg-[hsl(17,96%,40%)]"
                        onClick={() => setLoginOpen(true)}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>

                  <button
                    className="lg:hidden p-2 rounded-md"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              {mobileMenuOpen && (
                <div className="lg:hidden bg-[#0C1519] border-t border-[#3A3534]">
                  <nav className="flex flex-col p-4 space-y-2">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => navigateTo(link.view)}
                        className="px-4 py-3 text-left rounded-md font-medium text-[#E9E0D7] hover:bg-[#162127] hover:text-[#CF9D7B]"
                      >
                        {link.name}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </header>
          )}

          {renderContent()}
          
          <LoginModal 
            open={loginOpen} 
            onClose={() => setLoginOpen(false)} 
            onLogin={login}
          />
        </div>
      </NavContext.Provider>
    </AuthContext.Provider>
  );
}

// Home Page Component
interface HomePageProps {
  onNavigate: (view: ViewType) => void;
  onLogin: () => void;
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  user: User | null;
  navLinks: { name: string; view: 'home' | 'loadboard' | 'services' | 'tracking' | 'become-carrier' | 'carrier' }[];
}

const HomePage = ({ onNavigate, onLogin, isScrolled, mobileMenuOpen, setMobileMenuOpen, user, navLinks }: HomePageProps) => {
  const heroImage = '/image.png';
  const stats = [
    { value: '500+', label: 'Active Carriers' },
    { value: '10,000+', label: 'Loads Moved' },
    { value: '50M+', label: 'Miles Covered' },
    { value: '48', label: 'States Covered' },
  ];

  const services = [
    { title: 'Freight Brokerage', description: 'Connecting shippers with the best carriers for their loads', icon: Truck },
    { title: 'Load Matching', description: 'AI-powered matching to find the perfect carrier for every load', icon: BarChart3 },
    { title: 'Carrier Management', description: 'End-to-end carrier relationship and compliance management', icon: Users },
  ];

  const features = [
    { title: 'Fast Payments', description: 'Get paid within 24-48 hours of delivery', icon: Zap },
    { title: 'Dedicated Dispatch', description: 'Personal dispatch support for every carrier', icon: Headphones },
    { title: 'Real-time Tracking', description: 'Track your freight 24/7 with live updates', icon: Route },
    { title: '24/7 Support', description: 'Round-the-clock customer and dispatch support', icon: Clock },
  ];

  const testimonials = [
    { quote: "Third Eye Freight has been a game-changer for my business. Consistent loads and fast payments!", author: "Mike Johnson", role: "Owner Operator", initial: "M" },
    { quote: "The best brokerage we have worked with. Professional team and excellent communication.", author: "Sarah Williams", role: "Fleet Manager", initial: "S" },
    { quote: "Fair rates, great lanes, and the dispatch team actually answers the phone. Highly recommend!", author: "David Chen", role: "Independent Carrier", initial: "D" },
    { quote: "They understand the needs of small carriers. Transparent and reliable partner.", author: "Robert Martinez", role: "Small Fleet Owner", initial: "R" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0C1519]/95 backdrop-blur-md shadow-md border-b border-[#3A3534]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Logo />

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => onNavigate(link.view)}
                  className="px-4 py-2 text-sm font-medium rounded-md transition-colors text-[#E9E0D7] hover:text-[#CF9D7B] hover:bg-[#162127]"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[hsl(var(--navy))] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{user.avatar}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('carrier')}>
                    Dashboard
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" onClick={onLogin}>
                    Sign In
                  </Button>
                  <Button 
                    className="bg-[hsl(var(--orange))] hover:bg-[hsl(17,96%,40%)]"
                    onClick={() => onNavigate('become-carrier')}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            <button
              className="lg:hidden p-2 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0C1519] border-t border-[#3A3534] shadow-lg">
            <nav className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => onNavigate(link.view)}
                  className="px-4 py-3 text-left rounded-md font-medium text-[#E9E0D7] hover:bg-[#162127] hover:text-[#CF9D7B]"
                >
                  {link.name}
                </button>
              ))}
              {!user && (
                <Button onClick={onLogin} className="mt-4 bg-[hsl(var(--orange))] text-[#0C1519] hover:bg-[#E2B08B]">
                  Sign In
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C1519] via-[#0F1A1F] to-[#162127]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#724B39]/20 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#162127] border border-[#3A3534] rounded-full">
                <span className="w-2 h-2 bg-[hsl(var(--orange))] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#E9E0D7]">Nationwide Trucking Solutions</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E9E0D7] leading-tight">
                Your Vision,<br />
                <span className="text-[hsl(var(--orange))]">Our Delivery</span>
              </h1>
              
              <p className="text-lg text-[#C9B8A6] max-w-lg">
                Connecting shippers with reliable carriers across all 48 states. Fast, transparent, and professional freight brokerage services.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-[hsl(var(--orange))] hover:bg-[hsl(17,96%,40%)] text-white font-semibold px-8"
                  onClick={() => onNavigate('loadboard')}
                >
                  Find Loads
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#CF9D7B] text-[#CF9D7B] hover:bg-[#CF9D7B] hover:text-[#0C1519] font-semibold px-8"
                  onClick={() => onNavigate('become-carrier')}
                >
                  Become a Carrier
                </Button>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src={heroImage}
                  alt="Third Eye Freight truck at sunset"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="bg-[#162127]/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-[#3A3534]">
                    <p className="text-xs text-[#C9B8A6]">Live Load Board</p>
                    <p className="text-lg font-semibold text-[#E9E0D7]">1,247 Active Loads</p>
                  </div>
                  <Button
                    className="bg-[hsl(var(--orange))] hover:bg-[hsl(17,96%,40%)]"
                    onClick={() => onNavigate('loadboard')}
                  >
                    View Loads
                  </Button>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[hsl(var(--orange))]/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[hsl(var(--teal))]/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[hsl(var(--navy))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-[#0C1519]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#E9E0D7] mb-4">Our Services</h2>
            <p className="text-[#C9B8A6]">Comprehensive freight solutions tailored to your shipping needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Card key={i} className="group hover:shadow-xl transition-shadow border border-[#3A3534] bg-[#162127] cursor-pointer"
                    onClick={() => onNavigate('services')}>
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-[#0C1519] border border-[#3A3534] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#CF9D7B] transition-colors">
                    <service.icon className="w-7 h-7 text-[#CF9D7B] group-hover:text-[#0C1519] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#E9E0D7] mb-3">{service.title}</h3>
                  <p className="text-[#C9B8A6]">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              className="border-2 border-[#CF9D7B] text-[#CF9D7B] hover:bg-[#CF9D7B] hover:text-[#0C1519] font-semibold"
              onClick={() => onNavigate('services')}
            >
              View All Services
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-32 bg-[#0F1A1F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#E9E0D7] mb-6">
                Why Choose Third Eye Freight?
              </h2>
              <p className="text-[#C9B8A6] mb-8 text-lg">
                We combine industry expertise with cutting-edge technology to deliver exceptional freight brokerage services. Our commitment to transparency and reliability sets us apart.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-[#162127] border border-[#3A3534] rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-[#CF9D7B]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#E9E0D7] mb-1">{feature.title}</h4>
                      <p className="text-sm text-[#C9B8A6]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-[#162127] border border-[#3A3534] rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-[#E9E0D7]">On-Time Delivery Rate</h3>
                  <span className="text-2xl font-bold text-[#CF9D7B]">98.7%</span>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: 'On-Time Deliveries', value: 98.7, color: 'bg-[#CF9D7B]' },
                    { label: 'Customer Satisfaction', value: 96.5, color: 'bg-[#C08F6C]' },
                    { label: 'Carrier Retention', value: 94.2, color: 'bg-[#724B39]' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#C9B8A6]">{item.label}</span>
                        <span className="font-medium text-[#E9E0D7]">{item.value}%</span>
                      </div>
                      <div className="h-3 bg-[#0C1519] rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-[#3A3534] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#CF9D7B]" />
                  <span className="text-sm text-[#C9B8A6]">Verified performance metrics updated daily</span>
                </div>
              </div>
              
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-[#724B39]/20 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-[#0C1519]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#E9E0D7] mb-4">
              What Our Partners Say
            </h2>
            <p className="text-[#C9B8A6]">Trusted by hundreds of carriers and shippers nationwide</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="border border-[#3A3534] bg-[#162127] shadow-lg">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#CF9D7B] text-[#CF9D7B]" />
                    ))}
                  </div>
                  <p className="text-[#C9B8A6] mb-6 text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#724B39] rounded-full flex items-center justify-center">
                      <span className="text-[#E9E0D7] font-semibold">{testimonial.initial}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#E9E0D7] text-sm">{testimonial.author}</p>
                      <p className="text-xs text-[#C9B8A6]">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-[#162127] to-[#0C1519]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#E9E0D7] mb-6">
            Ready to Move Freight?
          </h2>
          <p className="text-[#C9B8A6] text-lg mb-8 max-w-2xl mx-auto">
            Join our network of trusted carriers and shippers. Get started today and experience the Third Eye Freight difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-[#CF9D7B] hover:bg-[#C08F6C] text-[#0C1519] font-semibold px-8"
              onClick={() => onNavigate('loadboard')}
            >
              Browse Loads
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-[#CF9D7B] text-[#CF9D7B] hover:bg-[#CF9D7B] hover:text-[#0C1519] font-semibold px-8"
              onClick={() => onNavigate('become-carrier')}
            >
              Apply as Carrier
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0C1519] border-t border-[#3A3534] text-white py-16">
            <div>
              <div className="mb-6">
                <Logo size="md" />
              </div>
              <p className="text-[#C9B8A6] mb-6">
                Your trusted partner in nationwide freight logistics. Connecting shippers with reliable carriers across all 48 states.
              </p>
              <div className="flex items-center gap-2 text-[#C9B8A6]">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">954 LITTLE BAY AVE, NORFOLK, VA, 23503-1328</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', action: () => onNavigate('home') },
                  { name: 'Load Board', action: () => onNavigate('loadboard') },
                  { name: 'Services', action: () => onNavigate('services') },
                  { name: 'Live Tracking', action: () => onNavigate('tracking') },
                  { name: 'Carrier Portal', action: () => onNavigate('carrier') },
                ].map((link) => (
                  <li key={link.name}>
                    <button onClick={link.action} className="text-[#C9B8A6] hover:text-[#CF9D7B] transition-colors text-sm">
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {['Full Truckload (FTL)', 'Less Than Truckload (LTL)', 'Expedited Shipping', 'Refrigerated Freight', 'Flatbed/Oversized', 'Cross-Border'].map((service) => (
                  <li key={service}>
                    <button onClick={() => onNavigate('services')} className="text-[#C9B8A6] hover:text-[#CF9D7B] transition-colors text-sm">
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#162127] rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#CF9D7B]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#C9B8A6]">Call Us</p>
                    <p className="text-sm text-[#E9E0D7]">(757) 777-1714</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#162127] rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#CF9D7B]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#C9B8A6]">Email Us</p>
                    <p className="text-sm text-[#E9E0D7]">contact@murphyfreightllc.com</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#162127] rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#CF9D7B]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#C9B8A6]">Address</p>
                    <p className="text-sm text-[#E9E0D7]">954 LITTLE BAY AVE, NORFOLK, VA, 23503-1328</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#3A3534] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#C9B8A6] text-sm">
              © 2026 MURPHY FREIGHT LLC. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[#C9B8A6] text-sm">MC-123456</span>
              <span className="text-[#C9B8A6] text-sm">DOT-7890123</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
