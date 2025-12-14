import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Card,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { FaShoppingCart, FaArrowLeft, FaTag, FaGamepad } from "react-icons/fa";
import { formatARS } from "../utils";

// Logos
const LOGOS = {
  playstation:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PlayStation_logo.svg/1280px-PlayStation_logo.svg.png",
  xbox: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/1024px-Xbox_one_logo.svg.png",
  nintendo:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nintendo_Switch_Logo.svg/1024px-Nintendo_Switch_Logo.svg.png",
  pc: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1024px-Steam_icon_logo.svg.png",
  windows:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/1024px-Windows_logo_-_2012.svg.png",
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const API_URL = "https://693df848f55f1be793040fe9.mockapi.io/api/v1/products";

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) {
          throw new Error("El producto no existe o el ID es incorrecto.");
        }

        const data = await res.json();

        setProduct({
          id: data.id,
          title: data.name || data.title,
          price: Number(data.price),
          thumbnail: data.image || data.thumbnail,
          description: data.description || "Sin descripción disponible.",
          category: data.category || "General",
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    if (!isAuthenticated) {
      toast.info("🔒 ACCESO DENEGADO: Inicia sesión para comprar", {
        theme: "dark",
      });
      setTimeout(() => navigate("/login"), 1500);
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    });

    toast.success("✅ ITEM EQUIPADO AL INVENTARIO", { theme: "dark" });
  };

  if (loading)
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Spinner
          animation="border"
          variant="info"
          style={{ width: "3rem", height: "3rem" }}
        />
        <p className="mt-3 text-white font-monospace">
          ACCEDIENDO A LA BASE DE DATOS...
        </p>
      </div>
    );

  if (error || !product)
    return (
      <Container className="mt-5 text-center">
        <Alert
          variant="danger"
          className="bg-dark text-danger border-danger p-5"
        >
          <FaGamepad size={50} className="mb-3" />
          <h4>ERROR DE ENLACE (404)</h4>
          <p>{error}</p>
          <p className="small text-muted">ID buscado: {id}</p>
          <Button variant="outline-danger" onClick={() => navigate("/")}>
            VOLVER AL CATÁLOGO
          </Button>
        </Alert>
      </Container>
    );

  return (
    <Container className="mt-4 mb-5">
      <Helmet>
        <title>{product.title} | CyberShop</title>
      </Helmet>
      <ToastContainer position="bottom-right" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          className="border-0 shadow-lg overflow-hidden"
          style={{
            background: "rgba(20, 20, 20, 0.8)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Row className="g-0">
            <Col
              md={7}
              className="position-relative"
              style={{
                minHeight: "500px",
                background: "radial-gradient(circle at center, #2a2a2a, #111)",
              }}
            >
              <div className="d-flex align-items-center justify-content-center h-100 p-4">
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={product.thumbnail}
                  alt={product.title}
                  style={{
                    maxHeight: "450px",
                    maxWidth: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.6))",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/500x500?text=No+Image";
                  }}
                />
              </div>
            </Col>
            <Col
              md={5}
              className="p-4 p-md-5 d-flex flex-column justify-content-center"
            >
              <PlatformHeader
                title={product.title}
                category={product.category}
              />
              <h1
                className="fw-bold text-white mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {product.title}
              </h1>
              <div className="mb-4">
                <BadgePill category={product.category} />
              </div>
              <div className="mb-4">
                <small className="text-muted d-block mb-1">
                  PRECIO DE MERCADO
                </small>
                <h2
                  style={{
                    color: "var(--neon-cyan)",
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {formatARS(product.price)}
                </h2>
              </div>
              <p className="text-light opacity-75 mb-5">
                {product.description}
              </p>
              <div className="d-grid gap-3">
                <Button
                  onClick={handleAdd}
                  size="lg"
                  style={{
                    background: "var(--neon-purple)",
                    border: "none",
                    fontWeight: "bold",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  <FaShoppingCart className="me-2" /> AÑADIR
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate(-1)}
                >
                  VOLVER
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </motion.div>
    </Container>
  );
}

function BadgePill({ category }) {
  return (
    <span
      className="badge border border-secondary text-secondary bg-transparent px-3 py-2"
      style={{ fontFamily: "monospace", fontSize: "0.8rem" }}
    >
      <FaTag className="me-2" /> {category.toUpperCase()}
    </span>
  );
}

function PlatformHeader({ title, category }) {
  const t = title.toLowerCase();
  const c = category.toLowerCase();
  let logoUrl = null;
  let platformName = "";

  if (
    t.includes("playstation") ||
    t.includes("ps5") ||
    t.includes("god of war")
  ) {
    logoUrl = LOGOS.playstation;
    platformName = "PlayStation";
  } else if (t.includes("xbox") || t.includes("halo") || t.includes("forza")) {
    logoUrl = LOGOS.xbox;
    platformName = "Xbox";
  } else if (
    t.includes("nintendo") ||
    t.includes("switch") ||
    t.includes("mario")
  ) {
    logoUrl = LOGOS.nintendo;
    platformName = "Nintendo";
  } else if (t.includes("steam") || c === "videojuegos") {
    logoUrl = LOGOS.pc;
    platformName = "PC / Steam";
  } else if (t.includes("windows") || t.includes("pc") || c === "componentes") {
    logoUrl = LOGOS.windows;
    platformName = "Windows / PC";
  }

  if (!logoUrl) return null;

  return (
    <div className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom border-secondary border-opacity-25">
      <img
        src={logoUrl}
        alt={platformName}
        style={{
          height: "25px",
          width: "auto",
          filter: "brightness(0) invert(1)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-display)",
          color: "#fff",
          fontSize: "0.8rem",
          letterSpacing: "2px",
          opacity: 0.7,
        }}
      >
        PLATAFORMA: {platformName}
      </span>
    </div>
  );
}
