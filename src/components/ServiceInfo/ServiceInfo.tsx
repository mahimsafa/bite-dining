import { FiShoppingBag, FiClock, FiShield, FiTruck, FiHeart, FiAward } from 'react-icons/fi';

const services = [
  { icon: FiShoppingBag, title: 'Online Order', description: 'Order easily through our website' },
  { icon: FiClock, title: '24/7 Service', description: 'We are available round the clock' },
  { icon: FiShield, title: 'Clean Kitchen', description: '100% hygiene guaranteed' },
  { icon: FiTruck, title: 'Fast Delivery', description: 'Quick delivery to your door' },
  { icon: FiHeart, title: 'Fresh Food', description: 'Made with fresh ingredients' },
  { icon: FiAward, title: 'Best Quality', description: 'Award-winning recipes' },
];

export default function ServiceInfo() {
  return (
    <section className="py-28 bg-white relative overflow-hidden" id="about">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal">
            We Are More Than<br className="hidden md:block" /> Multiple Service
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            What makes us special and different from others
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-4">
                  <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop"
                      alt="Professional Chef"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -right-4 bg-white rounded-2xl shadow-2xl p-6 min-w-[180px]">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                      <FiAward className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-charcoal text-xl">15+ Years</p>
                      <p className="text-sm text-gray-500">Of Experience</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FiShield className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="font-bold text-green-600">100% Safe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-cream rounded-2xl p-7 hover:bg-white hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all transform group-hover:scale-110">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
