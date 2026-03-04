import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

interface Chef {
  id: number;
  name: string;
  role: string;
  image: string;
}

const chefs: Chef[] = [
  { id: 1, name: 'Gordon Ramsay', role: 'Head Chef', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=533&fit=crop&crop=face' },
  { id: 2, name: 'Marco Pierre', role: 'Sous Chef', image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=533&fit=crop&crop=face' },
  { id: 3, name: 'Jamie Oliver', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=533&fit=crop&crop=face' },
  { id: 4, name: 'Thomas Keller', role: 'Grill Master', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=533&fit=crop&crop=face' },
];

export default function Chefs() {
  return (
    <section className="py-24 md:py-32 bg-espresso relative overflow-hidden" id="contacts">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #FAF6F0 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
            Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-cream">
            Meet Our Chefs
          </h2>
          <p className="mt-4 text-taupe max-w-2xl mx-auto text-lg">
            The talented people behind our delicious dishes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="group rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-bold font-display text-cream">{chef.name}</h3>
                  <p className="text-primary text-sm font-medium mt-1">{chef.role}</p>
                  <div className="flex gap-2 mt-4">
                    {[FiFacebook, FiTwitter, FiInstagram].map((Icon, i) => (
                      <button
                        key={i}
                        className="w-9 h-9 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center text-cream hover:bg-primary transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
