import NavBar from "../based/navbar";
import NavBarLeft from "../based/navbarleft";
export default function DefaultLayout({ children }) {
  return (
    <>
      <NavBar />
      <NavBarLeft />
      <div>{children}</div>
    </>
  );
}
