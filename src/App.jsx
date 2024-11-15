import { Navigate } from "react-router-dom";
import HomeView from "./page/ProductsView";
import Login from "./page/Login";
import NavbarTailwind from "./components/navbar/NavbarTailwind";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavbarTailwind onLogout={logout} />
          <HomeView />
        </>
      ) : (
        <Navigate to="/login" />
      )}
      {isAuthenticated ? <Navigate to="/" /> : <Login />}
    </>
  );
};

export default App;
