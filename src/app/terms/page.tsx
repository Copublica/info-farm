import React from 'react';

export default function TermsPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm text-gray-700 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 mt-6">1. Introduction</h2>
        <p>Welcome to Indo-Farm. By using our website and purchasing our products, you agree to be bound by these terms and conditions.</p>
        
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
