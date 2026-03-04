import { useState } from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import ParallaxSection from '../ParallaxSection/ParallaxSection';
import ParallaxCard from '../ParallaxCard/ParallaxCard';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Mexican Tacos', price: 28, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop', category: 'Mexican' },
  { id: 2, name: 'Chicken Burrito', price: 32, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop', category: 'Mexican' },
  { id: 3, name: 'Classic Lasagna', price: 35, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop', category: 'Italian' },
  { id: 4, name: 'Cheese Ravioli', price: 30, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop', category: 'Italian' },
  { id: 5, name: 'Dragon Roll', price: 38, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop', category: 'Japanese' },
  { id: 6, name: 'Tonkotsu Ramen', price: 25, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', category: 'Japanese' },
  { id: 7, name: 'Shrimp Tempura', price: 28, image: 'https://images.unsplash.com/photo-1606850780554-b55ea4dd0b70?w=400&h=300&fit=crop', category: 'Japanese' },
  { id: 8, name: 'Pizza Margherita', price: 32, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', category: 'Italian' },
];

const categories = ['All', 'Mexican', 'Italian', 'Japanese'];

export default function MenuPack() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <ParallaxSection className="py-24 md:py-32 bg-cream-deep" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal">
            Explore Our Menu
          </h2>
          <p className="mt-4 text-taupe max-w-2xl mx-auto text-lg">
            A world of flavors, curated with care
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-14 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-7 py-3 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white text-charcoal/70 border border-taupe/25 hover:border-primary/40 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <ParallaxCard
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-espresso/80 backdrop-blur-sm text-cream px-3 py-1 rounded-full text-xs font-semibold">
                  {item.category}
                </div>
                <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white text-charcoal">
                  <FiHeart className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-charcoal group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold font-display text-primary">${item.price}</span>
                  <button className="bg-primary text-white p-3 rounded-full hover:bg-primary-light hover:shadow-md hover:shadow-primary/30 transition-all hover:scale-105">
                    <FiShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </ParallaxCard>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}
