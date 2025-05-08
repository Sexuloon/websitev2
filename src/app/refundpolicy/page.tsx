'use client';

import Footer from '@/components/footer';
import Navbar from '@/components/view/Navbar';

const ReturnPolicy = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Navbar */}
      <div className="w-full fixed top-0 left-0 z-50">
        <Navbar />
      </div>

      {/* Page Content */}
      <div className="pt-24 pb-16 px-4 sm:px-10 md:px-20 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            Return & Refund Policy
          </h1>

          <p className="mb-6 text-lg leading-relaxed">
            At <span className="italic font-semibold">Sexuloon</span>, we aim to ensure your satisfaction and trust in every interaction. If, for any reason, you are not completely satisfied with your purchase, we offer a simple and hassle-free refund process.
          </p>

          {/* Refund Eligibility */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Refund Eligibility</h2>
            <p>
              Refunds are eligible under the following conditions:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Damaged, defective, or incorrect products received.</li>
              <li>Product not delivered within the committed timeline.</li>
              <li>Product not as described or does not match the specifications.</li>
            </ul>
            <p className="mt-2">
              Requests must be made within <span className="font-medium">48 hours</span> of receiving the product.
            </p>
          </div>

          {/* Refund Process */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Refund Process</h2>
            <p>
              You can raise a refund request by contacting our support via email or live chat. Once the issue is verified and approved:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>The refund will be <span className="font-medium">processed within 3–4 business days</span>.</li>
              <li>You will be notified via email regarding the refund status.</li>
            </ul>
          </div>

          {/* Refund Credit Duration */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Refund Credit Duration</h2>
            <p>
              The refunded amount will be credited to your original payment method or source within <span className="font-medium">5–7 business days</span> after processing.
            </p>
          </div>

          {/* Non-Refundable Products */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Non-Refundable Items</h2>
            <p>To maintain hygiene and safety, the following items are not eligible for return or refund:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Used personal wellness or intimate hygiene products.</li>
              <li>Opened or tampered packaging.</li>
              <li>Items marked as “Final Sale.”</li>
            </ul>
          </div>

          {/* Cancellations */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Cancellations</h2>
            <p>
              Orders can be cancelled within <span className="font-medium">1 hour</span> of placement or before the order is shipped, whichever is earlier. Once dispatched, cancellations are not possible.
            </p>
          </div>

          {/* Contact Support */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-2">Contact Support</h2>
            <p>
              For refund-related queries, email us at: <br />
              <span className="text-blue-600 font-medium">📩 support@sexuloon.com</span>
            </p>
          </div>

          <p className="text-center text-lg font-medium text-gray-700">
            Thank you for choosing <span className="italic font-semibold">Sexuloon</span> – Empowering Men’s Wellness with Confidentiality & Care.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReturnPolicy;
