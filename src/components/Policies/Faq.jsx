import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What materials are used in your ceramic products?",
    answer:
      "All our products are crafted from premium-grade, lead-free stoneware ceramics, ensuring durability and food safety.",
  },
  {
    question: "Are the mugs and cups microwave safe?",
    answer:
      "Yes, all our mugs and cups are microwave and dishwasher safe unless otherwise stated in the product description.",
  },
  {
    question: "Can I use the dinnerware in the oven?",
    answer:
      "Most of our dinnerware is oven safe up to 200°C. Always check the specific product details before use.",
  },
  {
    question: "Are your bowls resistant to scratches?",
    answer:
      "Yes, our bowls are glazed with a high-quality finish that resists scratches from cutlery and daily use.",
  },
  {
    question: "Do you sell complete dinner sets?",
    answer:
      "Yes, we offer complete dinner sets that include plates, bowls, and mugs — available in multiple color themes.",
  },
  {
    question: "What is the difference between stoneware and porcelain?",
    answer:
      "Stoneware is thicker and more durable for everyday use, while porcelain is lighter and more refined for special occasions.",
  },
  {
    question: "Are your plates stackable?",
    answer:
      "Yes, our plates are designed for easy stacking, saving storage space and preventing chipping.",
  },
  {
    question: "Do your jars have airtight lids?",
    answer:
      "Yes, all storage jars come with silicone-sealed lids to ensure airtight freshness for dry ingredients.",
  },
  {
    question: "Can I buy individual items instead of sets?",
    answer:
      "Absolutely! Most of our dinnerware and drinkware pieces can be purchased individually or as part of a set.",
  },
  {
    question: "How should I clean matte-finish ceramics?",
    answer:
      "Handwash matte-finish ceramics using mild soap and a soft sponge. Avoid abrasive scrubbers to preserve the texture.",
  },
  {
    question: "Do your serveware products come with serving spoons?",
    answer:
      "Some serveware items include matching spoons; check the product description for details before purchasing.",
  },
  {
    question: "Are the products handmade?",
    answer:
      "Yes, many of our items are handmade by skilled artisans, making each piece unique.",
  },
  {
    question: "Why do some items have slight variations in color or shape?",
    answer:
      "These variations are natural and add to the charm of handmade ceramic craftsmanship.",
  },
  {
    question: "Can I put my ceramic bowl in the freezer?",
    answer:
      "Yes, our stoneware bowls can be safely used in the freezer, but avoid sudden temperature changes.",
  },
  {
    question: "What is the best way to remove stains from ceramics?",
    answer:
      "Use baking soda and warm water paste for stubborn stains. Avoid harsh chemicals or steel wool.",
  },
  {
    question: "Do you offer bulk or wholesale orders?",
    answer:
      "Yes, we cater to bulk and wholesale purchases. Contact our sales team for custom quotes.",
  },
  {
    question: "Can I customize my dinner set?",
    answer:
      "Yes, customization is available for color, design, or logo printing on selected items.",
  },
  {
    question: "Are your ceramics lead-free?",
    answer: "Absolutely! All our products are made from 100% lead-free and non-toxic materials.",
  },
  {
    question: "Do you deliver fragile items safely?",
    answer:
      "Yes, every item is carefully bubble-wrapped and shipped in reinforced boxes for safe delivery.",
  },
  {
    question: "What happens if my item arrives broken?",
    answer:
      "If your item arrives damaged, contact our support team within 48 hours with photos for a free replacement.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. International delivery charges are calculated at checkout.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, once your order is shipped, you’ll receive a tracking link via email or SMS.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Domestic orders are typically delivered within 5–7 working days. International orders may take 10–15 days.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes, we accept returns and exchanges within 7 days of delivery, provided the item is unused and in original packaging.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit/debit cards, UPI, Paytm, and Net Banking. Cash on Delivery is also available in select locations.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Yes, we provide elegant gift wrapping options at checkout for special occasions.",
  },
  {
    question: "Can I include a personalized note with my order?",
    answer:
      "Yes, you can add a custom message during checkout which we’ll include in your package.",
  },
  {
    question: "Do your products contain any plastic?",
    answer:
      "No, our ceramics are completely plastic-free and eco-friendly.",
  },
  {
    question: "Are your glazes food safe?",
    answer:
      "Yes, all glazes used in our ceramics are food safe, lead-free, and tested for daily use.",
  },
  {
    question: "Do you restock sold-out items?",
    answer:
      "Yes, we frequently restock popular products. You can subscribe to back-in-stock alerts on the product page.",
  },
  {
    question: "Do you have collections for festive gifting?",
    answer:
      "Yes, we curate seasonal and festive gift collections featuring our best-selling serveware and drinkware.",
  },
  {
    question: "Can I schedule a delivery date?",
    answer:
      "Yes, you can select a preferred delivery date during checkout for special occasions.",
  },
  {
    question: "Do you offer corporate gifting options?",
    answer:
      "Yes, we provide customized ceramic gift boxes for corporate clients and events.",
  },
  {
    question: "Are there color variations in the gray, white, and black collections?",
    answer:
      "Each collection maintains a consistent tone, though handmade variations may slightly differ — that’s their charm.",
  },
  {
    question: "Are your mugs suitable for hot beverages?",
    answer:
      "Yes, our mugs are designed to retain heat while keeping the handle cool to touch.",
  },
  {
    question: "What is the average capacity of your mugs?",
    answer:
      "Most mugs hold between 300ml to 400ml, perfect for coffee, tea, or hot chocolate.",
  },
  {
    question: "Do your cups come in sets?",
    answer:
      "Yes, our cups are available in 2, 4, or 6-piece sets in matching styles.",
  },
  {
    question: "What are your most popular products?",
    answer:
      "Our minimalist matte mugs, dinner sets, and serving platters are customer favorites.",
  },
  {
    question: "Do you offer eco-friendly packaging?",
    answer:
      "Yes, all our packaging is 100% recyclable and eco-conscious.",
  },
  {
    question: "Can I see customer reviews before purchasing?",
    answer:
      "Yes, verified customer reviews are available on each product page.",
  },
  {
    question: "Do your dinner sets include serving bowls?",
    answer:
      "Yes, most dinner sets include serving bowls or platters — details are listed in each product description.",
  },
  {
    question: "How do I remove tea stains from cups?",
    answer:
      "Mix baking soda with warm water and gently scrub to remove tea or coffee stains.",
  },
  {
    question: "Can I pre-order out-of-stock items?",
    answer:
      "Yes, pre-orders are accepted on select upcoming collections.",
  },
  {
    question: "Do you offer discounts on bulk purchases?",
    answer:
      "Yes, bulk purchases qualify for exclusive discounts — contact our sales team for details.",
  },
  {
    question: "Where are your products made?",
    answer:
      "All our ceramics are proudly handcrafted in India by expert potters.",
  },
  {
    question: "Can I visit your studio?",
    answer:
      "Yes, studio visits are available by appointment. Contact us for details.",
  },
  {
    question: "Do you offer replacement parts for broken pieces in sets?",
    answer:
      "Yes, you can purchase individual replacements from most dinner sets and collections.",
  },
  {
    question: "What is your return policy on discounted products?",
    answer:
      "Discounted or clearance items are non-returnable unless damaged on delivery.",
  },
  {
    question: "Do your plates have anti-slip bases?",
    answer:
      "Yes, many of our plates have a textured base for better grip and stability.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-950 text-white py-16 px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-xl p-4 bg-gray-900 transition hover:bg-gray-850"
          >
            <button
              className="flex justify-between items-center w-full text-left focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium text-lg text-gray-200">{faq.question}</span>
              {openIndex === index ? (
                <Minus className="text-gray-400" size={20} />
              ) : (
                <Plus className="text-gray-400" size={20} />
              )}
            </button>
            {openIndex === index && (
              <p className="mt-3 text-gray-400 leading-relaxed">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
