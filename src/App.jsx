import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomeView from "./page/ProductsView";
import Login from "./page/Login";
import NavbarTailwind from "./components/navbar/NavbarTailwind";

const App = () => {
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:3000/api/v1/shops", {
        params: getSearchParams(searchQuery),
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        <>
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
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <NavbarTailwind />
          <Login />,
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
