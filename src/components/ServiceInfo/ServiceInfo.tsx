import { FiShoppingBag, FiClock, FiShield, FiTruck, FiHeart, FiAward } from 'react-icons/fi';

const services = [
  { icon: FiShoppingBag, title: 'Online Order', description: 'Order easily through our website or app' },
  { icon: FiClock, title: '24/7 Service', description: 'We are available around the clock' },
  { icon: FiShield, title: 'Clean Kitchen', description: '100% hygiene guaranteed always' },
  { icon: FiTruck, title: 'Fast Delivery', description: 'Quick delivery right to your door' },
  { icon: FiHeart, title: 'Fresh Food', description: 'Made daily with fresh ingredients' },
  { icon: FiAward, title: 'Best Quality', description: 'Award-winning recipes and chefs' },
];

export default function ServiceInfo() {
  return (
    <section className="py-24 md:py-32 bg-espresso relative overflow-hidden" id="about">
      {/* Subtle dot texture */}
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
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-cream">
            We Are More Than<br className="hidden md:block" /> A Restaurant
          </h2>
          <p className="mt-4 text-taupe max-w-2xl mx-auto text-lg">
            What makes us special and different from the rest
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&h=625&fit=crop"
                  alt="Professional Chef"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-5 -right-5 bg-cream rounded-2xl shadow-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center">
                  <FiAward className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-charcoal text-lg font-display">15+ Years</p>
                  <p className="text-xs text-taupe">Of Excellence</p>
                </div>
              </div>

              <div className="absolute -top-5 -left-5 bg-cream rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <FiShield className="w-5 h-5 text-green-600" />
                </div>
                <p className="font-bold text-green-700 text-sm">100% Safe</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/10 hover:border-white/15 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary transition-all">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-cream mb-2">{service.title}</h3>
                  <p className="text-taupe text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
