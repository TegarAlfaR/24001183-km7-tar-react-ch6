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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeView shops={shops} error={error} loading={loading} />,
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
