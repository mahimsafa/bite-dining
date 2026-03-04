import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import ParallaxSection from '../ParallaxSection/ParallaxSection';
import ParallaxCard from '../ParallaxCard/ParallaxCard';

export default function AppDownload() {
  return (
    <ParallaxSection className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative flex justify-center order-2 lg:order-1">
            <ParallaxCard className="relative bg-espresso rounded-3xl p-6 shadow-2xl w-full max-w-sm">
              <div className="relative mx-auto max-w-[220px]">
                <div className="bg-espresso rounded-[2.5rem] p-3 pb-6 shadow-xl border-4 border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=550&fit=crop"
                    alt="Bites Mobile App"
                    className="w-full rounded-[2rem] object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-primary text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-md">
                  New v2.0
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { value: '4.9', label: 'App Rating' },
                  { value: '1M+', label: 'Downloads' },
                  { value: '100+', label: 'Countries' },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-white/8 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold font-display text-primary">{value}</p>
                    <p className="text-xs text-taupe mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </ParallaxCard>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
              Mobile App
            </span>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal leading-tight">
              Order Anywhere,<br />Anytime
            </h2>
            <p className="mt-6 text-taupe text-lg leading-relaxed">
              Get the best experience by downloading our app. Order food, make reservations, and earn rewards — all at your fingertips.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="group bg-espresso text-cream px-6 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5">
                <FaApple className="text-3xl" />
                <div className="text-left">
                  <p className="text-xs text-cream/60">Download on the</p>
                  <p className="font-bold">App Store</p>
                </div>
              </button>
              <button className="group bg-espresso text-cream px-6 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5">
                <FaGooglePlay className="text-2xl" />
                <div className="text-left">
                  <p className="text-xs text-cream/60">Get it on</p>
                  <p className="font-bold">Google Play</p>
                </div>
              </button>
            </div>

            <button className="mt-10 inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all group">
              Learn More About the App
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
}
