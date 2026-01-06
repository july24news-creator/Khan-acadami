
import React from 'react';
import { Upload, Info } from 'lucide-react';

const SourcePage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Request for Quotation (RFQ)</h2>
          <p className="text-gray-300 text-sm">Post your sourcing request and get quotes from verified suppliers globally.</p>
        </div>

        <form className="p-6 md:p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                placeholder="e.g. Wireless Noise Cancelling Headphones"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input 
                  type="number" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  placeholder="e.g. 1000"
                />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                 <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white">
                   <option>Pieces</option>
                   <option>Sets</option>
                   <option>Kilograms</option>
                   <option>Tons</option>
                 </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Requirements</label>
              <textarea 
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition resize-none"
                placeholder="Describe features, materials, packaging requirements, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition">
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">Images or documents (Max 5MB)</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
             <Info size={20} className="text-blue-600 flex-shrink-0" />
             <p className="text-xs text-blue-800 leading-relaxed">
               By submitting this form, your request will be shared with relevant suppliers. AstharHat protects your privacy and business data.
             </p>
          </div>

          <div className="flex justify-end pt-4">
            <button className="bg-[#ff6600] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200 w-full md:w-auto">
              Submit RFQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SourcePage;
