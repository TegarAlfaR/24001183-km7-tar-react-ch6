import { useEffect, useState } from "react";
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
  const [filterProduct, setFilterProduct] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const respon = await axios.get("http://localhost:3000/api/v1/shops");
        console.log(respon);

        const data = respon.data;
        if (data.isSuccess) {
          setShops(data.data.shops);
        } else {
          setError("error");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    const filtered = shops.filter((shop) =>
      shop.products.some(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.stock.toString().includes(searchQuery) ||
          product.price.toString().includes(searchQuery)
      )
    );
    setFilterProduct(filtered);
    setCurrentPage(1);
  }, [searchQuery, shops]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = (searchQuery ? filterProduct : shops).slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(
    (searchQuery ? filterProduct.length : shops.length) / itemsPerPage
  );

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
          shops={paginatedData}
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
