import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
