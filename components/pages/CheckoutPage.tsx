
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { ArrowLeft, CheckCircle, MapPin, Truck, CreditCard, ShieldCheck, ExternalLink } from 'lucide-react';

interface CheckoutPageProps {
  onNavigate: (view: string) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cartItems, totalItems, clearCart } = useCart();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '', // Home Address
    localPlace: '', // Bazar/Local Place
    zila: '', // District
    city: '',
    zip: '',
    country: '',
    phone: '',
    email: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 60000 ? 0 : 150; // Free shipping over 60,000 BDT
  const tax = subtotal * 0.05; // 5% VAT
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        setTrackingNumber(`TRK-${Math.floor(Math.random() * 10000000)}`);
        setIsOrderPlaced(true);
        clearCart();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (isOrderPlaced) {
    return (
        <div className="max-w-3xl mx-auto py-12 px-4 min-h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-500 mb-8 max-w-md">
                Thank you, {formData.firstName}. Your order has been confirmed and will be shipped to <span className="font-medium text-gray-800">{formData.address}, {formData.localPlace}, {formData.zila}</span> soon.
            </p>
            
            {/* Tracking Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 w-full max-w-md shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
                    <span className="text-gray-500 text-sm font-medium">Tracking Number</span>
                    <span className="font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded tracking-wider">{trackingNumber}</span>
                </div>
                <div className="flex flex-col gap-3">
                     <p className="text-xs text-gray-400 text-left">
                        Your tracking information has been emailed to {formData.email}.
                    </p>
                    <a href="#" className="w-full bg-white border border-[#ff6600] text-[#ff6600] py-2 rounded-lg text-sm font-bold hover:bg-orange-50 transition flex items-center justify-center gap-2">
                        Track Order Status <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 w-full max-w-md mb-8 border border-gray-200">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Estimated Delivery</span>
                    <span className="font-medium text-gray-900">3-5 Business Days</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Total Amount</span>
                    <span className="font-bold text-orange-600">৳{total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </div>
            </div>
            <button 
                onClick={() => onNavigate('home')}
                className="bg-[#ff6600] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200"
            >
                Continue Shopping
            </button>
        </div>
    );
  }

  if (cartItems.length === 0) {
      return (
          <div className="max-w-4xl mx-auto py-20 px-4 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
              <button onClick={() => onNavigate('home')} className="text-orange-600 font-medium hover:underline">
                  Go back to shop
              </button>
          </div>
      )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-8 text-sm text-gray-500">
        <button onClick={() => onNavigate('home')} className="hover:text-orange-600 flex items-center gap-1">
            <ArrowLeft size={16} /> Back to Shop
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Delivery Form */}
        <div className="lg:col-span-7 space-y-8">
            {/* Delivery Address */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="bg-orange-50 p-2 rounded-lg">
                        <MapPin className="text-[#ff6600]" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
                </div>

                <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input 
                            type="text" 
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition"
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input 
                            type="text" 
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition"
                        />
                    </div>
                    
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Active Contact Number</label>
                        <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+880..."
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
                        <input 
                            type="text" 
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="House No, Road No, etc."
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bazar / Local Place</label>
                        <input 
                            type="text" 
                            name="localPlace"
                            required
                            value={formData.localPlace}
                            onChange={handleInputChange}
                            placeholder="Nearest Bazar or Landmark"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Zila (District)</label>
                        <input 
                            type="text" 
                            name="zila"
                            required
                            value={formData.zila}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">City / Upazila</label>
                        <input 
                            type="text" 
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Zip / Postal Code</label>
                        <input 
                            type="text" 
                            name="zip"
                            required
                            value={formData.zip}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input 
                            type="text" 
                            name="country"
                            required
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition"
                        />
                    </div>
                </form>
            </div>

            {/* Payment Method Placeholder */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 opacity-80">
                <div className="flex items-center gap-3 mb-4">
                     <div className="bg-gray-100 p-2 rounded-lg">
                        <CreditCard className="text-gray-500" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                </div>
                <div className="p-4 border border-blue-100 bg-blue-50 rounded-xl flex items-center gap-3 text-blue-700">
                    <ShieldCheck size={20} />
                    <p className="text-sm font-medium">Secure Payment Processing via AstharHat Pay (Cash on Delivery Available)</p>
                </div>
            </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex gap-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    <p className="text-sm font-bold text-gray-900">৳{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3 border-t border-gray-100 pt-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>৳{subtotal.toLocaleString(undefined, { minimumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>{shippingCost === 0 ? <span className="text-green-600 font-medium">Free</span> : `৳${shippingCost}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Estimated VAT (5%)</span>
                        <span>৳{tax.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 font-bold text-lg pt-2 border-t border-gray-100 mt-2">
                        <span>Total</span>
                        <span>৳{total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                </div>

                <button 
                    type="submit"
                    form="checkout-form"
                    disabled={isLoading}
                    className="w-full bg-[#ff6600] text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>Processing...</>
                    ) : (
                        <>
                            Place Order
                            <Truck size={20} />
                        </>
                    )}
                </button>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <ShieldCheck size={14} />
                    <span>Transactions are secured and encrypted</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
