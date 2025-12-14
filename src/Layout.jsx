import { Container } from "react-bootstrap";
import NavbarComp from "./components/Navbar"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion"; 

export default function Layout({ children }) {
  const location = useLocation();

  const scrollToProducts = () => {
    const section = document.getElementById("products-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontFamily: "var(--font-main)", overflowX: "hidden" }}>
      <NavbarComp />

      {/* HEADER  */}
      {location.pathname === "/" && (
        <header
          style={{
            width: "100%",
            minHeight: "65vh", 
            position: "relative",
            overflow: "hidden",
            borderBottom: "2px solid var(--neon-cyan)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: "80px 20px", 
          }}
        >
          <div style={{
            position: "absolute",
            top: 0, left: 0, width: "100%", height: "100%",
            background: 'url("https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3h4bzk1ZWJjeWs2YWRvcnN1dDd0d3NwajV3ZmViZ2VpbDgzdDl4aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KEATEV6uaagupaQEXW/giphy.gif") center/cover no-repeat',
            filter: "brightness(0.3) contrast(1.2)",
            zIndex: -1
          }}></div>

          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={{ 
                fontFamily: "var(--font-display)", 
                fontSize: "clamp(2.5rem, 8vw, 5.5rem)", 
                fontWeight: 800, 
                marginBottom: "1rem",
                textShadow: "0 0 20px var(--neon-purple), 0 0 40px var(--neon-purple)",
                lineHeight: 1.1
              }}>
                CYBER<span style={{ color: "var(--neon-cyan)" }}>SHOP</span>
              </h1>
              
              <p style={{ 
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                maxWidth: "800px", 
                margin: "0 auto",
                lineHeight: 1.6, 
                textShadow: "0 2px 4px black",
                fontFamily: "var(--font-main)",
                letterSpacing: "1px",                                          
                color: "#ddd",
                padding: "0 10px"
              }}>
                [SYSTEM_READY]: Tecnología, innovación y estilo al alcance de tus manos. 
                Actualiza tu hardware hoy.
              </p>
              
              <motion.button
                onClick={scrollToProducts}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 243, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="mt-4"
                style={{
                  padding: "12px 40px",
                  background: "transparent",
                  border: "1px solid var(--neon-cyan)",
                  color: "white",
                  borderRadius: "0px",
                  boxShadow: "0 0 15px rgba(0, 243, 255, 0.2)",
                  fontWeight: 600,
                  letterSpacing: "3px",
                  fontFamily: "var(--font-display)",
                  cursor: "pointer",
                  backdropFilter: "blur(5px)",
                  fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" 
                }}
              >
                INICIAR EXPLORACIÓN ↓
              </motion.button>
            </motion.div>
          </Container>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow-1 w-100">
        {children}
      </main>

      <Footer />
    </div>
  );
}