import { useState } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';

interface Review {
  id: number;
  name: string;
  image: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Amazing food and excellent service! The pasta was absolutely delicious. Will definitely come back again. Highly recommended!',
  },
  {
    id: 2,
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Best restaurant in town! The sushi is fresh and the ambiance is perfect for a family dinner. Great experience overall.',
  },
  {
    id: 3,
    name: 'Emily Davis',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Great experience overall. The staff was very friendly and the food exceeded our expectations. Will be back soon!',
  },
  {
    id: 4,
    name: 'James Wilson',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 4,
    text: 'Wonderful ambiance and great food. The chef really knows how to balance flavors. Highly recommend the special menu!',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <section className="py-28 bg-white relative overflow-hidden" id="reviews">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold mb-4 tracking-wide uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Reviews from our valued guests who experienced our hospitality
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleReviews.map((review) => (
              <div
                key={review.id}
                className="bg-cream rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
              >
                <div className="absolute top-6 right-6 text-primary/20">
                  <FaQuoteRight className="w-12 h-12" />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div>
                    <h3 className="font-bold text-charcoal text-lg">{review.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed">"{review.text}"</p>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-primary fill-primary" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="font-bold text-charcoal">Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={prevSlide}
              className="w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all shadow-md"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all shadow-md"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
