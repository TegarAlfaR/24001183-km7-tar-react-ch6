import React, { useState } from "react";

function HomeView({
  shops,
  error,
  loading,
  searchQuery,
  setSearchQuery,
  currentPage,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  handleItemsPerPageChange,
  itemsPerPage,
}) {
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
        <div className="flex flex-col items-start p-6 space-y-4">
          <button
            className="self-end text-gray-700 focus:outline-none mb-4"
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
          <ul className="space-y-6 text-gray-700 text-lg">
            <li className="hover:text-green-600 cursor-pointer">Home</li>
            <li className="hover:text-green-600 cursor-pointer">Shop</li>
            <li className="hover:text-green-600 cursor-pointer">About Us</li>
            <li className="hover:text-green-600 cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-spin"></div>
          <p className="text-blue-800 text-2xl font-semibold mt-4">
            Loading...
          </p>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center fixed inset-0 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
          {error}
        </div>
      )}

      {!loading && !error && (
        <main className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
          <div className="w-full max-w-3xl mx-auto mb-3 mt-16">
            <div className="relative flex gap-2">
              <input
                type="text"
                placeholder="Search for product name, stock, price..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none transition-all duration-200"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="itemsPerPage"
              className="text-sm font-semibold text-gray-700"
            >
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              className="ml-2 p-2 border rounded-md"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shops.length > 0 ? (
              shops.map((shop, index) => (
                <div
                  key={index}
                  className="p-5 border rounded-lg shadow-lg bg-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <img
                    src={shop.products[0].images[0]}
                    alt={shop.products[0].name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />

                  <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300 text-center mb-3">
                    {shop.products[0].name}
                  </h3>

                  <p className="text-green-600 text-lg font-bold text-center mb-3">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(shop.products[0].price)}
                  </p>

                  <p className="text-sm text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-center mb-4 w-max mx-auto">
                    in stock : {shop.products[0].stock}
                  </p>

                  <button className="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 transform transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                    See Details
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col justify-center items-center text-center text-gray-500 py-24 w-max">
                {searchQuery && (
                  <>
                    <p className="text-lg font-semibold">
                      Not found for "{searchQuery}"
                    </p>
                    <p>Try searching for something else.</p>
                  </>
                )}
              </div>
            )}
          </section>

          {shops.length > 0 && (
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-lg">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      )}

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
