import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";

function HomeView() {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const getSearchParams = (query) => {
    const params = {
      limit: itemsPerPage,
      page: currentPage,
    };

    if (!query) return params;
    const numericValue = Number(query);
    if (!isNaN(numericValue)) {
      if (numericValue > 1000) {
        params.price = numericValue;
      } else {
        params.stock = numericValue;
      }
    } else {
      params.productName = query;
    }

    return params;
  };

  const fetchShops = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/shops", {
        params: getSearchParams(searchQuery),
      });

      const data = response.data;
      if (data.isSuccess) {
        setShops(data.data.shops);
        setTotalItems(data.pagination.totalRow);
      } else {
        setShops([]);
        setTotalItems(0);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setShops([]);
          setTotalItems(0);
        } else {
          setError(
            `Server Error: ${
              error.response.data.message || "Unknown error occurred"
            }`
          );
        }
      } else if (error.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An error occurred while processing your request.");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery]);

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
  };

  return (
    <>
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
            <form onSubmit={handleSubmit} className="relative flex gap-2">
              <input
                type="text"
                placeholder="Search for product name, stock, price..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
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
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Search
              </button>
            </form>
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
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
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
              <div className="col-span-full flex flex-col justify-center items-center text-center text-gray-500 py-24">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 005.656 0M5.636 5.636A9 9 0 0118.364 18.364M6.343 14.657a4 4 0 005.657 0"
                  />
                </svg>
                <p>No Products Found</p>
              </div>
            )}
          </section>

          <div className="mt-6 flex justify-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
            >
              Next
            </button>
          </div>
        </main>
      )}
    </>
  );
}

export default HomeView;
