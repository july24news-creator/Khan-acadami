
import React, { useState } from 'react';
import { Globe, ShoppingCart, User, Menu, X, ChevronRight, MessageSquare, HelpCircle, LogIn, Info, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../constants';

interface NavbarProps {
  onNavigate: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        {/* Top Utility Bar - Hidden on mobile */}
        <div className="hidden md:flex max-w-7xl mx-auto px-4 h-10 items-center justify-end space-x-6 text-sm text-gray-600 border-b border-gray-100 lg:border-none">
          <button 
            onClick={() => handleNavClick('source')}
            className="flex items-center space-x-1 cursor-pointer hover:text-orange-500 transition-colors"
          >
            <Globe size={16} />
            <span>Source Request</span>
          </button>
          <button 
            onClick={() => handleNavClick('auth')}
            className="flex items-center space-x-1 cursor-pointer hover:text-orange-500 font-medium transition-colors"
          >
            <User size={16} />
            <span>Sign in</span>
          </button>
          <button 
            onClick={() => handleNavClick('auth')}
            className="bg-[#ff6600] text-white px-4 py-1 rounded-full text-xs font-bold hover:bg-orange-600 transition"
          >
            Create account
          </button>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
             {/* Mobile Menu Button */}
            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
                <Menu size={24} />
            </button>
            
            <h1 
                onClick={() => handleNavClick('home')}
                className="text-2xl md:text-4xl font-serif text-[#ff6600] font-bold tracking-tight cursor-pointer"
            >
              AstharHat
            </h1>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
            <div 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600"
            >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                    {totalItems}
                </span>
                )}
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-6 text-sm font-medium text-gray-700">
                <button onClick={() => handleNavClick('home')} className="flex items-center space-x-1 hover:text-orange-500 transition">
                <Menu size={16} />
                <span>All categories</span>
                </button>
                <button onClick={() => handleNavClick('home')} className="hover:text-orange-500 transition">Featured selections</button>
                <button onClick={() => handleNavClick('help')} className="hover:text-orange-500 transition">Order protections</button>
            </nav>
            
            <div 
                onClick={() => setIsCartOpen(true)}
                className="flex items-center space-x-1 cursor-pointer hover:text-orange-500 transition-colors relative"
            >
                <ShoppingCart size={20} />
                <span className="text-sm font-medium">Cart</span>
                {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                    {totalItems}
                </span>
                )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 w-[85%] max-w-[300px] h-full bg-white shadow-xl flex flex-col animate-in slide-in-from-left duration-300">
             <div className="p-4 flex items-center justify-between border-b">
                <span className="font-bold text-lg text-gray-800">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <X size={20} />
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 mb-6">
                    <button 
                        onClick={() => handleNavClick('auth')}
                        className="w-full bg-[#ff6600] text-white py-3 rounded-lg font-bold mb-3 shadow-md shadow-orange-200 flex items-center justify-center gap-2"
                    >
                        <LogIn size={18} />
                        Join Free / Sign In
                    </button>
                </div>

                <div className="px-4 py-2 bg-gray-50 border-y border-gray-100 mb-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
                    <div className="space-y-1">
                        {CATEGORIES.map(cat => (
                            <button 
                                key={cat.id} 
                                onClick={() => handleNavClick('home')}
                                className="w-full flex items-center justify-between py-2 text-gray-700 active:bg-gray-100"
                            >
                                <span className="text-sm">{cat.name}</span>
                                <ChevronRight size={14} className="text-gray-400" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="px-4 space-y-2 text-sm font-medium text-gray-700">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4">Services</div>
                    <button onClick={() => handleNavClick('chat')} className="w-full flex items-center space-x-3 py-2 hover:text-orange-500">
                        <MessageSquare size={18} />
                        <span>Chat with Supplier</span>
                    </button>
                    <button onClick={() => handleNavClick('source')} className="w-full flex items-center space-x-3 py-2 hover:text-orange-500">
                        <Globe size={18} />
                        <span>Source Request</span>
                    </button>
                    <button onClick={() => handleNavClick('help')} className="w-full flex items-center space-x-3 py-2 hover:text-orange-500">
                        <HelpCircle size={18} />
                        <span>Help Center</span>
                    </button>
                </div>

                <div className="px-4 space-y-2 text-sm font-medium text-gray-700 mt-4 border-t pt-4">
                     <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Company</div>
                    <button onClick={() => handleNavClick('about')} className="w-full flex items-center space-x-3 py-2 hover:text-orange-500">
                        <Info size={18} />
                        <span>About Us</span>
                    </button>
                     <button onClick={() => handleNavClick('contact')} className="w-full flex items-center space-x-3 py-2 hover:text-orange-500">
                        <Phone size={18} />
                        <span>Contact Us</span>
                    </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
