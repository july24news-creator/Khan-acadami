
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import AIBrain from './components/AIBrain';
import AuthPage from './components/pages/AuthPage';
import ChatPage from './components/pages/ChatPage';
import SourcePage from './components/pages/SourcePage';
import HelpPage from './components/pages/HelpPage';
import AboutPage from './components/pages/AboutPage';
import ContactPage from './components/pages/ContactPage';
import CheckoutPage from './components/pages/CheckoutPage';
import { Product } from './types';
import { MOCK_PRODUCTS } from './constants';
import { getAIRecommendations } from './services/geminiService';
import { 
  MessageSquare, 
  Globe, 
  HelpCircle,
  Sparkles,
  Phone,
  ArrowUpDown
} from 'lucide-react';

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState('home'); // home, auth, chat, source, help, about, contact, checkout
  
  // Search & Filter State
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [sortOption, setSortOption] = useState('relevance');

  // AI Recs State
  const [aiRecs, setAiRecs] = useState<{ title: string; products: Product[] } | null>(null);

  // Frequently searched - static for demo
  const frequentlySearched = MOCK_PRODUCTS.slice(0, 3);
  const recommended = MOCK_PRODUCTS.slice(3, 6);

  useEffect(() => {
    // Fetch AI recommendations on mount
    const fetchAiRecs = async () => {
      const recs = await getAIRecommendations();
      setAiRecs(recs);
    };
    fetchAiRecs();
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'home') {
        // Optional: reset search when going home explicitly?
        // setHasSearched(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setCurrentView('home'); // Ensure we are on home view
    setIsLoading(true);
    setHasSearched(true);
    setSearchTitle(`Results for "${query}"`);
    setSortOption('relevance');

    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 600));

    // Basic client-side filter simulation
    const filtered = MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    
    setIsLoading(false);
  };

  const handleCategoryClick = (category: string) => {
    setCurrentView('home');
    setIsLoading(true);
    setHasSearched(true);
    setSearchTitle(`Category: ${category}`);
    setSortOption('relevance');
    
    setTimeout(() => {
        const filtered = MOCK_PRODUCTS.filter(p => p.category === category);
        setResults(filtered);
        setIsLoading(false);
    }, 400);
  };

  const getSortedProducts = (products: Product[]) => {
    if (sortOption === 'relevance') return products;
    
    return [...products].sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onNavigate={handleNavigate} />
      <CartDrawer 
        onCheckout={() => handleNavigate('checkout')} 
        onContinueShopping={() => handleNavigate('home')}
      />
      <AIBrain />

      {/* Mobile Floating Call Button */}
      <a 
        href="tel:+1234567890"
        className="md:hidden fixed left-4 bottom-4 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center active:scale-95"
        aria-label="Call Us"
      >
        <Phone size={24} />
      </a>

      <main className="flex-1 w-full">
        {/* Render View Based on State */}
        {currentView === 'home' && (
          <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-0">
             <div className="relative">
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
             </div>

             <div className="flex flex-col lg:flex-row gap-8 pb-20">
                {/* Sidebar */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                  <Sidebar onCategoryClick={handleCategoryClick} />
                </div>

                {/* Main Feed */}
                <div className="flex-1 min-w-0">
                  {/* Banner */}
                  <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between mb-6 text-sm gap-4">
                    <div className="flex items-center space-x-2 text-gray-700 font-medium">
                      <span className="text-lg">Welcome to</span>
                      <span className="text-xl font-bold text-gray-900">AstharHat</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                        <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">Verified Suppliers</span>
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">Trade Assurance</span>
                    </div>
                  </div>

                  {/* Search Results */}
                  {hasSearched && (
                    <>
                      <div className="flex justify-end mb-2">
                        <div className="relative">
                          <select
                              value={sortOption}
                              onChange={(e) => setSortOption(e.target.value)}
                              className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-3 pr-8 py-2 cursor-pointer shadow-sm outline-none"
                          >
                              <option value="relevance">Sort by: Relevance</option>
                              <option value="price-asc">Price: Low to High</option>
                              <option value="price-desc">Price: High to Low</option>
                              <option value="name-asc">Name: A-Z</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                              <ArrowUpDown size={14} />
                          </div>
                        </div>
                      </div>
                      <ProductGrid 
                        title={results.length > 0 ? searchTitle : "No matches found"} 
                        products={getSortedProducts(results.length > 0 ? results : recommended)} 
                        subtitle={results.length > 0 ? `Found ${results.length} items` : "Check out these recommended items instead"}
                      />
                    </>
                  )}

                  {/* Default Sections */}
                  {!hasSearched && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition">
                            <h4 className="font-bold text-gray-800 mb-2">Frequently searched</h4>
                            <p className="text-xs text-gray-500 mb-4">Smart Watches</p>
                            <div className="flex justify-center flex-1">
                              <img src={frequentlySearched[0].image} className="h-40 object-contain hover:scale-105 transition duration-500" alt="Smart Watch" />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition">
                            <h4 className="font-bold text-gray-800 mb-2">Frequently searched</h4>
                            <p className="text-xs text-gray-500 mb-4">Cars</p>
                            <div className="flex justify-center flex-1">
                              <img src={frequentlySearched[1].image} className="h-40 object-contain hover:scale-105 transition duration-500" alt="Cars" />
                            </div>
                        </div>
                        <div className="bg-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-gray-400 min-h-[200px] relative overflow-hidden">
                          <span className="text-2xl font-bold mb-2">Ad Space</span>
                          <span className="text-xs">Boost your products here</span>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-4 mb-8">
                        <div className="flex-1 w-full overflow-hidden">
                          <ProductGrid 
                            title="" 
                            products={recommended} 
                            layout="horizontal"
                          />
                        </div>
                        <div className="w-full lg:w-1/3 bg-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-gray-400 min-h-[200px] relative overflow-hidden">
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center font-mono text-sm font-bold opacity-50">02</div>
                          <span className="text-2xl font-bold mb-2">New Arrivals</span>
                          <span className="text-xs">Check out latest trends</span>
                        </div>
                      </div>

                      {/* AI Powered Section */}
                      {aiRecs && (
                        <div className="relative bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 mb-8 overflow-hidden">
                           <div className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-indigo-200 flex items-center justify-center font-mono text-sm font-bold text-indigo-300 opacity-60">03</div>
                           <div className="flex items-center gap-2 mb-6">
                             <div className="bg-white p-2 rounded-full shadow-sm">
                               <Sparkles className="text-indigo-600" size={20} />
                             </div>
                             <div>
                               <h2 className="text-xl font-bold text-gray-900">{aiRecs.title}</h2>
                               <p className="text-xs text-indigo-600 font-medium">Powered by AstharHat AI Brain</p>
                             </div>
                           </div>
                           
                           <ProductGrid 
                             title=""
                             products={aiRecs.products} 
                             layout="grid"
                           />
                        </div>
                      )}
                    </>
                  )}
                </div>
             </div>
          </div>
        )}

        {/* Other Pages */}
        {currentView === 'auth' && <AuthPage onNavigate={handleNavigate} />}
        {currentView === 'chat' && (
            <div className="max-w-7xl mx-auto px-4">
                <ChatPage />
            </div>
        )}
        {currentView === 'source' && <SourcePage />}
        {currentView === 'help' && <HelpPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'checkout' && <CheckoutPage onNavigate={handleNavigate} />}

      </main>

      {/* Floating Action Menu (Desktop) */}
      <div className="hidden md:flex fixed right-6 bottom-24 flex-col space-y-4 z-40">
        <div className="group relative flex items-center justify-end">
           <span className="absolute right-full mr-3 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
             Call Us
           </span>
           <button 
             onClick={() => window.location.href = 'tel:+1234567890'}
             className="w-12 h-12 rounded-lg shadow-md border flex items-center justify-center transition bg-white border-gray-200 text-gray-600 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
           >
             <Phone size={20} />
           </button>
        </div>

        <div className="group relative flex items-center justify-end">
           <span className="absolute right-full mr-3 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
             Chat
           </span>
           <button 
             onClick={() => handleNavigate('chat')}
             className={`w-12 h-12 rounded-lg shadow-md border flex items-center justify-center transition ${currentView === 'chat' ? 'bg-orange-500 text-white border-orange-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-500'}`}
           >
             <MessageSquare size={20} />
           </button>
        </div>
        
        <div className="group relative flex items-center justify-end">
           <span className="absolute right-full mr-3 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
             Source
           </span>
           <button 
             onClick={() => handleNavigate('source')}
             className={`w-12 h-12 rounded-lg shadow-md border flex items-center justify-center transition ${currentView === 'source' ? 'bg-orange-500 text-white border-orange-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-500'}`}
           >
             <Globe size={20} />
           </button>
        </div>

        <div className="group relative flex items-center justify-end">
           <span className="absolute right-full mr-3 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
             Help
           </span>
           <button 
             onClick={() => handleNavigate('help')}
             className={`w-12 h-12 rounded-lg shadow-md border flex items-center justify-center transition ${currentView === 'help' ? 'bg-orange-500 text-white border-orange-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-orange-50 hover:text-orange-500'}`}
           >
             <HelpCircle size={20} />
           </button>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Customer Services</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li onClick={() => handleNavigate('help')} className="cursor-pointer hover:text-orange-600">Help Center</li>
                        <li onClick={() => handleNavigate('contact')} className="cursor-pointer hover:text-orange-600">Contact Us</li>
                        <li className="cursor-pointer hover:text-orange-600">Submit a Dispute</li>
                        <li className="cursor-pointer hover:text-orange-600">Policies & Rules</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">About Us</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li onClick={() => handleNavigate('about')} className="cursor-pointer hover:text-orange-600">About AstharHat</li>
                        <li className="cursor-pointer hover:text-orange-600">Careers</li>
                        <li className="cursor-pointer hover:text-orange-600">Press Center</li>
                        <li className="cursor-pointer hover:text-orange-600">Investor Relations</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Source on AstharHat</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li onClick={() => handleNavigate('source')} className="cursor-pointer hover:text-orange-600">Request for Quotation</li>
                        <li className="cursor-pointer hover:text-orange-600">Membership Program</li>
                        <li className="cursor-pointer hover:text-orange-600">Logistics Service</li>
                        <li className="cursor-pointer hover:text-orange-600">Sales Tax & VAT</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Trade Services</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="cursor-pointer hover:text-orange-600">Trade Assurance</li>
                        <li className="cursor-pointer hover:text-orange-600">Business Identity Service</li>
                        <li className="cursor-pointer hover:text-orange-600">Inspection Service</li>
                    </ul>
                </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm">© 2024 AstharHat Group. All rights reserved.</p>
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-gray-600 text-xs">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-gray-600 text-xs">Terms of Use</a>
                    <a href="#" className="text-gray-400 hover:text-gray-600 text-xs">Legal Inquiry Guide</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
