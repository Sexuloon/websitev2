"use client";
import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // You can integrate your backend or email API here
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a3b3e8] via-white to-[#9fb4ed] text-gray-800">
      {/* Form Container */}
      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Get in Touch</h1>
        <p className="text-center text-gray-600 mb-10">
          We are here to assist you. Feel free to reach out with any inquiries
          or feedback.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl px-6 py-8 space-y-6"
        >
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium mb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-colors"
          >
            Send Message
          </button>

          {submitted && (
            <p className="text-green-600 text-center font-medium mt-4">
              Thank you for contacting us! We all get back to you shortly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
