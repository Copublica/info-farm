import React from 'react';

export default function ContactPage() {
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
