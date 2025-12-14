import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { formatARS } from "../utils";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function FeaturedShowcase() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://693df848f55f1be793040fe9.mockapi.io/api/v1/products";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const normalizedData = data.map((p, index) => ({
          ...p,
          id: p.id || (index + 1).toString(),
          price: Number(p.price) || 0,
          thumbnail: p.image || "https://via.placeholder.com/300",
          category: p.category || "General",
        }));

        const topTier = normalizedData
          .filter((p) => Number(p.price) > 100)
          .slice(0, 5);

        setFeaturedProducts(topTier);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando destacados:", err);
        setLoading(false);
      });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  if (loading)
    return (
      <div className="py-5 text-center">
        <Spinner animation="grow" variant="info" />
      </div>
    );

  // Si no hay productos destacados, no renderizamos nada
  if (featuredProducts.length === 0) return null;

  const product = featuredProducts[currentIndex];

  return (
    <section
      style={{
        position: "relative",
        padding: "80px 0",
        background: "radial-gradient(circle at 70% 50%, #1a1a2e, #050505)",
        overflow: "hidden",
        borderBottom: "1px solid var(--neon-purple)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "12vw",
          fontWeight: "900",
          color: "rgba(255, 255, 255, 0.03)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          fontFamily: "var(--font-display)",
          zIndex: 0,
        }}
      >
        FEATURED
      </div>

      <Container style={{ position: "relative", zIndex: 2 }}>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--neon-cyan)",
              letterSpacing: "2px",
              borderLeft: "4px solid var(--neon-cyan)",
              paddingLeft: "15px",
            }}
          >
            PRODUCTOS DESTACADOS
          </h2>

          <div className="d-flex gap-2">
            <Button
              variant="outline-light"
              onClick={prevSlide}
              style={{ borderRadius: 0, borderColor: "#333" }}
            >
              <FaChevronLeft />
            </Button>
            <Button
              variant="outline-light"
              onClick={nextSlide}
              style={{ borderRadius: 0, borderColor: "#333" }}
            >
              <FaChevronRight />
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Row className="align-items-center">
              {/* INFO */}
              <Col lg={5} className="mb-5 mb-lg-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mb-2">
                    <span
                      style={{
                        color: "var(--neon-purple)",
                        border: "1px solid var(--neon-purple)",
                        padding: "2px 8px",
                        fontSize: "0.8rem",
                        letterSpacing: "1px",
                      }}
                    >
                      TOP TIER
                    </span>
                    <span
                      className="ms-2 text-muted"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {product.category?.toUpperCase()}
                    </span>
                  </div>

                  <h1
                    className="display-4 text-white fw-bold my-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {product.name || product.title}
                  </h1>

                  <p
                    className="lead text-light opacity-75 mb-4"
                    style={{ fontSize: "1rem" }}
                  >
                    {product.description}
                  </p>

                  <h2
                    className="mb-4"
                    style={{
                      color: "var(--neon-cyan)",
                      textShadow: "0 0 15px rgba(0, 243, 255, 0.5)",
                    }}
                  >
                    {formatARS(product.price)}
                  </h2>

                  <Link to={`/product/${product.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: "var(--neon-purple)",
                        color: "white",
                        border: "none",
                        padding: "15px 40px",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        borderRadius: "0",
                        fontFamily: "var(--font-display)",
                        boxShadow: "0 0 20px rgba(188, 19, 254, 0.4)",
                      }}
                    >
                      COMPRAR AHORA
                    </motion.button>
                  </Link>
                </motion.div>
              </Col>

              {/* IMAGEN */}
              <Col lg={7} className="text-center position-relative">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "350px",
                      height: "350px",
                      background:
                        "radial-gradient(circle, rgba(0,243,255,0.2) 0%, transparent 70%)",
                      zIndex: -1,
                      filter: "blur(40px)",
                    }}
                  ></div>

                  <img
                    src={product.image || product.thumbnail}
                    alt={product.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "500px",
                      filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.6))",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/500?text=No+Image";
                    }}
                  />
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </AnimatePresence>

        <div className="d-flex gap-2 mt-5">
          {featuredProducts.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                height: "4px",
                width: idx === currentIndex ? "40px" : "15px",
                background: idx === currentIndex ? "var(--neon-cyan)" : "#333",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
