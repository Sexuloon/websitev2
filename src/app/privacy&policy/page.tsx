"use client";

import Image from "next/image";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto mt-20 px-6 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
          Privacy Policy
        </h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At <strong>Sexuloon</strong>, your privacy is our top priority. We
              are committed to maintaining the confidentiality and protection of
              your personal and medical information. This Privacy Policy
              explains the types of data we collect, how we use and protect it,
              and your rights regarding your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We collect necessary details such as your name, contact number,
              email, address, and health-related information strictly for
              fulfilling services. This information is used for providing
              consultations, processing orders, and improving our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The personal information we collect is used solely for the purpose
              of delivering services and fulfilling your orders. This includes:
              <ul className="list-disc list-inside text-lg text-gray-600 leading-relaxed">
                <li>
                  Providing personalized consultations and wellness advice.
                </li>
                <li>Processing your product orders and medical services.</li>
                <li>
                  Improving our website functionality and user experience.
                </li>
                <li>
                  Complying with legal obligations and industry regulations.
                </li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Data Security
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              All consultations, orders, and medical history details are
              encrypted and stored securely. We implement a variety of security
              measures to ensure the protection of your personal and medical
              data from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Sharing Your Information
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Information is not shared with third-party entities except for
              essential functions like:
              <ul className="list-disc list-inside text-lg text-gray-600 leading-relaxed">
                <li>Order fulfillment (e.g., shipping providers).</li>
                <li>
                  Legal obligations (e.g., compliance with laws or court
                  orders).
                </li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Your Rights
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              You have the right to access, correct, and delete your personal
              data. You may also request a copy of the information we hold about
              you. To exercise these rights, please contact us at{" "}
              <strong>support@sexuloon.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Cookies and Tracking Technologies
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We may use cookies and similar tracking technologies to enhance
              your experience on our website. These technologies help us analyze
              trends, track user activity, and improve our platform. You can
              control the use of cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Data Retention
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We retain your personal information only for as long as necessary
              to provide services and comply with legal obligations. Once the
              information is no longer needed, it will be securely deleted or
              anonymized.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page, and we will notify you if there are
              significant changes to how your information is used. Please review
              this policy regularly to stay informed about our data practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              10. Contact Information
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              If you have any questions or concerns about our Privacy Policy, or
              if you wish to exercise your rights under this policy, please
              contact us at <strong>support@sexuloon.com</strong>.
            </p>
          </section>
        </div>
      </div>

      <div className="w-full min-w-full max-w-full">
        <footer className="bg-gray-900 text-white w-full py-12 sm:py-16">
          <div className="container mx-auto px-4 w-full sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2 lg:col-span-1">
                <Image
                  src="/logo-white.png"
                  alt="Sexuloon Logo"
                  width={150}
                  height={50}
                  className="object-contain mb-4"
                />
                <p className="text-gray-400 mb-4">
                  Empowering men&apos;s sexual health with medically proven
                  solutions and personalized care.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Products
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Consultations
                    </a>
                  </li>
                  <li>
                    <a
                      href="aboutus"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="contactus"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Conditions</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Erectile Dysfunction
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Premature Ejaculation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Low Testosterone
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Hair Loss
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Skin Care
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                <p className="text-gray-400 mb-4">
                  Subscribe to our newsletter for the latest news and offers.
                </p>
                <form className="space-y-2">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-4 py-2 rounded-l-lg focus:outline-none text-gray-900"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Sexuloon. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="privacy&policy"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="terms&conditions"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Terms & Conditions
                </a>
                <a
                  href="refundpolicy"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Refund Policy
                </a>
                <a
                  href="Refund&ReplacementPolicy"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Refund & Replacement Policy
                </a>
                <a
                  href="ShippingPolicy"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Shipping Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
