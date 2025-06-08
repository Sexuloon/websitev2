'use client';

import Image from 'next/image';

const Footer = () => {
  return (
    <div className="w-full">
      <footer className="bg-gray-900 text-white w-full py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div>
              <Image
                src="/logo-white.png"
                alt="Sexuloon Logo"
                width={150}
                height={50}
                className="object-contain mb-4"
              />
              <p className="text-gray-400 mb-4">
                Empowering men&apos;s sexual health with medically proven solutions and personalized care.
              </p>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="...FACEBOOK_PATH..." />
                  </svg>
                </a>
                {/* Twitter */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="...TWITTER_PATH..." />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="...INSTAGRAM_PATH..." />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Consultations</a></li>
                <li><a href="/aboutus" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="/contactus" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>

            {/* Conditions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Conditions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Erectile Dysfunction</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Premature Ejaculation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Low Testosterone</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Hair Loss</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Performance Anxiety</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy&policy" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms&conditions" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/refundpolicy" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="/Refund&ReplacementPolicy" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">
                    Refund & Replacement Policy
                  </a>
                </li>
                <li>
                  <a href="/ShippingPolicy" className="text-gray-400 text-sm hover:text-white transition-colors duration-200">
                    Shipping Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Sexuloon. All rights reserved.
          </div>

          {/* Legal Links Section */}
          {/* <div className="border-t border-gray-800 mt-12 pt-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Sexuloon. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
                <a
                  href="/privacy&policy"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms&conditions"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Terms & Conditions
                </a>
                <a
                  href="/refundpolicy"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Refund Policy
                </a>
                <a
                  href="/Refund&ReplacementPolicy"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Refund & Replacement Policy
                </a>
                <a
                  href="/ShippingPolicy"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Shipping Policy
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
