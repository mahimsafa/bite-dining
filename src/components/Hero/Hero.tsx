import { FiArrowRight, FiSearch } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&fit=crop"
          alt="Restaurant atmosphere"
          className="w-full h-full object-cover"
        />
        {/* Left-to-right dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/88 via-espresso/55 to-espresso/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32 pt-40">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse" />
            <span className="text-primary-light font-semibold text-sm tracking-wide uppercase">
              Now Open — Order Online
            </span>
          </div>

          <h1 className="font-display italic font-bold text-cream leading-[1.05] text-6xl md:text-7xl lg:text-8xl">
            We Serve The{' '}
            <span className="text-primary-light">Taste</span>{' '}
            You Love
          </h1>

          <p className="mt-8 text-lg md:text-xl text-cream/70 max-w-lg leading-relaxed">
            Experience culinary excellence with dishes made from the freshest ingredients. Your satisfaction is our priority.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button className="group bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3 hover:-translate-y-1">
              Explore Menu
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-cream/30 text-cream px-10 py-5 rounded-full font-semibold text-lg hover:bg-cream hover:text-charcoal hover:border-cream transition-all flex items-center justify-center gap-3">
              <FiSearch className="w-5 h-5" />
              Search Dishes
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`}
                  alt="Customer"
                  className="w-12 h-12 rounded-full border-2 border-cream/30 object-cover shadow-md"
                />
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-cream/30 bg-primary flex items-center justify-center text-white font-bold text-xs shadow-md">
                +2.5k
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-primary-light fill-primary-light" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-cream/60 text-sm font-medium mt-1">2,500+ happy customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
