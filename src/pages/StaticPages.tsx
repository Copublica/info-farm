import React from 'react';

export function About() {
  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">About Indo-Aura</h1>
      <div className="prose prose-amber lg:prose-xl text-gray-700">
        <p className="mb-6">
          Indo-Aura is your premier e-commerce destination for high-quality organic dry fruits, natural wellness foods, and authentic astrology gemstones. We source directly from the finest producers to provide robust, reliable, and authentic goods that bring wellness to your body and soul.
        </p>
        <p className="mb-6">
          Founded heavily on the concept of natural energy and health, we recognized the need for a modern, digital approach to acquiring real, untreated dry fruits and certified gemstones. From premium almonds and walnuts to ethically sourced healing stones, Indo-Aura is committed to delivering excellence.
        </p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Our Vision</h2>
        <p className="mb-6">
          To provide accessible, high-quality spiritual and physical nourishment, fostering a balanced and harmonized lifestyle for future generations.
        </p>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="py-12 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:outline-none" placeholder="How can we help you?"></textarea>
          </div>
          <button type="button" className="w-full bg-amber-700 text-white font-bold py-3 rounded-lg hover:bg-amber-800 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm text-gray-700 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 mt-6">1. Introduction</h2>
        <p>Welcome to Indo-Aura. By using our website and purchasing our products, you agree to be bound by these terms and conditions.</p>
        
        <h2 className="text-xl font-bold text-gray-900 mt-6">2. Products and Pricing</h2>
        <p>All products, including natural dry fruits and stones, are subject to availability. Prices are clearly displayed on the site and are subject to change without notice.</p>
        
        <h2 className="text-xl font-bold text-gray-900 mt-6">3. Shipping and Delivery</h2>
        <p>We aim to dispatch items within 1-2 business days. Delivery times vary based on the shipping address.</p>

        <h2 className="text-xl font-bold text-gray-900 mt-6">4. Returns</h2>
        <p>Returns are accepted within 14 days of purchase for unused, sealed products in original packaging. Certifications for gemstones must be returned alongside the product.</p>
      </div>
    </div>
  );
}
