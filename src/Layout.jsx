import { Container } from "react-bootstrap";
import NavbarComp from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <NavbarComp />

      {/* Header solo en home */}
      {location.pathname === "/" && (
        <header
          style={{
            width: "100%",
            height: 400,
            background: 'url("https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3h4bzk1ZWJjeWs2YWRvcnN1dDd0d3NwajV3ZmViZ2VpbDgzdDl4aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KEATEV6uaagupaQEXW/giphy.gif") center/cover no-repeat',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            textShadow: "3px 3px 10px rgba(0,0,0,0.7)",
            padding: "0 20px",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "0.5rem" }}>TechShop</h1>
          <p style={{ fontSize: "1.5rem", maxWidth: 700, lineHeight: 1.4 }}>
            Tecnología, innovación y estilo al alcance de tus manos. Descubre los mejores gadgets y accesorios para tu vida digital.
          </p>
          <div
            style={{
              marginTop: 20,
              padding: "8px 20px",
              background: "rgba(0,0,0,0.5)",
              borderRadius: 10,
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              fontWeight: 500,
            }}
          >
            ¡Explora nuestros productos tecnológicos!
          </div>
        </header>
      )}

      {/* Main */}
      <main className={`flex-grow-1 ${location.pathname !== "/login" ? "py-5" : ""}`}>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
