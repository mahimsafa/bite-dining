import { useState } from 'react';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Mexican Tacos', price: 28, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=400&fit=crop', category: 'Mexican' },
  { id: 2, name: 'Chicken Burrito', price: 32, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=400&fit=crop', category: 'Mexican' },
  { id: 3, name: 'Classic Lasagna', price: 35, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=400&fit=crop', category: 'Italian' },
  { id: 4, name: 'Cheese Ravioli', price: 30, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=400&fit=crop', category: 'Italian' },
  { id: 5, name: 'Dragon Roll', price: 38, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=400&fit=crop', category: 'Japanese' },
  { id: 6, name: 'Tonkotsu Ramen', price: 25, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop', category: 'Japanese' },
  { id: 7, name: 'Shrimp Tempura', price: 28, image: 'https://images.unsplash.com/photo-1606850780554-b55ea4dd0b70?w=400&h=400&fit=crop', category: 'Japanese' },
  { id: 8, name: 'Pizza Margherita', price: 32, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop', category: 'Italian' },
];

const categories = ['All', 'Mexican', 'Italian', 'Japanese'];

export default function MenuPack() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-28 bg-cream" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal">
            Regular Menu Pack
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Explore our diverse menu from around the world
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-14 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-xl shadow-primary/30 transform scale-105'
                  : 'bg-white text-charcoal border-2 border-gray-200 hover:border-primary hover:text-primary hover:shadow-lg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                  {item.category}
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <FiHeart className="w-5 h-5 text-charcoal" />
                </button>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-3 h-3 ${i < 4 ? 'text-primary fill-primary' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-charcoal group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-primary">${item.price}</span>
                  <button className="bg-primary text-white p-3.5 rounded-full hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:scale-110">
                    <FiShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
