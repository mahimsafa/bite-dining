import { useState } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import ParallaxSection from '../ParallaxSection/ParallaxSection';
import ParallaxCard from '../ParallaxCard/ParallaxCard';

interface Review {
  id: number;
  name: string;
  image: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  { id: 1, name: 'Sarah Johnson', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', rating: 5, text: 'Amazing food and excellent service! The pasta was absolutely delicious. Will definitely come back again.' },
  { id: 2, name: 'Michael Chen', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', rating: 5, text: 'Best restaurant in town! The ambiance is perfect for a family dinner. Great experience overall.' },
  { id: 3, name: 'Emily Davis', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', rating: 5, text: 'The staff was very friendly and the food exceeded our expectations. Will be back soon!' },
  { id: 4, name: 'James Wilson', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', rating: 4, text: 'Wonderful ambiance and great food. The chef really knows how to balance flavors. Highly recommend!' },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <ParallaxSection className="py-24 md:py-32 bg-cream" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block border border-primary/40 text-primary px-5 py-2 rounded-full text-xs font-semibold mb-5 tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-charcoal">
            What Our Guests Say
          </h2>
          <p className="mt-4 text-taupe max-w-2xl mx-auto text-lg">
            Real reviews from our valued guests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {visibleReviews.map((review) => (
            <ParallaxCard
              key={review.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
            >
              <FaQuoteRight className="absolute top-6 right-6 w-10 h-10 text-primary/10" />

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border-4 border-cream shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-charcoal">{review.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-3.5 h-3.5 ${i < review.rating ? 'text-primary fill-primary' : 'text-taupe/30'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-taupe leading-relaxed text-sm">"{review.text}"</p>
            </ParallaxCard>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-white border border-taupe/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all shadow-sm text-charcoal"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary w-8' : 'bg-taupe/30 w-2 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-white border border-taupe/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all shadow-sm text-charcoal"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </ParallaxSection>
  );
}
