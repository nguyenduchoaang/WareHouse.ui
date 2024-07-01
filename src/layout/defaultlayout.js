import NavBar from "../based/navbar";

export default function DefaultLayout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
