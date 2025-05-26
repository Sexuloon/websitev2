

const ShippingPolicy = () => {
  return (
    <div className="bg-white text-gray-800">

      {/* Page Content */}
      <div className="pt-24 pb-16 px-4 sm:px-10 md:px-20 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
            Shipping Policy
          </h1>

          <p className="mb-6 text-lg leading-relaxed">
            At <span className="font-semibold italic">Sexuloon</span>, we prioritize your privacy and satisfaction. Every order is packed and shipped with discretion, care, and speed.
          </p>

          {/* Processing Time */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Processing Time</h2>
            <p>
              All orders are processed within <span className="font-medium">24–48 hours</span> of confirmation, excluding Sundays and public holidays.
            </p>
          </div>

          {/* Delivery Duration */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Delivery Duration</h2>
            <p>
              Once shipped, your order will typically arrive within <span className="font-medium">4–7 business days</span>, depending on your location and courier availability.
            </p>
          </div>

          {/* Shipping Coverage */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Shipping Coverage</h2>
            <p>
              We currently ship across all major cities and towns in India. For remote areas, delivery times may slightly vary.
            </p>
          </div>

          {/* Discreet Packaging */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Discreet Packaging</h2>
            <p>
              Your privacy is our priority. All orders are shipped in plain packaging with no mention of the product or brand on the outside.
            </p>
          </div>

          {/* Order Tracking */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Order Tracking</h2>
            <p>
              You will receive a tracking link via email once your order is dispatched. Please allow up to 24 hours for tracking to become active.
            </p>
          </div>

          {/* Shipping Charges */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Shipping Charges</h2>
            <p>
              We offer <span className="font-medium">free shipping</span> on all prepaid orders. A nominal fee may apply for COD services based on your location.
            </p>
          </div>

          {/* Support Info */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
            <p>
              For any support or inquiries, feel free to reach out to us at: <br />
              <span className="text-blue-600 font-medium">📩 support@sexuloon.com</span>
            </p>
          </div>

          <p className="text-center text-lg font-medium text-gray-700">
            Thank you for trusting <span className="italic font-semibold">Sexuloon</span> – Empowering Men’s Wellness with Confidentiality & Care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
