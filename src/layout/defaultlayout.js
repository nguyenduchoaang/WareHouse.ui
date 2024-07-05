import NavBar from "../based/navbar";
import NavBarLeft from "../based/navbarleft";
import styled from "styled-components";
export default function DefaultLayout({ children }) {
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
