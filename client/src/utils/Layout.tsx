import Footer from "../components/footer/Footer";
import Header from "../components/Header/Header";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
export default Layout;
