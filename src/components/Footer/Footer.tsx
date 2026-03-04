import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-charcoal pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-3xl font-extrabold text-white">
              <span className="text-primary">B</span>ites
            </h3>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Serving the best food with love and passion. Experience culinary excellence at its finest.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                <FiFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                <FiTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                <FiInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
                <FiLinkedin />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About', 'Menu', 'Reviews', 'Blog', 'Contacts'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <FiMapPin className="w-5 h-5 text-primary mt-0.5" />
                <span>123 Food Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiPhone className="w-5 h-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiMail className="w-5 h-5 text-primary" />
                <span>hello@bites.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white text-lg mb-6">Opening Hours</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Thursday</span>
                <span className="text-primary">11am - 10pm</span>
              </li>
              <li className="flex justify-between">
                <span>Friday - Saturday</span>
                <span className="text-primary">11am - 11pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-primary">12pm - 9pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 Bites Restaurant. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
