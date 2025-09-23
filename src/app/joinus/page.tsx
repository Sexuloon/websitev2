"use client";

import { useState } from "react";

export default function DoctorRegistrationForm() {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);
  const [panPreview, setPanPreview] = useState<string | null>(null);
  const [aadhaarPreview, setAadhaarPreview] = useState<string | null>(null);

  // File preview handler
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (url: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted! 🚀 (Here you’ll connect backend logic)");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Doctor Registration Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ========== Basic Personal Info ========== */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Basic Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="border p-2 rounded w-full"
            />
            <select required className="border p-2 rounded w-full">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              type="date"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="border p-2 rounded w-full"
            />
            <textarea
              placeholder="Residential Address"
              required
              className="border p-2 rounded w-full md:col-span-2"
            ></textarea>

            {/* Profile photo upload */}
            <div className="md:col-span-2">
              <label className="block mb-2">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setProfilePhoto)}
                className="border p-2 rounded w-full"
              />
              {profilePhoto && (
                <img
                  src={profilePhoto}
                  alt="Profile Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-full"
                />
              )}
            </div>
          </div>
        </section>

        {/* ========== Professional Credentials ========== */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Professional Credentials</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Medical Registration Number"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Qualification"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Years of Experience"
              required
              className="border p-2 rounded w-full"
            />
            <textarea
              placeholder="Specialization"
              required
              className="border p-2 rounded w-full md:col-span-2"
            ></textarea>

            <div>
              <label className="block mb-2">Upload Degree Certificate (Optional)</label>
              <input
                type="file"
                accept="image/*,.pdf"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block mb-2">Upload Practice License (Required)</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => handleFileChange(e, setLicensePreview)}
                className="border p-2 rounded w-full"
              />
              {licensePreview && (
                <img
                  src={licensePreview}
                  alt="License Preview"
                  className="mt-2 w-40 h-32 object-cover rounded"
                />
              )}
            </div>
          </div>
        </section>

        {/* ========== Consultation Preferences ========== */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Consultation Preferences</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <fieldset className="md:col-span-2">
              <legend className="font-medium mb-2">Consultation Days</legend>
              <div className="flex flex-wrap gap-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <label key={day} className="flex items-center gap-2">
                    <input type="checkbox" value={day} />
                    {day}
                  </label>
                ))}
              </div>
            </fieldset>

            <select required className="border p-2 rounded w-full">
              <option value="">Select Consultation Mode</option>
              <option>In-person</option>
              <option>Online</option>
              <option>Both</option>
            </select>

            <input
              type="number"
              placeholder="Fee Per Consultation"
              required
              className="border p-2 rounded w-full"
            />
          </div>
        </section>

        {/* ========== Banking & Payment Details ========== */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Banking & Payment Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Bank Account Number"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="IFSC Code"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="UPI ID (Optional)"
              className="border p-2 rounded w-full md:col-span-2"
            />
          </div>
        </section>

        {/* ========== Compliance & Legal ========== */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Compliance & Legal</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Upload PAN Card</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => handleFileChange(e, setPanPreview)}
                className="border p-2 rounded w-full"
              />
              {panPreview && (
                <img
                  src={panPreview}
                  alt="PAN Preview"
                  className="mt-2 w-40 h-32 object-cover rounded"
                />
              )}
            </div>

            <div>
              <label className="block mb-2">Upload Aadhaar Card</label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => handleFileChange(e, setAadhaarPreview)}
                className="border p-2 rounded w-full"
              />
              {aadhaarPreview && (
                <img
                  src={aadhaarPreview}
                  alt="Aadhaar Preview"
                  className="mt-2 w-40 h-32 object-cover rounded"
                />
              )}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" required /> I agree to terms & conditions
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" required /> I consent to share details with
              patients
            </label>
          </div>
        </section>

        {/* ========== Optional Bio ========== */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Optional Introduction</h3>
          <textarea
            placeholder="Write a short bio/introduction about yourself..."
            className="border p-2 rounded w-full"
          ></textarea>
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Save / Submit
        </button>
      </form>
    </div>
  );
}
