
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4 animate-in zoom-in duration-300">
                <div className="text-center p-12 bg-green-50 rounded-3xl border border-green-100 max-w-lg w-full">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h2>
                    <p className="text-gray-600 mb-8">Thank you for contacting us. Our team will review your message and get back to you within 24 hours.</p>
                    <button 
                        onClick={() => setSubmitted(false)}
                        className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition w-full"
                    >
                        Send another message
                    </button>
                </div>
            </div>
        )
    }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Have questions about sourcing, selling, or our services? Our global team is ready to help you grow your business.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                
                <h3 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h3>
                <div className="space-y-8 relative z-10">
                    <div className="flex items-start gap-6">
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <MapPin size={24} className="text-[#ff6600]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Headquarters</h4>
                            <p className="text-gray-300">123 Trade Avenue, Commerce District</p>
                            <p className="text-gray-300">Dhaka, Bangladesh 1200</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6">
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <Phone size={24} className="text-[#ff6600]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Phone</h4>
                            <p className="text-gray-300">+880 123 456 7890</p>
                            <p className="text-gray-400 text-sm mt-1">Mon-Fri from 9am to 6pm</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-6">
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <Mail size={24} className="text-[#ff6600]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Email</h4>
                            <p className="text-gray-300">support@astharhat.com</p>
                            <p className="text-gray-400 text-sm mt-1">Online support 24/7</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-6">
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <Clock size={24} className="text-[#ff6600]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1">Business Hours</h4>
                            <p className="text-gray-300">Monday - Friday: 9am - 6pm</p>
                            <p className="text-gray-300">Saturday: 10am - 4pm</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <h4 className="font-bold text-gray-900 mb-2">Live Chat Support</h4>
                <p className="text-sm text-gray-600 mb-4">Need immediate assistance? Chat with our AI assistant or a live agent.</p>
                <button className="text-[#ff6600] font-bold text-sm hover:underline">Start Chat ›</button>
            </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition" placeholder="John" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input type="text" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition" placeholder="Doe" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition" placeholder="john@company.com" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition">
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Sales Question</option>
                        <option>Partnership Proposal</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea required rows={5} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none resize-none transition" placeholder="How can we help you?"></textarea>
                </div>

                <button type="submit" className="w-full bg-[#ff6600] text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition flex items-center justify-center gap-2 shadow-lg shadow-orange-100 transform active:scale-95">
                    <Send size={18} />
                    Send Message
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
