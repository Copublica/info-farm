'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, content, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors group"
      >
        <span className="text-lg font-semibold text-gray-900 pr-6">{title}</span>
        <ChevronDown
          className={`w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-all duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 pb-8 text-gray-600 leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
}

export default function Terms() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const accordionItems = [
    {
      title: "1. Introduction",
      content: "Welcome to Indo-Farms. By accessing our website or placing an order, you agree to be fully bound by these Terms & Conditions. Please read them carefully before making any purchase. If you do not agree with any part of these terms, you must refrain from using our services. These terms apply to all visitors, customers, and users of Indo-Farms' website and services, and constitute a legally binding agreement between you and Indo-Farms, operating under the laws of the Province of Ontario, Canada."
    },
    {
      title: "2. Payment Authorization & Fraud Disclaimer",
      content: "By completing a purchase on our platform, you confirm and warrant that you are the authorized holder of the payment method used, or that you have explicit permission from the cardholder to make this transaction. Indo-Farms cannot verify the identity of the cardholder at the time of transaction. In the event of unauthorized card use, fraudulent transactions, or payment disputes filed by the actual cardholder, Indo-Farms will not issue a refund, reversal, or replacement for the affected order. All such disputes must be resolved directly between the customer and their financial institution. Customers are solely responsible for ensuring their payment credentials are used only with their own authorization."
    },
    {
      title: "3. Product Descriptions & Visual Accuracy",
      content: "All product images displayed on our website are for illustrative purposes only. Due to the natural origin of our products — including stones, crystals, and dry fruits — each item is unique and may vary in size, shape, colour, texture, pattern, or weight from what is shown. Natural stones and crystals are formed over thousands of years and carry inherent variations that cannot be replicated. Similarly, dry fruit products may vary in appearance depending on the batch, season, and supplier. These variations are characteristic of natural goods and do not constitute a defect. By placing an order, you acknowledge and accept this inherent variability."
    },
    {
      title: "4. Disclaimer — No Metaphysical or Health Claims",
      content: "Indo-Farms sells luck stones, crystals, and gemstones strictly as decorative, aesthetic, and collectible showpieces only. We make no representations, warranties, or claims — express or implied — that any stone, crystal, or gemstone sold through our platform will change or influence a customer's luck, fortune, or destiny; provide spiritual, emotional, psychological, or physical healing; or alter life circumstances or outcomes in any way. Any beliefs regarding the metaphysical properties of stones are personal and cultural in nature. Purchasing our products is entirely at your own discretion and risk. These products should not be used as a substitute for professional medical, psychological, financial, or legal advice. Similarly, dry fruit products are sold as food items only and are not intended to diagnose, treat, cure, or prevent any health condition."
    },
    {
      title: "5. Food Safety & Allergen Notice",
      content: "Our dry fruit products may contain or have been processed in facilities that also handle tree nuts, peanuts, sesame, gluten, dairy, and sulphites. Indo-Farms cannot guarantee the absence of cross-contamination. Customers with known food allergies or dietary restrictions are strongly advised to consult their healthcare provider before purchasing. Always check product labelling upon receipt. Dry fruit products must be stored as indicated on the packaging. Indo-Farms is not liable for any adverse health effects resulting from improper storage, consumption past the best-before date, or failure to review allergen information."
    },
    {
      title: "6. Products and Pricing",
      content: "All products, including natural dry fruits and stones, are subject to availability. Prices are listed in Canadian Dollars (CAD) and are clearly displayed on the site. Applicable taxes including HST will be charged as required by the Province of Ontario. Prices are subject to change without notice. Indo-Farms reserves the right to cancel or refuse any order due to product unavailability or pricing errors. In such cases, a full refund will be issued to the original payment method within 5–10 business days."
    },
    {
      title: "7. Shipping and Delivery",
      content: "Indo-Farms currently ships within Canada. We aim to dispatch items within 1–3 business days of payment confirmation. Delivery times vary based on your location and the selected shipping method. Indo-Farms is not responsible for delays caused by courier services, weather conditions, or other circumstances beyond our control. Customers are responsible for providing a correct and complete delivery address. Indo-Farms will not be liable for failed deliveries due to incorrect address information provided at checkout."
    },
    {
      title: "8. Returns",
      content: "Returns are accepted within 14 days of the confirmed delivery date for unused, undamaged products in their original packaging. Please contact us before sending any item back. For gemstones sold with a certificate, the original certificate must be returned alongside the product. Perishable dry fruit products are non-returnable once delivered, unless they arrived damaged or incorrect. Refunds will be issued to the original payment method within 7–10 business days upon receipt and inspection of the returned item. Return shipping costs are the responsibility of the customer unless the return is due to our error."
    },
    {
      title: "9. Governing Law & Dispute Resolution",
      content: "These Terms & Conditions are governed by and construed in accordance with the laws of the Province of Ontario and the applicable federal laws of Canada, including the Ontario Consumer Protection Act, 2002. Any dispute arising out of or in connection with these terms shall first be attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts of Ontario."
    },
    {
      title: "10. Privacy & Personal Information",
      content: "Indo-Farms collects and processes personal information in accordance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable Ontario privacy legislation. Information collected during your visit or purchase is used solely for the purpose of fulfilling your order and improving our services. We do not sell, rent, or share your personal data with third parties except as required to process your order (e.g., payment processors, courier services). By using our website, you consent to our data practices as described above."
    },
    {
      title: "11. Age of Majority",
      content: "By using our website and placing an order, you confirm that you are at least 18 years of age, the age of majority in the Province of Ontario. Indo-Farms does not knowingly collect information from or sell to individuals under the age of 18."
    },
    {
      title: "12. Changes to Terms",
      content: "Indo-Farms reserves the right to update or modify these Terms & Conditions at any time without prior notice. Changes will be posted on this page with an updated effective date. Continued use of our website following any changes constitutes your acceptance of the revised terms. If you have any questions, please contact us before making a purchase."
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h2>
          <p className="text-gray-600 text-lg">Please read our terms carefully before making any purchase</p>
        </div>

        <div className="space-y-4">
          {accordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 mt-10">
          © {new Date().getFullYear()} Indo-Farms. All Rights Reserved.
        </div>
      </div>
    </section>
  );
}