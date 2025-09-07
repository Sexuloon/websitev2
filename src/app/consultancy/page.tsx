import React from "react";
import { Calendar, Stethoscope, Clock } from "lucide-react";

function Page() {
  return (
    <div className="bg-gray-50 flex flex-col lg:flex-row items-center justify-center px-6 py-12 gap-10">
      {/* Left Section (Image) */}
      <div className="w-full lg:w-1/2">
        <img
          src="https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg"
          alt="Doctor Consultation"
          className="rounded-xl shadow-md w-full object-cover"
        />
      </div>

      {/* Right Section (Content) */}
      <div className="w-full lg:w-1/2 p-6 lg:p-10">
        {/* Header */}
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start mb-4">
            <Stethoscope className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Connect with Top Doctors
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Schedule a consultation in just a few minutes — anytime, anywhere.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-lg border border-gray-200 bg-white hover:shadow-md transition">
            <Stethoscope className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Expert Doctors
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Verified specialists across multiple fields.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 bg-white hover:shadow-md transition">
            <Calendar className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Easy Scheduling
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Book appointments with just a few clicks.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 bg-white hover:shadow-md transition">
            <Clock className="w-8 h-8 text-indigo-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">Save Time</h3>
            <p className="text-sm text-gray-600 mt-1">
              Quick access to trusted medical advice.
            </p>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 text-center lg:text-left">
          <p className="text-xl font-semibold text-gray-800">🚀 Coming Soon</p>
          <p className="text-gray-600 mt-2">
            Join our waitlist and be the first to know when we launch.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center lg:items-start gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition w-full sm:w-auto">
              Join Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
