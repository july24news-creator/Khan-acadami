
import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, message, duration, onClose]);

  return (
    <div 
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-gray-900/90 backdrop-blur-sm text-white pl-4 pr-10 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-white/10 min-w-[300px] relative">
        <div className="bg-green-500 rounded-full p-1 flex-shrink-0">
          <Check size={12} className="text-white" strokeWidth={3} />
        </div>
        <span className="font-medium text-sm tracking-wide">{message}</span>
        
        <button 
          onClick={onClose} 
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-2 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
