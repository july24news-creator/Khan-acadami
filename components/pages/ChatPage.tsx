
import React from 'react';
import { Search, MoreVertical, Phone, Video, Send } from 'lucide-react';

const ChatPage: React.FC = () => {
  const conversations = [
    { id: 1, name: 'Shenzhen Tech Co.', msg: 'The updated price list is attached.', time: '10:30 AM', active: true },
    { id: 2, name: 'Global Fabrics Ltd', msg: 'Can we schedule a call for the bulk order?', time: 'Yesterday', active: false },
    { id: 3, name: 'AutoParts Express', msg: 'Shipment #40221 has been dispatched.', time: 'Yesterday', active: false },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col md:flex-row bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden my-6">
      {/* Sidebar List */}
      <div className="w-full md:w-80 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div 
              key={chat.id} 
              className={`p-4 flex items-start gap-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 ${chat.active ? 'bg-orange-50/50' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area - Hidden on mobile initially in a real app, but showing for responsiveness demo */}
      <div className="hidden md:flex flex-1 flex-col bg-gray-50/30">
        <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">ST</div>
            <div>
              <h3 className="font-bold text-gray-900">Shenzhen Tech Co.</h3>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <Phone size={20} className="hover:text-gray-600 cursor-pointer" />
            <Video size={20} className="hover:text-gray-600 cursor-pointer" />
            <MoreVertical size={20} className="hover:text-gray-600 cursor-pointer" />
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 max-w-[80%] text-sm text-gray-700 shadow-sm">
              Hello! Regarding your inquiry about the Smart Watch Ultra 2nd Gen, yes, we have stock available for immediate shipping.
            </div>
          </div>
          <div className="flex justify-end">
             <div className="bg-orange-500 text-white p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm shadow-sm">
              That's great. What is the best price for 50 units?
            </div>
          </div>
           <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 max-w-[80%] text-sm text-gray-700 shadow-sm">
              For 50 units, we can offer $42.00 per unit. The updated price list is attached.
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 p-3 bg-gray-100 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-100 transition-all"
            />
            <button className="p-3 bg-[#ff6600] text-white rounded-xl hover:bg-orange-700 transition shadow-lg shadow-orange-100">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Empty State for Chat Area (since we show list on mobile) */}
      <div className="md:hidden flex-1 flex items-center justify-center p-8 text-center bg-gray-50 border-t border-gray-200">
        <p className="text-gray-400 text-sm">Select a conversation to start chatting</p>
      </div>
    </div>
  );
};

export default ChatPage;
