
import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Check, Loader2, Heart, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Toast from './Toast';

interface ProductGridProps {
  title: string;
  products: Product[];
  subtitle?: string;
  layout?: 'horizontal' | 'grid';
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products, subtitle, layout = 'grid' }) => {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Wishlist state initialization from localStorage
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('astharhat_wishlist');
      return new Set(stored ? JSON.parse(stored) : []);
    } catch {
      return new Set();
    }
  });

  const toggleWishlist = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation(); // Prevent card click
    e.preventDefault();

    setWishlistIds(prev => {
      const next = new Set(prev);
      let msg = '';
      if (next.has(productId)) {
        next.delete(productId);
        msg = 'Removed from wishlist';
      } else {
        next.add(productId);
        msg = 'Added to wishlist';
      }
      
      localStorage.setItem('astharhat_wishlist', JSON.stringify(Array.from(next)));
      setToastMessage(msg);
      return next;
    });
  };

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent card click navigation
    e.preventDefault();
    
    addToCart(product);
    
    // Trigger button animation state
    const newSet = new Set(addedIds);
    newSet.add(product.id);
    setAddedIds(newSet);
    
    // Trigger toast
    setToastMessage(`${product.name} added to cart`);
    
    // Reset button state after delay
    setTimeout(() => {
        setAddedIds(prev => {
            const next = new Set(prev);
            next.delete(product.id);
            return next;
        });
    }, 2000);
  };

  return (
    <>
      <section className="mb-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            {title && <h2 className="text-lg md:text-xl font-bold text-gray-900">{title}</h2>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          <a href="#" className="text-sm text-orange-600 font-medium hover:underline">View more ›</a>
        </div>

        <div className={layout === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' 
            : 'flex space-x-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0'}>
          {products.map((p) => {
            const isAdded = addedIds.has(p.id);
            const isWishlisted = wishlistIds.has(p.id);
            const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

            return (
              <div 
                key={p.id} 
                className={`group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex-shrink-0 flex flex-col ${layout === 'horizontal' ? 'w-48 sm:w-56 md:w-64' : 'w-full'} hover:-translate-y-1`}
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Quick Add Overlay on Desktop */}
                  <div className="hidden lg:block absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Discount Badge */}
                  {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Tag size={10} />
                        -{discount}% OFF
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(e, p.id)}
                    className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200 z-10 hover:scale-110 active:scale-95"
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart 
                      size={18} 
                      className={`transition-colors duration-300 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"}`} 
                    />
                  </button>
                </div>
                
                <div className="p-3 flex flex-col flex-1">
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] mb-1 group-hover:text-orange-600 transition-colors">{p.name}</h4>
                  
                  <div className="flex flex-col mt-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900">৳{p.price.toLocaleString()}</span>
                        {p.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">৳{p.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                  </div>

                  {p.moq && (
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">MOQ: {p.moq}</p>
                  )}
                  
                  <div className="mt-auto pt-3">
                    <button 
                      onClick={(e) => handleAdd(e, p)}
                      className={`w-full relative overflow-hidden flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-all duration-300 active:scale-95 ${
                        isAdded
                          ? 'bg-green-500 text-white shadow-green-200 shadow-lg' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-900 hover:text-white hover:shadow-lg'
                      }`}
                    >
                      <div className={`flex items-center space-x-2 transition-transform duration-300 ${isAdded ? 'translate-y-0' : ''}`}>
                         {isAdded ? (
                            <>
                                <Check size={16} className="animate-in zoom-in spin-in-90 duration-300" />
                                <span>Added</span>
                            </>
                         ) : (
                            <>
                                <ShoppingCart size={16} />
                                <span>Add to Cart</span>
                            </>
                         )}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      <Toast 
        message={toastMessage || ''} 
        isVisible={!!toastMessage} 
        onClose={() => setToastMessage(null)} 
      />
    </>
  );
};

export default ProductGrid;
