import React from 'react';

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 pb-4 border-b-4 border-purple-600">
        Terms & Conditions
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        <strong>Last Updated:</strong> October 12, 2025
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p className="text-gray-700">
          These Terms and Conditions are governed by the Information Technology Act, 2000, Consumer Protection Act, 2019, 
          Consumer Protection (E-Commerce) Rules, 2020, and other applicable Indian laws.
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">1. Introduction & Acceptance</h2>
        <p className="mb-4 text-gray-700">
          Welcome to Ceramicry! These Terms and Conditions ("Terms", "Agreement") constitute a legally binding agreement 
          between you ("User", "Customer", "You") and Ceramicry Private Limited ("Ceramicry", "We", "Us", "Our") 
          governing your access to and use of our website www.ceramicry.com and purchase of products.
        </p>
        <p className="mb-4 text-gray-700">
          By accessing, browsing, or using our website and services, you acknowledge that you have read, understood, 
          and agree to be bound by these Terms. If you do not agree, please discontinue use immediately.
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
          <p className="font-semibold text-yellow-800 mb-2">⚠️ Important</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 text-sm">
            <li>You must be at least 18 years old to use our services</li>
            <li>Minors can use services only under parental/guardian supervision</li>
            <li>You must provide accurate and truthful information</li>
          </ul>
        </div>
      </section>

      {/* Definitions */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">2. Definitions</h2>
        <div className="bg-gray-50 p-5 rounded-lg space-y-2">
          <p className="text-gray-700"><strong>"Products":</strong> Dinnerware, drinkware, serveware, dinner sets, and related ceramic items sold on our website</p>
          <p className="text-gray-700"><strong>"Services":</strong> Online ordering, payment processing, delivery, customer support, and related services</p>
          <p className="text-gray-700"><strong>"Website":</strong> www.ceramicry.com including all subdomains and mobile applications</p>
          <p className="text-gray-700"><strong>"Account":</strong> Your registered user account on our platform</p>
          <p className="text-gray-700"><strong>"Order":</strong> Your purchase request placed through our website</p>
        </div>
      </section>

      {/* Eligibility */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">3. Eligibility & Account Registration</h2>
        
        <h3 className="text-xl font-semibold text-purple-700 mb-3">3.1 Eligibility Criteria</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>You must be at least 18 years of age</li>
          <li>You must be a resident of India</li>
          <li>You must have the legal capacity to enter into binding contracts</li>
          <li>Your account must not have been previously suspended or terminated</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">3.2 Account Creation</h3>
        <p className="mb-3 text-gray-700">When creating an account, you agree to:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and promptly update your account information</li>
          <li>Maintain the confidentiality of your password</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Notify us immediately of any unauthorized access</li>
          <li>Not share your account credentials with others</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">3.3 Account Termination</h3>
        <p className="mb-3 text-gray-700">We reserve the right to suspend or terminate your account if:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>You violate these Terms and Conditions</li>
          <li>You engage in fraudulent or illegal activities</li>
          <li>You provide false or misleading information</li>
          <li>Your account remains inactive for more than 2 years</li>
          <li>You request account deletion</li>
        </ul>
      </section>

      {/* Use of Website */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">4. Use of Website & Services</h2>
        
        <h3 className="text-xl font-semibold text-purple-700 mb-3">4.1 Permitted Use</h3>
        <p className="mb-3 text-gray-700">You may use our website for:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Browsing and purchasing products for personal, non-commercial use</li>
          <li>Creating and managing your user account</li>
          <li>Accessing customer support and after-sales services</li>
          <li>Participating in promotions and offers</li>
          <li>Providing reviews and feedback</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">4.2 Prohibited Activities</h3>
        <p className="mb-3 text-gray-700">You agree NOT to:</p>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Violate any applicable laws, regulations, or these Terms</li>
            <li>Infringe on intellectual property rights of Ceramicry or others</li>
            <li>Transmit viruses, malware, or harmful code</li>
            <li>Attempt unauthorized access to our systems or networks</li>
            <li>Scrape, crawl, or copy content without permission</li>
            <li>Impersonate others or provide false identity information</li>
            <li>Engage in fraudulent transactions or payment disputes</li>
            <li>Post offensive, defamatory, or inappropriate content</li>
            <li>Interfere with website operations or other users' experience</li>
            <li>Use automated systems (bots, scripts) without authorization</li>
            <li>Resell products for commercial purposes without agreement</li>
            <li>Reverse engineer or decompile website code</li>
          </ul>
        </div>
      </section>

      {/* Products & Pricing */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">5. Products, Pricing & Availability</h2>
        
        <h3 className="text-xl font-semibold text-purple-700 mb-3">5.1 Product Information</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>We strive to provide accurate product descriptions, images, and specifications</li>
          <li>Colors may vary slightly due to screen settings and photography lighting</li>
          <li>Handcrafted items may have minor variations, which are not defects</li>
          <li>Product dimensions and weights are approximate</li>
          <li>We do not guarantee exact color or design match with images</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">5.2 Pricing</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>All prices are in Indian Rupees (₹) and inclusive of GST</li>
            <li>Prices are subject to change without prior notice</li>
            <li>Price displayed at the time of order placement will be honored</li>
            <li>Shipping charges are additional unless stated otherwise</li>
            <li>We reserve the right to correct pricing errors</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">5.3 Pricing Errors</h3>
        <p className="mb-3 text-gray-700">
          If a product is listed at an incorrect price due to technical or human error:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>We reserve the right to cancel the order and refund the full amount</li>
          <li>You will be notified via email/phone before cancellation</li>
          <li>You may choose to purchase at the correct price or cancel</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">5.4 Product Availability</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Product availability is subject to stock availability</li>
          <li>We may limit quantities per customer/household</li>
          <li>Out-of-stock items will be marked clearly on the website</li>
          <li>We reserve the right to discontinue products without notice</li>
        </ul>
      </section>

      {/* Orders & Payments */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">6. Orders, Payments & Invoices</h2>
        
        <h3 className="text-xl font-semibold text-purple-700 mb-3">6.1 Placing Orders</h3>
        <ol className="list-decimal ml-6 space-y-2 text-gray-700 mb-4">
          <li>Add products to cart and proceed to checkout</li>
          <li>Provide accurate shipping and billing information</li>
          <li>Select payment method and complete payment</li>
          <li>You will receive order confirmation via email/SMS</li>
          <li>Order confirmation does not guarantee acceptance</li>
        </ol>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">6.2 Order Acceptance</h3>
        <p className="mb-3 text-gray-700">
          All orders are subject to acceptance by Ceramicry. We reserve the right to refuse or cancel any order for:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Product unavailability or stock limitations</li>
          <li>Pricing or product description errors</li>
          <li>Suspected fraudulent or unauthorized transactions</li>
          <li>Payment failure or security concerns</li>
          <li>Inability to deliver to the specified address</li>
          <li>Violation of Terms and Conditions</li>
          <li>Orders exceeding purchase limits</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">6.3 Payment Methods</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="mb-3 text-gray-700"><strong>We accept the following payment methods:</strong></p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Credit Cards (Visa, Mastercard, American Express, Rupay)</li>
            <li>Debit Cards (all major banks)</li>
            <li>Net Banking (all major Indian banks)</li>
            <li>UPI (Google Pay, PhonePe, Paytm, BHIM, etc.)</li>
            <li>Digital Wallets (Paytm, Mobikwik, Freecharge, etc.)</li>
            <li>Cash on Delivery (COD) - Additional ₹50 charges apply</li>
            <li>EMI options (for orders above ₹3,000)</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">6.4 Payment Terms</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Full payment is required at the time of placing order (except COD)</li>
          <li>Payment processing is handled by secure third-party gateways</li>
          <li>We do not store complete card/banking details</li>
          <li>You authorize us to charge the total order amount</li>
          <li>Failed transactions will result in order cancellation</li>
          <li>Multiple payment attempts may require additional verification</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">6.5 GST & Tax Invoice</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>All prices include GST as applicable (currently 12% on ceramic products)</li>
          <li>GST-compliant tax invoice will be provided with every order</li>
          <li>For B2B orders above ₹2,00,000, PAN/GST number is mandatory</li>
          <li>Invoice will be sent via email and included in package</li>
          <li>HSN Code: 6911 (Tableware and kitchenware, of porcelain or china)</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">6.6 EMI Options</h3>
        <p className="mb-3 text-gray-700">
          EMI (Equated Monthly Installments) available for orders above ₹3,000:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>3, 6, 9, 12 months EMI options available</li>
          <li>Interest rates as per bank/card issuer policies</li>
          <li>EMI availability subject to bank approval</li>
          <li>Credit card EMI and Cardless EMI options available</li>
          <li>No-cost EMI available during promotional periods</li>
        </ul>
      </section>

      {/* Shipping & Delivery */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">7. Shipping & Delivery</h2>
        <p className="mb-4 text-gray-700">
          For detailed shipping and delivery terms, please refer to our separate <strong>Shipping & Return Policy</strong>. 
          Key points include:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Processing time: 1-3 business days</li>
          <li>Delivery time: 5-10 business days (depending on location)</li>
          <li>Free shipping on orders above ₹10,000</li>
          <li>Delivery across India including remote areas</li>
          <li>Package inspection advised before accepting delivery</li>
          <li>We are not liable for courier delays due to force majeure</li>
        </ul>
      </section>

      {/* Returns & Refunds */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">8. Returns, Exchanges & Refunds</h2>
        <p className="mb-4 text-gray-700">
          Complete return and exchange policies are detailed in our <strong>Shipping & Return Policy</strong>. Summary:
        </p>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 border-l-4 border-purple-600 rounded-lg mb-4">
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li><strong>Return Window:</strong> 7 days from delivery date</li>
            <li><strong>Eligible:</strong> Damaged, defective, or wrong products</li>
            <li><strong>Non-Returnable:</strong> Used items, personalized products</li>
            <li><strong>Refund Time:</strong> 5-7 business days after inspection</li>
            <li><strong>Cancellation:</strong> Allowed before dispatch without charges</li>
          </ul>
        </div>

        <p className="text-sm text-gray-600 italic">
          Note: As per Consumer Protection Act, 2019, you have the right to return products within the stipulated period 
          if they are defective or not as described.
        </p>
      </section>

      {/* Intellectual Property */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">9. Intellectual Property Rights</h2>
        
        <h3 className="text-xl font-semibold text-purple-700 mb-3">9.1 Ownership</h3>
        <p className="mb-4 text-gray-700">
          All content on the Ceramicry website, including but not limited to:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Text, graphics, logos, icons, images, and photographs</li>
          <li>Audio, video, and multimedia content</li>
          <li>Software, code, and website design</li>
          <li>Trademarks, service marks, and trade names</li>
          <li>Product designs and descriptions</li>
          <li>Compilation and arrangement of content</li>
        </ul>
        <p className="mb-4 text-gray-700">
          are the exclusive property of Ceramicry Private Limited or its licensors and are protected by Indian and 
          international copyright, trademark, patent, and other intellectual property laws.
        </p>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">9.2 Limited License</h3>
        <p className="mb-4 text-gray-700">
          We grant you a limited, non-exclusive, non-transferable, revocable license to:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Access and use the website for personal, non-commercial purposes</li>
          <li>View and download content solely for ordering products</li>
          <li>Print one copy of content for personal records</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">9.3 Restrictions</h3>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="font-semibold text-red-800 mb-2">You may NOT:</p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Reproduce, copy, duplicate, or distribute website content</li>
            <li>Modify, adapt, or create derivative works</li>
            <li>Use content for commercial purposes</li>
            <li>Remove copyright or proprietary notices</li>
            <li>Use our trademarks without written permission</li>
            <li>Frame or mirror any part of the website</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-purple-700 mb-3 mt-4">9.4 User-Generated Content</h3>
        <p className="mb-3 text-gray-700">
          By submitting reviews, comments, photos, or feedback:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>You grant us a perpetual, worldwide, royalty-free license to use, reproduce, and display such content</li>
          <li>You represent that you own or have rights to the submitted content</li>
          <li>You agree not to submit offensive, defamatory, or illegal content</li>
          <li>We reserve the right to remove or edit user content at our discretion</li>
        </ul>
      </section>

      {/* Warranties & Disclaimers */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">10. Warranties & Disclaimers</h2>
        
        <h3 className="text-xl font-semibold text-purple-700 mb-3">10.1 Product Warranty</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>All products come with a limited warranty against manufacturing defects</li>
            <li>Warranty period: As specified for each product category</li>
            <li>Warranty covers manufacturing defects only</li>
            <li>Not covered: Normal wear and tear, misuse, improper care, accidents</li>
            <li>Warranty claim requires proof of purchase</li>
            <li>Products meet BIS (Bureau of Indian Standards) specifications where applicable</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">10.2 Website Disclaimer</h3>
        <p className="mb-4 text-gray-700">
          To the maximum extent permitted by law:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>The website is provided "as is" and "as available" without warranties of any kind</li>
          <li>We do not guarantee uninterrupted, error-free, or secure website operation</li>
          <li>We do not warrant that website content is accurate, complete, or current</li>
          <li>Technical issues, maintenance, or third-party problems may cause disruptions</li>
          <li>We are not responsible for network or internet connectivity issues</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">10.3 Product Care Disclaimer</h3>
        <p className="mb-3 text-gray-700">
          Ceramic products require proper care and handling:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Follow care instructions provided with products</li>
          <li>Not all items are dishwasher or microwave safe - check product specifications</li>
          <li>Handle with care to prevent chipping or breakage</li>
          <li>Avoid sudden temperature changes (thermal shock)</li>
          <li>Damage from improper use is not covered under warranty</li>
        </ul>
      </section>

      {/* Limitation of Liability */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">11. Limitation of Liability</h2>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="font-semibold text-yellow-800 mb-3">Subject to Consumer Protection Laws</p>
          <p className="text-gray-700 mb-3">
            To the extent permitted under the Consumer Protection Act, 2019 and other applicable laws:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700 text-sm">
            <li>Ceramicry's total liability shall not exceed the purchase price of the product(s) in question</li>
            <li>We are not liable for indirect, incidental, special, consequential, or punitive damages</li>
            <li>This includes loss of profits, data, goodwill, or business opportunities</li>
            <li>We are not liable for third-party actions (courier delays, payment gateway issues)</li>
            <li>Force majeure events excuse performance obligations</li>
          </ul>
        </div>

        <p className="text-sm text-gray-600 italic">
          Note: Nothing in these Terms shall exclude or limit liability for death or personal injury caused by negligence, 
          fraud, or any liability that cannot be limited under Indian law.
        </p>
      </section>

      {/* Indemnification */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">12. Indemnification</h2>
        <p className="mb-4 text-gray-700">
          You agree to indemnify, defend, and hold harmless Ceramicry, its directors, officers, employees, agents, 
          and affiliates from any claims, liabilities, damages, losses, costs, or expenses (including legal fees) arising from:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Your violation of these Terms and Conditions</li>
          <li>Your violation of any rights of third parties</li>
          <li>Your misuse of products or website</li>
          <li>Your fraudulent or illegal activities</li>
          <li>Your breach of applicable laws or regulations</li>
          <li>Content you submit or post on our platform</li>
        </ul>
      </section>

      {/* Privacy */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">13. Privacy & Data Protection</h2>
        <p className="mb-4 text-gray-700">
          Your privacy is important to us. Our collection, use, and protection of your personal information is governed 
          by our <strong>Privacy Policy</strong>, which is incorporated into these Terms by reference.
        </p>
        <p className="mb-4 text-gray-700">
          By using our services, you consent to our Privacy Policy and agree to our data practices as described therein, 
          in compliance with the Information Technology Act, 2000 and IT Rules, 2011.
        </p>
      </section>

      {/* Force Majeure */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">14. Force Majeure</h2>
        <p className="mb-4 text-gray-700">
          We shall not be liable for any delay or failure to perform obligations under these Terms due to circumstances 
          beyond our reasonable control, including but not limited to:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Acts of God (floods, earthquakes, storms, epidemics, pandemics)</li>
            <li>War, terrorism, riots, civil unrest, or political disturbances</li>
            <li>Government orders, regulations, or restrictions</li>
            <li>Strikes, lockouts, or labor disputes</li>
            <li>Fire, explosion, or accidents</li>
            <li>Power outages or internet/telecommunication failures</li>
            <li>Supply chain disruptions or raw material shortages</li>
            <li>Any other unforeseen events beyond our control</li>
          </ul>
        </div>
        <p className="mt-4 text-gray-700">
          During force majeure events, our obligations will be suspended for the duration of the event, and we will 
          notify you as soon as reasonably practicable.
        </p>
      </section>

      {/* Governing Law */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">15. Governing Law & Dispute Resolution</h2>
        
        <h3 className="text-xl font-semibold text-purple-700 mb-3">15.1 Governing Law</h3>
        <p className="mb-4 text-gray-700">
          These Terms and Conditions shall be governed by and construed in accordance with the laws of India, 
          including but not limited to:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Indian Contract Act, 1872</li>
          <li>Sale of Goods Act, 1930</li>
          <li>Consumer Protection Act, 2019</li>
          <li>Information Technology Act, 2000</li>
          <li>Payment and Settlement Systems Act, 2007</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">15.2 Jurisdiction</h3>
        <p className="mb-4 text-gray-700">
          Subject to the jurisdiction provisions under Consumer Protection Act, 2019:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Courts of [City, State] shall have exclusive jurisdiction</li>
          <li>Consumers may also approach consumer forums in their local jurisdiction</li>
          <li>Both parties consent to the jurisdiction of Indian courts</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">15.3 Dispute Resolution</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="mb-3 text-gray-700"><strong>Step 1: Customer Support</strong></p>
          <p className="mb-3 text-gray-700">Contact our customer support team first to resolve issues informally</p>
          
          <p className="mb-3 text-gray-700"><strong>Step 2: Grievance Officer</strong></p>
          <p className="mb-3 text-gray-700">If unresolved, escalate to our Grievance Officer (details below)</p>
          
          <p className="mb-3 text-gray-700"><strong>Step 3: Mediation</strong></p>
          <p className="mb-3 text-gray-700">Parties may agree to resolve disputes through mediation</p>
          
          <p className="mb-3 text-gray-700"><strong>Step 4: Consumer Forums / Courts</strong></p>
          <p className="text-gray-700">Approach District/State/National Consumer Disputes Redressal Commission or civil courts</p>
        </div>

        <h3 className="text-xl font-semibold text-purple-700 mb-3 mt-4">15.4 Consumer Rights</h3>
        <p className="text-gray-700">
          Nothing in these Terms shall limit your statutory rights under the Consumer Protection Act, 2019. 
          You may approach consumer forums for grievance redressal regardless of these dispute resolution provisions.
        </p>
      </section>

      {/* Changes to Terms */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">16. Modifications to Terms</h2>
        <p className="mb-4 text-gray-700">
          We reserve the right to modify, amend, or update these Terms and Conditions at any time. Changes will be effective upon:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Posting updated Terms on our website</li>
          <li>Updating the "Last Updated" date</li>
          <li>Sending email notification (for significant changes)</li>
        </ul>
        <p className="mb-4 text-gray-700">
          Your continued use of the website after changes constitutes acceptance of the modified Terms. 
          We encourage you to review these Terms periodically.
        </p>
        <p className="text-gray-700">
          If you do not agree with any changes, you must discontinue use of our website and services immediately.
        </p>
      </section>

      {/* Severability */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">17. Severability & Waiver</h2>
        
        <h3 className="text-xl font-semibold text-purple-700 mb-3">17.1 Severability</h3>
        <p className="mb-4 text-gray-700">
          If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, 
          such provision shall be severed, and the remaining provisions shall continue in full force and effect.
        </p>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">17.2 Waiver</h3>
        <p className="mb-4 text-gray-700">
          Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. 
          Any waiver must be in writing and signed by authorized representatives.
        </p>
      </section>

      {/* Entire Agreement */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">18. Entire Agreement</h2>
        <p className="mb-4 text-gray-700">
          These Terms and Conditions, together with our Privacy Policy, Shipping & Return Policy, and Cookies Policy, 
          constitute the entire agreement between you and Ceramicry regarding use of our website and services.
        </p>
        <p className="text-gray-700">
          These Terms supersede all prior or contemporaneous communications, agreements, and understandings, 
          whether oral or written.
        </p>
      </section>

      {/* Contact & Grievance */}
      <section>
        <h2 className="text-3xl font-bold text-purple-600 mb-4">19. Contact Information & Grievance Redressal</h2>
        
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-semibold mb-4">📞 Customer Support</h3>
          <div className="space-y-2">
            <p>Email: support@ceramicry.com</p>
            <p>Phone: 1800-XXX-XXXX (Toll-free, Mon-Sat: 9 AM - 7 PM)</p>
            <p>WhatsApp: +91-XXXXX-XXXXX</p>
            <p>Address: Ceramicry Private Limited, [Complete Address]</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-semibold mb-4">⚖️ Grievance Officer</h3>
          <p className="text-purple-100 mb-3">
            As per Information Technology Act, 2000 and Consumer Protection (E-Commerce) Rules, 2020
          </p>
          <div className="space-y-2">
            <p><strong>Name:</strong> [Officer Full Name]</p>
            <p><strong>Designation:</strong> Grievance Officer</p>
            <p><strong>Email:</strong> grievance@ceramicry.com</p>
            <p><strong>Phone:</strong> +91-XXXXX-XXXXX</p>
            <p><strong>Address:</strong> Ceramicry Private Limited, [Complete Address with Pin Code]</p>
            <p className="text-sm text-purple-100 mt-3">
              <strong>Response Time:</strong> Acknowledgment within 24 hours | Resolution within 30 days
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">🏢 Company Details</h3>
          <div className="space-y-2">
            <p><strong>Legal Name:</strong> Ceramicry Private Limited</p>
            <p><strong>Registered Office:</strong> [Complete Registered Address]</p>
            <p><strong>CIN:</strong> [Corporate Identification Number]</p>
            <p><strong>GST:</strong> [GSTIN Number]</p>
            <p><strong>PAN:</strong> [PAN Number]</p>
            <p><strong>Email:</strong> legal@ceramicry.com</p>
            <p className="text-sm text-purple-100 mt-3">
              For any legal notices or official communications, please write to the registered office address
            </p>
          </div>
        </div>
      </section>

      {/* Acknowledgment */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-8">
        <p className="font-semibold text-green-800 mb-2">✓ Acknowledgment</p>
        <p className="text-gray-700 text-sm">
          BY USING OUR WEBSITE AND SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY 
          THESE TERMS AND CONDITIONS. IF YOU DO NOT AGREE, PLEASE DO NOT USE OUR WEBSITE OR SERVICES.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;