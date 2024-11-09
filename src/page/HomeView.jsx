import React, { useState } from "react";

function HomeView({ shops, error, loading }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">Shop Products</h1>
          <ul className="hidden md:flex space-x-6 text-gray-700">
            <li className="hover:text-green-600 cursor-pointer">Home</li>
            <li className="hover:text-green-600 cursor-pointer">Shop</li>
            <li className="hover:text-green-600 cursor-pointer">About Us</li>
            <li className="hover:text-green-600 cursor-pointer">Contact</li>
          </ul>
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-20 transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <ul className="mt-16 space-y-6 text-gray-700 font-semibold text-center">
          <li
            className="hover:text-green-600 cursor-pointer"
            onClick={toggleMobileMenu}
          >
            Home
          </li>
          <li
            className="hover:text-green-600 cursor-pointer"
            onClick={toggleMobileMenu}
          >
            Shop
          </li>
          <li
            className="hover:text-green-600 cursor-pointer"
            onClick={toggleMobileMenu}
          >
            About Us
          </li>
          <li
            className="hover:text-green-600 cursor-pointer"
            onClick={toggleMobileMenu}
          >
            Contact
          </li>
        </ul>
      </div>

      <main className="flex justify-center items-center min-h-screen bg-gray-100 pt-16 p-4">
        {loading && (
          <p className="text-blue-800 text-4xl font-semibold">Loading...</p>
        )}
        {error && (
          <p className="text-red-500 text-4xl font-semibold">{error}</p>
        )}
        {!loading && !error && (
          <section className="w-full max-w-7xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shops.map((shop, index) => (
              <div
                key={index}
                className="p-5 border border-gray-200 rounded-lg bg-white shadow-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={shop.products[0].images[0]}
                  alt={shop.products[0].name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                  {shop.products[0].name}
                </h3>
                <p className="text-green-500 text-lg font-bold text-center mb-2">
                  Rp.{" "}
                  {new Intl.NumberFormat("id-ID").format(
                    shop.products[0].price
                  )}
                </p>
                <div className="flex justify-center mb-4">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      shop.products[0].stock > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {shop.products[0].stock > 0
                      ? `In Stock: ${shop.products[0].stock}`
                      : "Out of Stock"}
                  </span>
                </div>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed text-center">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <button className="w-full px-4 py-2 mt-6 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                  See Details
                </button>
              </div>
            ))}
          </section>
        )}
      </main>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
}

export default HomeView;
