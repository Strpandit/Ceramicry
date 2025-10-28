import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-purple-700 mb-6 pb-4 border-b-4 border-purple-600">
        Privacy Policy
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        <strong>Last Updated:</strong> October 12, 2025
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p className="text-gray-700">
          This Privacy Policy is published in accordance with the provisions of the Information Technology Act, 2000 and 
          the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 
          and the Consumer Protection (E-Commerce) Rules, 2020.
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Introduction</h2>
        <p className="mb-4 text-gray-700">
          Ceramicry Private Limited ("we", "us", "our", or "Ceramicry") respects your privacy and is committed to protecting 
          your personal information. This Privacy Policy explains how we collect, use, disclose, store, and protect your information 
          when you visit our website www.ceramicry.com and make purchases from us.
        </p>
        <p className="mb-4 text-gray-700">
          By using our website and services, you consent to the collection and use of your information as described in this policy. 
          If you do not agree with this policy, please do not use our website or services.
        </p>
      </section>

      {/* Information We Collect */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Information We Collect</h2>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">1. Personal Information</h3>
        <p className="mb-3 text-gray-700">We collect the following personal information when you:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-6">
          <li>Create an account on our website</li>
          <li>Place an order</li>
          <li>Subscribe to newsletters</li>
          <li>Contact customer support</li>
          <li>Participate in surveys or promotions</li>
        </ul>

        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <p className="font-semibold mb-3 text-purple-700">Personal Information Includes:</p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Mobile Number</li>
            <li>Shipping and Billing Address</li>
            <li>Date of Birth (optional)</li>
            <li>Gender (optional)</li>
            <li>PAN (for orders above ₹2,00,000 as per GST compliance)</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">2. Sensitive Personal Data or Information (SPDI)</h3>
        <p className="mb-3 text-gray-700">
          As defined under IT Rules, 2011, we may collect the following SPDI with your explicit consent:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-6">
          <li><strong>Financial Information:</strong> Credit/debit card details, UPI ID, bank account information (processed through secure payment gateways)</li>
          <li><strong>Password:</strong> Encrypted and stored securely</li>
          <li><strong>Biometric Information:</strong> None collected</li>
        </ul>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> We do not directly store your complete card details. All payment information is processed through 
            PCI-DSS compliant payment gateways (Razorpay, Paytm, CCAvenue, etc.).
          </p>
        </div>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">3. Automatically Collected Information</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-6">
          <li>IP Address and Location Data</li>
          <li>Browser Type and Version</li>
          <li>Device Information (mobile/desktop, OS)</li>
          <li>Cookies and Tracking Technologies</li>
          <li>Browsing History on our website</li>
          <li>Pages Visited and Time Spent</li>
          <li>Referral Source (how you arrived at our website)</li>
          <li>Click-stream Data</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-700 mb-3">4. Information from Third Parties</h3>
        <p className="mb-3 text-gray-700">We may receive information from:</p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-6">
          <li>Social media platforms (if you log in via Facebook, Google)</li>
          <li>Payment gateways (transaction status and details)</li>
          <li>Courier partners (delivery status updates)</li>
          <li>Marketing partners (analytics and advertising platforms)</li>
        </ul>
      </section>

      {/* How We Use Your Information */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">How We Use Your Information</h2>
        <p className="mb-4 text-gray-700">We use your information for the following purposes:</p>

        <div className="space-y-4">
          <div className="border-l-4 border-purple-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">Order Processing & Fulfillment</h4>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
              <li>Process and deliver your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Handle returns, exchanges, and refunds</li>
              <li>Verify payment transactions</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">Customer Support</h4>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
              <li>Respond to your queries and complaints</li>
              <li>Provide technical assistance</li>
              <li>Resolve disputes and issues</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">Marketing & Communications (with consent)</h4>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
              <li>Send promotional emails, SMS, and WhatsApp messages</li>
              <li>Notify you about new products, offers, and discounts</li>
              <li>Send newsletters and updates</li>
              <li>Personalized product recommendations</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600 italic">You can opt-out anytime by clicking "unsubscribe" or contacting us</p>
          </div>

          <div className="border-l-4 border-purple-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">Website Improvement & Analytics</h4>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
              <li>Analyze website usage and user behavior</li>
              <li>Improve website functionality and user experience</li>
              <li>Conduct market research and surveys</li>
              <li>Test new features and services</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">Security & Fraud Prevention</h4>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
              <li>Detect and prevent fraudulent transactions</li>
              <li>Protect against cyber attacks and security threats</li>
              <li>Verify user identity</li>
              <li>Monitor suspicious activities</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">Legal Compliance</h4>
            <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-700">
              <li>Comply with GST and tax regulations</li>
              <li>Maintain accounting and business records</li>
              <li>Respond to legal requests and court orders</li>
              <li>Enforce our Terms & Conditions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Information Sharing */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Information Sharing & Disclosure</h2>
        
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="font-semibold text-green-800 mb-2">✓ Our Commitment</p>
          <p className="text-gray-700">
            <strong>We DO NOT sell, rent, or trade your personal information to third parties for their marketing purposes.</strong>
          </p>
        </div>

        <p className="mb-4 text-gray-700">We may share your information with:</p>

        <div className="space-y-4 mb-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-purple-700 mb-2">1. Service Providers & Business Partners</h4>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              <li><strong>Payment Gateways:</strong> Razorpay, Paytm, CCAvenue, PayU (for processing payments)</li>
              <li><strong>Logistics Partners:</strong> Delhivery, Blue Dart, DTDC, India Post (for shipping and delivery)</li>
              <li><strong>Technology Providers:</strong> Web hosting, cloud storage, email services</li>
              <li><strong>Marketing Partners:</strong> Google Analytics, Facebook Pixel, SMS gateways (with consent)</li>
              <li><strong>Customer Support:</strong> CRM systems, helpdesk software</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600 italic">These partners are contractually bound to protect your data and use it only for specified purposes</p>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-purple-700 mb-2">2. Legal & Regulatory Authorities</h4>
            <p className="text-gray-700 mb-2">We may disclose information when required by law or to:</p>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              <li>Comply with legal processes, court orders, or government requests</li>
              <li>Enforce our Terms & Conditions and policies</li>
              <li>Respond to claims of violation of rights of third parties</li>
              <li>Protect rights, property, or safety of Ceramicry, users, or public</li>
              <li>Prevent fraud or illegal activities</li>
              <li>GST authorities for tax compliance</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-purple-700 mb-2">3. Business Transfers</h4>
            <p className="text-gray-700">
              In case of merger, acquisition, sale of assets, or bankruptcy, your information may be transferred to the 
              acquiring entity. You will be notified via email and/or website notice before your information is transferred.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-semibold text-purple-700 mb-2">4. With Your Consent</h4>
            <p className="text-gray-700">
              We may share information with other third parties when you explicitly consent to such sharing.
            </p>
          </div>
        </div>
      </section>

      {/* Data Security */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Data Security Measures</h2>
        <p className="mb-4 text-gray-700">
          We implement reasonable security practices and procedures as per IT Act, 2000 and IT Rules, 2011 to protect 
          your personal information from unauthorized access, disclosure, alteration, or destruction.
        </p>

        <div className="bg-gray-50 p-5 rounded-lg mb-6">
          <p className="font-semibold mb-3 text-purple-700">Our Security Measures Include:</p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li><strong>SSL/TLS Encryption:</strong> 256-bit encryption for data transmission</li>
            <li><strong>Secure Payment Processing:</strong> PCI-DSS compliant payment gateways</li>
            <li><strong>Data Encryption:</strong> Sensitive data encrypted at rest and in transit</li>
            <li><strong>Access Controls:</strong> Role-based access and authentication</li>
            <li><strong>Firewalls:</strong> Network security and intrusion detection systems</li>
            <li><strong>Regular Security Audits:</strong> Vulnerability assessments and penetration testing</li>
            <li><strong>Password Protection:</strong> Passwords stored using one-way hashing algorithms</li>
            <li><strong>Secure Servers:</strong> Data stored on secure servers with limited access</li>
            <li><strong>Employee Training:</strong> Staff trained on data protection and privacy</li>
            <li><strong>NDA Agreements:</strong> All employees and partners sign non-disclosure agreements</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="font-semibold text-yellow-800 mb-2">⚠️ Important Security Tips</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 text-sm">
            <li>Never share your password with anyone</li>
            <li>Use strong, unique passwords for your account</li>
            <li>Log out after using shared/public computers</li>
            <li>Be cautious of phishing emails claiming to be from Ceramicry</li>
            <li>We will never ask for your password, OTP, or card details via email/SMS/call</li>
            <li>Report any suspicious activity immediately</li>
          </ul>
        </div>

        <p className="text-sm text-gray-600 italic">
          Despite our security measures, no system is 100% secure. While we strive to protect your information, 
          we cannot guarantee absolute security of data transmitted over the internet.
        </p>
      </section>

      {/* Data Retention */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Data Retention</h2>
        <p className="mb-4 text-gray-700">
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, 
          unless a longer retention period is required by law.
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li><strong>Account Information:</strong> Retained until you delete your account or request deletion</li>
          <li><strong>Transaction Records:</strong> Retained for 7 years as per GST and Income Tax Act requirements</li>
          <li><strong>Marketing Data:</strong> Retained until you opt-out or request deletion</li>
          <li><strong>Customer Support Records:</strong> Retained for 3 years for quality and dispute resolution</li>
          <li><strong>Website Analytics:</strong> Anonymized data may be retained indefinitely</li>
        </ul>
        <p className="text-gray-700">
          After the retention period, we will securely delete or anonymize your information in accordance with 
          applicable data protection laws.
        </p>
      </section>

      {/* Your Rights */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Your Rights & Choices</h2>
        <p className="mb-4 text-gray-700">
          Under Indian data protection laws and Consumer Protection Act, 2019, you have the following rights:
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">1. Right to Access</h4>
            <p className="text-gray-700">Request a copy of personal information we hold about you</p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">2. Right to Correction</h4>
            <p className="text-gray-700">Request correction of inaccurate or incomplete information</p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">3. Right to Deletion</h4>
            <p className="text-gray-700">Request deletion of your personal information (subject to legal obligations)</p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">4. Right to Withdraw Consent</h4>
            <p className="text-gray-700">Withdraw consent for processing your data (may affect service delivery)</p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">5. Right to Opt-Out</h4>
            <p className="text-gray-700">Unsubscribe from marketing communications anytime</p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">6. Right to Portability</h4>
            <p className="text-gray-700">Request your data in a structured, commonly used format</p>
          </div>

          <div className="border-l-4 border-blue-400 pl-4 py-2">
            <h4 className="font-semibold text-purple-700">7. Right to Grievance Redressal</h4>
            <p className="text-gray-700">File complaints with our Grievance Officer or consumer forums</p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
          <p className="font-semibold text-blue-800 mb-2">How to Exercise Your Rights</p>
          <p className="text-gray-700 mb-2">To exercise any of these rights, please contact us at:</p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            <li>Email: privacy@ceramicry.com</li>
            <li>Phone: 1800-XXX-XXXX</li>
            <li>Or through your account settings on our website</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2">We will respond to your request within 30 days</p>
        </div>
      </section>

      {/* Cookies */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Cookies & Tracking Technologies</h2>
        <p className="mb-4 text-gray-700">
          We use cookies and similar tracking technologies to enhance your browsing experience. For detailed information, 
          please refer to our separate <strong>Cookies Policy</strong>.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 mb-2"><strong>Quick Summary:</strong></p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700">
            <li>Essential cookies for website functionality</li>
            <li>Analytics cookies to understand user behavior</li>
            <li>Marketing cookies for personalized advertising (with consent)</li>
            <li>You can manage cookie preferences through browser settings</li>
          </ul>
        </div>
      </section>

      {/* Third-Party Links */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Third-Party Websites & Links</h2>
        <p className="mb-4 text-gray-700">
          Our website may contain links to third-party websites (payment gateways, social media platforms, partner sites). 
          We are not responsible for the privacy practices or content of these external sites.
        </p>
        <p className="text-gray-700">
          We encourage you to review the privacy policies of any third-party sites you visit. This Privacy Policy applies 
          only to information collected by Ceramicry.
        </p>
      </section>

      {/* Children's Privacy */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Children's Privacy</h2>
        <p className="mb-4 text-gray-700">
          Our website and services are not intended for children under 18 years of age. We do not knowingly collect 
          personal information from minors without parental consent.
        </p>
        <p className="text-gray-700">
          If you are a parent or guardian and believe your child has provided us with personal information, please 
          contact us immediately. We will take steps to delete such information from our systems.
        </p>
      </section>

      {/* International Users */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">International Data Transfers</h2>
        <p className="mb-4 text-gray-700">
          Your information is primarily stored on servers located in India. However, some service providers 
          (cloud services, analytics tools) may process data outside India.
        </p>
        <p className="text-gray-700">
          We ensure that such transfers comply with applicable data protection laws and that adequate safeguards 
          are in place through contractual agreements and standard contractual clauses.
        </p>
      </section>

      {/* Changes to Policy */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-4 text-gray-700">
          We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, 
          or for other operational reasons.
        </p>
        <p className="mb-4 text-gray-700">
          We will notify you of significant changes by:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
          <li>Posting a prominent notice on our website</li>
          <li>Sending you an email notification (if you have an account)</li>
          <li>Updating the "Last Updated" date at the top of this policy</li>
        </ul>
        <p className="text-gray-700">
          Your continued use of our website after changes indicates acceptance of the updated policy. 
          We encourage you to review this policy periodically.
        </p>
      </section>

      {/* Grievance Redressal */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Grievance Redressal Mechanism</h2>
        <p className="mb-4 text-gray-700">
          As per Information Technology Act, 2000 and Consumer Protection Act, 2019, we have appointed a 
          Grievance Officer to address your concerns regarding data privacy.
        </p>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-semibold mb-4">Grievance Officer</h3>
          <div className="space-y-2">
            <p><strong>Name:</strong> [Officer Full Name]</p>
            <p><strong>Designation:</strong> Grievance Officer</p>
            <p><strong>Email:</strong> grievance@ceramicry.com</p>
            <p><strong>Phone:</strong> +91-XXXXX-XXXXX</p>
            <p><strong>Address:</strong> Ceramicry Private Limited, [Complete Address with Pin Code]</p>
            <p className="text-sm text-purple-100 mt-4">
              <strong>Response Time:</strong> We acknowledge complaints within 24 hours and resolve within 30 days 
              (as per IT Rules, 2011)
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <p className="font-semibold text-yellow-800 mb-2">Alternative Dispute Resolution</p>
          <p className="text-gray-700 mb-2">
            If you are not satisfied with our response, you may approach:
          </p>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 text-sm">
            <li><strong>National Consumer Helpline:</strong> 1800-11-4000 or SMS: 8130009809</li>
            <li><strong>Consumer Online Resource and Empowerment (CORE):</strong> consumerhelpline.gov.in</li>
            <li><strong>National Consumer Disputes Redressal Commission (NCDRC)</strong></li>
            <li><strong>Cyber Crime Portal:</strong> cybercrime.gov.in</li>
          </ul>
        </div>
      </section>

      {/* Contact Information */}
      <section>
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">📧 Contact Us</h3>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-lg mb-2">For Privacy-Related Queries:</p>
              <p>Email: privacy@ceramicry.com</p>
              <p>Phone: 1800-XXX-XXXX (Toll-free)</p>
              <p>WhatsApp: +91-XXXXX-XXXXX</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-purple-400">
              <p className="font-semibold">Registered Office & Corporate Details:</p>
              <p className="mt-2">Ceramicry Private Limited</p>
              <p>[Complete Registered Address]</p>
              <p>[City, State - Pin Code]</p>
              <p className="mt-2">CIN: [Corporate Identification Number]</p>
              <p>GST: [GSTIN Number]</p>
              <p>Email: legal@ceramicry.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Consent */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-8">
        <p className="font-semibold text-green-800 mb-2">✓ Your Consent</p>
        <p className="text-gray-700 text-sm">
          By using our website and services, you acknowledge that you have read, understood, and agree to be bound by this 
          Privacy Policy. You consent to the collection, use, and disclosure of your information as described herein.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;