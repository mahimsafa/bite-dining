import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-espresso pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-3xl font-bold italic font-display text-cream">
              <span className="text-primary">B</span>ites
            </h3>
            <p className="mt-4 text-taupe leading-relaxed text-sm">
              Serving the best food with love and passion. Experience culinary excellence at its finest.
            </p>
            <div className="mt-6 flex gap-3">
              {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/8 border border-white/10 rounded-full flex items-center justify-center text-taupe hover:bg-primary hover:border-primary hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-cream text-xs uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About', 'Menu', 'Reviews', 'Blog', 'Contacts'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-taupe hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-cream text-xs uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-taupe text-sm">
                <FiMapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>123 Food Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-taupe text-sm">
                <FiPhone className="w-4 h-4 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-taupe text-sm">
                <FiMail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@bites.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-cream text-xs uppercase tracking-widest mb-6">Opening Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between text-taupe">
                <span>Mon – Thu</span>
                <span className="text-primary">11am – 10pm</span>
              </li>
              <li className="flex justify-between text-taupe">
                <span>Fri – Sat</span>
                <span className="text-primary">11am – 11pm</span>
              </li>
              <li className="flex justify-between text-taupe">
                <span>Sunday</span>
                <span className="text-primary">12pm – 9pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-taupe/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-taupe text-xs">
              © 2026 Bites Restaurant. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="text-taupe hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-taupe hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-taupe hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
