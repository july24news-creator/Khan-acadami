
import React from 'react';
import { CATEGORIES } from '../constants';
import { 
  Shirt, 
  Smartphone, 
  Dumbbell, 
  Sparkles, 
  Watch, 
  Home, 
  Factory, 
  Car, 
  Star, 
  ChevronRight,
  Settings
} from 'lucide-react';

interface SidebarProps {
  onCategoryClick: (categoryName: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  shirt: <Shirt size={20} />,
  smartphone: <Smartphone size={20} />,
  dumbbell: <Dumbbell size={20} />,
  sparkles: <Sparkles size={20} />,
  watch: <Watch size={20} />,
  home: <Home size={20} />,
  factory: <Factory size={20} />,
  car: <Car size={20} />
};

const Sidebar: React.FC<SidebarProps> = ({ onCategoryClick }) => {
  return (
    <aside className="w-full md:w-64 bg-white border border-gray-100 rounded-lg p-4 shadow-sm h-fit sticky top-24 relative">
       {/* Numbering Indicator */}
      <div className="absolute top-2 right-2 w-8 h-8 rounded-full border-2 border-gray-100 flex items-center justify-center font-mono text-sm font-bold text-gray-300">01</div>

      <div className="flex items-center justify-between mb-4 border-b pb-2 pr-8">
        <h3 className="font-bold text-gray-800 flex items-center">
          <span className="mr-2 text-orange-500"><Star size={20} fill="#f97316" className="text-orange-500" /></span> Categories
        </h3>
      </div>
      <ul className="space-y-3">
        {CATEGORIES.map((cat) => (
          <li 
            key={cat.id} 
            onClick={() => onCategoryClick(cat.name)}
            className="flex items-center justify-between group cursor-pointer hover:bg-orange-50 p-2 rounded transition"
          >
            <div className="flex items-center space-x-3 text-sm text-gray-600 group-hover:text-orange-600">
              <span className="text-gray-500 group-hover:text-orange-600 transition-colors">
                {iconMap[cat.icon] || <Star size={20} />}
              </span>
              <span>{cat.name}</span>
            </div>
            <ChevronRight size={14} className="text-gray-300 group-hover:text-orange-400 transition" />
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t pt-4">
        <div className="flex items-center justify-between text-xs text-gray-400 hover:text-orange-600 cursor-pointer transition">
          <span>Viewing preferences</span>
          <Settings size={14} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
