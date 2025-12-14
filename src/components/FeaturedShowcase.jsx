import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { formatARS } from "../utils";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export default function FeaturedShowcase() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Estado para el control táctil del swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const API_URL = "https://693df848f55f1be793040fe9.mockapi.io/api/v1/products";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const normalizedData = data.map((p, index) => ({
          ...p,
          id: p.id || (index + 1).toString(),
          price: Number(p.price) || 0,
          thumbnail: p.image || p.images?.[0] || "https://via.placeholder.com/300/111/00f3ff?text=CyberShop",
          category: p.category || "General",
          image: p.image || p.thumbnail || p.images?.[0] || "https://via.placeholder.com/300/111/00f3ff?text=CyberShop",
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
  
  // --- LÓGICA DE ROTACIÓN AUTOMÁTICA (Ajustado a 8 segundos) ---
  useEffect(() => {
    if (featuredProducts.length > 0) {
      const interval = setInterval(nextSlide, 8000); // CAMBIO: 8 segundos
      return () => clearInterval(interval); 
    }
  }, [featuredProducts, currentIndex]);

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
  
  // --- LÓGICA DE SWIPE TÁCTIL (MOBILE) ---
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === 0 || touchEnd === 0) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; 

    if (distance > minSwipeDistance) {
      // Swipe hacia la izquierda (Next Slide)
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swipe hacia la derecha (Prev Slide)
      prevSlide();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };


  if (loading)
    return (
      <div className="py-5 text-center">
        <Spinner animation="grow" variant="info" />
      </div>
    );

  if (featuredProducts.length === 0) return null;

  const product = featuredProducts[currentIndex];

  return (
    <section
      style={{
        position: "relative",
        padding: "50px 0", // AJUSTE: Menos padding vertical
        background: "radial-gradient(circle at 70% 50%, #1a1a2e, #050505)",
        overflow: "hidden",
        borderBottom: "1px solid var(--neon-purple)",
      }}
      // Agregar eventos táctiles a la sección principal para el swipe
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--neon-cyan)",
              letterSpacing: "2px",
              borderLeft: "4px solid var(--neon-cyan)",
              paddingLeft: "15px",
              fontSize: '1.5rem', // Ligeramente más pequeño en mobile
            }}
          >
            PRODUCTOS DESTACADOS
          </h2>

          {/* Controles visibles solo en desktop */}
          <div className="d-none d-md-flex gap-2">
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
            {/* CAMBIO: Usamos flex-column-reverse en mobile para poner la imagen abajo */}
            <Row className="align-items-center flex-column-reverse flex-lg-row"> 
              
              {/* INFO (COLUMNA 1 en mobile) */}
              <Col lg={5} className="mt-4 mt-lg-0 text-center text-lg-start"> 
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
                    className="text-white fw-bold my-3"
                    style={{ fontFamily: "var(--font-display)", fontSize: '2rem' }} // AJUSTE: Tamaño de fuente
                  >
                    {product.name || product.title}
                  </h1>

                  <p
                    className="lead text-light opacity-75 mb-4"
                    style={{ fontSize: "0.9rem" }} // AJUSTE: Tamaño de descripción
                  >
                    {product.description}
                  </p>

                  <h2
                    className="mb-4"
                    style={{
                      color: "var(--neon-cyan)",
                      textShadow: "0 0 15px rgba(0, 243, 255, 0.5)",
                      fontSize: '1.8rem' // AJUSTE: Tamaño de precio
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
                        padding: "12px 30px", // AJUSTE: Menos padding en el botón
                        fontSize: "1rem",
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

              {/* IMAGEN (COLUMNA 2 en mobile) */}
              <Col lg={7} className="text-center position-relative">
                <motion.div
                  animate={{ y: [0, -10, 0] }} // Menos movimiento para mobile
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {/* AURAS Y BRILLOS NEÓN */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "80%", // Ocupa menos espacio
                      height: "80%",
                      background:
                        "radial-gradient(circle, rgba(0,243,255,0.2) 0%, transparent 70%)",
                      zIndex: -1,
                      filter: "blur(30px)", // Menos blur
                    }}
                  ></div>

                  <img
                    src={product.image || product.thumbnail}
                    alt={product.name}
                    style={{
                      width: "auto",
                      maxHeight: "350px", // AJUSTE CLAVE: Máxima altura en móvil
                      maxWidth: "100%",
                      objectFit: "contain",
                      filter: "drop-shadow(0 0 15px rgba(0, 243, 255, 0.2))", 
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/350?text=No+Image";
                    }}
                  />
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </AnimatePresence>

        {/* INDICADORES DE POSICIÓN (DOTS) */}
        <div className="d-flex justify-content-center justify-content-lg-start gap-2 mt-4 mt-lg-5">
          {featuredProducts.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                height: "6px",
                width: idx === currentIndex ? "40px" : "15px",
                background: idx === currentIndex ? "var(--neon-cyan)" : "#333",
                cursor: "pointer",
                borderRadius: "3px",
                transition: "all 0.3s ease",
                boxShadow: idx === currentIndex ? "0 0 10px var(--neon-cyan)" : "none",
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}