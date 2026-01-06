
import React, { useState, useRef } from 'react';
import { Search, Camera, AlertCircle } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setIsError(true);
      return;
    }
    setIsError(false);
    onSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (isError && e.target.value.trim()) {
      setIsError(false);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate image search
      const searchQuery = `Image Search: ${file.name}`;
      setQuery(searchQuery);
      setIsError(false);
      onSearch(searchQuery);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 md:py-12 px-4 relative">
      <form 
        onSubmit={handleSubmit}
        className={`relative bg-white border-2 ${isError ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-900'} rounded-full flex items-center p-1 shadow-xl overflow-hidden transition-all duration-300`}
      >
        <div className="flex-1 flex items-center px-3 md:px-6">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={handleInputChange}
            className="w-full py-2 md:py-3 outline-none text-base md:text-lg text-gray-800 placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center space-x-2 md:space-x-4 pr-1 md:pr-2">
          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />

          {/* Image Search Button */}
          <button 
            type="button" 
            onClick={handleCameraClick}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all active:scale-95"
            title="Search by image"
          >
            <Camera size={20} />
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-gray-900 text-white px-4 md:px-8 py-2 md:py-3 rounded-full font-bold hover:bg-black transition flex items-center space-x-2 disabled:bg-gray-400 ${!query.trim() ? 'opacity-90' : ''}`}
          >
            {isLoading ? (
               <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              <>
                <Search size={20} />
                <span className="hidden sm:inline">Search</span>
              </>
            )}
          </button>
        </div>
      </form>
      
      {/* Error Message */}
      {isError && (
        <div className="absolute left-0 right-0 -bottom-2 md:bottom-4 text-center">
            <div className="inline-flex items-center gap-1.5 text-red-500 bg-red-50 px-3 py-1 rounded-full text-xs md:text-sm font-medium animate-in slide-in-from-top-1 fade-in duration-200 border border-red-100 shadow-sm">
                <AlertCircle size={14} />
                Please enter a product name to search
            </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
