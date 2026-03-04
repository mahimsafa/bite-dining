import { FiCalendar, FiArrowRight, FiPhone, FiAward, FiUsers, FiHeart } from 'react-icons/fi';

export default function ReservationCTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=800&fit=crop"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-espresso/78" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-5 py-2.5 rounded-full mb-8">
          <FiCalendar className="w-4 h-4" />
          <span className="font-semibold text-sm tracking-wide">Reserve Now</span>
        </div>

        <h2 className="font-display italic font-bold text-cream leading-tight text-4xl md:text-5xl lg:text-6xl">
          Do You Have A Dinner<br />Plan Tonight?{' '}
          <span className="text-primary-light not-italic">Reserve Your Table</span>
        </h2>

        <p className="mt-6 text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Book your table now and enjoy an unforgettable dining experience with us. Limited seats available for tonight.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3 hover:-translate-y-1">
            Make Reservation
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border-2 border-cream/25 text-cream px-10 py-5 rounded-full font-bold text-lg hover:bg-cream hover:text-charcoal hover:border-cream transition-all flex items-center justify-center gap-3">
            <FiPhone className="w-5 h-5" />
            +1 (555) 123-4567
          </button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: FiAward, value: '15+', label: 'Years Experience' },
            { icon: FiUsers, value: '50+', label: 'Expert Chefs' },
            { icon: FiHeart, value: '10K+', label: 'Happy Customers' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-all">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold font-display text-cream">{value}</p>
              <p className="text-taupe text-sm mt-2">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
