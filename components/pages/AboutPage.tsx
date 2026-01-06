
import React from 'react';
import { Globe, ShieldCheck, Users, TrendingUp } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Empowering Global Trade</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            AstharHat is the world's leading B2B e-commerce marketplace, connecting millions of buyers and suppliers worldwide with trust and efficiency.
            </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center py-8 border border-gray-100">
          <div className="p-4">
            <div className="text-4xl font-extrabold text-[#ff6600] mb-2">10M+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Products</div>
          </div>
          <div className="p-4 border-l border-gray-100">
            <div className="text-4xl font-extrabold text-[#ff6600] mb-2">150+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Countries</div>
          </div>
          <div className="p-4 border-l border-gray-100">
            <div className="text-4xl font-extrabold text-[#ff6600] mb-2">200K+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Suppliers</div>
          </div>
          <div className="p-4 border-l border-gray-100">
            <div className="text-4xl font-extrabold text-[#ff6600] mb-2">24/7</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Support</div>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 order-2 md:order-1">
               <div className="relative">
                 <div className="absolute inset-0 bg-orange-200 rounded-2xl transform translate-x-4 translate-y-4"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
                   alt="Business Meeting" 
                   className="relative rounded-2xl shadow-lg w-full"
                 />
               </div>
            </div>
            <div className="flex-1 space-y-6 order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To make it easy to do business anywhere. We do this by giving suppliers the tools necessary to reach a global audience for their products, and by helping buyers find products and suppliers quickly and efficiently.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#ff6600] flex-shrink-0">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Global Reach</h4>
                    <p className="text-sm text-gray-500">Seamlessly connecting businesses across borders.</p>
                  </div>
                </div>
                 <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-[#ff6600] flex-shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Secure Trading</h4>
                    <p className="text-sm text-gray-500">Full protection with Trade Assurance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div className="bg-gray-50 py-20">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose AstharHat?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: <Users size={32} />, title: "Customer First", desc: "We prioritize our customers' needs and strive to exceed expectations." },
                    { icon: <TrendingUp size={32} />, title: "Innovation", desc: "Constantly evolving our platform to serve the modern trade ecosystem." },
                    { icon: <ShieldCheck size={32} />, title: "Integrity", desc: "Building trust through transparency and reliable verification processes." }
                ].map((val, i) => (
                    <div key={i} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-700">
                            {val.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
                        <p className="text-gray-600">{val.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default AboutPage;
