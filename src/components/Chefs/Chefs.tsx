import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

interface Chef {
  id: number;
  name: string;
  role: string;
  image: string;
}

const chefs: Chef[] = [
  { id: 1, name: 'Gordon Ramsay', role: 'Head Chef', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop&crop=face' },
  { id: 2, name: 'Marco Pierre', role: 'Sous Chef', image: 'https://images.unsplash.com/photo-1583394293214-28ez8d8f5d5d?w=400&h=400&fit=crop&crop=face' },
  { id: 3, name: 'Jamie Oliver', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=400&fit=crop&crop=face' },
  { id: 4, name: 'Thomas Keller', role: 'Grill Master', image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=400&fit=crop&crop=face' },
];

export default function Chefs() {
  return (
    <section className="py-24 bg-cream" id="contacts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal">
            Meet Our Chefs
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            The talented people behind our delicious dishes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-3">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <FiFacebook />
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <FiTwitter />
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                      <FiInstagram />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-charcoal group-hover:text-primary transition-colors">
                  {chef.name}
                </h3>
                <p className="text-primary font-medium mt-1">{chef.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
