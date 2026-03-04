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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-lg shadow-sm border-b border-taupe/10'
            : 'bg-espresso/75 backdrop-blur-xs bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <h1
                className={`text-4xl font-bold italic font-display cursor-pointer tracking-tight transition-colors ${
                  scrolled ? 'text-charcoal' : 'text-cream'
                }`}
              >
                <span className="text-primary">B</span>ites
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`px-4 py-2 text-sm font-medium uppercase tracking-widest transition-colors rounded-lg ${
                    scrolled
                      ? 'text-charcoal/70 hover:text-primary hover:bg-primary/5'
                      : 'text-cream/90 hover:text-primary-light hover:bg-white/10'
                  }`}
                >
                  {link}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <button className="bg-primary text-white px-7 py-3 rounded-full font-semibold text-sm tracking-wide ring-1 ring-primary/30 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5">
                Reserve Table
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-charcoal hover:bg-primary/10' : 'text-cream hover:bg-white/10'}`}
                aria-label="Open menu"
              >
                <FiMenu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-espresso/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-cream shadow-2xl md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-taupe/15">
          <h2 className="text-2xl font-bold italic font-display text-charcoal">
            <span className="text-primary">B</span>ites
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-charcoal"
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>
        </div>
        <nav className="p-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block py-3 px-4 text-sm font-medium uppercase tracking-widest text-charcoal/70 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
          <div className="pt-6">
            <button className="w-full bg-primary text-white px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-primary-light transition-all">
              Reserve Table
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
