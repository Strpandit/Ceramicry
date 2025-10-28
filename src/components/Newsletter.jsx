import React, { useState } from "react";
import api from "./Api";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post('/subscribes', { email })
      .then(() => {
        setModalMessage("You have successfully subscribed to our email updates.");
        setIsError(false);
        setShowModal(true);
        setEmail('');
      })
      .catch((error) => {
        setModalMessage(error.response?.data?.errors || "An error occurred while subscribing. Please try again.");
        setIsError(true);
        setShowModal(true);
        setEmail('');
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="py-12 px-8 bg-gray-950 text-white text-center">
      <h2 className="text-4xl mb-4">Stay Updated</h2>
      <p className="mb-6 mx-auto">
        Get the latest updates on new collections, exclusive offers, <br />
        and ceramic care tips.
      </p>
      <div className="flex items-center justify-center pt-4 pb-8 mx-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="px-4 py-2 rounded-l-full text-black outline-none"
        />
        <button
          onClick={handleSubmit}
          className="bg-white text-black font-semibold px-6 py-2 rounded-r-full border-l hover:bg-gray-200 transition"
        >
          Subscribe
        </button>
      </div>

      {/* ✅ Modal (for both success and error) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-black">
            <h2
              className={`text-2xl font-semibold mb-4 text-center ${
                isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {isError ? "Subscription Failed" : "Subscription Successful!"}
            </h2>
            <p className="text-center mb-6">{modalMessage}</p>
            <button
              onClick={handleCloseModal}
              className={`${
                isError ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              } text-white py-2 px-4 rounded-full w-full focus:outline-none`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Newsletter;
