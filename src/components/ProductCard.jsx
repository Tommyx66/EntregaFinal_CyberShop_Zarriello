import { Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatARS } from "../utils";
import { motion } from "framer-motion";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

// --- LOGOS  ---
const LOGOS = {
  playstation: "https://cdn.simpleicons.org/playstation/ffffff",

  xbox: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Xbox_one_logo.svg/1024px-Xbox_one_logo.svg.png",

  nintendo:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nintendo_Switch_Logo.svg/1024px-Nintendo_Switch_Logo.svg.png",

  steam: "https://cdn.simpleicons.org/steam/ffffff",

  windows: "https://cdn.simpleicons.org/windows/ffffff",
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const productTitle = product.title || product.name || "Sin Nombre";

  const getPlatformLogo = (title, category) => {
    if (!title) return null;
    const t = title.toLowerCase();
    const c = category ? category.toLowerCase() : "";

    if (
      t.includes("playstation") ||
      t.includes("ps5") ||
      t.includes("god of war") ||
      t.includes("dualsense") ||
      t.includes("spider-man") ||
      t.includes("last of us") ||
      t.includes("uncharted")
    ) {
      return LOGOS.playstation;
    }
    if (
      t.includes("xbox") ||
      t.includes("halo") ||
      t.includes("forza") ||
      t.includes("gears") ||
      t.includes("starfield")
    ) {
      return LOGOS.xbox;
    }
    if (
      t.includes("nintendo") ||
      t.includes("switch") ||
      t.includes("mario") ||
      t.includes("zelda") ||
      t.includes("pokemon") ||
      t.includes("metroid")
    ) {
      return LOGOS.nintendo;
    }
    if (
      t.includes("steam") ||
      t.includes("valve") ||
      t.includes("half-life") ||
      t.includes("portal")
    ) {
      return LOGOS.steam;
    }
    if (
      c === "componentes" ||
      t.includes("windows") ||
      t.includes("pc") ||
      t.includes("nvidia") ||
      t.includes("amd") ||
      t.includes("intel")
    ) {
      return LOGOS.windows;
    }

    if (c === "videojuegos") return LOGOS.steam;

    return null;
  };

  const platformLogo = getPlatformLogo(productTitle, product.category);

  const handleNavigate = () => {
    if (!product.id) return toast.error("Error: Producto sin ID");
    navigate(`/product/${product.id}`);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) return navigate("/login");
    if (!product.id) return toast.error("Error: Producto inválido");

    addToCart({
      id: product.id,
      title: productTitle,
      price: product.price,
      thumbnail: product.thumbnail || product.images?.[0] || "",
    });
    toast.success("Item agregado al inventario", {
      theme: "dark",
      autoClose: 1500,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -10 }}
    >
      <Card
        className="h-100 border-0 shadow-lg position-relative"
        onClick={handleNavigate}
        style={{
          background:
            "linear-gradient(180deg, rgba(30,30,30,0.9) 0%, rgba(10,10,10,1) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          cursor: "pointer",
          overflow: "hidden",
          minHeight: "460px",
        }}
      >
        <div
          className="card-glow"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "var(--neon-cyan)",
            opacity: 0.7,
          }}
        />

        {/* --- LOGO  --- */}
        {platformLogo && (
          <div
            className="position-absolute top-0 start-0 m-3 p-2"
            style={{
              background: "rgba(0,0,0,0.8)",
              borderRadius: "50%",
              backdropFilter: "blur(4px)",
              zIndex: 10,
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={platformLogo}
              alt="platform"
              style={{
                width: "22px",
                height: "22px",
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>
        )}

        {/* BADGE */}
        <Badge
          bg="dark"
          className="position-absolute top-0 end-0 m-3"
          style={{
            border: "1px solid var(--neon-purple)",
            color: "var(--neon-purple)",
            letterSpacing: "1px",
          }}
        >
          {product.category?.toUpperCase() || "GEAR"}
        </Badge>

        {/* IMAGEN */}
        <div
          style={{
            height: 220,
            padding: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={product.thumbnail || product.images?.[0]}
            alt={productTitle}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 10px 10px rgba(0,0,0,0.5))",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x300/111/00f3ff?text=CyberShop";
            }}
          />
        </div>

        {/*  BODY */}
        <Card.Body className="d-flex flex-column pt-3">
          {/*  H3 */}
          <h3
            style={{
              color: "white",
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: "bold",
              letterSpacing: "1px",
              marginBottom: "0.5rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: "2.8rem",
              lineHeight: "1.4",
            }}
          >
            {productTitle}
          </h3>

          {/* DESCRIPCIÓN  */}
          <Card.Text
            style={{
              color: "#aaa",
              fontSize: "0.85rem",
              lineHeight: "1.4",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: "1rem",
            }}
          >
            {product.description || "Descripción técnica confidencial."}
          </Card.Text>

          {/* PRECIO Y BOTONES */}
          <div className="d-flex justify-content-between align-items-end mt-auto">
            <div>
              <small
                className="text-muted d-block"
                style={{ fontSize: "0.7rem" }}
              >
                PRECIO
              </small>
              <span
                style={{
                  color: "var(--neon-cyan)",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textShadow: "0 0 10px rgba(0, 243, 255, 0.4)",
                }}
              >
                {formatARS(product.price)}
              </span>
            </div>

            <div className="d-flex gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="btn btn-sm btn-outline-secondary"
                style={{ borderRadius: "4px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate();
                }}
              >
                <FaEye />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="btn btn-sm btn-primary"
                onClick={handleAdd}
                style={{
                  background: "var(--neon-purple)",
                  border: "none",
                  boxShadow: "0 0 10px var(--neon-purple)",
                }}
              >
                <FaShoppingCart />
              </motion.button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
