import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContexts.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// import Product from "./pages/Product.jsx";
// import Pricing from "./pages/Pricing.jsx";
// import Homepage from "./pages/Homepage.jsx";
// import Login from "./pages/Login.jsx";
// import AppLayout from "./pages/AppLayout.jsx";
// import PageNotFound from "./pages/PageNotFound.jsx";

const Homepage = lazy(function () {
  return import("./pages/Homepage.jsx");
});

const Product = lazy(function () {
  return import("./pages/Product.jsx");
});

const Pricing = lazy(function () {
  return import("./pages/Pricing.jsx");
});

const Login = lazy(function () {
  return import("./pages/Login.jsx");
});

const AppLayout = lazy(function () {
  return import("./pages/AppLayout.jsx");
});

const PageNotFound = lazy(function () {
  return import("./pages/PageNotFound.jsx");
});

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* <Route path="/" element={<Homepage />} /> */}
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
              /> */}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="country" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
