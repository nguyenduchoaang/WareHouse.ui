import NavBar from "../based/navbar";
import NavBarLeft from "../based/navbarleft";
import styled from "styled-components";
import Common from "../based/Common";
import { useEffect } from "react";
export default function DefaultLayout({ children }) {
  useEffect(() => {
    if (!Common.CheckToken()) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      <NavBar />
      <NavBarLeft />
      <Child className="child">{children}</Child>
    </>
  );
}

const Child = styled.div`
  margin-left: 240px;
  padding: 20px;
`;
