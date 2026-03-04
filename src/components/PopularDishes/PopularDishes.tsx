import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import ParallaxSection from '../ParallaxSection/ParallaxSection';
import ParallaxCard from '../ParallaxCard/ParallaxCard';

interface Dish {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  isFeatured?: boolean;
}

const dishes: Dish[] = [
  { id: 1, name: 'Creamy Pasta', price: 35, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=450&fit=crop', rating: 5, isFeatured: true },
  { id: 2, name: 'Crispy Fries', price: 18, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', rating: 5 },
  { id: 3, name: 'Classic Burger', price: 28, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', rating: 4 },
  { id: 4, name: 'Margherita Pizza', price: 32, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop', rating: 5 },
];

export default function PopularDishes() {
  const featuredDish = dishes.find(d => d.isFeatured);
  const regularDishes = dishes.filter(d => !d.isFeatured);

  return (
    <ParallaxSection className="py-24 md:py-32 bg-cream" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
            Popular Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal">
            Our Popular Dishes
          </h2>
          <p className="mt-4 text-taupe max-w-2xl mx-auto text-lg">
            Discover our most loved selections, crafted with passion
          </p>
        </div>

        {featuredDish && (
          <div className="mb-10">
            <ParallaxCard className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group">
              <div className="grid md:grid-cols-2 items-stretch">
                <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img
                    src={featuredDish.image}
                    alt={featuredDish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 bg-primary text-white px-4 py-1.5 rounded-full font-semibold text-xs tracking-wide shadow-md">
                    Chef's Pick
                  </div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold font-display text-charcoal mb-4">
                    {featuredDish.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-5 h-5 ${i < featuredDish.rating ? 'text-primary fill-primary' : 'text-taupe/40'}`}
                      />
                    ))}
                    <span className="text-taupe text-sm ml-2">({featuredDish.rating}.0)</span>
                  </div>
                  <p className="text-taupe text-lg mb-8 leading-relaxed">
                    Our signature dish, crafted with love using the finest ingredients. A customer favorite that keeps them coming back for more.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold font-display text-primary">${featuredDish.price}</span>
                    <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-light hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-3 hover:scale-105">
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <button className="absolute top-5 right-5 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all text-charcoal">
                <FiHeart className="w-5 h-5" />
              </button>
            </ParallaxCard>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {regularDishes.map((dish) => (
            <ParallaxCard
              key={dish.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <FiStar className="w-3.5 h-3.5 text-primary fill-primary" />
                  <span className="text-xs font-semibold text-charcoal">{dish.rating}.0</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
                  <button className="bg-white text-charcoal px-6 py-2.5 rounded-full font-semibold shadow-lg translate-y-3 group-hover:translate-y-0 transition-transform flex items-center gap-2 text-sm">
                    <FiShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-charcoal group-hover:text-primary transition-colors">
                  {dish.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold font-display text-primary">${dish.price.toFixed(2)}</span>
                  <button className="w-11 h-11 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center hover:scale-105">
                    <FiShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </ParallaxCard>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 border border-primary/40 text-primary px-8 py-3.5 rounded-full font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all text-sm tracking-wide uppercase">
            View All Dishes
          </button>
        </div>
      </div>
    </ParallaxSection>
  );
}
