import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/ap/contact/send`,
        formData,
      );

      if (response.data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } else {
        console.error("Contact submit failed:", response.data.message);
        alert(response.data.message || "Unable to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Unable to send message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-sm mb-3">
            Get In Touch
          </p>
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-gray-400">
            Have questions about our jewellery rental service? We'd love to hear
            from you. Reach out to our team and we'll respond as soon as
            possible.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3 mb-16">
          {/* Contact Info Cards */}
          <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-8 shadow-xl shadow-black/30">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-400">contact@velmira.com</p>
            <p className="text-gray-400">support@velmira.com</p>
          </div>

          <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-8 shadow-xl shadow-black/30">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-400">+91 98765 43210</p>
            <p className="text-gray-400">+91 87654 32109</p>
          </div>

          <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-8 shadow-xl shadow-black/30">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-gray-400">ijpadi, Edappal</p>
            <p className="text-gray-400">Kerala, India,679576</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-8 shadow-xl shadow-black/30 md:p-12">
          <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>

          {submitted && (
            <div className="mb-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-emerald-300">
              ✓ Thank you! Your message has been sent successfully. We'll get
              back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-gray-300">
                  Full Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                  placeholder="Your name"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-gray-300">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                  placeholder="your@email.com"
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-300">Phone</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                placeholder="+91 98765 43210"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-300">Subject</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
                placeholder="How can we help?"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-gray-300">Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-3 text-white outline-none transition focus:border-yellow-500 resize-none"
                placeholder="Your message here..."
              ></textarea>
            </label>

            <button
              type="submit"
              className="w-full rounded-2xl bg-yellow-500 px-6 py-4 text-black font-semibold transition hover:bg-yellow-400"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-6">
              <h3 className="font-semibold text-lg mb-2 text-yellow-400">
                How do I book jewellery?
              </h3>
              <p className="text-gray-400">
                Browse our collection, select your desired piece, choose rental
                dates, and complete the booking process. It's that simple!
              </p>
            </div>

            <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-6">
              <h3 className="font-semibold text-lg mb-2 text-yellow-400">
                What is the rental duration?
              </h3>
              <p className="text-gray-400">
                You can rent jewellery from 1 day to 30 days. Custom durations
                are available upon request.
              </p>
            </div>

            <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-6">
              <h3 className="font-semibold text-lg mb-2 text-yellow-400">
                Is there a security deposit?
              </h3>
              <p className="text-gray-400">
                Yes, a refundable security deposit is required at the time of
                booking, which is returned upon successful return.
              </p>
            </div>

            <div className="rounded-3xl border border-yellow-500/10 bg-[#111111] p-6">
              <h3 className="font-semibold text-lg mb-2 text-yellow-400">
                Can I modify my booking?
              </h3>
              <p className="text-gray-400">
                Yes, bookings can be modified up to 24 hours before the rental
                date. Contact our support team for changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
