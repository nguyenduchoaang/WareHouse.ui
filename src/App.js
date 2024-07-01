import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Default from "./layout/defaultlayout";
function App() {
  useEffect(() => {
    // const fetchData = async () => {
    //   const [err, data] = await BaseServices.Get(
    //     "https://jsonplaceholder.typicode.com/posts"
    //   );
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(data);
    //   }
    // };
    // fetchData();
  }, []);
  return (
    <p>
      {/* <Homepage /> */}
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
    </p>
  );
}

export default App;
