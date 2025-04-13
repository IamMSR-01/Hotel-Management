import React, { useState, useEffect } from "react";
import BookingSummary from "../components/BookingSummary";

function Booking() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedUpiApp, setSelectedUpiApp] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
 

  return (
    <div
      className="w-full min-h-full justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <h1 className="text-5xl font-bold flex justify-center pt-8 text-yellow-500">
        Book Your Room Now !
      </h1>

      <div className="flex gap-20 rounded-3xl p-20">
        <section className="p-8 rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl w-1/2">
          <form className="space-y-4 text-white">
            <div>
              <label className="block mb-1 font-medium">Starting Date</label>
              <input
                type="date"
                name="checkInDate"
                className="w-full p-2 bg-white/10 border border-white/20 text-black rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Ending Date</label>
              <input
                type="date"
                name="checkOutDate"
                className="w-full p-2 bg-white/10 border border-white/20 text-black rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Pay With</label>
              <select
                name="status"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 bg-white/10 border border-white/20 text-black rounded-lg focus:outline-none"
              >
                <option value="">-- Select Payment Method --</option>
                <option value="credit">💳 Credit Card</option>
                <option value="debit">🏦 Debit Card</option>
                <option value="netbanking">🏧 Net Banking</option>
                <option value="upi">📱 UPI</option>
              </select>
            </div>

            {/* Conditional Inputs */}
            {paymentMethod === "credit" || paymentMethod === "debit" ? (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-2 text-black bg-white/10 border border-white/20 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  className="w-full p-2 text-black bg-white/10 border border-white/20 rounded-lg"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Expiry (MM/YY)"
                    className="w-full p-2 text-black bg-white/10 border border-white/20 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full p-2 text-black bg-white/10 border border-white/20 rounded-lg"
                  />
                </div>
              </div>
            ) : null}

            {paymentMethod === "netbanking" && (
              <div>
                <label className="block mb-1 font-medium">
                  Choose Your Bank
                </label>
                <select className="w-full p-2 bg-white/10 border border-white/20 text-black rounded-lg">
                  <option value="sbi">State Bank of India</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                  <option value="kotak">Kotak Mahindra Bank</option>
                </select>

                <label className="block mt-4 mb-1 font-medium">
                  Net Banking Login
                </label>
                <input
                  type="text"
                  placeholder="Customer ID / Username"
                  className="w-full p-2 text-black bg-white/10 border border-white/20 rounded-lg"
                />
                <input
                  type="password"
                  placeholder="Password / PIN"
                  className="w-full p-2 mt-4 text-black bg-white/10 border border-white/20 rounded-lg"
                />
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-4">
                <label className="block mb-1 font-medium text-white">
                  Choose UPI App
                </label>

                <div className="flex gap-4">
                  {["googlepay", "phonepe", "paytm"].map((app) => {
                    const isSelected = selectedUpiApp === app;

                    const appDetails = {
                      googlepay: {
                        name: "Google Pay",
                        img: "https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/436/Google_Pay_GPay_Logo-512.png",
                      },
                      phonepe: {
                        name: "PhonePe",
                        img: "https://download.logo.wine/logo/PhonePe/PhonePe-Logo.wine.png",
                      },
                      paytm: {
                        name: "Paytm",
                        img: "https://download.logo.wine/logo/Paytm/Paytm-Logo.wine.png",
                      },
                    };

                    return (
                      <button
                        key={app}
                        type="button"
                        onClick={() => setSelectedUpiApp(app)}
                        className={`flex flex-col items-center p-3 w-[105px] rounded-xl transition border ${
                          isSelected
                            ? "bg-yellow-500 border-yellow-500"
                            : "bg-white/10 border-white/20 hover:bg-white/20"
                        }`}
                      >
                        <img
                          src={appDetails[app].img}
                          alt={appDetails[app].name}
                          className="w-14 h-14 object-contain"
                        />
                        <span className="text-sm text-white mt-1">
                          {appDetails[app].name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <label className="block mb-1 font-medium text-white">
                  Enter Your UPI ID
                </label>
                <input
                  type="text"
                  placeholder="example@upi"
                  className="w-full p-2 text-black bg-white/10 border border-white/20 rounded-lg"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 mt-10 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-400/80 transition cursor-pointer"
            >
              Confirm Payment
            </button>
          </form>
        </section>

        <section className="flex rounded-3xl justify-center items-center bg-blue/10 backdrop-blur-md shadow-2xl w-2/3">
          <BookingSummary />
        </section>
      </div>
    </div>
  );
}

export default Booking;
