import { FiCalendar, FiArrowRight, FiPhone, FiAward, FiUsers, FiHeart } from 'react-icons/fi';

export default function ReservationCTA() {
  return (
    <section className="py-28 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop" 
          alt="Restaurant interior"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-5 py-2.5 rounded-full mb-8">
          <FiCalendar />
          <span className="font-semibold">Reserve Now</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Do You Have Any Dinner Plan Today?{' '}
          <span className="text-primary">Reserve Your Table</span>
        </h2>
        <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Book your table now and enjoy an unforgettable dining experience with us. 
          Limited seats available for tonight!
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group bg-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1.5">
            Make Reservation
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="border-2 border-white/30 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-charcoal hover:border-white transition-all flex items-center justify-center gap-3">
            <FiPhone className="w-5 h-5" />
            Call: +1 (555) 123-4567
          </button>
        </div>
        
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAward className="w-7 h-7 text-primary" />
            </div>
            <p className="text-4xl font-bold text-white">15+</p>
            <p className="text-gray-400 mt-2">Years Experience</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUsers className="w-7 h-7 text-primary" />
            </div>
            <p className="text-4xl font-bold text-white">50+</p>
            <p className="text-gray-400 mt-2">Expert Chefs</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all">
            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiHeart className="w-7 h-7 text-primary" />
            </div>
            <p className="text-4xl font-bold text-white">10K+</p>
            <p className="text-gray-400 mt-2">Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
