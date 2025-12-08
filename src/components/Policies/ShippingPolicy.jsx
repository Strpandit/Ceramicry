import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-center text-4xl font-bold text-purple-700 mb-6 pb-4 border-b-4 border-purple-600">
        Shipping & Return Policy
      </h1>

      {/* Shipping Policy */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Shipping Policy</h2>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 border-l-4 border-purple-600 rounded-lg mb-6">
          <p className="font-semibold text-lg mb-2">📦 Processing Time</p>
          <p>Orders are typically processed within 1-3 business days (Monday-Saturday, excluding public holidays and Sundays).</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Shipping Methods & Charges</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-purple-400 pl-4 py-2">
              <p className="font-semibold">Standard Shipping (5-7 business days)</p>
              <p className="text-gray-700">₹500 - Free shipping on orders above ₹10000</p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4 py-2">
              <p className="font-semibold">Express Shipping (2-3 business days)</p>
              <p className="text-gray-700">₹199 - Available in major metros and cities</p>
            </div>
            <div className="border-l-4 border-purple-400 pl-4 py-2">
              <p className="font-semibold">Same Day Delivery (Select Cities Only)</p>
              <p className="text-gray-700">₹299 - Available in Delhi NCR</p>
              <p className="text-sm text-gray-600 italic">Order before 12 PM for same-day delivery</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Serviceable Areas</h3>
          <p className="mb-3">We ship across India to the following:</p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>All major cities and metros</li>
            <li>Tier 2 and Tier 3 cities</li>
            <li>Rural areas (delivery time may vary: 7-10 business days)</li>
            <li>Union Territories including Jammu & Kashmir, Ladakh, Andaman & Nicobar Islands, and Lakshadweep (additional 3-5 days)</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600 italic">
            Note: Remote locations may experience extended delivery times. We'll notify you if your pin code requires additional time.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Packaging & Handling</h3>
          <p className="mb-3">
            All Ceramicry products are carefully packaged to ensure safe transit:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Individual wrapping with bubble wrap for each piece</li>
            <li>Eco-friendly, sturdy corrugated boxes</li>
            <li>Fragile stickers and handling instructions on packages</li>
            <li>Dinner sets and multiple items are securely partitioned</li>
            <li>Cushioning materials to prevent movement during transit</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Order Tracking</h3>
          <p className="mb-3">
            Once your order is dispatched, you will receive:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Shipping confirmation email with tracking number</li>
            <li>SMS updates on order status</li>
            <li>Real-time tracking through our website or courier partner's portal</li>
            <li>Estimated delivery date and time</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Delivery Attempts</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Our courier partners will make up to 3 delivery attempts</li>
            <li>If delivery fails after 3 attempts, the order will be returned to our warehouse</li>
            <li>You will be notified before each delivery attempt via SMS/call</li>
            <li>Return shipping charges (₹99-₹199) will be deducted if order is not received due to customer unavailability</li>
            <li>Please ensure correct address and reachable contact number</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Cash on Delivery (COD)</h3>
          <p className="mb-3">
            COD is available across India with the following terms:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Additional COD handling charges: ₹50 per order</li>
            <li>COD available for orders up to ₹50,000</li>
            <li>Please keep exact change ready for smooth delivery</li>
            <li>COD orders may require additional verification</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 text-sm">
            <li>Delivery times are estimates and may vary due to courier delays, weather conditions, political situations, or force majeure events</li>
            <li>We are not responsible for delays caused by incorrect address or unavailability of recipient</li>
            <li>Please inspect the package for damage before accepting delivery</li>
            <li>GST and all applicable taxes are included in the product price</li>
          </ul>
        </div>
      </section>

      {/* Return & Exchange Policy */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Return & Exchange Policy</h2>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 border-l-4 border-purple-600 rounded-lg mb-6">
          <p className="font-semibold text-lg mb-2">🔄 Return Window</p>
          <p>7 days from the date of delivery for returns and exchanges</p>
          <p className="text-sm text-gray-600 mt-2 italic">
            As per Consumer Protection Act, 2019 and Consumer Protection (E-Commerce) Rules, 2020
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Eligible for Return/Exchange</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Manufacturing defects or quality issues</li>
            <li>Damaged or broken products (chips, cracks, scratches)</li>
            <li>Wrong product delivered</li>
            <li>Incomplete order (missing items from set)</li>
            <li>Products not matching the description or images</li>
            <li>Items unused, unwashed, and in original packaging with all tags intact</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Non-Returnable Items</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Products damaged due to misuse, mishandling, or improper care</li>
            <li>Customized or personalized dinnerware items</li>
            <li>Items marked as "Final Sale" or "Clearance"</li>
            <li>Products used, washed, or with removed tags</li>
            <li>Items returned after 7 days of delivery</li>
            <li>Products without original packaging and accessories</li>
            <li>Items purchased during special promotional sales (unless defective)</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">How to Initiate Return/Exchange</h3>
          <ol className="list-decimal ml-6 space-y-3 text-gray-700">
            <li>
              <strong>Contact Us Within 7 Days:</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Email: returns@ceramicry.com</li>
                <li>Phone: +91 99900-21009</li>
                <li>WhatsApp: +91 99900-21009</li>
                <li>Or raise a request through your account on our website</li>
              </ul>
            </li>
            <li>
              <strong>Provide Details:</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Order ID</li>
                <li>Product name and SKU</li>
                <li>Clear photos of the defect/damage</li>
                <li>Reason for return/exchange</li>
                <li>Unboxing video (mandatory for damage claims)</li>
              </ul>
            </li>
            <li>
              <strong>Approval & Return Authorization:</strong>
              <p className="mt-2">Our team will review your request within 24-48 hours and provide a Return Authorization (RA) number if approved</p>
            </li>
            <li>
              <strong>Pack the Product:</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Use original packaging with all accessories</li>
                <li>Include invoice copy</li>
                <li>Write RA number clearly on the package</li>
                <li>Pack securely to avoid transit damage</li>
              </ul>
            </li>
            <li>
              <strong>Pickup/Shipping:</strong>
              <p className="mt-2">We will arrange a reverse pickup from your address free of cost (for defective/damaged items). For other returns, reverse shipping charges of ₹99-₹149 may apply.</p>
            </li>
          </ol>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Refund Process</h3>
          <div className="space-y-3">
            <div className="border-l-4 border-green-400 pl-4 py-2">
              <p className="font-semibold">Prepaid Orders (Card/UPI/Netbanking/Wallet)</p>
              <p className="text-gray-700">Refund will be credited to the original payment method within 5-7 business days after we receive and inspect the returned product</p>
            </div>
            <div className="border-l-4 border-green-400 pl-4 py-2">
              <p className="font-semibold">Cash on Delivery (COD) Orders</p>
              <p className="text-gray-700">Refund will be processed via NEFT/IMPS to your bank account. Please provide account details (Account Number, IFSC Code, Account Holder Name) within 7 days</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            <strong>Note:</strong> Shipping charges are non-refundable except in cases of defective/damaged products or wrong item delivery
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Exchange Policy</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Exchanges are subject to product availability</li>
            <li>If exchanged product has price difference, you need to pay/receive the difference amount</li>
            <li>Exchange shipping is free for defective/damaged items</li>
            <li>For other exchanges, reverse pickup charges may apply</li>
            <li>One-time exchange allowed per order</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Cancellation Policy</h3>
          
          <h4 className="text-lg font-semibold text-purple-600 mt-4 mb-2">Before Dispatch</h4>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
            <li>Orders can be cancelled anytime before dispatch</li>
            <li>No cancellation charges</li>
            <li>Full refund will be processed within 5-7 business days</li>
            <li>Contact customer support or cancel directly from your account</li>
          </ul>

          <h4 className="text-lg font-semibold text-purple-600 mt-4 mb-2">After Dispatch</h4>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Orders cannot be cancelled once dispatched</li>
            <li>You can refuse delivery at the time of receipt</li>
            <li>Return shipping charges (₹99-₹199) will be deducted from refund for non-defective items</li>
            <li>Regular return policy will apply</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Damaged/Defective Product Claims</h3>
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <p className="font-semibold text-red-800 mb-3">⚠️ Mandatory Requirements for Damage Claims:</p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                <strong>Unboxing Video:</strong> Record a complete unboxing video showing package condition, opening, and product inspection. Claims without video proof may not be entertained
              </li>
              <li>
                <strong>Photos:</strong> Clear images of damaged product from multiple angles
              </li>
              <li>
                <strong>Package Photos:</strong> Images of outer packaging showing any visible damage
              </li>
              <li>
                <strong>Report Within 48 Hours:</strong> Damage must be reported within 48 hours of delivery
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-700">
              If the package appears damaged at delivery, please refuse to accept it or note the damage in the delivery receipt.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-3">Quality Guarantee</h3>
          <p className="mb-3">
            Ceramicry products come with quality assurance:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>All products undergo quality check before dispatch</li>
            <li>Manufacturing defects are covered under return policy</li>
            <li>Minor color variations may occur due to screen settings and photography lighting</li>
            <li>Handcrafted items may have slight variations which are not considered defects</li>
            <li>Products meet BIS (Bureau of Indian Standards) quality norms where applicable</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="font-semibold text-blue-800 mb-2">💡 Consumer Rights</p>
          <p className="text-gray-700 text-sm">
            As per the Consumer Protection Act, 2019, you have the right to fair trade practices and the right to seek redressal. 
            For any grievances, you can contact our Grievance Officer (details below) or approach the National Consumer Helpline (1800-11-4000) 
            or file a complaint on the National Consumer Disputes Redressal Commission portal (consumerhelpline.gov.in).
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg">
        <h3 className="text-2xl font-semibold mb-4">📞 Contact Us</h3>
        <div className="space-y-2">
          <p><strong>Customer Support:</strong></p>
          <p>📧 Email: shailesh2081994@gmail.com</p>
          <p>📱 Phone: +91 99900-21009</p>
          <p>💬 WhatsApp: +91 99900-21009</p>
          
          <div className="mt-4 pt-4 border-t border-purple-400">
            <p><strong>Grievance Officer:</strong></p>
            <p>Name: Shailesh Kumar</p>
            <p>Email: shailesh2081994@gmail.com</p>
            <p>Phone: +91 99900-21009</p>
            <p className="text-sm mt-2 text-purple-100">
              Response time: Within 48 hours (as per Consumer Protection Act, 2019)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShippingPolicy;