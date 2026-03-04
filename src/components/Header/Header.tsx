import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = ['About', 'Menu', 'Reviews', 'Blog', 'Contacts'];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-cream/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-extrabold text-charcoal tracking-tight cursor-pointer">
              <span className="text-primary">B</span>ites
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="px-4 py-2 text-charcoal/80 hover:text-primary font-medium transition-colors rounded-lg hover:bg-primary/5"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <button className="bg-primary text-white px-7 py-3 rounded-full font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5">
              Reserve Table
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal p-2 hover:bg-primary/10 rounded-lg transition-colors"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-cream/98 backdrop-blur-md shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block text-charcoal font-medium py-3 px-4 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}
            <button className="w-full bg-primary text-white px-6 py-3 rounded-full font-semibold mt-4 hover:bg-primary/90 transition-all">
              Reserve Table
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
