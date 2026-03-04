import { FiSearch, FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="min-h-screen pt-28 pb-20 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-5 py-2.5 rounded-full mb-8 shadow-sm">
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></span>
              <span className="text-primary font-semibold text-sm tracking-wide uppercase">Now Open - Order Online</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-charcoal leading-[1.1]">
              We Serve The{' '}
              <span className="text-primary relative inline-block">
                Taste
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0,6 Q50,0 100,6" stroke="#F5A623" strokeWidth="5" fill="none" />
                </svg>
              </span>{' '}
              You Love
            </h1>
            
            <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience culinary excellence with our carefully crafted dishes made from the freshest ingredients. Your satisfaction is our priority.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1.5">
                Explore Food
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group border-2 border-charcoal/20 text-charcoal px-10 py-5 rounded-full font-semibold text-lg hover:bg-charcoal hover:text-white hover:border-charcoal transition-all flex items-center justify-center gap-3">
                <FiSearch className="w-5 h-5" />
                Search
              </button>
            </div>
            
            <div className="mt-14 flex items-center justify-center lg:justify-start gap-10">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`}
                    alt="Customer"
                    className="w-14 h-14 rounded-full border-4 border-cream object-cover shadow-md"
                  />
                ))}
                <div className="w-14 h-14 rounded-full border-4 border-cream bg-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
                  +2.5k
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-primary fill-primary" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 font-medium mt-1">2,500+ happy customers</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/10 rounded-full blur-3xl"></div>
              <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center p-4">
                <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop"
                    alt="Delicious salmon salad"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🍽️</span>
                </div>
                <div>
                  <p className="font-bold text-charcoal text-lg">500+ Dishes</p>
                  <p className="text-sm text-gray-500">To choose from</p>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-5">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-primary fill-primary" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="font-bold text-charcoal text-xl">4.9</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
