import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold font-manrope text-indigo-700 tracking-tight md:text-6xl">Contact Us</h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're here to help with our advanced Point of Sale system for phone and accessory retail. Get in touch for support, inquiries, or demos.
          </p>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold font-manrope text-indigo-700 mb-6">Get in Touch</h2>

            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Address
              </h3>
              <p className="text-gray-600">
                123 ABC Street, District 1<br />
                Ho Chi Minh City, Vietnam<br />
                Postal Code: 700000
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Phone
              </h3>
              <p className="text-gray-600">+84 28 1234 5678 (Sales)</p>
              <p className="text-gray-600">+84 28 8765 4321 (Support)</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </h3>
              <p className="text-gray-600">support@posretail.vn</p>
              <p className="text-gray-600">sales@posretail.vn</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hours
              </h3>
              <p className="text-gray-600">Mon-Fri: 8 AM - 6 PM</p>
              <p className="text-gray-600">Sat: 9 AM - 4 PM</p>
              <p className="text-gray-600">Sun: Closed</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
          >
            <h2 className="text-3xl font-bold font-manrope text-indigo-700 mb-6">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 bg-gray-50"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 font-medium"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-8"
        >
          <h2 className="text-3xl font-bold font-manrope text-indigo-700 text-center mb-6">Watch Our POS System Demo</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            See how our Point of Sale system streamlines retail operations for phone stores with features like barcode scanning and real-time reporting.
          </p>
          <div className="relative max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden group">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/P1L9uZVkRtM"
                title="POS Nation Retail Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M6.5 5.5v9l6-4.5-6-4.5z" />
              </svg>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold font-manrope text-indigo-700 text-center mb-8">Our Locations</h2>
          <p className="text-center text-gray-600 mb-8 max-w-4xl mx-auto">
            Visit one of our stores equipped with advanced POS systems across major cities in Vietnam.
          </p>
          <div className="h-96 rounded-2xl overflow-hidden shadow-2xl relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447219902048!2d106.62966371480091!3d10.823098892287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="transition-all duration-500 group-hover:scale-105"
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Contact;