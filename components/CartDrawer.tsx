
import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout, onContinueShopping }) => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, lastOrder, setLastOrder } = useCart();

  if (!isCartOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onCheckout();
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    onContinueShopping();
  };

  const handleCloseSuccess = () => {
    setLastOrder(null); // Reset the order state so we don't show it next time
    setIsCartOpen(false);
    onContinueShopping();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="text-orange-500" />
            {lastOrder ? 'Order Status' : `Your Cart (${cartItems.length})`}
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* View: Success Order (Cart Empty + Last Order exists) */}
          {cartItems.length === 0 && lastOrder ? (
             <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                    Your order has been placed successfully. A confirmation email has been sent to {lastOrder.email}.
                </p>
                
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 w-full shadow-sm mb-6">
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Tracking Number</p>
                    <div className="font-mono text-xl font-bold text-gray-900 tracking-wider bg-white p-2 rounded border border-gray-100 mb-4 select-all">
                        {lastOrder.trackingNumber}
                    </div>
                    <button className="text-[#ff6600] text-sm font-bold hover:underline flex items-center justify-center gap-1 w-full">
                        Track Shipment <ExternalLink size={14} />
                    </button>
                </div>

                <div className="w-full">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Total Paid</span>
                        <span className="font-bold text-gray-900">৳{lastOrder.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                </div>

                <div className="mt-auto pt-8 w-full">
                    <button 
                        onClick={handleCloseSuccess}
                        className="w-full bg-[#ff6600] text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200"
                    >
                        Continue Shopping
                    </button>
                </div>
             </div>
          ) : cartItems.length === 0 ? (
            /* View: Empty Cart */
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
              <ShoppingBag size={64} className="text-gray-200" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <button 
                onClick={handleContinueShopping}
                className="bg-[#ff6600] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* View: Cart Items */
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:border-orange-200 transition-colors">
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm font-medium text-gray-900">
                      ৳{item.price.toLocaleString()} x {item.quantity}
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 p-1 rounded transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (Only show if cart has items) */}
        {cartItems.length > 0 && !lastOrder && (
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900">৳{subtotal.toLocaleString()}</span>
            </div>
            <button 
              onClick={handleCheckoutClick}
              className="w-full bg-[#ff6600] text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 group shadow-lg shadow-orange-200"
            >
              Checkout Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
