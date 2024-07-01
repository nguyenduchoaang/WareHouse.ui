import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import BaseServices from "./based/services/BaseServices";
import Homepage from "./homepage/Homepage";
import AppRoutes from "./AppRoutes";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await BaseServices.Get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    };
    fetchData();
  }, []);
  return (
    <p>
      {/* <Homepage /> */}
      <Routes>
        {AppRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
        ))}
      </Routes>
    </p>
  );
}

export default App;
