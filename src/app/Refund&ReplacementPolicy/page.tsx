const ReturnReplacementPolicy = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Navbar */}
      <div className="w-full fixed top-0 left-0 z-50"></div>

      {/* Page Content */}
      <div className="pt-24 pb-16 px-4 sm:px-10 md:px-20 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            Return & Replacement Policy
          </h1>

          <p className="mb-6 text-lg leading-relaxed">
            At <span className="italic font-semibold">Sexuloon</span>, we stand
            by the quality and integrity of every product and service we offer.
            However, if you receive a defective or incorrect item, we are
            committed to resolving the issue quickly and smoothly.
          </p>

          {/* Eligibility for Return or Replacement */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Eligibility</h2>
            <p>
              Returns or replacements are eligible under the following
              conditions:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Item received is damaged, defective, or expired.</li>
              <li>
                Incorrect product delivered (wrong item, size, or quantity).
              </li>
              <li>Product is materially different from the description.</li>
            </ul>
            <p className="mt-2">
              Requests must be raised within{" "}
              <span className="font-medium">7 days of product delivery</span>.
            </p>
          </div>

          {/* Return/Replacement Process */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Return/Replacement Process
            </h2>
            <p>To initiate a return or replacement, follow these steps:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                Contact our support team via email or chat within 7 days of
                delivery.
              </li>
              <li>
                Provide your order number, product details, and a brief
                explanation with images (if applicable).
              </li>
              <li>
                Our support team will validate your request and initiate the
                return or replacement accordingly.
              </li>
            </ul>
          </div>

          {/* Completion Timeline */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Completion Timeline</h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                The return or replacement will be{" "}
                <span className="font-medium">
                  processed within 3–4 business days
                </span>{" "}
                after approval.
              </li>
              <li>
                Replacement products will be{" "}
                <span className="font-medium">
                  delivered within 4–7 business days
                </span>{" "}
                from processing.
              </li>
            </ul>
          </div>

          {/* Product Condition & Packaging */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              Product Condition & Packaging
            </h2>
            <p>Returned products must be:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Unopened and in their original packaging.</li>
              <li>Accompanied by the invoice and order number.</li>
              <li>Not used or tampered with in any way.</li>
            </ul>
            <p className="mt-2">
              Returns that do not meet these criteria will not be accepted.
            </p>
          </div>

          {/* Non-Returnable Items */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Non-Returnable Items</h2>
            <p>
              To ensure hygiene and safety, the following items are not eligible
              for return or replacement:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Used or opened personal wellness products.</li>
              <li>Products with missing original packaging or accessories.</li>
              <li>Items marked as “Final Sale” or discounted clearance.</li>
            </ul>
          </div>

          {/* Support Contact */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-2">Need Assistance?</h2>
            <p>
              Reach out to us at: <br />
              <span className="text-blue-600 font-medium">
                📩 support@sexuloon.com
              </span>
            </p>
          </div>

          <p className="text-center text-lg font-medium text-gray-700">
            Thank you for choosing{" "}
            <span className="italic font-semibold">Sexuloon</span> - Empowering
            Men&apos;s Wellness with Confidentiality & Care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnReplacementPolicy;
