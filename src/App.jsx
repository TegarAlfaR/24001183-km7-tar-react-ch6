import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeView from "./page/HomeView";
import AboutView from "./page/AboutView";
import NotFoundView from "./page/NotFoundView";
import { LoginPage } from "./page/Login";
import { RegisterPage } from "./page/Register";

const App = () => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Function to determine search parameters based on input
  const getSearchParams = (query) => {
    const params = {
      limit: itemsPerPage,
      page: currentPage,
    };

    // If query is empty, return basic params
    if (!query) return params;

    // Check if query is a number
    const numericValue = Number(query);
    if (!isNaN(numericValue)) {
      // If it's a number, it could be price or stock
      if (numericValue > 1000) {
        // Assume price if number is large
        params.price = numericValue;
      } else {
        // Assume stock if number is small
        params.stock = numericValue;
      }
    } else {
      // If it's not a number, treat as product name
      params.productName = query;
    }

    return params;
  };

  const fetchShops = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:3000/api/v1/shops", {
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <HomeView
          shops={shops}
          error={error}
          loading={loading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
          itemsPerPage={itemsPerPage}
        />
      ),
    },
    {
      path: "/about",
      element: <AboutView />,
    },
    {
      path: "/not-found",
      element: <NotFoundView />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
