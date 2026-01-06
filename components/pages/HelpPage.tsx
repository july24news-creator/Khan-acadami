
import React from 'react';
import { ChevronDown, ShieldCheck, Truck, CreditCard, MessageCircle } from 'lucide-react';

const HelpPage: React.FC = () => {
  const faqs = [
    { q: 'How does Trade Assurance protect my order?', a: 'Trade Assurance is a free service offered by AstharHat that is designed to help create trust between buyers and suppliers. Trade Assurance covers you if your products are not shipped on time or your products do not meet the quality standards per your contract.' },
    { q: 'What payment methods are accepted?', a: 'We accept major credit cards (Visa, MasterCard), PayPal, Bank Transfers (T/T), and Cash on Delivery (COD). For large orders, Letter of Credit (L/C) is also supported.' },
    { q: 'How do I return a product?', a: 'If a product is defective or does not match the description, you can open a dispute within 30 days of receiving the item. Our support team will mediate between you and the supplier.' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How can we help you?</h1>
        <div className="max-w-xl mx-auto relative">
           <input 
            type="text" 
            placeholder="Describe your issue..." 
            className="w-full p-4 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
           />
           <button className="absolute right-2 top-2 bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-black transition">
             Search
           </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
            { icon: <ShieldCheck size={24} />, label: 'Order Protection' },
            { icon: <Truck size={24} />, label: 'Shipping' },
            { icon: <CreditCard size={24} />, label: 'Payments' },
            { icon: <MessageCircle size={24} />, label: 'Disputes' }
        ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center hover:shadow-md transition cursor-pointer group">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    {item.icon}
                </div>
                <span className="font-medium text-gray-700">{item.label}</span>
            </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
           <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-gray-100">
            {faqs.map((faq, i) => (
                <div key={i} className="p-6 hover:bg-gray-50 transition cursor-pointer group">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">{faq.q}</h3>
                        <ChevronDown size={20} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
            ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">Still need help?</p>
        <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition">
            Contact Support
        </button>
      </div>
    </div>
  );
};

export default HelpPage;
