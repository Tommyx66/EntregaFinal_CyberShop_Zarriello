import React, { useState } from "react";
import { Container, Row, Col, Button, Image, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatARS } from "../utils";
import { FaTrash, FaGamepad, FaCreditCard, FaArrowLeft } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } =
    useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const fakeOrderId = Math.floor(Math.random() * 900000) + 100000;

      toast.success(`¡MISIÓN CUMPLIDA! Orden #${fakeOrderId} generada.`, {
        theme: "dark",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        clearCart();
        setIsProcessing(false);
        navigate("/");
      }, 2500);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <Container
        className="py-5 text-center"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Helmet>
          <title>Inventario Vacío | CyberShop</title>
        </Helmet>

        <ToastContainer />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaGamepad
            size={80}
            style={{ color: "#333", marginBottom: "1.5rem" }}
          />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              color: "white",
              letterSpacing: "2px",
            }}
          >
            INVENTARIO VACÍO
          </h2>
          <p className="text-muted mb-4">
            No tienes items equipados para la batalla.
          </p>
          <Link to="/">
            <Button
              variant="outline-primary"
              className="px-5 py-2 fw-bold"
              style={{
                borderColor: "var(--neon-cyan)",
                color: "var(--neon-cyan)",
                borderRadius: "0",
                textTransform: "uppercase",
              }}
            >
              Ir a la Tienda
            </Button>
          </Link>
        </motion.div>
      </Container>
    );
  }

  return (
    <main className="py-5">
      <Helmet>
        <title>Mi Inventario | CyberShop</title>
      </Helmet>

      <ToastContainer />

      <Container>
        <h1
          className="mb-5"
          style={{
            fontFamily: "var(--font-display)",
            color: "white",
            borderLeft: "5px solid var(--neon-purple)",
            paddingLeft: "20px",
            textShadow: "0 0 10px rgba(188, 19, 254, 0.5)",
          }}
        >
          MI INVENTARIO{" "}
          <span style={{ fontSize: "0.5em", color: "#666" }}>
            ({cart.length} ITEMS)
          </span>
        </h1>

        <Row className="g-5">
          {/* LISTA DE ITEMS */}
          <Col lg={8}>
            <div className="d-flex flex-column gap-3">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    layout
                    style={{
                      background: "rgba(20, 20, 20, 0.6)",
                      backdropFilter: "blur(5px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "4px",
                      padding: "15px",
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* Imagen */}
                    <div style={{ flexShrink: 0, marginRight: "20px" }}>
                      <Image
                        src={item.thumbnail || item.image || item.images?.[0]}
                        rounded
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          border: "1px solid #444",
                          filter: "brightness(0.9)",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div style={{ flexGrow: 1, minWidth: "150px" }}>
                      <h5
                        className="mb-1 text-white"
                        style={{
                          fontFamily: "var(--font-display)",
                          letterSpacing: "1px",
                        }}
                      >
                        {item.title}
                      </h5>
                      <small
                        style={{
                          color: "var(--neon-cyan)",
                          fontFamily: "monospace",
                        }}
                      >
                        UNITARIO: {formatARS(item.price)}
                      </small>
                    </div>

                    {/* Controles */}
                    <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
                      <div
                        className="d-flex align-items-center bg-dark p-1 border border-secondary"
                        style={{ borderRadius: "4px" }}
                      >
                        <Button
                          variant="link"
                          className="text-white p-0 px-2 text-decoration-none"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <span
                          className="text-white fw-bold mx-2"
                          style={{ minWidth: "20px", textAlign: "center" }}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          variant="link"
                          className="text-white p-0 px-2 text-decoration-none"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>

                      <div className="text-end" style={{ minWidth: "100px" }}>
                        <div
                          className="fw-bold text-white mb-1"
                          style={{ fontSize: "1.1rem" }}
                        >
                          {formatARS(item.price * item.quantity)}
                        </div>
                        <Button
                          variant="link"
                          className="text-danger p-0 text-decoration-none small"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTrash size={12} className="me-1" /> ELIMINAR
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-4">
              <Link
                to="/"
                className="text-decoration-none text-muted d-flex align-items-center gap-2 hover-neon"
              >
                <FaArrowLeft /> SEGUIR EXPLORANDO
              </Link>
            </div>
          </Col>

          <Col lg={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 position-sticky"
              style={{
                top: "100px",
                background: "rgba(10, 10, 10, 0.9)",
                border: "1px solid var(--neon-cyan)",
                borderRadius: "0px", 
                boxShadow: "0 0 20px rgba(0, 243, 255, 0.05)",
              }}
            >
              <h4
                className="mb-4 text-white"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "1px",
                }}
              >
                RESUMEN DE ORDEN
              </h4>

              <div className="d-flex justify-content-between mb-2 text-muted">
                <span>Subtotal</span>
                <span>{formatARS(totalPrice)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-muted">
                <span>Envío Digital</span>
                <span style={{ color: "var(--neon-cyan)" }}>GRATIS</span>
              </div>
              <hr style={{ borderColor: "#444" }} />

              <div className="d-flex justify-content-between mb-4 text-white">
                <span className="fs-5">TOTAL</span>
                <span
                  className="fs-3 fw-bold"
                  style={{
                    color: "var(--neon-cyan)",
                    textShadow: "0 0 10px rgba(0,243,255,0.4)",
                  }}
                >
                  {formatARS(totalPrice)}
                </span>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-100 py-3 mb-3 fw-bold"
                onClick={handleCheckout}
                disabled={isProcessing}
                style={{
                  background:
                    "linear-gradient(45deg, var(--neon-purple), #7a00ff)",
                  border: "none",
                  fontSize: "1.2rem",
                  borderRadius: "0",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "1px",
                  boxShadow: "0 4px 15px rgba(122, 0, 255, 0.4)",
                }}
              >
                {isProcessing ? (
                  <>
                    <Spinner animation="border" size="sm" /> PROCESANDO...
                  </>
                ) : (
                  <>
                    <FaCreditCard className="me-2" /> CONFIRMAR PAGO
                  </>
                )}
              </Button>

              <p
                className="text-center text-muted small mb-0"
                style={{ fontFamily: "monospace" }}
              >
                <i className="fas fa-lock"></i> TRANSACCIÓN ENCRIPTADA SSL
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default CartPage;
