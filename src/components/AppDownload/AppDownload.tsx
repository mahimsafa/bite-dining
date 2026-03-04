import { FaApple, FaGooglePlay, FaDownload, FaArrowRight } from 'react-icons/fa';

export default function AppDownload() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-charcoal to-charcoal/80 rounded-3xl p-8 shadow-2xl">
              <div className="relative mx-auto max-w-[280px]">
                <div className="bg-charcoal rounded-[3rem] p-4 pb-8 shadow-2xl border-8 border-charcoal/50">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=550&fit=crop"
                    alt="Mobile App"
                    className="w-full rounded-[2.5rem] object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-primary text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  New v2.0
                </div>
              </div>
              
              <div className="mt-8 flex justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px]">
                  <p className="text-2xl font-bold text-primary">4.9</p>
                  <p className="text-xs text-gray-400">App Rating</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px]">
                  <p className="text-2xl font-bold text-primary">1M+</p>
                  <p className="text-xs text-gray-400">Downloads</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center min-w-[100px]">
                  <p className="text-2xl font-bold text-primary">100+</p>
                  <p className="text-xs text-gray-400">Countries</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              Mobile App
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal leading-tight">
              Download Our Mobile App
            </h2>
            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              Get the best experience by downloading our app. Order food, make reservations, and earn rewards - all at your fingertips.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="group bg-charcoal text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1">
                <FaApple className="text-3xl" />
                <div className="text-left">
                  <p className="text-xs opacity-70">Download on the</p>
                  <p className="font-bold">App Store</p>
                </div>
              </button>
              <button className="group bg-charcoal text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-1">
                <FaGooglePlay className="text-2xl" />
                <div className="text-left">
                  <p className="text-xs opacity-70">Get it on</p>
                  <p className="font-bold">Google Play</p>
                </div>
              </button>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <FaDownload className="text-2xl text-primary" />
                <div>
                  <p className="font-semibold text-charcoal">Free Download</p>
                  <p className="text-sm text-gray-500">No credit card required</p>
                </div>
              </div>
            </div>
            
            <button className="mt-6 inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all">
              Learn More About App
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
