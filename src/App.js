import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Default from "./layout/defaultlayout";
import LoadingW from "./based/LoadingW";
import { LoadingProvider, useLoading } from "./based/context/LoadingContext";

function AppContent() {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <LoadingW isOpen={isLoading} />}
      <Routes>
        {AppRoutes.map((route, index) => {
          let Layout = route.layout ?? Default;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <route.element />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
