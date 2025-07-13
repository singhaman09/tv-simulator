import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import CountryList from "./pages/Countrylist";
import CountryDetail from "./pages/CountryDetail";
import UserList from "./pages/Userlist";
import UserDetail from "./pages/UserDetail";
import Login from "./pages/Login";
import PrivateRoute from "./component/PrivateRoute";
import { useEffect, useState } from "react";
import { initSpatialNavigation } from "../spatialNavigationInit";

function App() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    initSpatialNavigation();
    setInitialized(true);
  }, []);

  if (!initialized) return <div>Initializing navigation...</div>;

  return (
    <AppProvider>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/country"
            element={
              <PrivateRoute>
                <CountryList />
              </PrivateRoute>
            }
          />
          <Route
            path="/country/:name"
            element={
              <PrivateRoute>
                <CountryDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <UserDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
