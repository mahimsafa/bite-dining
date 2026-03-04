import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';

interface Dish {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  isFeatured?: boolean;
}

const dishes: Dish[] = [
  { id: 1, name: 'Creamy Pasta', price: 35, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop', rating: 5, isFeatured: true },
  { id: 2, name: 'Crispy Fries', price: 35, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop', rating: 5 },
  { id: 3, name: 'Classic Burger', price: 35, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop', rating: 4 },
  { id: 4, name: 'Margherita Pizza', price: 35, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop', rating: 5 },
];

export default function PopularDishes() {
  const featuredDish = dishes.find(d => d.isFeatured);
  const regularDishes = dishes.filter(d => !d.isFeatured);

  return (
    <section className="py-28 bg-cream" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Popular Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal">
            Our Popular Dishes
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our most loved selections from customers around the world
          </p>
        </div>

        {featuredDish && (
          <div className="mb-12">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
              <div className="grid md:grid-cols-2 items-center">
                <div className="relative aspect-[4/3] md:aspect-auto md:h-96 overflow-hidden">
                  <img
                    src={featuredDish.image}
                    alt={featuredDish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    ⭐ Chef's Recommendation
                  </div>
                </div>
                <div className="p-8 md:p-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                    {featuredDish.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-6 h-6 ${i < featuredDish.rating ? 'text-primary fill-primary' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-gray-500 ml-2">({featuredDish.rating}.0)</span>
                  </div>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Our signature dish, crafted with love by our expert chefs using the finest ingredients. A customer favorite that keeps them coming back for more.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold text-primary">${featuredDish.price}</span>
                    <button className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center gap-3 transform hover:scale-105">
                      <FiShoppingCart className="w-6 h-6" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <button className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all">
                <FiHeart className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularDishes.map((dish) => (
            <div
              key={dish.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-3 h-3 ${i < dish.rating ? 'text-primary fill-primary' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <button className="bg-white text-charcoal px-6 py-3 rounded-full font-semibold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform flex items-center gap-2">
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-charcoal group-hover:text-primary transition-colors">
                  {dish.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-primary">${dish.price.toFixed(2)}</span>
                  <button className="w-12 h-12 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all flex items-center justify-center transform hover:scale-110">
                    <FiShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 text-primary font-bold text-lg hover:gap-5 transition-all group">
            View All Dishes
            <FiStar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
